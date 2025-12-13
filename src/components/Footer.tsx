import { Link } from "react-router-dom";
import { Github, Chrome, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const NpmIcon = () => (
  <svg className="h-5 w-5 mr-2" viewBox="0 0 780 250" fill="currentColor">
    <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"/>
  </svg>
);

const Footer = () => {
  const links = {
    product: [
      { name: "Documentation", href: "/doc" },
      { name: "Roadmap", href: "/roadmap" },
      { name: "Web Validator", href: "/roadmap" },
      { name: "GitHub App", href: "/github-app" },
      { name: "CLI", href: "/cli" },
      { name: "Chrome Extension", href: "/chrome-extension" },
    ],
    opensource: [
      { name: "flowlint-core", href: "https://github.com/Replikanti/flowlint-core/tree/main" },
      { name: "flowlint-cli", href: "https://github.com/Replikanti/flowlint-cli/tree/main" },
      { name: "flowlint-chrome", href: "https://github.com/Replikanti/flowlint-chrome/tree/main" },
      { name: "flowlint-github-app", href: "https://github.com/Replikanti/flowlint-github-app/tree/main" },
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
      {/* Chrome Extension CTA - Removed to reduce noise, focus on multi-platform in Home */}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="FlowLint" className="h-8 w-8" />
              <span className="text-lg font-bold text-foreground">FlowLint</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Automated static analysis for n8n workflows. Open source and community driven.
            </p>
            <div className="space-y-3">
              <a
                href="https://github.com/Replikanti/flowlint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                View on GitHub
              </a>
              <a
                href="https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Install Chrome Extension
              </a>
              <a
                href="https://www.npmjs.com/package/flowlint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <NpmIcon />
                Install CLI from npm
              </a>
            </div>
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
            <h3 className="font-semibold text-sm text-foreground mb-3">Open Source</h3>
            <ul className="space-y-2">
              {links.opensource.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
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
