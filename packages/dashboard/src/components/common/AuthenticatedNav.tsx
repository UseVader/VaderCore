import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, User, Users, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/stores/UserStore";
import { logout } from "@/services/UserService";
import { isProtectedRoute } from "@/lib/utils";

interface AuthenticatedNavProps {
  isMobile?: boolean;
}

const AuthenticatedNav = ({ isMobile = false }: AuthenticatedNavProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useUserStore();
  const location = useLocation();
  const isProtected = isProtectedRoute(location.pathname);

  const handleSignOut = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isMobile) {
    return (
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
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 p-2 text-destructive list-item-hover"
        >
          <LogOut size={16} />
          <span className="text-sm">Sign Out</span>
        </button>
      </>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {!isProtected && (
        <Link to="/dashboard">
          <Button
            size="sm"
            className="bg-primary text-white hover:bg-primary/90"
          >
            Go to Dashboard
          </Button>
        </Link>
      )}
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-xs font-medium">
              {getInitials(user?.displayName || "")}
            </div>
          )}
          <span>{user?.displayName}</span>
          <ChevronDown size={16} />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border shadow-lg rounded-md p-2 animate-scale-in origin-top-right">
            <div className="flex flex-col space-y-1">
              {/* <Link
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
              <div className="divider my-1"></div> */}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 p-2 text-primary list-item-hover"
              >
                <LogOut size={16} />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticatedNav;
