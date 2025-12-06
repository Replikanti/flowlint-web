import { Link } from "react-router-dom";
import { Github, Chrome } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Footer = () => {
  const links = {
    product: [
      { name: "Documentation", href: "/doc" },
      { name: "Status", href: "/status" },
      { name: "GitHub App", href: "https://github.com/apps/flowlint" },
      { name: "CLI", href: "/cli" },
      { name: "Chrome Extension", href: "https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli" },
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
      {/* Chrome Extension CTA */}
      <div className="border-b border-border bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Chrome className="h-5 w-5" />
              <span className="text-sm font-semibold">Chrome Extension</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Real-time Linting in Your Browser
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Integrates directly into the n8n editor for instant feedback as you build. 100% browser-based, completely free, and respects your privacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <Button size="lg" asChild className="shadow-[var(--shadow-glow)]">
                <a href="https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli" target="_blank" rel="noopener noreferrer">
                  <Chrome className="mr-2 h-5 w-5" />
                  Install Chrome Extension
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://github.com/apps/flowlint" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Install GitHub App
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

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
            <div className="space-y-3">
              <a
                href="https://github.com/apps/flowlint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                Install GitHub App
              </a>
              <div>
                <a
                  href="https://chromewebstore.google.com/detail/flowlint-n8n-workflow-aud/ldefjlphmcjfccmofakmebddlecbieli"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/chrome-web-store-badge.svg"
                    alt="Available in the Chrome Web Store"
                    className="h-[40px] w-auto"
                  />
                </a>
              </div>
              <a
                href="https://www.npmjs.com/package/flowlint"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 780 250" fill="currentColor">
                  <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z"/>
                </svg>
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
