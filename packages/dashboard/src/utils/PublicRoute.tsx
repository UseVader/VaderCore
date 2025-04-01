import { refresh } from "@/services/AuthService";
import { me } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "@/stores/UserStore";

interface Props {
  children: ReactElement;
}

const PublicRoute = ({ children }: Props) => {
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();

  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ["checkSession"],
    queryFn: me,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const refreshSession = useQuery({
    queryKey: ["refreshSession"],
    queryFn: refresh,
    enabled: !!isError,
    retry: false,
  });

  if (isSuccess) {
    setUser(data);
    if (location.pathname === "/auth") {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  }

  if (isPending) {
    return <span>Loading...</span>;
  }

  // If request to refresh tokens fails or user is not authenticated, allow access to public route
  if (refreshSession.isError || (!isPending && isError)) {
    return children;
  }

  return <span>Loading...</span>;
};

export default PublicRoute;
