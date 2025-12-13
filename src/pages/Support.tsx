import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Loader2, Send } from "lucide-react";
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
            title: formData.title || `Support Request from ${formData.name}`,
            description: formData.description || formData.message,
            project: formData.project
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      toast({
        title: "Request Submitted Successfully",
        description: `Issue #${result.issue_number} has been created. Click to view status.`,
        className: "bg-green-50 border-green-200 text-green-900 dark:bg-green-900/20 dark:border-green-900 dark:text-green-100",
        action: (
          <ToastAction altText="View Issue" asChild>
            <a 
              href={result.issue_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-green-200 hover:bg-green-100 dark:border-green-800 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 font-medium"
            >
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
        description: "Failed to create issue. Please try again or check your connection.",
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
      
      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 bg-muted/10">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-foreground mb-4">Support Center</h1>
            <p className="text-lg text-muted-foreground">
              Submit a bug report or feature request. We will automatically create a tracked issue in the correct repository for you.
            </p>
          </div>

          <Card className="shadow-lg border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-primary" />
                Submit Request
              </CardTitle>
              <CardDescription>
                Your request will be public on GitHub.
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="project">Component</Label>
                    <Select
                      value={formData.project}
                      onValueChange={(value) => setFormData({ ...formData, project: value })}
                    >
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="core">FlowLint Core (Rules)</SelectItem>
                        <SelectItem value="cli">CLI Tool</SelectItem>
                        <SelectItem value="chrome">Chrome Extension</SelectItem>
                        <SelectItem value="app">GitHub App</SelectItem>
                        <SelectItem value="web">Website / Docs</SelectItem>
                        <SelectItem value="examples">Examples</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="question">General Question</SelectItem>
                        <SelectItem value="bug">Report a Bug</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="help">Help Wanted</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Brief summary of the issue"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Please provide details, reproduction steps, or context..."
                    rows={8}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Issue...
                    </>
                  ) : (
                    "Submit Ticket"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;