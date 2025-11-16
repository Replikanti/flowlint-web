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
            <p className="text-muted-foreground">Last updated: November 16, 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
                  how we collect, use, and safeguard information when you use our GitHub App.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">GitHub Repository Data</h3>
                  <p>
                    When you install FlowLint, we access workflow files (*.n8n.json and similar) from your repositories 
                    to perform static analysis. We only read files necessary for analysis and do not store repository 
                    contents permanently.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">GitHub Metadata</h3>
                  <p>
                    We collect pull request metadata, including PR numbers, commit SHAs, and repository names to 
                    provide check run results.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <p>
                    We collect anonymous usage statistics, including the number of analyses performed and rule 
                    violations detected, to improve our service.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2">
                  <li>To analyze workflow files and identify potential issues</li>
                  <li>To provide check run results and annotations on pull requests</li>
                  <li>To improve FlowLint's accuracy and performance</li>
                  <li>To communicate with you about service updates or issues</li>
                  <li>To ensure security and prevent abuse</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Storage and Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We implement appropriate technical and organizational measures to protect your data:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Workflow files are analyzed in memory and not permanently stored</li>
                  <li>GitHub tokens are encrypted and never logged</li>
                  <li>All communications use HTTPS encryption</li>
                  <li>Access to systems is restricted and monitored</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We retain minimal data necessary for service operation:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Analysis results: 90 days</li>
                  <li>Usage statistics: Indefinitely (anonymized)</li>
                  <li>Support requests: Until resolved</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Third-Party Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint integrates with GitHub and may use other third-party services for infrastructure. 
                  These services have their own privacy policies:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" className="text-primary hover:underline">Privacy Statement</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Access the data we have about you</li>
                  <li>Request deletion of your data</li>
                  <li>Uninstall the GitHub App at any time</li>
                  <li>Object to data processing</li>
                </ul>
                <p>
                  To exercise these rights, please contact us through our{" "}
                  <a href="/support" className="text-primary hover:underline">support page</a>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of significant changes 
                  by posting a notice on our website or through GitHub.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or our data practices, please use our{" "}
                  <a href="/support" className="text-primary hover:underline">support form</a> to reach out to us.
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
