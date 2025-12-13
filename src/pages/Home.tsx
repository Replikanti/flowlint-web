import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, ShieldCheck, Zap, Code2, GitPullRequest, Chrome, Terminal, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const products = [
    {
      title: "Chrome Extension",
      icon: Chrome,
      description: "Real-time feedback directly inside the n8n editor. Catch errors as you build without leaving your browser.",
      link: "https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli",
      cta: "Add to Chrome",
      external: true,
      variant: "default" as const
    },
    {
      title: "GitHub App",
      icon: GitPullRequest,
      description: "Automated code reviews for your PRs. Block bad workflows from merging into production.",
      link: "/github-app",
      cta: "Learn More",
      external: false,
      variant: "default" as const
    },
    {
      title: "CLI Tool",
      icon: Terminal,
      description: "Run checks locally during development or integrate into any CI/CD pipeline (GitLab, Jenkins, Azure).",
      link: "/cli",
      cta: "Get Started",
      external: false,
      variant: "outline" as const
    },
    {
      title: "Web Validator",
      icon: Globe,
      description: "Quick online checker. Copy & paste your workflow JSON to validate instantly without installation.",
      link: "/roadmap", // Linking to roadmap as it is in progress
      cta: "Coming Soon",
      external: false,
      variant: "secondary" as const
    }
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Automated Security Checks",
      description: "Detects hardcoded secrets, API keys, and credentials before deployment.",
    },
    {
      icon: Zap,
      title: "Performance Analysis",
      description: "Identifies long-running workflows, inefficient loops, and timeout risks.",
    },
    {
      icon: AlertTriangle,
      title: "Error Handling",
      description: "Ensures proper retry mechanisms and error paths for resilient automation.",
    },
    {
      icon: Code2,
      title: "Configurable Rules",
      description: "Customize rule severity (error, warning, off) to match your team's standards.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[var(--gradient-hero)] -z-10" />
          <div className="container mx-auto max-w-6xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium rounded-full">
              The Ultimate Quality Suite for n8n
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-8">
              Ensure <span className="text-primary">Reliable</span> n8n Workflows
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              FlowLint provides a complete ecosystem of tools to lint, secure, and optimize your automation. 
              From the browser to the CI pipeline.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
               <Button size="lg" asChild className="h-12 px-8 text-lg shadow-[var(--shadow-glow)]">
                  <Link to="/get-started">
                    Get Started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="h-12 px-8 text-lg">
                  <Link to="/doc">
                    Read Documentation
                  </Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">One Standard, Multiple Platforms</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Whether you are building, reviewing, or deploying, FlowLint meets you where you are.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.title} className="flex flex-col border-border hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <product.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-base leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button variant={product.variant} className="w-full" asChild>
                      {product.external ? (
                        <a href={product.link} target="_blank" rel="noopener noreferrer">
                          {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      ) : (
                        <Link to={product.link}>
                          {product.cta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Production-Grade Validation
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Stop worrying about silent failures or security leaks. FlowLint applies static analysis rules designed by n8n experts.
                </p>
                <div className="grid gap-6">
                  {features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                       <div className="flex-shrink-0 mt-1">
                          <feature.icon className="h-6 w-6 text-primary" />
                       </div>
                       <div>
                          <h3 className="font-semibold text-foreground">{feature.title}</h3>
                          <p className="text-muted-foreground text-sm">{feature.description}</p>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-card/50">
                 {/* Placeholder for a code snippet or UI screenshot showing a finding */}
                 <div className="p-8 font-mono text-sm">
                    <div className="text-red-600 dark:text-red-400 mb-2">Error: R14 [Must Fix]</div>
                    <div className="text-foreground mb-4">HTTP Request node &quot;Stripe API&quot; has retryOnFail enabled but ignores Retry-After headers.</div>
                    
                    <div className="pl-4 border-l-2 border-red-500/50 text-muted-foreground">
                       <div>&quot;parameters&quot;: &#123;</div>
                       <div className="text-amber-600 dark:text-amber-400">  &quot;retryOnFail&quot;: true,</div>
                       <div>  &quot;url&quot;: &quot;https://api.stripe.com...&quot;</div>
                       <div>&#125;</div>
                    </div>
                    <div className="mt-4 text-green-600 dark:text-green-400 flex items-center gap-2">
                       <CheckCircle2 className="h-4 w-4" />
                       <span>Recommendation: Enable "Respect Retry-After Header"</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Open Source Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-zinc-900 to-zinc-950 text-white">
          <div className="container mx-auto max-w-5xl text-center">
             <h2 className="text-3xl font-bold mb-4">Proudly Open Source</h2>
             <p className="text-zinc-400 max-w-2xl mx-auto mb-8">
                We believe in transparency and community. FlowLint is open source, allowing you to audit the rules, contribute improvements, or self-host.
             </p>
             <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                   <a href="https://github.com/Replikanti/flowlint/tree/main/flowlint-core" target="_blank" rel="noopener noreferrer">
                      <Code2 className="mr-2 h-4 w-4" />
                      Core Engine
                   </a>
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                   <a href="https://github.com/Replikanti/flowlint/tree/main/flowlint-cli" target="_blank" rel="noopener noreferrer">
                      <Terminal className="mr-2 h-4 w-4" />
                      CLI Tool
                   </a>
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                   <a href="https://github.com/Replikanti/flowlint/tree/main/flowlint-chrome" target="_blank" rel="noopener noreferrer">
                      <Chrome className="mr-2 h-4 w-4" />
                      Chrome Ext
                   </a>
                </Button>
                <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
                   <a href="https://github.com/Replikanti/flowlint/tree/main/flowlint-github-app" target="_blank" rel="noopener noreferrer">
                      <GitPullRequest className="mr-2 h-4 w-4" />
                      GitHub App
                   </a>
                </Button>
             </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Home;