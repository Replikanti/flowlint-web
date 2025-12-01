import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Code2, Terminal } from "lucide-react";

const Cli = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              FlowLint CLI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Local static analysis tool for n8n workflows. Validate your workflows before pushing to GitHub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="https://www.npmjs.com/package/flowlint" target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 mr-2" />
                  Install from npm
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/Replikanti/flowlint-examples" target="_blank" rel="noopener noreferrer">
                  <Code2 className="w-4 h-4 mr-2" />
                  View Examples
                </a>
              </Button>
            </div>
          </div>

          {/* Installation Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Get started with the FlowLint CLI tool</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Using npm
                </h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>npm install -g flowlint</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Node.js 22 or higher</li>
                  <li>npm, yarn, or pnpm</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>Basic commands to get started</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Scan workflows in current directory</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Scan specific directory</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan ./workflows</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Output as JSON (for CI/CD)</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan --format json --out-file report.json</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Fail on errors (for CI pipelines)</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan --fail-on-error</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Create default config</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint init</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configuration */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
              <CardDescription>Create .flowlint.yml in your project root</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{`files:
  include:
    - "**/*.n8n.json"
    - "**/*.json"
  ignore:
    - "node_modules/**"

rules:
  rate_limit_retry:
    enabled: true
  error_handling:
    enabled: true
  secrets:
    enabled: true
  idempotency:
    enabled: true
  dead_ends:
    enabled: true`}</pre>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="mb-2">Run <code className="bg-slate-100 px-2 py-1 rounded">flowlint init</code> to generate a default configuration file.</p>
              </div>
            </CardContent>
          </Card>

          {/* Output Formats */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Output Formats</CardTitle>
              <CardDescription>Choose how findings are displayed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>Default</Badge>
                  <h3 className="font-semibold">Stylish (Terminal)</h3>
                </div>
                <p className="text-muted-foreground mb-3">Colored terminal output with syntax highlighting</p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan --format stylish</pre>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>CI/CD</Badge>
                  <h3 className="font-semibold">JSON</h3>
                </div>
                <p className="text-muted-foreground mb-3">Structured JSON output for programmatic processing</p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>flowlint scan --format json --out-file report.json</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CI/CD Integration */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>CI/CD Integration</CardTitle>
              <CardDescription>Use FlowLint CLI in your automation pipelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">GitHub Actions</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`- name: Scan workflows with FlowLint
  run: |
    npm install -g flowlint
    flowlint scan --fail-on-error`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">GitLab CI</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`lint:workflows:
  image: node:22
  script:
    - npm install -g flowlint
    - flowlint scan --fail-on-error`}</pre>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Pre-commit Hook</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# .pre-commit-config.yaml
repos:
  - repo: local
    hooks:
      - id: flowlint
        name: FlowLint
        entry: flowlint scan --fail-on-error
        language: system
        files: '\\.(json|yaml|yml)$'
        stages: [commit]`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Local Validation
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Validate workflows before pushing to GitHub. Catch issues early in your development workflow.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Easy Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Works seamlessly in CI/CD pipelines, pre-commit hooks, and local development environments.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurable Rules</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Enable/disable specific rules and customize file patterns in .flowlint.yml configuration.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Choose between human-readable terminal output or structured JSON for programmatic processing.
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle>Ready to get started?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <a href="https://www.npmjs.com/package/flowlint" target="_blank" rel="noopener noreferrer">
                    Install FlowLint CLI
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/doc">View All Rules</a>
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

export default Cli;
