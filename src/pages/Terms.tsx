import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 16, 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  By installing, accessing, or using any part of the FlowLint suite (GitHub App, CLI, Chrome Extension, Web Linter), 
                  you agree to be bound by these Terms of Service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint provides automated static analysis tools for n8n workflows. The service includes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>GitHub App:</strong> Server-side analysis of Pull Requests.</li>
                  <li><strong>CLI Tool:</strong> Local analysis via command line.</li>
                  <li><strong>Chrome Extension:</strong> Browser-based analysis within the n8n editor.</li>
                  <li><strong>Web Linter:</strong> Online analysis tool.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint Core, CLI, and Chrome Extension are open-source software. Your use of the source code is governed 
                  by the applicable open-source license (e.g., MIT) found in the respective repositories.
                </p>
                <p>
                  Usage of the hosted GitHub App and Website is governed by these Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2">
                  <li>You must not use the service to analyze malicious code intended to harm the service.</li>
                  <li>You are responsible for the security of your GitHub credentials and API tokens.</li>
                  <li>You agree not to reverse engineer or attack the hosted infrastructure (GitHub App / Website).</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disclaimer of Warranties</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  THE SERVICE IS PROVIDED "AS IS". FLOWLINT MAKES NO WARRANTIES, EXPRESSED OR IMPLIED, AND HEREBY DISCLAIMS 
                  ALL OTHER WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
                </p>
                <p>
                  We do not warrant that the analysis will be error-free (false positives/negatives may occur) or that the 
                  service will be uninterrupted.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  IN NO EVENT SHALL FLOWLINT BE LIABLE FOR ANY DAMAGES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF 
                  DATA OR PROFIT, OR DUE TO BUSINESS INTERRUPTION) ARISING OUT OF THE USE OR INABILITY TO USE THE SERVICE.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We may terminate or suspend access to our hosted services immediately, without prior notice, for any reason, 
                  including breach of Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  If you have questions about these Terms, please contact us via our <a href="/support" className="text-primary hover:underline">Support Center</a>.
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

export default Terms;