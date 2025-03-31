
import { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Download, Share2, Terminal, ChevronsRight } from 'lucide-react';
import { ExecutionLog } from '@/types/ExecutionLog';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ExecutionLogItemProps {
  log: ExecutionLog;
}

interface CommandOutput {
  name: string;
  command: string;
  output: string;
  error?: string;
  userInput?: string;
}

const ExecutionLogItem = ({ log }: ExecutionLogItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasErrors = log.stderr && log.stderr.length > 0;
  
  // Mock data for multiple command outputs (in a real app, this would come from the API)
  const commandOutputs: CommandOutput[] = [
    {
      name: "Check Node Version",
      command: "node --version",
      output: log.stdout || "v16.15.0",
      userInput: ""
    },
    {
      name: "Check Environment Variable",
      command: "echo $PATH",
      output: "/usr/local/bin:/usr/bin:/bin",
      userInput: "PATH"
    }
  ];
  
  return (
    <div className="border rounded-lg mb-4 overflow-hidden shadow-sm">
      <div className="p-4 bg-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`p-1.5 rounded-md ${hasErrors ? 'bg-destructive/10' : 'bg-primary/10'}`}>
              <Terminal size={16} className={hasErrors ? 'text-destructive' : 'text-primary'} />
            </div>
            <div>
              <h3 className="font-medium">{log.scriptName}</h3>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-0.5">
                <Clock size={12} />
                <span>{formatDistanceToNow(new Date(log.timestamp), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" className="h-8">
              <Download size={14} className="mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Share2 size={14} className="mr-1" />
              Share
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-4 bg-card/50 border-t animate-fade-in">
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wider mb-2 text-muted-foreground font-medium">System Information</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(log.environment).map(([key, value]) => (
                <div key={key} className="bg-secondary/50 p-2 rounded">
                  <span className="text-xs text-muted-foreground">{key}</span>
                  <div className="text-sm font-mono truncate">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <h4 className="text-xs uppercase tracking-wider mb-2 text-muted-foreground font-medium">Command Outputs</h4>
          <div className="space-y-3">
            {commandOutputs.map((cmd, index) => (
              <div key={index} className="border rounded-md overflow-hidden">
                <div className="bg-secondary/30 px-3 py-2 flex justify-between items-center">
                  <div>
                    <span className="font-medium text-sm">{cmd.name}</span>
                    <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                      <code className="font-mono">{cmd.command}</code>
                    </div>
                  </div>
                  {cmd.userInput && (
                    <Badge variant="outline" className="text-xs">
                      User Input: {cmd.userInput}
                    </Badge>
                  )}
                </div>
                <div className="p-3">
                  <pre className="font-mono text-sm bg-secondary/20 p-3 rounded-md overflow-x-auto text-foreground">
                    {cmd.output}
                  </pre>
                  
                  {cmd.error && (
                    <pre className="font-mono text-sm p-3 mt-2 bg-destructive/10 rounded-md overflow-x-auto text-destructive-foreground">
                      {cmd.error}
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExecutionLogItem;
