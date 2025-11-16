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
            <p className="text-muted-foreground">Last updated: November 16, 2025</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Agreement to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  By installing and using FlowLint, you agree to be bound by these Terms of Service ("Terms"). 
                  If you do not agree to these Terms, do not install or use FlowLint.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Description of Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint is a GitHub App that provides automated static analysis for workflow files in pull requests. 
                  The service analyzes workflow files, applies configurable rules, and provides feedback through 
                  GitHub Check Runs with annotations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>When using FlowLint, you agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Use the service only for legitimate purposes</li>
                  <li>Not attempt to reverse engineer, decompile, or hack the service</li>
                  <li>Not use the service to analyze malicious or harmful code</li>
                  <li>Maintain the security of your GitHub account</li>
                  <li>Not abuse, harass, or spam our support channels</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub App Permissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint requires the following GitHub permissions to function:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Read access to metadata:</strong> To identify repository and PR information</li>
                  <li><strong>Read access to pull requests:</strong> To detect PR events and file changes</li>
                  <li><strong>Read access to contents:</strong> To access workflow files for analysis</li>
                  <li><strong>Write access to checks:</strong> To create Check Runs with findings</li>
                </ul>
                <p className="mt-4">
                  FlowLint does not request permissions to write to repository contents, create commits, or access 
                  other sensitive data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We strive to maintain high availability but do not guarantee uninterrupted service. FlowLint may 
                  experience downtime for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Scheduled maintenance</li>
                  <li>Emergency repairs</li>
                  <li>Third-party service outages (GitHub, infrastructure providers)</li>
                  <li>Force majeure events</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy of Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  While we work to ensure accuracy, FlowLint's analysis may produce false positives or miss certain 
                  issues. The service is provided as-is and should be used as one part of your quality assurance 
                  process, not as the sole method of validation.
                </p>
                <p>
                  You are responsible for reviewing and validating all findings before taking action.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intellectual Property</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  FlowLint and its original content, features, and functionality are owned by us and are protected 
                  by international copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  Your workflow files remain your property. We claim no ownership over your code or data.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  To the maximum extent permitted by law, FlowLint shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Your use or inability to use the service</li>
                  <li>False positives or false negatives in analysis</li>
                  <li>Loss of data or business</li>
                  <li>Security breaches not caused by our negligence</li>
                  <li>Third-party actions or services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Termination</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  You may terminate your use of FlowLint at any time by uninstalling the GitHub App. We may suspend 
                  or terminate your access if:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>You violate these Terms</li>
                  <li>You abuse the service or support channels</li>
                  <li>We detect fraudulent or malicious activity</li>
                  <li>Required by law or legal process</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to Terms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                  through our website or GitHub. Continued use of FlowLint after changes constitutes acceptance of 
                  the new Terms.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Governing Law</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard 
                  to conflict of law provisions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Questions?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  For questions or concerns about these Terms of Service, please contact us through our{" "}
                  <a href="/support" className="text-primary hover:underline">support form</a>.
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
