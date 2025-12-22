import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 16, 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, and safeguard information when you use our suite of tools: the FlowLint GitHub App, 
                  CLI Tool, Chrome Extension, and Web Linter.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Collection & Usage by Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Chrome Extension & CLI Tool</h3>
                  <p className="mb-2">
                    These tools are designed with a "Privacy First" approach.
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Local Processing:</strong> All workflow analysis is performed locally on your machine (CLI) or in your browser (Extension).</li>
                    <li><strong>No Data Upload:</strong> Your workflow files, credentials, and configuration are NEVER sent to our servers.</li>
                    <li><strong>Offline Capability:</strong> These tools function without an internet connection (except for installation).</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. GitHub App</h3>
                  <p className="mb-2">
                    When you install the FlowLint GitHub App, we require access to specific repository data to function:
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Repository Content:</strong> We read workflow files (*.n8n.json) to perform static analysis. Files are processed in memory and immediately discarded. We do not permanently store your code.</li>
                    <li><strong>Metadata:</strong> We collect PR numbers, commit SHAs, and repository names to post Check Runs and annotations.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Web Linter</h3>
                  <p>
                    The online Web Linter runs entirely in your browser using client-side JavaScript. 
                    Data you paste into the validator is not sent to any backend server and is cleared when you close the tab.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may collect anonymous, aggregated usage statistics to improve our products, such as:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Number of analyses performed</li>
                  <li>Common rule violations (without specific details)</li>
                  <li>Error rates and performance metrics</li>
                </ul>
                <p>
                  You can opt-out of analytics in the CLI and Chrome Extension settings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>GitHub App Analysis Results:</strong> Retained for 90 days (Check Run history on GitHub).</li>
                  <li><strong>Support Requests:</strong> Retained until resolved or as required for records.</li>
                  <li><strong>CLI/Extension Data:</strong> Not retained by us; stays on your device.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement industry-standard security measures:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Encryption in transit (HTTPS) for all services.</li>
                  <li>Ephemeral processing of code (no long-term storage).</li>
                  <li>Strict access controls for infrastructure.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Google API Data Disclosure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint's use and transfer to any other app of information received from Google APIs will adhere to 
                  <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" className="text-primary hover:underline mx-1" target="_blank" rel="noopener noreferrer">
                    Google API Services User Data Policy
                  </a>, including the Limited Use requirements.
                </p>
                <p>
                  Our Chrome Extension only accesses data necessary to provide its linting functionality within the n8n editor. 
                  We do not share your Google user data with any third-party tools or AI models.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You have the right to access, correct, or delete personal data we hold. Since we collect minimal personal data, 
                  most "deletion" is achieved simply by uninstalling our App/Extension.
                </p>
                <p>
                  For specific requests, please contact us via our <a href="/support" className="text-primary hover:underline">Support Center</a> or 
                  email us directly at <strong>ylohnitram@gmail.com</strong>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this policy. Significant changes will be communicated via our website or GitHub releases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;