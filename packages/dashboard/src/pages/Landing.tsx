import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Terminal,
  Laptop,
  Server,
  GitBranch,
  CheckCircle,
  Lock,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "node --version && docker --version && npm list -g --depth=0";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          currentIndex = 0;
          setTypedText("");
        }, 5000);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [typedText]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden section-spacing bg-gradient-to-b from-white to-secondary/20">
        <div className="container-custom flex flex-col items-center text-center">
          <span className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm">
            Introducing Vader
          </span>

          <h1 className="heading-1 mb-6">
            Elegant diagnostics for <br className="hidden md:inline" />
            development environments
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mb-10">
            Define, execute, and share diagnostic scripts to debug or verify
            developer environments. Self-hosted, secure, and built for teams.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/auth?tab=register">
              <Button size="lg" className="min-w-[180px]">
                Get Started
                <ChevronRight className="ml-2" size={16} />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="outline" size="lg" className="min-w-[180px]">
                Documentation
              </Button>
            </Link>
          </div>

          {/* Terminal Preview */}
          <div className="w-full max-w-4xl rounded-xl overflow-hidden shadow-strong">
            <div className="bg-vader-800 p-2 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-2 text-xs text-vader-400">
                ~ vader script run diagnostics
              </div>
            </div>
            <div className="bg-vader p-4 font-mono text-sm text-vader-100">
              <div className="flex">
                <span className="text-primary">$</span>
                <span className="ml-2">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>

              {typedText.length === fullText.length && (
                <div className="mt-4 animate-fade-in">
                  <div className="text-green-400">v18.16.0</div>
                  <div className="text-green-400 mt-1">
                    Docker version 24.0.2, build cb74dfc
                  </div>
                  <div className="text-green-400 mt-1">
                    /usr/local/lib <br />
                    ├── @vue/cli@5.0.8 <br />
                    └── npm@9.8.1
                  </div>
                  <div className="mt-4 flex items-center">
                    <CheckCircle size={16} className="text-green-400 mr-2" />
                    <span>All checks passed! Environment verified.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute -top-10 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="section-spacing">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 mb-4">
              Everything you need for environment diagnostics
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built for developers and teams to ensure consistent environments
              and easy troubleshooting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Terminal size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Script Builder</h3>
              <p className="text-muted-foreground">
                Create diagnostic scripts with drag-and-drop simplicity. Chain
                commands and define expected outputs.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Laptop size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CLI Integration</h3>
              <p className="text-muted-foreground">
                Run diagnostic scripts with a simple CLI command. View previews
                before execution for security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Server size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Self-Hosted</h3>
              <p className="text-muted-foreground">
                Deploy Vader on your own infrastructure with Docker Compose.
                Complete control over your data.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <GitBranch size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Share scripts across your organization. Ensure consistent
                environments across your team.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure by Design</h3>
              <p className="text-muted-foreground">
                Scripts execute locally via CLI. Preview commands before
                execution. Full control and transparency.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Execution Logs</h3>
              <p className="text-muted-foreground">
                Track script executions with detailed logs. Share results with
                your team for collaborative debugging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-primary/5">
        <div className="container-custom flex flex-col items-center text-center">
          <h2 className="heading-2 mb-6">Start diagnosing with precision</h2>

          <p className="text-lg text-muted-foreground max-w-2xl mb-10">
            Streamline your development environment diagnostics with Vader.
            Perfect for dev teams, open source projects, and enterprise
            environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/auth?tab=register">
              <Button size="lg" className="min-w-[180px]">
                Get Started
              </Button>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="min-w-[180px]">
                GitHub
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
