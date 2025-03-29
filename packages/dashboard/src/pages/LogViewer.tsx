
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, Clock, Download, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExecutionLogItem from '@/components/ui/ExecutionLogItem';
import { ExecutionLog } from '@/lib/types';
import PaginationControls from '@/components/ui/PaginationControls';

// Mock data
const logs: ExecutionLog[] = [
  {
    id: 'log-1',
    scriptId: 'script-1',
    scriptName: 'Node.js Environment Check',
    userId: 'user-1',
    timestamp: '2023-08-24T14:30:00Z',
    stdout: `v18.16.0
9.6.7
/usr/local/lib
├── @vue/cli@5.0.8
└── npm@9.8.1`,
    stderr: '',
    environment: {
      os: 'Linux',
      architecture: 'x64',
      distribution: 'Ubuntu 22.04',
      kernel: '5.15.0-78-generic'
    }
  },
  {
    id: 'log-2',
    scriptId: 'script-1',
    scriptName: 'Node.js Environment Check',
    userId: 'user-1',
    timestamp: '2023-08-23T10:15:00Z',
    stdout: `v18.16.0
9.6.7
/usr/local/lib
├── @vue/cli@5.0.8
└── npm@9.8.1`,
    stderr: '',
    environment: {
      os: 'macOS',
      architecture: 'arm64',
      version: '13.4',
      chip: 'Apple M1 Pro'
    }
  },
  {
    id: 'log-3',
    scriptId: 'script-1',
    scriptName: 'Node.js Environment Check',
    userId: 'user-2',
    timestamp: '2023-08-22T16:45:00Z',
    stdout: `v16.20.1
8.19.4
/usr/local/lib
└── npm@9.6.0`,
    stderr: '',
    environment: {
      os: 'Windows',
      architecture: 'x64',
      version: '10 Pro',
      build: '19045.3208'
    }
  },
  {
    id: 'log-4',
    scriptId: 'script-2',
    scriptName: 'React Development Setup',
    userId: 'user-1',
    timestamp: '2023-08-21T09:30:00Z',
    stdout: '5.0.1',
    stderr: 'ls: No such file or directory',
    environment: {
      os: 'Linux',
      architecture: 'x64',
      distribution: 'Ubuntu 22.04',
      kernel: '5.15.0-78-generic'
    }
  }
];

const LogViewer = () => {
  const { scriptId } = useParams<{ scriptId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const logsPerPage = 3;
  
  // Filter logs based on script ID and search term
  const filteredLogs = logs.filter(log => {
    // Filter by script ID if provided
    const matchesScriptId = scriptId ? log.scriptId === scriptId : true;
    
    // Filter by search term if provided
    const matchesSearch = searchTerm.trim() === '' ? true : 
      log.scriptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.stdout.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.stderr.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesScriptId && matchesSearch;
  });
  
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const startIndex = (currentPage - 1) * logsPerPage;
  const displayedLogs = filteredLogs.slice(startIndex, startIndex + logsPerPage);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Log Viewer Header */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <Link to="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold">Execution Logs</h1>
                <p className="text-muted-foreground mt-1">
                  {scriptId 
                    ? 'View execution history for this script' 
                    : 'View execution history for all scripts'}
                </p>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button variant="outline">
                  <Download size={16} className="mr-2" />
                  Export All
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Log Content */}
        <div className="container-custom py-8">
          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page when searching
                }}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="h-9">
                <Clock size={14} className="mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <SlidersHorizontal size={14} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          {/* Logs List */}
          {displayedLogs.length > 0 ? (
            <div>
              {displayedLogs.map(log => (
                <ExecutionLogItem key={log.id} log={log} />
              ))}
              
              {totalPages > 1 && (
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-6"
                />
              )}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">No execution logs found</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'Run a script using the CLI to generate execution logs.'}
              </p>
              {!searchTerm && (
                <Link to="/docs/cli">
                  <Button>
                    View CLI Documentation
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LogViewer;
