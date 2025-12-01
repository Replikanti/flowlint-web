import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap, Code2, GitPullRequest } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Automated Security Checks",
      description: "Detects hardcoded secrets, API keys, and credentials in your workflow files before they reach production.",
    },
    {
      icon: Zap,
      title: "Performance Analysis",
      description: "Identifies long-running workflows, inefficient loops, and potential timeout issues.",
    },
    {
      icon: AlertTriangle,
      title: "Error Handling",
      description: "Ensures proper retry mechanisms, rate limiting, and idempotent operations for resilient workflows.",
    },
    {
      icon: Code2,
      title: "Configurable Rules",
      description: "Customize rule severity and suppression via .flowlint.yml to match your team's needs.",
    },
    {
      icon: GitPullRequest,
      title: "PR Integration",
      description: "Automatic checks on every pull request with inline annotations pointing to specific issues.",
    },
    {
      icon: CheckCircle2,
      title: "Zero Configuration",
      description: "Install the GitHub App and start getting automated reviews immediately—no setup required.",
    },
  ];

  const rules = [
    { name: "rate_limit_retry", severity: "must", description: "Ensures external API calls have retry mechanisms" },
    { name: "error_handling", severity: "must", description: "Prevents configurations that hide errors" },
    { name: "secrets", severity: "must", description: "Detects hardcoded credentials and API keys" },
    { name: "idempotency", severity: "should", description: "Guards against non-idempotent operations with retries" },
    { name: "dead_ends", severity: "should", description: "Finds disconnected nodes and incomplete logic" },
    { name: "long_running", severity: "should", description: "Flags workflows with excessive runtime potential" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-10" />
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8">
              <Badge variant="secondary" className="mb-4">
                Automated Static Analysis for n8n Workflows
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Automated Static Analysis
                <br />
                <span className="text-primary">for n8n Workflows</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                FlowLint reviews your pull requests, applies configurable lint rules, and provides detailed annotations 
                to catch automation bugs before deployment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild className="shadow-[var(--shadow-glow)]">
                  <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                    Install GitHub App
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/cli">Try CLI</a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Both integrate seamlessly with your workflow
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why FlowLint?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive analysis powered by battle-tested rules designed for production workflows
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border hover:shadow-[var(--shadow-md)] transition-shadow">
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

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Seamless integration with your existing GitHub workflow
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting lines for desktop */}
              <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-border -z-10" />
              
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-[var(--shadow-glow)]">
                  1
                </div>
                <h3 className="text-xl font-semibold text-foreground">Install & Connect</h3>
                <p className="text-muted-foreground">
                  Install the FlowLint GitHub App on your repositories containing n8n workflows
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-[var(--shadow-glow)]">
                  2
                </div>
                <h3 className="text-xl font-semibold text-foreground">Automatic Analysis</h3>
                <p className="text-muted-foreground">
                  FlowLint automatically reviews PRs, parsing workflow files and applying lint rules
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-[var(--shadow-glow)]">
                  3
                </div>
                <h3 className="text-xl font-semibold text-foreground">Get Feedback</h3>
                <p className="text-muted-foreground">
                  Review detailed check runs with inline annotations highlighting specific issues
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rules */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Built-in Rules
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Production-ready rules covering security, performance, and reliability
              </p>
            </div>
            <div className="space-y-4">
              {rules.map((rule) => (
                <Card key={rule.name} className="border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-mono">{rule.name}</CardTitle>
                      <Badge variant={rule.severity === "must" ? "destructive" : "secondary"}>
                        {rule.severity}
                      </Badge>
                    </div>
                    <CardDescription className="text-base">{rule.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <Card className="bg-primary text-primary-foreground border-0 shadow-[var(--shadow-glow)]">
              <CardHeader className="text-center space-y-4 pb-8">
                <CardTitle className="text-3xl sm:text-4xl font-bold">
                  Ready to Improve Your Workflows?
                </CardTitle>
                <CardDescription className="text-primary-foreground/90 text-lg">
                  Start catching bugs before they reach production. Install FlowLint in minutes.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button size="lg" variant="secondary" asChild className="shadow-[var(--shadow-md)]">
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

export default Home;
