import { Link, useLocation } from "react-router-dom";
import { Github, Twitter, Mail } from "lucide-react";
import VaderLogo from "./../../assets/vader_logo.png";

const Footer = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const SHOW_EXTENDED_FOOTER = false;

  if (!isLandingPage) {
    return null;
  }

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src={VaderLogo}
                alt="Vader Logo"
                className="w-5 h-5 object-contain"
              />
              <span className="font-bold text-xl">Vader</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Elegant diagnostics for development environments.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com"
                className="text-vader-600 hover:text-vader-900 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="text-vader-600 hover:text-vader-900 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="mailto:hello@example.com"
                className="text-vader-600 hover:text-vader-900 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Conditional columns based on SHOW_EXTENDED_FOOTER */}
          {SHOW_EXTENDED_FOOTER && (
            <>
              {/* Product Links */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/features"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pricing"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/docs"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/integrations"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Links */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/blog"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/community"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Community
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/github"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cli"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      CLI Documentation
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="col-span-1">
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/about"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links Section */}
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#home"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#features"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#docs"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/cli"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      CLI Demo
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Section */}
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/privacy"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookies"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
