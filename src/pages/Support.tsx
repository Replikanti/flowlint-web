import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Github, Bug, Lightbulb, HelpCircle, ArrowRight, Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface FormData {
  name: string;
  email: string;
  project: string;
  type: string;
  title: string;
  description: string;
  message?: string;
}

const Support = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project: "web",
    type: "question",
    title: "",
    description: "",
    message: "",
  });

  const supportChannels = [
    {
      title: "FlowLint Core",
      description: "Issues regarding the rules engine, rule logic, or parsing.",
      repo: "flowlint-core",
    },
    {
      title: "CLI Tool",
      description: "Bugs or features related to the command-line interface.",
      repo: "flowlint-cli",
    },
    {
      title: "Chrome Extension",
      description: "Issues with the browser extension or editor integration.",
      repo: "flowlint-chrome",
    },
    {
      title: "GitHub App",
      description: "Problems with PR reviews, checks, or GitHub integration.",
      repo: "flowlint-github-app",
    },
    {
      title: "Examples & Templates",
      description: "Issues with rule examples, false positives in docs, or new patterns.",
      repo: "flowlint-examples",
    },
    {
      title: "Website & Docs",
      description: "Typos, missing documentation, or website bugs.",
      repo: "flowlint-web",
    }
  ];

  const getIssueUrl = (repo: string, type: 'bug' | 'feature') => {
     const baseUrl = `https://github.com/Replikanti/${repo}/issues/new`;
     const template = type === 'bug' ? 'bug_report.md' : 'feature_request.md';
     return `${baseUrl}?template=${template}`;
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_SUPPORT_ENDPOINT || "https://flowlint-support.mholy1983.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            type: formData.type,
            title: `Support Request from ${formData.name}`,
            description: formData.message, // Map message to description for worker
            project: "web" // Default project for form submissions
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Request Submitted",
        description: `Issue #${result.issue_number} has been created successfully.`,
        className: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900",
        action: (
          <ToastAction altText="View Issue" asChild>
            <a href={result.issue_url} target="_blank" rel="noopener noreferrer" className="border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900/50">
              View Issue
            </a>
          </ToastAction>
        ),
      });

      setFormData({ 
        name: "", 
        email: "", 
        project: "web", 
        type: "question", 
        title: "", 
        description: "", 
        message: "" 
      });
    } catch (error) {
      console.error("Error submitting support request:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: "Failed to create issue. Please try again or use GitHub directly.",
        action: (
          <ToastAction altText="Try Again" onClick={(e) => handleFormSubmit(e)}>
            Try Again
          </ToastAction>
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Support & Community</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the right channel for your request. For bug reports and feature requests, we recommend using GitHub.
            </p>
          </div>

          {/* GitHub Channels Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-20">
            {supportChannels.map((channel) => (
              <Card key={channel.repo} className="flex flex-col border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Github className="h-5 w-5" />
                    {channel.title}
                  </CardTitle>
                  <CardDescription>{channel.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1" />
                <CardFooter className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <a href={getIssueUrl(channel.repo, 'bug')} target="_blank" rel="noopener noreferrer">
                      <Bug className="mr-2 h-3.5 w-3.5" /> Report Bug
                    </a>
                  </Button>
                  <Button variant="secondary" size="sm" asChild>
                    <a href={getIssueUrl(channel.repo, 'feature')} target="_blank" rel="noopener noreferrer">
                      <Lightbulb className="mr-2 h-3.5 w-3.5" /> Feature
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Alternative Contact Method (No GitHub) */}
          <div className="max-w-3xl mx-auto">
             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-foreground mb-2">No GitHub Account?</h2>
               <p className="text-muted-foreground">
                 Use the form below to create an issue in our repository automatically.
               </p>
             </div>

             <Card>
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <Mail className="h-5 w-5" />
                   Quick Issue Creator
                 </CardTitle>
                 <CardDescription>
                   This will post a public issue to the <strong>flowlint-web</strong> repository on your behalf.
                 </CardDescription>
               </CardHeader>
               <CardContent>
                 <form onSubmit={handleFormSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                       <Label htmlFor="name">Name</Label>
                       <Input
                         id="name"
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         placeholder="Your name"
                       />
                     </div>
                     <div className="space-y-2">
                       <Label htmlFor="email">Email</Label>
                       <Input
                         id="email"
                         type="email"
                         required
                         value={formData.email}
                         onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         placeholder="your.email@example.com"
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="type">Topic</Label>
                     <Select
                       value={formData.type}
                       onValueChange={(value) => setFormData({ ...formData, type: value })}
                     >
                       <SelectTrigger id="type">
                         <SelectValue placeholder="Select topic" />
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="question">General Question</SelectItem>
                         <SelectItem value="bug">Report a Bug</SelectItem>
                         <SelectItem value="feature">Feature Request</SelectItem>
                         <SelectItem value="other">Other</SelectItem>
                       </SelectContent>
                     </Select>
                   </div>

                   <div className="space-y-2">
                     <Label htmlFor="message">Message</Label>
                     <Textarea
                       id="message"
                       required
                       value={formData.message}
                       onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                       placeholder="Describe your issue or question..."
                       rows={6}
                     />
                   </div>

                   <Button type="submit" disabled={isSubmitting} className="w-full">
                     {isSubmitting ? (
                       <>
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                         Processing...
                       </>
                     ) : (
                       "Create Issue"
                     )}
                   </Button>
                 </form>
               </CardContent>
             </Card>
          </div>

          {/* Discussion Link */}
          <div className="mt-16 text-center">
            <Button variant="link" asChild className="text-muted-foreground">
              <a href="https://github.com/orgs/Replikanti/discussions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <HelpCircle className="mr-2 h-4 w-4" />
                Visit GitHub Discussions for community help
              </a>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
