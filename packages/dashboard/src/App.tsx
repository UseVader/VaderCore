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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectView />} />
        <Route
          path="/projects/:projectId/scripts/new"
          element={<ScriptBuilder />}
        />
        <Route
          path="/projects/:projectId/scripts/:scriptId"
          element={<ScriptBuilder />}
        />
        <Route path="/projects/:projectId/logs" element={<LogViewer />} />
        <Route path="/logs" element={<LogViewer />} />
        <Route path="/cli" element={<CLI />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
