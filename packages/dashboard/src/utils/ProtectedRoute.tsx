import { refresh } from "@/services/AuthService";
import { me } from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/UserStore";
import type { User } from "@/types/User";

interface Props {
  protectionNeeded: boolean;
  children: ReactElement;
}

const ProtectedRoute = ({ protectionNeeded, children }: Props) => {
  const setUser = useUserStore((state) => state.setUser);

  if (!protectionNeeded) return children;

  const { isPending, isError, data, isSuccess } = useQuery({
    queryKey: ["checkSession"],
    queryFn: me,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isSuccess) {
    setUser(data);
  }

  const refreshSession = useQuery({
    queryKey: ["refreshSession"],
    queryFn: refresh,
    enabled: !!isError,
    retry: false,
  });

  if (isPending) {
    return <span>111Loading...</span>;
  }

  // If request to refresh tokens fails, redirect to signin page
  if (refreshSession.isError) {
    return <Navigate to="/auth" replace />;
  }

  if (protectionNeeded && !isPending && !isError) {
    return children;
  }
};

export default ProtectedRoute;
