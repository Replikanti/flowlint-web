import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Github, Bug, Lightbulb, HelpCircle, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Support = () => {
  const supportChannels = [
    {
      title: "FlowLint Core",
      description: "Issues regarding the rules engine, rule logic, or parsing.",
      repo: "flowlint-core",
      url: "https://github.com/Replikanti/flowlint/issues" // Fallback if monorepo, but let's assume separate based on push logs
    },
    {
      title: "CLI Tool",
      description: "Bugs or features related to the command-line interface.",
      repo: "flowlint-cli",
      url: "https://github.com/Replikanti/flowlint/issues"
    },
    {
      title: "Chrome Extension",
      description: "Issues with the browser extension or editor integration.",
      repo: "flowlint-chrome",
      url: "https://github.com/Replikanti/flowlint/issues"
    },
    {
      title: "GitHub App",
      description: "Problems with PR reviews, checks, or GitHub integration.",
      repo: "flowlint-github-app",
      url: "https://github.com/Replikanti/flowlint/issues"
    },
    {
      title: "Website & Docs",
      description: "Typos, missing documentation, or website bugs.",
      repo: "flowlint-web",
      url: "https://github.com/Replikanti/flowlint/issues"
    }
  ];

  // Based on the user's context, "Replikanti/flowlint" seems to be the main monorepo now? 
  // Wait, the push logs showed separate remotes: "github.com:Replikanti/flowlint-core.git".
  // So they are separate repos.
  
  const getIssueUrl = (repo: string, type: 'bug' | 'feature') => {
     // Assuming separate repos under Replikanti org
     const baseUrl = `https://github.com/Replikanti/${repo}/issues/new`;
     const template = type === 'bug' ? 'bug_report.md' : 'feature_request.md'; // Standard templates
     return `${baseUrl}?template=${template}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Support & Community</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FlowLint is open source. The best way to get help, report bugs, or request features is directly on GitHub.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {supportChannels.map((channel) => (
              <Card key={channel.repo} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{channel.title}</CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                   {/* Spacer */}
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <Button variant="outline" className="w-full justify-between" asChild>
                    <a href={getIssueUrl(channel.repo, 'bug')} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center"><Bug className="mr-2 h-4 w-4" /> Report Bug</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="secondary" className="w-full justify-between" asChild>
                    <a href={getIssueUrl(channel.repo, 'feature')} target="_blank" rel="noopener noreferrer">
                      <span className="flex items-center"><Lightbulb className="mr-2 h-4 w-4" /> Request Feature</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50 border-dashed">
            <CardHeader className="text-center">
              <div className="mx-auto bg-background p-3 rounded-full w-fit mb-4 border">
                <HelpCircle className="h-6 w-6" />
              </div>
              <CardTitle>Have a general question?</CardTitle>
              <CardDescription>
                For general discussions, ideas, or questions that aren't specific bugs, use our GitHub Discussions.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
               <Button size="lg" asChild>
                  <a href="https://github.com/orgs/Replikanti/discussions" target="_blank" rel="noopener noreferrer">
                    Join the Discussion
                  </a>
               </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;