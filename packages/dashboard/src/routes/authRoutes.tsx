import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import { lazy } from "react";
const SignIn = lazy(() => import("./../pages/SignIn/SignIn"));

export const authRoutes: RouteObject[] = [
  { path: "signin", element: <SignIn /> },
  { path: "*", element: <Navigate to={"/signin"} /> },
];
