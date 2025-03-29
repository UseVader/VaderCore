
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScriptCard from '@/components/ui/ScriptCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronLeft, Plus, Search, SlidersHorizontal, Tag } from 'lucide-react';
import { Script } from '@/lib/types';

// Mock data
const scripts: Script[] = [
  {
    id: 'script-1',
    name: 'Node.js Environment Check',
    description: 'Verify Node.js installation, version, and global packages.',
    projectId: 'project-1',
    tags: ['node', 'npm', 'environment'],
    commands: [
      {
        id: 'cmd-1',
        name: 'Check Node Version',
        shellCommand: 'node --version',
        type: 'PREDEFINED',
        description: 'Displays the installed Node.js version',
        expectedOutput: 'v18.x.x',
        scriptId: 'script-1',
        order: 0
      },
      {
        id: 'cmd-2',
        name: 'Check NPM Version',
        shellCommand: 'npm --version',
        type: 'PREDEFINED',
        description: 'Displays the installed npm version',
        expectedOutput: '9.x.x',
        scriptId: 'script-1',
        order: 1
      },
      {
        id: 'cmd-3',
        name: 'List Global NPM Packages',
        shellCommand: 'npm list -g --depth=0',
        type: 'CUSTOM',
        scriptId: 'script-1',
        order: 2
      }
    ],
    createdAt: '2023-07-15T10:30:00Z',
    updatedAt: '2023-08-20T14:45:00Z'
  },
  {
    id: 'script-2',
    name: 'React Development Setup',
    description: 'Verify React development tools and dependencies.',
    projectId: 'project-1',
    tags: ['react', 'development'],
    commands: [
      {
        id: 'cmd-4',
        name: 'Check Create React App',
        shellCommand: 'npx create-react-app --version',
        type: 'PREDEFINED',
        scriptId: 'script-2',
        order: 0
      },
      {
        id: 'cmd-5',
        name: 'Check React DevTools',
        shellCommand: 'ls ~/.config/google-chrome/Default/Extensions | grep -i react',
        type: 'CUSTOM',
        scriptId: 'script-2',
        order: 1
      }
    ],
    createdAt: '2023-08-05T09:15:00Z',
    updatedAt: '2023-08-18T11:30:00Z'
  },
  {
    id: 'script-3',
    name: 'JavaScript Linters',
    description: 'Check for ESLint and Prettier installations and configurations.',
    projectId: 'project-1',
    tags: ['eslint', 'prettier', 'linting'],
    commands: [
      {
        id: 'cmd-6',
        name: 'Check ESLint',
        shellCommand: 'npx eslint --version',
        type: 'PREDEFINED',
        scriptId: 'script-3',
        order: 0
      },
      {
        id: 'cmd-7',
        name: 'Check Prettier',
        shellCommand: 'npx prettier --version',
        type: 'PREDEFINED',
        scriptId: 'script-3',
        order: 1
      }
    ],
    createdAt: '2023-08-10T14:20:00Z',
    updatedAt: '2023-08-15T16:45:00Z'
  },
  {
    id: 'script-4',
    name: 'TypeScript Setup',
    description: 'Verify TypeScript compiler and related tools.',
    projectId: 'project-1',
    tags: ['typescript', 'compiler'],
    commands: [
      {
        id: 'cmd-8',
        name: 'Check TypeScript',
        shellCommand: 'npx tsc --version',
        type: 'PREDEFINED',
        scriptId: 'script-4',
        order: 0
      }
    ],
    createdAt: '2023-07-28T11:25:00Z',
    updatedAt: '2023-08-14T13:40:00Z'
  },
  {
    id: 'script-5',
    name: 'Webpack Configuration',
    description: 'Check Webpack installation and configuration.',
    projectId: 'project-1',
    tags: ['webpack', 'bundler'],
    commands: [
      {
        id: 'cmd-9',
        name: 'Check Webpack',
        shellCommand: 'npx webpack --version',
        type: 'PREDEFINED',
        scriptId: 'script-5',
        order: 0
      }
    ],
    createdAt: '2023-07-22T15:10:00Z',
    updatedAt: '2023-08-16T09:30:00Z'
  }
];

const ProjectView = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const scriptsPerPage = 6;
  
  // Filter scripts by search query and tags
  const filteredScripts = scripts.filter(script => 
    script.projectId === projectId && 
    (script.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     script.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedTags.length === 0 || selectedTags.some(tag => script.tags.includes(tag)))
  );
  
  // Pagination
  const totalPages = Math.ceil(filteredScripts.length / scriptsPerPage);
  const startIndex = (page - 1) * scriptsPerPage;
  const displayedScripts = filteredScripts.slice(startIndex, startIndex + scriptsPerPage);
  
  // Group scripts by tag (for tag filtering UI)
  const allTags = [...new Set(scripts.filter(s => s.projectId === projectId).flatMap(script => script.tags))];
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
    setPage(1); // Reset to first page when changing filters
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Project Header */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Projects
                </Link>
                <h1 className="text-2xl font-bold">Frontend Environment</h1>
                <p className="text-muted-foreground mt-1">
                  Node.js, npm, and React-related diagnostic scripts for frontend development.
                </p>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Link to={`/projects/${projectId}/scripts/new`}>
                  <Button>
                    <Plus size={16} className="mr-2" />
                    New Script
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scripts Content */}
        <div className="container-custom py-8">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search scripts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => {
                    setSearchQuery(e.target.value);
                    setPage(1); // Reset to first page when searching
                  }}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Tag size={14} className="mr-2" />
                    Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {allTags.map(tag => (
                    <DropdownMenuItem
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleTag(tag);
                      }}
                      className="flex items-center justify-between"
                    >
                      <span>{tag}</span>
                      {selectedTags.includes(tag) && (
                        <Badge variant="outline" className="ml-2 bg-primary/20">
                          Selected
                        </Badge>
                      )}
                    </DropdownMenuItem>
                  ))}
                  {selectedTags.length > 0 && (
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTags([]);
                        setPage(1); // Reset to first page when clearing filters
                      }}
                      className="text-destructive mt-2"
                    >
                      Clear Filters
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal size={14} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* Selected Tags Display */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedTags.map(tag => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="px-3 py-1 cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
            </div>
          )}
          
          {/* Scripts List */}
          {displayedScripts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedScripts.map(script => (
                  <ScriptCard key={script.id} script={script} projectId={projectId || ''} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination className="mt-8">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(page - 1);
                        }}
                        className={page === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(i + 1);
                          }}
                          isActive={page === i + 1}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(page + 1);
                        }}
                        className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <Card className="p-8 text-center">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold mb-2">No scripts found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery || selectedTags.length > 0 ? 'Try a different search term or clear filters.' : 'Create your first script to get started.'}
                </p>
                {!searchQuery && selectedTags.length === 0 && (
                  <Link to={`/projects/${projectId}/scripts/new`}>
                    <Button>
                      <Plus size={16} className="mr-2" />
                      Create Script
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectView;
