import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Documentation = () => {
  const implementedRules = [
    {
      name: "rate_limit_retry",
      severity: "must",
      description: "Ensures that nodes making external API calls have a retry mechanism configured.",
      details: "Critical for building resilient workflows that can handle transient network issues or temporary service unavailability.",
    },
    {
      name: "error_handling",
      severity: "must",
      description: "Prevents the use of configurations that might hide errors.",
      details: "Workflows should explicitly handle errors rather than ignoring them with continueOnFail: true.",
    },
    {
      name: "secrets",
      severity: "must",
      description: "Detects hardcoded secrets, API keys, or credentials within node parameters.",
      details: "All secrets should be stored securely using credential management systems.",
    },
    {
      name: "idempotency",
      severity: "should",
      description: "Guards against operations that are not idempotent with retries configured.",
      details: "Detects patterns where a webhook trigger could lead to duplicate processing in databases or external services.",
    },
    {
      name: "dead_ends",
      severity: "should",
      description: "Finds nodes or workflow branches not connected to any other node.",
      details: "Indicates incomplete or dead logic that should be reviewed or removed.",
    },
    {
      name: "long_running",
      severity: "should",
      description: "Flags workflows with potential for excessive runtime.",
      details: "Detects loops with high iteration counts or long timeouts that could cause performance issues.",
    },
  ];

  const plannedRules = [
    {
      name: "alert_log_enforcement",
      severity: "should",
      description: "Ensures critical paths include logging or alerting steps.",
      details: "For example, a failed payment processing branch should trigger an alert for monitoring.",
      status: "planned",
    },
    {
      name: "unused_data",
      severity: "nit",
      description: "Detects when node output data is not consumed by subsequent nodes.",
      details: "Identifies unnecessary data processing that could be optimized or removed.",
      status: "planned",
    },
    {
      name: "config_literals",
      severity: "should",
      description: "Flags hardcoded literals (URLs, environment tags, tenant IDs) that should come from configuration.",
      details: "Promotes externalized configuration and prevents hardcoded environment-specific values.",
      status: "planned",
    },
    {
      name: "naming_convention",
      severity: "nit",
      description: "Enforces consistent and descriptive naming for nodes.",
      details: "Improves workflow readability and maintainability (e.g., 'Fetch Customer Data from CRM' vs 'HTTP Request').",
      status: "planned",
    },
    {
      name: "deprecated_nodes",
      severity: "should",
      description: "Warns about deprecated node types and suggests alternatives.",
      details: "Helps maintain workflows using current, supported node implementations.",
      status: "planned",
    },
    {
      name: "unhandled_error_path",
      severity: "must",
      description: "Ensures nodes with error outputs have connected error handling branches.",
      details: "Prevents silent failures by requiring explicit error path handling.",
      status: "planned",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about using FlowLint
            </p>
          </div>

          <Tabs defaultValue="getting-started" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="rules">Rules Reference</TabsTrigger>
            </TabsList>

            <TabsContent value="getting-started" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>Get up and running with FlowLint in minutes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">1. Install the GitHub App</h3>
                    <p className="text-muted-foreground mb-2">
                      Visit the{" "}
                      <a
                        href="https://github.com/apps/flowlint"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        FlowLint GitHub App
                      </a>{" "}
                      page and click "Install". Select the repositories you want to analyze.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">2. Create a Pull Request</h3>
                    <p className="text-muted-foreground mb-2">
                      Make changes to any workflow files (*.n8n.json or workflow JSON files) and create a pull request.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">3. Review Check Results</h3>
                    <p className="text-muted-foreground mb-2">
                      FlowLint will automatically run and post a Check Run with detailed findings and inline annotations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What Files Does FlowLint Analyze?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    By default, FlowLint analyzes the following file patterns:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>**/*.n8n.json</li>
                    <li>**/workflows/**/*.json</li>
                    <li>**/*.yaml (workflow definitions)</li>
                    <li>**/*.json (workflow files)</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    You can customize which files are included or ignored using a .flowlint.yml configuration file.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration File</CardTitle>
                  <CardDescription>Customize FlowLint behavior with .flowlint.yml</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Create a <code className="bg-muted px-2 py-1 rounded">.flowlint.yml</code> file in your repository root to configure FlowLint:
                  </p>
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
{`version: 1
files:
  include:
    - "**/*.n8n.json"
    - "**/workflows/**/*.json"
  ignore:
    - "samples/**"
    - "**/*.spec.json"
    - "node_modules/**"

report:
  annotations: true
  summary_limit: 25

rules:
  rate_limit_retry:
    enabled: true
    max_concurrency: 5
  error_handling:
    enabled: true
    forbid_continue_on_fail: true
  secrets:
    enabled: true
  idempotency:
    enabled: true
  dead_ends:
    enabled: true
  long_running:
    enabled: true
    max_iterations: 1000
    timeout_ms: 300000`}
                  </pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configuration Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">files.include</h3>
                    <p className="text-muted-foreground">
                      Array of glob patterns for files to analyze
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">files.ignore</h3>
                    <p className="text-muted-foreground">
                      Array of glob patterns for files to exclude from analysis
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">report.annotations</h3>
                    <p className="text-muted-foreground">
                      Enable or disable inline annotations in pull requests
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">rules</h3>
                    <p className="text-muted-foreground">
                      Configure individual rules. Each rule can be enabled/disabled and may have additional options.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rules" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Implemented Rules</CardTitle>
                  <CardDescription>Currently active rules in production</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {implementedRules.map((rule) => (
                      <div key={rule.name} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-mono font-semibold">{rule.name}</h3>
                          <Badge variant={rule.severity === "must" ? "destructive" : "secondary"}>
                            {rule.severity}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-2">{rule.description}</p>
                        <p className="text-sm text-muted-foreground italic">{rule.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Planned Rules</CardTitle>
                  <CardDescription>Rules in development for future releases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {plannedRules.map((rule) => (
                      <div key={rule.name} className="border-b border-border pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-mono font-semibold">{rule.name}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">Planned</Badge>
                            <Badge variant={rule.severity === "must" ? "destructive" : rule.severity === "should" ? "secondary" : "outline"}>
                              {rule.severity}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-2">{rule.description}</p>
                        <p className="text-sm text-muted-foreground italic">{rule.details}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rule Severity Levels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="destructive">must</Badge>
                        <span className="font-semibold">Critical Issues</span>
                      </div>
                      <p className="text-muted-foreground">
                        Blocks PR merge. These issues must be fixed before deployment.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">should</Badge>
                        <span className="font-semibold">Warnings</span>
                      </div>
                      <p className="text-muted-foreground">
                        Recommended improvements. Does not block PR merge but should be addressed.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">nit</Badge>
                        <span className="font-semibold">Minor Issues</span>
                      </div>
                      <p className="text-muted-foreground">
                        Style and readability suggestions. Optional improvements for code quality.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;
