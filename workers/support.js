/**
 * Cloudflare Worker for FlowLint Support System
 * Routes support tickets to GitHub repositories as issues
 *
 * Deploy this to Cloudflare Workers with name: flowlint-support
 * Required environment variable: GITHUB_TOKEN (PAT with repo scope)
 *
 * Usage: Deploy to https://support.flowlint.dev
 */

// Repository mapping
const REPO_MAP = {
  'web': {
    owner: 'Replikanti',
    repo: 'flowlint-web'
  },
  'app': {
    owner: 'Replikanti',
    repo: 'flowlint-github-app'
  },
  'cli': {
    owner: 'Replikanti',
    repo: 'flowlint-cli'
  },
  'chrome': {
    owner: 'Replikanti',
    repo: 'flowlint-chrome'
  },
  'core': {
    owner: 'Replikanti',
    repo: 'flowlint-core'
  },
  'examples': {
    owner: 'Replikanti',
    repo: 'flowlint-examples'
  }
};

// Issue type to label mapping
const TYPE_LABELS = {
  'bug': ['bug', 'triage'],
  'feature': ['enhancement', 'triage'],
  'help': ['help wanted', 'support'],
  'question': ['question', 'support'],
  'other': ['triage']
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders
    });
  }

  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  try {
    // Parse request body
    const data = await request.json();

    // Validate required fields
    if (!data.project || !data.type || !data.title || !data.description) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields: project, type, title, description'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Get repository info
    const repoInfo = REPO_MAP[data.project];
    if (!repoInfo) {
      return new Response(JSON.stringify({
        success: false,
        error: `Invalid project: ${data.project}. Valid projects: ${Object.keys(REPO_MAP).join(', ')}`
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Create issue body
    const issueBody = createIssueBody(data);

    // Get labels
    let labels = TYPE_LABELS[data.type] || ['question'];
    // Add "support" label to everything coming from this form to distinguish it
    if (!labels.includes('support')) {
        labels.push('support');
    }

    // Create GitHub issue
    const githubResponse = await fetch(
      `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`, // GITHUB_TOKEN is a secret in Cloudflare Worker
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'FlowLint-Support-Worker'
        },
        body: JSON.stringify({
          title: `[Support] ${data.title}`,
          body: issueBody,
          labels: labels
        })
      }
    );

    if (!githubResponse.ok) {
      const errorText = await githubResponse.text();
      console.error('GitHub API error:', errorText);

      return new Response(JSON.stringify({
        success: false,
        error: 'Failed to create GitHub issue. Please try again later.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    const issue = await githubResponse.json();

    return new Response(JSON.stringify({
      success: true,
      issue_number: issue.number,
      issue_url: issue.html_url
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Error:', error);

    return new Response(JSON.stringify({
      success: false,
      error: 'Internal server error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}

function createIssueBody(data) {
  const name = data.name || 'Anonymous';
  const email = data.email || 'Not provided';

  let body = `## Support Request Details\n\n`;
  body += `**Submitted by:** ${name}\n`;
  body += `**Contact:** ${email}\n`;
  body += `**Type:** ${data.type}\n`;
  body += `**Project:** ${data.project}\n\n`;
  body += `## Description\n\n`;
  body += data.description;
  body += `\n\n---\n`;
  body += `*Submitted via [FlowLint Support Form](https://flowlint.dev/support)*`;

  return body;
}