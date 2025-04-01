import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaderLogo from "./../../assets/vader_logo.png";
import { useUserStore } from "@/stores/UserStore";
import AuthenticatedNav from "@/components/common/AuthenticatedNav";
import { isProtectedRoute, getLogoLink } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserStore();
  const location = useLocation();

  const isProtected = isProtectedRoute(location.pathname);
  const logoLink = getLogoLink(location.pathname);

  return (
    <nav className="w-full bg-background/90 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center h-16">
        {/* Logo */}
        <Link to={logoLink} className="flex items-center space-x-2">
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
          {!isProtected && (
            <>
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
            </>
          )}

          {user ? (
            <AuthenticatedNav />
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
            {!isProtected && (
              <>
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
              </>
            )}

            {user ? (
              <AuthenticatedNav isMobile />
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
