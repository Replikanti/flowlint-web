import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, Code2, Terminal, FolderGit2, FileJson, Shield, CheckCircle2, Github } from "lucide-react";

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
                <Link to="/doc">
                  <Code2 className="w-4 h-4 mr-2" />
                  View Rule Examples
                </Link>
              </Button>
            </div>
          </div>

          {/* Installation Card */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Global Installation</CardTitle>
              <CardDescription>Get started quickly with the FlowLint CLI tool globally</CardDescription>
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

          {/* Project Setup (New Section) */}
          <Card className="mb-12 border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-blue-600" />
                Project Setup (Recommended)
              </CardTitle>
              <CardDescription>Integrate FlowLint into your project for consistent testing across your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Step 1</Badge>
                    <h3 className="font-semibold">Initialize project</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">Create a new npm project in your repository.</p>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>npm init</pre>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Step 2</Badge>
                    <h3 className="font-semibold">Set test command</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">When prompted, enter test command:</p>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
<pre>flowlint scan</pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Step 3</Badge>
                    <h3 className="font-semibold">Install FlowLint</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">Install FlowLint as a dev dependency.</p>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>npm i flowlint</pre>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">Using <code className="bg-slate-100 px-1 py-0.5 rounded">npm init -y</code> or an existing package? Ensure <code className="bg-slate-100 px-1 py-0.5 rounded">scripts.test</code> is set:</p>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto mt-2">
                    <pre>{`"scripts": {
  "test": "flowlint scan"
}`}</pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Step 4</Badge>
                    <h3 className="font-semibold">Run tests</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 min-h-[40px]">Generate config, then execute the scanner via npm.</p>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto mb-2">
                    <pre>flowlint init</pre>
                  </div>
                  <div className="bg-slate-900 text-slate-50 p-3 rounded-lg font-mono text-xs overflow-x-auto">
                    <pre>npm run test</pre>
                  </div>
                </div>
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
              <CardDescription>FlowLint supports 5 output formats for different use cases and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Default</Badge>
                    <Terminal className="w-4 h-4" />
                    <h3 className="font-semibold">Stylish</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">Human-readable console output with colors and formatting</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>flowlint scan</pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>CI/CD</Badge>
                    <FileJson className="w-4 h-4" />
                    <h3 className="font-semibold">JSON</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">Machine-readable JSON for programmatic processing</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>flowlint scan --format json --out-file report.json</pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">New</Badge>
                    <Shield className="w-4 h-4" />
                    <h3 className="font-semibold">SARIF</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">SARIF 2.1.0 format for GitHub Code Scanning and security platforms</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>flowlint scan --format sarif --out-file results.sarif</pre>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">New</Badge>
                    <CheckCircle2 className="w-4 h-4" />
                    <h3 className="font-semibold">JUnit XML</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">JUnit XML for Jenkins, GitLab CI, CircleCI, Azure Pipelines</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>flowlint scan --format junit --out-file results.xml</pre>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">New</Badge>
                    <Github className="w-4 h-4" />
                    <h3 className="font-semibold">GitHub Actions</h3>
                  </div>
                  <p className="text-muted-foreground mb-3">Native GitHub Actions workflow commands for inline annotations</p>
                  <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>flowlint scan --format github-actions</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CI/CD Integration */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>CI/CD Integration</CardTitle>
              <CardDescription>Comprehensive examples for integrating FlowLint into your CI/CD pipelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* GitHub Actions - SARIF Upload */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Github className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">GitHub Actions - SARIF Upload (Recommended)</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Upload results to GitHub Code Scanning for permanent PR annotations and security insights.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`name: FlowLint

on:
  pull_request:
    paths:
      - '**.json'

jobs:
  flowlint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write  # Required for SARIF upload
    steps:
      - uses: actions/checkout@v4

      - name: Run FlowLint
        run: npx flowlint scan --format sarif --out-file results.sarif
        continue-on-error: true  # Don't fail workflow on findings

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif`}</pre>
                </div>
              </div>

              {/* GitHub Actions - Workflow Annotations */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Github className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">GitHub Actions - Workflow Annotations</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Show findings directly in workflow logs with native GitHub Actions annotations.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`name: FlowLint

on:
  pull_request:
    paths:
      - '**.json'

jobs:
  flowlint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run FlowLint
        run: npx flowlint scan --format github-actions --fail-on-error`}</pre>
                </div>
              </div>

              {/* GitHub Actions - Combined Approach */}
              <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/30">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Best Practice</Badge>
                  <Github className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">GitHub Actions - Combined Approach</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Use both SARIF upload and workflow annotations for immediate feedback and permanent annotations.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`name: FlowLint

on:
  pull_request:
    paths:
      - '**.json'

jobs:
  flowlint:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      security-events: write
    steps:
      - uses: actions/checkout@v4

      - name: Run FlowLint (Workflow Annotations)
        run: npx flowlint scan --format github-actions
        continue-on-error: true

      - name: Run FlowLint (SARIF)
        run: npx flowlint scan --format sarif --out-file results.sarif
        continue-on-error: true

      - name: Upload SARIF results
        uses: github/codeql-action/upload-sarif@v3
        if: always()
        with:
          sarif_file: results.sarif

      - name: Check for blocking issues
        run: npx flowlint scan --fail-on-error`}</pre>
                </div>
              </div>

              {/* GitLab CI */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">GitLab CI - JUnit Reports</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Integrate with GitLab's test report UI for visual feedback in merge requests.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`flowlint:
  stage: test
  image: node:22
  script:
    - npx flowlint scan --format junit --out-file flowlint-results.xml
  artifacts:
    when: always
    reports:
      junit: flowlint-results.xml`}</pre>
                </div>
              </div>

              {/* Jenkins */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Jenkins - JUnit Integration</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Publish test results in Jenkins with the JUnit plugin.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`pipeline {
  agent any

  stages {
    stage('FlowLint') {
      steps {
        sh 'npx flowlint scan --format junit --out-file flowlint-results.xml'
      }
      post {
        always {
          junit 'flowlint-results.xml'
        }
      }
    }
  }
}`}</pre>
                </div>
              </div>

              {/* CircleCI */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">CircleCI - Test Results</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Store test results in CircleCI for historical tracking and insights.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`version: 2.1

jobs:
  flowlint:
    docker:
      - image: cimg/node:22.0
    steps:
      - checkout
      - run:
          name: Run FlowLint
          command: npx flowlint scan --format junit --out-file test-results/flowlint.xml
      - store_test_results:
          path: test-results`}</pre>
                </div>
              </div>

              {/* Azure Pipelines */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Azure Pipelines - Test Results</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Publish test results to Azure DevOps for tracking and reporting.
                </p>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`trigger:
  branches:
    include:
      - main
      - develop

pool:
  vmImage: 'ubuntu-latest'

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '22.x'

  - script: npx flowlint scan --format junit --out-file flowlint-results.xml
    displayName: 'Run FlowLint'

  - task: PublishTestResults@2
    condition: always()
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'flowlint-results.xml'
      failTaskOnFailedTests: true`}</pre>
                </div>
              </div>

              {/* Pre-commit Hook */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Pre-commit Hook</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Catch issues locally before committing changes to version control.
                </p>
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
                <CardTitle>5 Output Formats</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Support for stylish, JSON, SARIF (GitHub Code Scanning), JUnit XML (CI/CD), and GitHub Actions annotations.
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
                  <Link to="/doc">View All Rules</Link>
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
