import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, Terminal, Server, Shield, Code, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <Badge variant="outline" className="mb-6 px-4 py-1 text-primary border-primary/30 bg-primary/5">
              Vader Diagnostics
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Powerful diagnostics for developer environments
            </h1>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl">
              Create, run, and share diagnostic scripts to validate development environments.
              Self-hosted solution for teams that need reliable environment verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/auth?tab=register">
                <Button size="lg" className="px-6 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="px-6 w-full sm:w-auto">
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Terminal Preview */}
          <Card className="max-w-4xl mx-auto overflow-hidden border border-white/10 bg-black/30 shadow-xl">
            <div className="flex items-center bg-black/50 px-4 py-2 border-b border-white/10">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <p className="text-xs text-muted-foreground font-mono">~/projects $ vader run env-check</p>
            </div>
            <CardContent className="p-0">
              <div className="bg-black/70 p-5 font-mono text-sm overflow-hidden">
                <p className="text-primary">Running environment diagnostics...</p>
                <p className="text-muted-foreground mt-2">$ node --version</p>
                <p className="text-green-400">v18.16.0</p>
                <p className="text-muted-foreground mt-2">$ docker --version</p>
                <p className="text-green-400">Docker version 24.0.2, build cb74dfc</p>
                <p className="text-muted-foreground mt-2">$ checking required dependencies...</p>
                <p className="text-green-400 mt-1">✓ typescript@5.0.4</p>
                <p className="text-green-400">✓ react@18.2.0</p>
                <p className="text-green-400">✓ node-sass@9.0.0</p>
                <p className="text-red-400">✗ webpack@5.80.0 (required: &gt;=5.82.0)</p>
                <p className="text-amber-400 mt-3">Environment check completed with 1 error</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subtle background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-40 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-30"></div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-24 bg-[#0A0C14]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Features designed for developer teams
            </h2>
            <p className="text-muted-foreground">
              Build and share diagnostic scripts to validate environment configurations and troubleshoot common issues.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Script Builder</h3>
                <p className="text-muted-foreground">
                  Easily create and manage diagnostic scripts with our intuitive builder. No complex scripting required.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Self-Hosted</h3>
                <p className="text-muted-foreground">
                  Deploy on your own infrastructure with Docker. Keep your scripts and data within your control.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Secure Execution</h3>
                <p className="text-muted-foreground">
                  Preview commands before running. Scripts execute locally with your permissions for complete security.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Customizable Checks</h3>
                <p className="text-muted-foreground">
                  Build checks for specific packages, versions, and environment configurations to match your exact needs.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Version Control</h3>
                <p className="text-muted-foreground">
                  Track changes to your diagnostic scripts with built-in versioning. Roll back to previous versions when needed.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 border-white/10 hover:bg-black/40 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-5">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Instant Results</h3>
                <p className="text-muted-foreground">
                  Get immediate feedback on your environment with color-coded results. Share reports with your team members.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/auth?tab=register">
              <Button size="lg" className="px-6">
                Start Building Scripts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section with solid color */}
      <section className="py-24 bg-[#141824]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Get started with Vader Diagnostics today
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join teams that use Vader to streamline their development environment verification.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/auth?tab=register">
                <Button size="lg" className="px-6 w-full sm:w-auto">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/docs">
                <Button variant="outline" size="lg" className="px-6 w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
