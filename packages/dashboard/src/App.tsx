import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectView from "./pages/ProjectView";
import ScriptBuilder from "./pages/ScriptBuilder";
import LogViewer from "./pages/LogViewer";
import CLI from "./pages/CLI";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "@/utils/ProtectedRoute";
import PublicRoute from "@/utils/PublicRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <Index />
            </PublicRoute>
          }
        />
        <Route
          path="/landing"
          element={
            <PublicRoute>
              <Landing />
            </PublicRoute>
          }
        />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <Auth />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <ProjectView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/scripts/new"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <ScriptBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/scripts/:scriptId"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <ScriptBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/:projectId/logs"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <LogViewer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logs"
          element={
            <ProtectedRoute protectionNeeded={true}>
              <LogViewer />
            </ProtectedRoute>
          }
        />

        {/* Unprotected Routes */}
        <Route path="/cli" element={<CLI />} />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
