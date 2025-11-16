/**
 * Cloudflare Worker for FlowLint Support Form Handler
 *
 * This worker receives support form submissions and forwards them via email
 * or stores them for later processing.
 *
 * Environment variables required:
 * - SENDGRID_API_KEY: SendGrid API key for sending emails
 * - SUPPORT_EMAIL: Email address to receive support requests
 * - ADMIN_EMAIL: Admin email address
 *
 * Or alternatively use D1 database for storing submissions
 */

interface SupportFormData {
  name: string;
  email: string;
  issueType: string;
  title: string;
  description: string;
  repository?: string;
  timestamp: string;
}

interface Env {
  SENDGRID_API_KEY?: string;
  SUPPORT_EMAIL?: string;
  ADMIN_EMAIL?: string;
  SUPPORT_DB?: D1Database;
}

const issueTypeLabels: Record<string, string> = {
  bug: "Bug Report",
  feature: "Feature Request",
  question: "Question",
  installation: "Installation Help",
  configuration: "Configuration Issue",
  "false-positive": "False Positive",
  performance: "Performance Issue",
  other: "Other",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const data: SupportFormData = await request.json();

      // Validate required fields
      if (!data.name || !data.email || !data.issueType || !data.title || !data.description) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email address" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Try to store in D1 database if available
      if (env.SUPPORT_DB) {
        try {
          await env.SUPPORT_DB.prepare(
            `INSERT INTO support_requests
            (name, email, issue_type, title, description, repository, timestamp, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `
          )
            .bind(
              data.name,
              data.email,
              data.issueType,
              data.title,
              data.description,
              data.repository || null,
              data.timestamp,
              "new"
            )
            .run();
        } catch (dbError) {
          console.error("Database error:", dbError);
          // Continue even if DB fails, try email instead
        }
      }

      // Try to send email notification if SendGrid is configured
      if (env.SENDGRID_API_KEY && env.SUPPORT_EMAIL) {
        try {
          const emailResult = await sendSupportEmail(data, env);
          if (!emailResult.success) {
            throw new Error(emailResult.error);
          }
        } catch (emailError) {
          console.error("Email error:", emailError);
          // Still return success to user, just log the error
        }
      }

      // Return success response
      return new Response(
        JSON.stringify({
          success: true,
          message: "Support request received successfully",
          timestamp: new Date().toISOString(),
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (error) {
      console.error("Error processing support request:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to process support request",
          details: error instanceof Error ? error.message : "Unknown error",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  },
};

/**
 * Send email notification via SendGrid
 */
async function sendSupportEmail(
  data: SupportFormData,
  env: Env
): Promise<{ success: boolean; error?: string }> {
  if (!env.SENDGRID_API_KEY || !env.SUPPORT_EMAIL) {
    return { success: false, error: "SendGrid not configured" };
  }

  const issueTypeLabel = issueTypeLabels[data.issueType] || data.issueType;

  const emailContent = `
<h2>New Support Request from FlowLint</h2>

<p><strong>Issue Type:</strong> ${issueTypeLabel}</p>
<p><strong>Title:</strong> ${escapeHtml(data.title)}</p>

<h3>Submitter Information</h3>
<ul>
  <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
  <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
  ${data.repository ? `<li><strong>Repository:</strong> ${escapeHtml(data.repository)}</li>` : ""}
  <li><strong>Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</li>
</ul>

<h3>Description</h3>
<p>${escapeHtml(data.description).replace(/\n/g, "<br>")}</p>

<hr>

<p><strong>Reply to:</strong> ${escapeHtml(data.email)}</p>
  `;

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: env.SUPPORT_EMAIL }],
            subject: `[FlowLint Support] ${data.issueType.toUpperCase()}: ${data.title}`,
          },
        ],
        from: {
          email: "noreply@flowlint.dev",
          name: "FlowLint Support System",
        },
        reply_to: {
          email: data.email,
          name: data.name,
        },
        content: [
          {
            type: "text/html",
            value: emailContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("SendGrid error:", error);
      return {
        success: false,
        error: `SendGrid returned ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Escape HTML characters
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
