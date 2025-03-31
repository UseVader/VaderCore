import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronDown, User, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/common/ProjectCard";
import ExecutionLogList from "@/components/common/ExecutionLogList";
import { Button } from "@/components/ui/button";
import PaginationControls from "@/components/common/PaginationControls";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Project, Workspace } from "../types/types";
import { toast } from "sonner";
import CreateProjectForm from "@/components/common/CreateProjectForm";

// Mock data
const workspaces: Workspace[] = [
  { id: "personal", name: "Personal Workspace", isPersonal: true },
  { id: "acme-corp", name: "Acme Corporation", isPersonal: false },
  { id: "startup-inc", name: "Startup Inc", isPersonal: false },
];

const projects: Project[] = [
  {
    id: "project-1",
    name: "Frontend Environment",
    description:
      "Node.js, npm, and React-related diagnostic scripts for frontend development.",
    workspaceId: "personal",
    scriptsCount: 5,
    createdAt: "2023-06-15T10:30:00Z",
    updatedAt: "2023-08-20T14:45:00Z",
  },
  {
    id: "project-2",
    name: "Backend Setup",
    description:
      "PostgreSQL, Redis, and Node.js backend environment verification.",
    workspaceId: "personal",
    scriptsCount: 3,
    createdAt: "2023-07-10T08:15:00Z",
    updatedAt: "2023-08-18T11:20:00Z",
  },
  {
    id: "project-3",
    name: "Docker Diagnostics",
    description: "Verify Docker installation and configuration settings.",
    workspaceId: "personal",
    scriptsCount: 2,
    createdAt: "2023-08-05T15:45:00Z",
    updatedAt: "2023-08-15T09:30:00Z",
  },
  {
    id: "project-4",
    name: "CI Pipeline Tools",
    description:
      "Scripts to validate CI/CD pipeline tool installations and configurations.",
    workspaceId: "acme-corp",
    scriptsCount: 4,
    createdAt: "2023-05-20T11:10:00Z",
    updatedAt: "2023-08-10T16:25:00Z",
  },
  {
    id: "project-5",
    name: "Development Environment",
    description:
      "Common development environment setup verification for new team members.",
    workspaceId: "acme-corp",
    scriptsCount: 7,
    createdAt: "2023-07-25T13:40:00Z",
    updatedAt: "2023-08-22T10:15:00Z",
  },
  {
    id: "project-6",
    name: "Mobile Development",
    description:
      "Android and iOS development environment setup and verification.",
    workspaceId: "startup-inc",
    scriptsCount: 3,
    createdAt: "2023-06-30T09:20:00Z",
    updatedAt: "2023-08-17T14:10:00Z",
  },
  {
    id: "project-7",
    name: "GraphQL API Tools",
    description: "Validation scripts for GraphQL API development environment.",
    workspaceId: "acme-corp",
    scriptsCount: 2,
    createdAt: "2023-07-15T09:20:00Z",
    updatedAt: "2023-08-12T14:10:00Z",
  },
  {
    id: "project-8",
    name: "Data Science Stack",
    description: "Python, Jupyter, and related data science tool validation.",
    workspaceId: "personal",
    scriptsCount: 4,
    createdAt: "2023-06-05T09:20:00Z",
    updatedAt: "2023-07-22T14:10:00Z",
  },
];

const Dashboard = () => {
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>(
    workspaces[0]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const projectsPerPage = 6;

  const filteredProjects = projects.filter(
    (project) => project.workspaceId === activeWorkspace.id
  );
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const startIndex = (currentPage - 1) * projectsPerPage;
  const displayedProjects = filteredProjects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  const handleCreateProject = (data: {
    name: string;
    description?: string;
  }) => {
    // In a real app, this would be an API call
    console.log("Creating project:", {
      ...data,
      workspaceId: activeWorkspace.id,
    });
    toast.success(`Project "${data.name}" created successfully`);
    setIsCreateProjectOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1">
        {/* Workspace Selector */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="container-custom py-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center space-x-2 h-auto py-2"
                    >
                      <span className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                        {activeWorkspace.isPersonal ? (
                          <User size={16} className="text-primary" />
                        ) : (
                          <Users size={16} className="text-primary" />
                        )}
                      </span>
                      <div className="text-left">
                        <p className="font-medium">{activeWorkspace.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {activeWorkspace.isPersonal
                            ? "Personal"
                            : "Organization"}
                        </p>
                      </div>
                      <ChevronDown size={16} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[240px]">
                    {workspaces.map((workspace) => (
                      <DropdownMenuItem
                        key={workspace.id}
                        onClick={() => {
                          setActiveWorkspace(workspace);
                          setCurrentPage(1); // Reset to first page when changing workspace
                        }}
                        className="flex items-center space-x-2 p-2"
                      >
                        <span className="w-8 h-8 flex items-center justify-center bg-primary/10 rounded-full">
                          {workspace.isPersonal ? (
                            <User size={16} className="text-primary" />
                          ) : (
                            <Users size={16} className="text-primary" />
                          )}
                        </span>
                        <div className="text-left">
                          <p className="font-medium">{workspace.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {workspace.isPersonal ? "Personal" : "Organization"}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <Button
                className="mt-4 md:mt-0"
                onClick={() => setIsCreateProjectOpen(true)}
              >
                <Plus size={16} className="mr-2" />
                New Project
              </Button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="container-custom py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>

          {filteredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              )}
            </>
          ) : (
            <Card className="p-8 text-center">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first project to start building diagnostic
                  scripts.
                </p>
                <Button onClick={() => setIsCreateProjectOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  Create Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Execution Logs Section */}
        <div className="container-custom py-8 bg-secondary/25">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recent Execution Logs</h2>
            <Link to="/logs">
              <Button variant="outline" size="sm">
                View All Logs
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>

          <Card>
            <CardContent className="p-6">
              <ExecutionLogList limit={3} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Project Dialog */}
      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <CreateProjectForm
            workspaces={workspaces}
            activeWorkspace={activeWorkspace}
            onSubmit={handleCreateProject}
            onCancel={() => setIsCreateProjectOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Dashboard;
