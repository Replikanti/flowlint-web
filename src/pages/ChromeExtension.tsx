import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Chrome, Zap, ShieldCheck, Wifi, Settings, Lock } from "lucide-react";

const ChromeExtension = () => {
  const CHROME_STORE_URL = "https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              FlowLint Chrome Extension
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Real-time static analysis for n8n workflows. Audit your workflows directly in the n8n editor with instant feedback.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
                <img
                  src="/chrome-web-store-badge-official.png"
                  alt="Available in the Chrome Web Store"
                  className="h-[58px] w-auto"
                />
              </a>
              <Button size="lg" variant="outline" asChild>
                <a href="/doc">View All Rules</a>
              </Button>
            </div>
          </div>

          {/* Installation Instructions */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Get started with the Chrome extension in seconds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Chrome className="w-5 h-5" />
                  Install from Chrome Web Store
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Click the "Available in the Chrome Web Store" badge above</li>
                  <li>Click "Add to Chrome" button in the Chrome Web Store</li>
                  <li>Confirm the installation when prompted</li>
                  <li>Navigate to your n8n instance and start analyzing workflows</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Google Chrome, Microsoft Edge, or any Chromium-based browser</li>
                  <li>Access to an n8n instance (cloud or self-hosted)</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Real-time Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Get instant feedback as you build workflows. FlowLint analyzes your workflow in real-time and highlights issues immediately.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Inline Annotations
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Issues are displayed directly in the n8n editor with clear descriptions and severity levels.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="w-5 h-5" />
                  Offline Capable
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Works entirely in your browser. No data is sent to external servers, ensuring your workflows stay private.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Zero Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Start analyzing workflows immediately after installation. No API keys, no setup, no configuration needed.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Privacy-First
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                All analysis happens locally in your browser. Your workflow data never leaves your machine.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Same Rules as GitHub App</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Uses the same battle-tested rules as the FlowLint GitHub App and CLI for consistent analysis.
              </CardContent>
            </Card>
          </div>

          {/* Screenshots Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>See It In Action</CardTitle>
              <CardDescription>FlowLint integrates seamlessly with the n8n editor</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <img
                  src="/chrome-ext-screenshot-1.png"
                  alt="FlowLint Chrome Extension - Workflow Analysis"
                  className="rounded-lg border border-border w-full h-auto"
                />
                <img
                  src="/chrome-ext-screenshot-2.png"
                  alt="FlowLint Chrome Extension - Finding Details"
                  className="rounded-lg border border-border w-full h-auto"
                />
                <img
                  src="/chrome-ext-screenshot-3.png"
                  alt="FlowLint Chrome Extension - Inline Annotations"
                  className="rounded-lg border border-border w-full h-auto"
                />
                <img
                  src="/chrome-ext-screenshot-4.png"
                  alt="FlowLint Chrome Extension - n8n Editor Integration"
                  className="rounded-lg border border-border w-full h-auto"
                />
              </div>
            </CardContent>
          </Card>

          {/* How to Use */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
              <CardDescription>Start analyzing your workflows in three simple steps</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Step 1</Badge>
                  <h3 className="font-semibold">Open n8n Workflow</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  Navigate to any workflow in your n8n instance (cloud or self-hosted).
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Step 2</Badge>
                  <h3 className="font-semibold">Click Extension Icon</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  Click the FlowLint extension icon in your browser toolbar to open the analysis panel.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Step 3</Badge>
                  <h3 className="font-semibold">Review Findings</h3>
                </div>
                <p className="text-muted-foreground ml-16">
                  Review the findings, click on any issue to see details, and fix problems before deployment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle>Ready to start analyzing workflows?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a href={CHROME_STORE_URL} target="_blank" rel="noopener noreferrer">
                  <img
                    src="/chrome-web-store-badge-official.png"
                    alt="Available in the Chrome Web Store"
                    className="h-[58px] w-auto"
                  />
                </a>
                <Button variant="outline" size="lg" asChild>
                  <a href="/">Learn About FlowLint</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChromeExtension;
