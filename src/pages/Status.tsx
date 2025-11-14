import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle, Activity } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Status = () => {
  // This would be fetched from an API in production
  const services = [
    { name: "API Server", status: "operational", uptime: "99.99%" },
    { name: "Webhook Processing", status: "operational", uptime: "99.98%" },
    { name: "Worker Queue", status: "operational", uptime: "99.97%" },
    { name: "GitHub Integration", status: "operational", uptime: "99.99%" },
  ];

  const recentIncidents = [
    {
      date: "2025-01-10",
      title: "Scheduled Maintenance",
      description: "System updates completed successfully",
      severity: "maintenance",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "down":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge className="bg-green-500 hover:bg-green-600">Operational</Badge>;
      case "degraded":
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Degraded</Badge>;
      case "down":
        return <Badge variant="destructive">Down</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">System Status</h1>
            <p className="text-lg text-muted-foreground">
              Real-time status of FlowLint services and infrastructure
            </p>
          </div>

          {/* Overall Status */}
          <Card className="mb-8 border-green-500/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                  <div>
                    <CardTitle className="text-2xl">All Systems Operational</CardTitle>
                    <CardDescription>All services are running normally</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Services */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>Current status of all FlowLint components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(service.status)}
                      <div>
                        <p className="font-medium text-foreground">{service.name}</p>
                        <p className="text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                      </div>
                    </div>
                    {getStatusBadge(service.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Incidents */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Past incidents and maintenance windows</CardDescription>
            </CardHeader>
            <CardContent>
              {recentIncidents.length > 0 ? (
                <div className="space-y-4">
                  {recentIncidents.map((incident, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-foreground">{incident.title}</h3>
                        <Badge variant="outline">{incident.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{incident.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No recent incidents or maintenance
                </p>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              For real-time updates, follow us on{" "}
              <a
                href="https://github.com/Replikanti/flowlint"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Status;
