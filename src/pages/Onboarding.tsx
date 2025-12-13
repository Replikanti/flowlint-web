import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Chrome, Terminal, GitPullRequest, ArrowRight, Globe } from "lucide-react";

const Onboarding = () => {
  const products = [
    {
      title: "Chrome Extension",
      icon: Chrome,
      description: "Best for individual developers. Get real-time feedback directly inside the n8n editor as you build.",
      benefits: ["Real-time analysis", "No setup required", "Works offline", "Privacy-first"],
      action: {
        label: "Add to Chrome",
        href: "https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli",
        external: true
      },
      recommended: true
    },
    {
      title: "CLI Tool",
      icon: Terminal,
      description: "Best for power users and CI/CD pipelines. Run checks locally or integrate into GitLab/Jenkins.",
      benefits: ["Local scanning", "CI/CD integration", "JSON/SARIF output", "Scriptable"],
      action: {
        label: "View Documentation",
        href: "/cli",
        external: false
      }
    },
    {
      title: "GitHub App",
      icon: GitPullRequest,
      description: "Best for teams using GitHub. Automatically review every Pull Request and block bad merges.",
      benefits: ["Automated PR reviews", "Zero config", "Inline annotations", "Branch protection"],
      action: {
        label: "Install App",
        href: "https://github.com/apps/flowlint",
        external: true
      }
    },
    {
      title: "Web Validator",
      icon: Globe,
      description: "Quick online check. Paste your workflow JSON to validate instantly without installation.",
      benefits: ["Instant check", "No installation", "Share results"],
      badge: "Coming Soon",
      action: {
        label: "Check Roadmap",
        href: "/roadmap", 
        external: false,
        disabled: false // Let them click to see roadmap
      }
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get Started with FlowLint</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the integration that fits your workflow. You can use multiple tools together for full coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {products.map((product) => (
                <Card key={product.title} className={`flex flex-col relative ${product.recommended ? 'border-primary ring-1 ring-primary/20 shadow-lg' : ''}`}>
                   {product.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                         <Badge>Recommended Start</Badge>
                      </div>
                   )}
                   <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                         <div className="p-2 bg-muted rounded-md">
                            <product.icon className="h-6 w-6 text-primary" />
                         </div>
                         <CardTitle className="text-2xl">{product.title}</CardTitle>
                         {product.badge && <Badge variant="secondary">{product.badge}</Badge>}
                      </div>
                      <CardDescription className="text-base">
                         {product.description}
                      </CardDescription>
                   </CardHeader>
                   <CardContent className="flex-1">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                         {product.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2">
                               <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                               {benefit}
                            </li>
                         ))}
                      </ul>
                   </CardContent>
                   <CardFooter>
                      <Button className="w-full" variant={product.recommended ? "default" : "outline"} asChild>
                         {product.action.external ? (
                            <a href={product.action.href} target="_blank" rel="noopener noreferrer">
                               {product.action.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                         ) : (
                            <Link to={product.action.href}>
                               {product.action.label} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                         )}
                      </Button>
                   </CardFooter>
                </Card>
             ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Onboarding;