import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertTriangle, CheckCircle2, DownloadCloud, GitCommit, ServerCog, Workflow } from "lucide-react";

const prerequisites = [
  {
    title: "Install the GitHub App",
    description: "Grant FlowLint read-only access plus Checks write permission so it can publish annotations.",
    action: {
      label: "Install FlowLint",
      href: "https://github.com/apps/flowlint",
    },
  },
  {
    title: "Runtime & Tooling",
    description: "Node.js 22+, pnpm/npm, Docker 24+, and gh-cli (optional) for local signing/webhook testing.",
  },
  {
    title: "Supporting Services",
    description: "Redis 7.2+ (BullMQ queue) and Postgres (optional). Provide REDIS_URL/DATABASE_URL in .env.",
  },
  {
    title: "Secrets & Config",
    description: "Populate .env with PORT, WEBHOOK_SECRET, APP_ID, APP_PRIVATE_KEY_PEM_BASE64, CHECK_NAME/TITLE.",
  },
];

const bringUpSteps = [
  {
    title: "Clone & configure environment",
    content: `cp .env.example .env
openssl base64 -A -in flowlint-app.private-key.pem >> .env # APP_PRIVATE_KEY_PEM_BASE64
export WEBHOOK_SECRET=<random_hex>`,
  },
  {
    title: "Start the stack",
    content: `docker compose -f infra/docker-compose.dev.yml up --build
# or production
docker compose -f infra/docker-compose.prod.yml up -d`,
  },
  {
    title: "Verify health",
    content: `curl -I http://localhost:8080/health
redis-cli -u $REDIS_URL ping
gh api /app --jq '.name'`,
  },
];

const firstRunChecklist = [
  {
    title: "Trigger a PR",
    description: "Commit a workflow (*.n8n.json) change, push a branch, and open a pull request.",
    icon: GitCommit,
  },
  {
    title: "Confirm webhook delivery",
    description: "Check GitHub App → Advanced → Recent Deliveries for 200 responses. Re-deliver if needed.",
    icon: DownloadCloud,
  },
  {
    title: "Watch the worker logs",
    description: "Redis queue jobs labeled review#... should move to completed. Inspect BullMQ dashboard or worker logs.",
    icon: ServerCog,
  },
  {
    title: "Review the Check Run",
    description: "Open the PR → Checks tab → FlowLint to see summary + annotations (max 50 per run).",
    icon: Workflow,
  },
];

const findingStates: Array<{
  title: string;
  status: string;
  detail: string;
  badge: NonNullable<BadgeProps["variant"]>;
}> = [
  {
    title: "All clear",
    status: "Check conclusion = neutral",
    detail: "No matching files or only nit-level issues. Merge is unblocked.",
    badge: "default",
  },
  {
    title: "Warnings",
    status: "Check conclusion = neutral",
    detail: "Rules severity 'should' triggered. Merge allowed but follow-up recommended.",
    badge: "secondary",
  },
  {
    title: "Must-fix",
    status: "Check conclusion = failure",
    detail: "At least one 'must' finding (e.g., retry missing, continueOnFail). Requires remediation before merge.",
    badge: "destructive",
  },
];

const parseFetchTable = [
  {
    rule: "PARSE",
    symptom: "FlowLint Check Run shows `PARSE` finding for a workflow.",
    causes: "Malformed JSON/YAML, binary files committed, or workflow exported with unsupported editor version.",
    fixes: [
      "Open the workflow in n8n, re-export as JSON, and ensure the file is UTF-8 text.",
      "Validate locally: `jq . path/to/workflow.n8n.json` or `npx @flowlint/cli validate <file>`.",
      "If YAML, run `yamllint` and remove comments that break parser.",
    ],
  },
  {
    rule: "FETCH",
    symptom: "Check Run reports it cannot fetch a file at the PR head SHA.",
    causes: "Workflow deleted/renamed mid-PR, sparse checkout, or branch force-pushed while job queued.",
    fixes: [
      "Make sure the file exists at the head commit referenced in the Check Run.",
      "Re-open the PR or push an empty commit so GitHub sends a new synchronize webhook.",
      "If file should be ignored, add it to `.flowlint.yml -> files.ignore`.",
    ],
  },
];

const rolloutChecks = [
  "Enable the app for each repository/team workspace that stores workflows.",
  "Define ownership: add CODEOWNERS + assign FlowLint Check as required status in branch protection.",
  "Customize `.flowlint.yml` per team (severity, ignores) using the Config Cheat Sheet.",
  "Share the troubleshooting matrix below so developers can self-serve fixes.",
  "Add FlowLint to release checklist and incident playbooks.",
];

const Onboarding = () => (
  <div className="min-h-screen flex flex-col bg-background">
    <Header />

    <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="outline">Docs / Onboarding</Badge>
          <h1 className="text-4xl font-bold text-foreground">FlowLint Onboarding Checklist</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bring up the FlowLint stack, run your first workflow review, and understand how to respond to findings without digging into
            the backend repository.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                Install GitHub App
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/docs/config">Open Config Cheat Sheet</Link>
            </Button>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          {prerequisites.map((item) => (
            <Card key={item.title} className="h-full">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              {item.action && (
                <CardContent>
                  <Button asChild variant="link" className="px-0">
                    <a href={item.action.href} target="_blank" rel="noopener noreferrer">
                      {item.action.label}
                    </a>
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground">Stack Bring-up</h2>
            <p className="text-muted-foreground">Use Docker Compose recipes from the backend repo for dev/prod parity.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {bringUpSteps.map((step) => (
              <Card key={step.title} className="h-full">
                <CardHeader>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted rounded-lg p-4 text-xs whitespace-pre-wrap">{step.content}</pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground">First Check Run</h2>
            <p className="text-muted-foreground">Walk through the exact steps engineers follow when opening their first PR.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {firstRunChecklist.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader className="flex flex-row items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground">Interpret Findings</h2>
            <p className="text-muted-foreground">Translate Check Run states plus FlowLint rule severities into next actions.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {findingStates.map((state) => (
              <Card key={state.title}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{state.title}</CardTitle>
                      <Badge variant={state.badge}>{state.status}</Badge>
                    </div>
                    <CardDescription>{state.detail}</CardDescription>
                  </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="border-dashed">
            <CardHeader className="space-y-2">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle size={20} />
                <CardTitle>PARSE / FETCH Troubleshooting</CardTitle>
              </div>
              <CardDescription>Most onboarding hiccups fall into parser or fetch failures. Share this table with every team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Finding</TableHead>
                    <TableHead>Symptoms</TableHead>
                    <TableHead>Likely Causes</TableHead>
                    <TableHead>Fixes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parseFetchTable.map((row) => (
                    <TableRow key={row.rule}>
                      <TableCell className="font-mono font-semibold">{row.rule}</TableCell>
                      <TableCell>{row.symptom}</TableCell>
                      <TableCell>{row.causes}</TableCell>
                      <TableCell>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                          {row.fixes.map((fix) => (
                            <li key={fix}>{fix}</li>
                          ))}
                        </ul>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-sm text-muted-foreground">
                Still blocked? Capture the Check Run link and re-deliver the webhook to generate fresh logs before escalating in Support.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-foreground">Rollout Checklist</h2>
            <p className="text-muted-foreground">Confirm governance items before calling onboarding complete.</p>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {rolloutChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>

    <Footer />
  </div>
);

export default Onboarding;
