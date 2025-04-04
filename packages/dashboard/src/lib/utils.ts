import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSignIn = (endpoint: string) => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/auth/${endpoint}`;
  window.location.href = url;
};

export const isProtectedRoute = (path: string): boolean => {
  return (
    path.startsWith("/dashboard") ||
    path.startsWith("/projects") ||
    path.startsWith("/logs")
  );
};

export const getLogoLink = (path: string): string => {
  return isProtectedRoute(path) ? "/dashboard" : "/";
};
