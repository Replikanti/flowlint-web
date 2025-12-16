import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GitPullRequest, CheckCircle2, ShieldCheck, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const GitHubApp = () => {
  const features = [
    {
      icon: GitPullRequest,
      title: "Automated PR Reviews",
      description: "Automatically scans every pull request that modifies workflow files. No manual trigger needed.",
    },
    {
      icon: CheckCircle2,
      title: "Zero Configuration",
      description: "Works out of the box with sensible defaults. Install the app, and you're ready to go.",
    },
    {
      icon: Code2,
      title: "Inline Annotations",
      description: "Findings are posted directly on the changed lines of code, making it easy to identify and fix issues.",
    },
    {
      icon: ShieldCheck,
      title: "Security First",
      description: "Detects hardcoded secrets and credentials before they are merged into your main branch.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
              For Teams & Organizations
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Automated Code Reviews <br/>
              <span className="text-primary">for n8n Workflows</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
              Ensure quality and security in your automation pipeline. The FlowLint GitHub App 
              reviews your Pull Requests automatically, blocking bugs before they reach production.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button size="lg" asChild className="h-12 px-8 text-lg shadow-[var(--shadow-glow)]">
                  <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                    <GitPullRequest className="mr-2 h-5 w-5" />
                    Install GitHub App
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8 text-lg">
                  <Link to="/doc">
                    Read Documentation
                  </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Seamless integration into your existing development workflow.
              </p>
            </div>

            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">1</div>
                  <h3 className="text-2xl font-bold">Open a Pull Request</h3>
                  <p className="text-muted-foreground text-lg">
                    When a developer creates a PR that modifies `*.n8n.json` files, FlowLint is automatically triggered via webhook.
                  </p>
                </div>
                <div className="flex-1 p-6 bg-background border rounded-xl shadow-sm">
                  {/* Placeholder for illustration */}
                  <div className="aspect-video bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
                    PR Screenshot Placeholder
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">2</div>
                  <h3 className="text-2xl font-bold">Analysis & Feedback</h3>
                  <p className="text-muted-foreground text-lg">
                    The app parses the workflow, runs configured rules, and posts a Check Run. Violations appear as annotations on specific lines of code.
                  </p>
                </div>
                <div className="flex-1 p-6 bg-background border rounded-xl shadow-sm">
                  {/* Placeholder for illustration */}
                  <div className="aspect-video bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
                    Check Run Screenshot Placeholder
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">3</div>
                  <h3 className="text-2xl font-bold">Merge with Confidence</h3>
                  <p className="text-muted-foreground text-lg">
                    Once all checks pass, you can merge the PR knowing your workflow is secure, performant, and follows best practices.
                  </p>
                </div>
                <div className="flex-1 p-6 bg-background border rounded-xl shadow-sm">
                  {/* Placeholder for illustration */}
                  <div className="aspect-video bg-muted/50 rounded flex items-center justify-center text-muted-foreground">
                    Merge Button Screenshot Placeholder
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-primary text-primary-foreground border-0 shadow-[var(--shadow-glow)]">
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl sm:text-4xl font-bold">
                  Ready to automate your reviews?
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 text-lg">
                  Install FlowLint on your repository today. It's free for open source.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button size="lg" variant="secondary" asChild className="shadow-[var(--shadow-md)] h-12 px-8 text-lg">
                  <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                    Install GitHub App
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GitHubApp;
