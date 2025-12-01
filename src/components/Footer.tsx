import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const links = {
    product: [
      { name: "Documentation", href: "/doc" },
      { name: "Status", href: "/status" },
      { name: "GitHub App", href: "https://github.com/apps/flowlint" },
      { name: "CLI", href: "/cli" },
    ],
    company: [
      { name: "About", href: "/" },
      { name: "Support", href: "/support" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/tos" },
    ],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="FlowLint" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">FlowLint</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Automated static analysis for n8n workflows
            </p>
            <a
              href="https://github.com/apps/flowlint"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              Install App
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Product</h3>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("http") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Company</h3>
            <ul className="space-y-2">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-foreground mb-3">Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} FlowLint. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
