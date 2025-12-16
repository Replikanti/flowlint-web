import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Chrome, 
  Terminal, 
  GitPullRequest, 
  BookOpen, 
  Settings,
  Menu,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Code2,
  LucideIcon
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Mermaid from "@/components/Mermaid";
import ruleExamplesData from "@/data/rule-examples.json";
import { Node } from "unist"; // Import Node from unist

// Interface matching RuleExample from fetch-examples.ts
interface RuleExample {
  id: string;
  name: string;
  severity: "must" | "should" | "nit";
  description: string;
  details: string;
  readme: string;
  good: string;
  bad: string;
}

const ruleExamples = ruleExamplesData as Record<string, RuleExample>;

// Helper function to determine badge variant based on severity
const getSeverityBadgeVariant = (severity: RuleExample['severity']): "destructive" | "secondary" | "outline" => {
  if (severity === "must") return "destructive";
  if (severity === "should") return "secondary";
  return "outline";
};

// Custom code renderer for ReactMarkdown
const CustomCodeBlock = ({
  node,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { node: Node; inline: boolean; className: string; children: React.ReactNode[] }) => {
  const match = /language-(\w+)/.exec(className || '');
  const isMermaid = match?.[1] === 'mermaid';

  if (isMermaid) {
    return <Mermaid chart={String(children).replace(/\n$/, '')} />;
  }

  if (match) {
    return (
      <div className="bg-muted p-4 rounded-md my-4">
        <code className={className} {...props}>
          {children}
        </code>
      </div>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const CodeBlockWithCopy = ({ code, language }: { code: string; language: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group h-full">
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
         <span className="bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Paste into n8n
         </span>
         <Button 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 bg-background/80 backdrop-blur shadow-sm hover:bg-background"
            onClick={handleCopy}
         >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
         </Button>
      </div>
      <SyntaxHighlighter 
          language={language} 
          style={vscDarkPlus} 
          customStyle={{margin: 0, height: '100%', padding: '1.5rem', fontSize: '0.875rem'}}
          showLineNumbers
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

interface NavProps {
  className?: string;
  onSelect?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarItems: { title: string; items: { id: string; label: string; icon: LucideIcon }[] }[];
}

const Nav = ({ className, onSelect, activeSection, setActiveSection, sidebarItems }: NavProps) => {
  return (
    <nav className={cn("space-y-6", className)}>
      {sidebarItems.map((group) => (
        <div key={group.title}>
          <h4 className="font-semibold mb-2 px-2 text-sm text-foreground">{group.title}</h4>
          <div className="space-y-1">
            {group.items.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "secondary" : "ghost"}
                className={cn("w-full justify-start", activeSection === item.id && "font-medium")}
                onClick={() => {
                  setActiveSection(item.id);
                  onSelect?.();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
};

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const sidebarItems = [
    {
      title: "Getting Started",
      items: [
        { id: "overview", label: "Overview", icon: BookOpen },
        { id: "configuration", label: "Configuration", icon: Settings },
      ]
    },
    {
      title: "Platforms",
      items: [
        { id: "chrome", label: "Chrome Extension", icon: Chrome },
        { id: "cli", label: "CLI Tool", icon: Terminal },
        { id: "github", label: "GitHub App", icon: GitPullRequest },
      ]
    }
  ];

  // Dynamically add Rules section if there are rules
  if (Object.keys(ruleExamples).length > 0) {
    sidebarItems.push({
      title: "Reference",
      items: [
        { id: "rules", label: "Rules", icon: ShieldCheck },
      ]
    });
  }

  // Sort rules numerically (R1, R2, ..., R10)
  const implementedRules = Object.values(ruleExamples).sort((a, b) => {
    const numA = Number.parseInt(a.id.slice(1), 10);
    const numB = Number.parseInt(b.id.slice(1), 10);
    return numA - numB;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu className="mr-2 h-4 w-4" />
                  Documentation Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-6">
                <div className="font-bold text-lg mb-6">Documentation</div>
                <Nav activeSection={activeSection} setActiveSection={setActiveSection} sidebarItems={sidebarItems} onSelect={() => {}} />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Nav activeSection={activeSection} setActiveSection={setActiveSection} sidebarItems={sidebarItems} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {activeSection === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-4xl font-bold mb-4">Introduction to FlowLint</h1>
                  <p className="text-lg text-muted-foreground">
                    FlowLint is a static analysis tool designed specifically for n8n workflows. 
                    It helps you catch bugs, security issues, and performance bottlenecks before they reach production.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Detect hardcoded secrets and unsafe configurations automatically.
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-primary" />
                        Reliability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      Ensure retries, error handling, and idempotency are correctly implemented.
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">How it Works</h2>
                  <p className="text-muted-foreground mb-4">
                    FlowLint parses the JSON structure of your n8n workflows and applies a set of rules (R1-R14).
                    You can run it in three ways:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Chrome Extension:</strong> While editing in the browser.</li>
                    <li><strong>CLI:</strong> On your local machine or CI server.</li>
                    <li><strong>GitHub App:</strong> Automatically on every Pull Request.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "configuration" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Configuration</h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Customize FlowLint behavior using a <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">.flowlint.yml</code> file in your project root.
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Example Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
{`version: 1
files:
  include:
    - "**/*.n8n.json"
    - "**/workflows/**/*.json"
  ignore:
    - "node_modules/**"
    - "dist/**"

rules:
  rate_limit_retry:
    enabled: true
  
  # Disable specific rule
  naming_convention:
    enabled: false

  # Customize rule options
  long_running:
    enabled: true
    max_iterations: 5000`}
                    </pre>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Options Reference</h2>
                  <div className="grid gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="font-mono font-bold mb-1">files.include</div>
                      <div className="text-sm text-muted-foreground">List of glob patterns to analyze. Defaults to standard n8n JSON patterns.</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-mono font-bold mb-1">files.ignore</div>
                      <div className="text-sm text-muted-foreground">List of glob patterns to exclude. Supports .gitignore syntax.</div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="font-mono font-bold mb-1">rules</div>
                      <div className="text-sm text-muted-foreground">Object where keys are rule IDs (e.g., rate_limit_retry) and values are configuration objects.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "chrome" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Chrome className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">Chrome Extension</h1>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    Get real-time feedback directly inside the n8n editor interface. Ideally suited for individual developers building workflows.
                  </p>
                  <Button asChild>
                    <a href="https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli" target="_blank" rel="noopener noreferrer">
                      Install from Web Store
                    </a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Features</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                    <li><strong>Real-time Analysis:</strong> Checks your workflow as you modify it.</li>
                    <li><strong>Inline Annotations:</strong> Highlights problematic nodes directly on the canvas.</li>
                    <li><strong>Privacy First:</strong> Analysis happens locally in your browser. No data is sent to our servers.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === "cli" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">CLI Tool</h1>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    Run lint checks from your command line or integrate with any CI/CD provider (GitLab, Jenkins, Azure DevOps).
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                      npm install -g flowlint
                    </pre>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm font-medium">Scan current directory:</p>
                      <pre className="bg-muted p-3 rounded overflow-x-auto text-sm font-mono">flowlint scan .</pre>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Scan specific file:</p>
                      <pre className="bg-muted p-3 rounded overflow-x-auto text-sm font-mono">flowlint scan ./workflows/my-workflow.json</pre>
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-medium">Output JSON format (for tools):</p>
                      <pre className="bg-muted p-3 rounded overflow-x-auto text-sm font-mono">flowlint scan . --format json {'>'} report.json</pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeSection === "github" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <GitPullRequest className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">GitHub App</h1>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    Zero-configuration integration for GitHub repositories. Automatically reviews Pull Requests.
                  </p>
                  <Button asChild>
                    <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                      Install GitHub App
                    </a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">How it Works</h2>
                  <ol className="list-decimal list-inside space-y-4 text-muted-foreground ml-4">
                    <li>
                      <strong>Install:</strong> Add the app to your GitHub organization or account.
                    </li>
                    <li>
                      <strong>Configure:</strong> Optionally add a <code>.flowlint.yml</code> file to the repo.
                    </li>
                    <li>
                      <strong>Open PR:</strong> When you open a Pull Request modifying workflow files, FlowLint runs automatically.
                    </li>
                    <li>
                      <strong>Review:</strong> Results appear in the "Checks" tab and as inline comments on the changed lines.
                    </li>
                  </ol>
                </div>
              </div>
            )}

            {activeSection === "rules" && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div>
                  <h1 className="text-3xl font-bold mb-4">Rules Reference</h1>
                  <p className="text-lg text-muted-foreground mb-6">
                    Detailed documentation for all {implementedRules.length} linting rules.
                  </p>
                </div>

                <div className="space-y-6">
                  {implementedRules.map((rule) => {
                    // rule object now contains both metadata and examples content
                    return (
                      <Card key={rule.name} id={rule.name} className="scroll-mt-24">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <CardTitle className="font-mono text-xl flex items-center gap-2">
                                {rule.name}
                                <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                  {rule.id}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="text-base">{rule.description}</CardDescription>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <Badge variant={getSeverityBadgeVariant(rule.severity)}>
                                {rule.severity}
                              </Badge>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Code2 className="mr-2 h-3.5 w-3.5" />
                                    View Examples
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0 overflow-hidden">
                                  <DialogHeader className="p-6 pb-2">
                                    <DialogTitle className="text-2xl font-mono">{rule.id}: {rule.name}</DialogTitle>
                                  </DialogHeader>
                                  
                                  <Tabs defaultValue="readme" className="flex-1 flex flex-col min-h-0">
                                      <div className="px-6">
                                        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                                          <TabsTrigger 
                                            value="readme" 
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none py-3 px-1"
                                          >
                                            Description
                                          </TabsTrigger>
                                          <TabsTrigger 
                                            value="good" 
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-green-500 text-green-600/80 data-[state=active]:text-green-600 rounded-none py-3 px-1"
                                          >
                                            Valid Example
                                          </TabsTrigger>
                                          <TabsTrigger 
                                            value="bad" 
                                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-red-500 text-red-600/80 data-[state=active]:text-red-600 rounded-none py-3 px-1"
                                          >
                                            Invalid Example
                                          </TabsTrigger>
                                        </TabsList>
                                      </div>
                                      
                                      <div className="flex-1 overflow-y-auto bg-muted/10">
                                        <TabsContent value="readme" className="m-0 p-6">
                                          <div className="prose dark:prose-invert max-w-none prose-sm prose-pre:bg-transparent prose-pre:p-0">
                                            <ReactMarkdown
                                              components={{
                                                code: CustomCodeBlock
                                              }}
                                            >
                                              {rule.readme}
                                            </ReactMarkdown>
                                          </div>
                                        </TabsContent>
                                        <TabsContent value="good" className="m-0 h-full">
                                           <CodeBlockWithCopy code={rule.good} language="json" />
                                        </TabsContent>
                                        <TabsContent value="bad" className="m-0 h-full">
                                           <CodeBlockWithCopy code={rule.bad} language="json" />
                                        </TabsContent>
                                      </div>
                                    </Tabs>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-md">
                            {rule.details}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
