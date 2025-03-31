import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, User, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaderLogo from "./../../assets/vader_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Mock data - would come from auth context in real app
  const isAuthenticated = false;
  const user = { name: "John Doe", email: "john@example.com" };

  return (
    <nav className="w-full bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <img
              src={VaderLogo}
              alt="Vader Logo"
              className="w-5 h-5 object-contain"
            />
          </div>
          <span className="font-bold text-xl">Vader</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            to="/docs"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentation
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>{user.name}</span>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-card p-2 animate-scale-in origin-top-right">
                  <div className="flex flex-col space-y-1">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground list-item-hover"
                    >
                      <User size={16} />
                      <span className="text-sm">Personal Workspace</span>
                    </Link>
                    <Link
                      to="/organizations"
                      className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground list-item-hover"
                    >
                      <Users size={16} />
                      <span className="text-sm">Organizations</span>
                    </Link>
                    <div className="divider my-1"></div>
                    <button className="flex items-center space-x-2 p-2 text-destructive list-item-hover">
                      <LogOut size={16} />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/auth?tab=register">
                <Button
                  size="sm"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border animate-slide-in">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <Link
              to="/"
              className="text-sm font-medium p-2 text-muted-foreground hover:text-foreground list-item-hover"
            >
              Home
            </Link>
            <Link
              to="/features"
              className="text-sm font-medium p-2 text-muted-foreground hover:text-foreground list-item-hover"
            >
              Features
            </Link>
            <Link
              to="/docs"
              className="text-sm font-medium p-2 text-muted-foreground hover:text-foreground list-item-hover"
            >
              Documentation
            </Link>

            {isAuthenticated ? (
              <>
                <div className="divider my-1"></div>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground list-item-hover"
                >
                  <User size={16} />
                  <span className="text-sm">Personal Workspace</span>
                </Link>
                <Link
                  to="/organizations"
                  className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground list-item-hover"
                >
                  <Users size={16} />
                  <span className="text-sm">Organizations</span>
                </Link>
                <button className="flex items-center space-x-2 p-2 text-destructive list-item-hover">
                  <LogOut size={16} />
                  <span className="text-sm">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/auth" className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth?tab=register" className="w-full">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
