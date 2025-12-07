import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Wrench, Calendar, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import roadmapDataJson from "@/data/roadmap.json";

interface RoadmapItem {
  title: string;
  description: string;
  estimatedCompletion?: string;
}

interface RoadmapSection {
  status: "shipped" | "in-progress" | "planned" | "backlog";
  title?: string;
  quarter?: string;
  items: RoadmapItem[];
}

interface RoadmapData {
  lastUpdated: string;
  sections: RoadmapSection[];
}

const Roadmap = () => {
  const roadmapData: RoadmapSection[] = (roadmapDataJson as RoadmapData).sections;

  const getStatusConfig = (status: RoadmapSection["status"]) => {
    switch (status) {
      case "shipped":
        return {
          icon: CheckCircle2,
          label: "Shipped",
          color: "text-green-500",
          bgColor: "bg-green-500/10 border-green-500/20",
          badgeVariant: "default" as const,
          badgeClass: "bg-green-500 hover:bg-green-600",
        };
      case "in-progress":
        return {
          icon: Wrench,
          label: "In Progress",
          color: "text-blue-500",
          bgColor: "bg-blue-500/10 border-blue-500/20",
          badgeVariant: "secondary" as const,
          badgeClass: "bg-blue-500 text-white hover:bg-blue-600",
        };
      case "planned":
        return {
          icon: Calendar,
          label: "Coming Soon",
          color: "text-purple-500",
          bgColor: "bg-purple-500/10 border-purple-500/20",
          badgeVariant: "outline" as const,
          badgeClass: "border-purple-500 text-purple-500",
        };
      case "backlog":
        return {
          icon: Lightbulb,
          label: "Backlog",
          color: "text-muted-foreground",
          bgColor: "bg-muted/50 border-muted",
          badgeVariant: "outline" as const,
          badgeClass: "",
        };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Product Roadmap
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              See what we're building, what's coming next, and help shape the future of FlowLint
            </p>
            <div className="flex justify-center items-center">
              <Button asChild size="lg">
                <a
                  href="mailto:support@flowlint.dev?subject=Feature Request"
                  className="inline-flex items-center"
                >
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Request a Rule
                </a>
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {roadmapData.map((section, sectionIndex) => {
              const config = getStatusConfig(section.status);
              const StatusIcon = config.icon;

              return (
                <div key={sectionIndex} className="relative">
                  {/* Timeline connector line (not for last item) */}
                  {sectionIndex < roadmapData.length - 1 && (
                    <div
                      className="absolute left-6 top-20 bottom-0 w-0.5 bg-border -mb-12 hidden md:block"
                      aria-hidden="true"
                    />
                  )}

                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${config.bgColor} ${config.color} relative z-10 bg-background`}>
                      <StatusIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-bold text-foreground">
                          {config.label}
                        </h2>
                        {section.quarter && (
                          <Badge className={config.badgeClass} variant={config.badgeVariant}>
                            {section.quarter}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Items Grid */}
                  <div className="md:pl-20 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
                    {section.items.map((item, itemIndex) => (
                      <Card
                        key={itemIndex}
                        className={`transition-all hover:shadow-md ${
                          section.status === "shipped" ? "opacity-90" : ""
                        }`}
                      >
                        <CardHeader>
                          <CardTitle className="text-lg leading-tight">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="text-sm">
                            {item.description}
                          </CardDescription>
                        </CardHeader>
                        {item.estimatedCompletion && (
                          <CardContent className="pt-0">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Target: {item.estimatedCompletion}</span>
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Call to Action */}
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Have an idea for a new rule?
              </CardTitle>
              <CardDescription className="text-center text-base">
                We're always looking to expand FlowLint's capabilities. Share your suggestions with us!
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" variant="default">
                <a
                  href="mailto:support@flowlint.dev?subject=Feature Request&body=Rule name:%0D%0A%0D%0ADescription:%0D%0A%0D%0AUse case:%0D%0A%0D%0AExample workflow:"
                >
                  Email Your Idea
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Legend */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h3 className="text-sm font-semibold text-foreground mb-4">Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(["shipped", "in-progress", "planned", "backlog"] as const).map((status) => {
                const config = getStatusConfig(status);
                const StatusIcon = config.icon;
                return (
                  <div key={status} className="flex items-center gap-2">
                    <StatusIcon className={`h-4 w-4 ${config.color}`} aria-hidden="true" />
                    <span className="text-sm text-muted-foreground">{config.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Roadmap;
