
import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Terminal, TerminalSquare, ArrowRight, Send, Italic, XCircle, Copy, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const CLI = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{type: 'input' | 'output' | 'error' | 'info', content: string, timestamp: string}[]>([
    {type: 'info', content: 'Welcome to Vader CLI v1.0.0', timestamp: getCurrentTimestamp()},
    {type: 'info', content: 'Type "help" to see available commands', timestamp: getCurrentTimestamp()},
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDirectory, setCurrentDirectory] = useState('~/projects');
  const [showHints, setShowHints] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sample projects data
  const projects = [
    { id: 'proj-123', name: 'web-automation', scripts: 3 },
    { id: 'proj-456', name: 'data-pipeline', scripts: 5 },
    { id: 'proj-789', name: 'infra-setup', scripts: 2 }
  ];

  // Sample scripts data
  const scripts = {
    'web-automation': [
      { id: 'script-1', name: 'setup-chrome-driver' },
      { id: 'script-2', name: 'run-e2e-tests' },
      { id: 'script-3', name: 'generate-report' }
    ],
    'data-pipeline': [
      { id: 'script-4', name: 'fetch-data' },
      { id: 'script-5', name: 'transform' },
      { id: 'script-6', name: 'load-to-db' },
      { id: 'script-7', name: 'validate' },
      { id: 'script-8', name: 'generate-metrics' }
    ],
    'infra-setup': [
      { id: 'script-9', name: 'provision-servers' },
      { id: 'script-10', name: 'configure-network' }
    ]
  };

  // Auto-scroll to bottom when new content is added
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  function getCurrentTimestamp() {
    return new Date().toLocaleTimeString();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user input to history
    setHistory(prev => [...prev, {type: 'input', content: input, timestamp: getCurrentTimestamp()}]);
    
    // Process command
    processCommand(input);
    
    // Clear input
    setInput('');
  };

  const simulateTyping = (text: string, delay = 30) => {
    setIsRunning(true);
    let i = 0;
    const tempHistory = [...history];
    const outputIndex = tempHistory.length;
    
    // Add empty output entry
    tempHistory.push({type: 'output', content: '', timestamp: getCurrentTimestamp()});
    setHistory(tempHistory);
    
    const intervalId = setInterval(() => {
      if (i < text.length) {
        setHistory(prev => {
          const newHistory = [...prev];
          if (newHistory[outputIndex]) {
            newHistory[outputIndex].content += text.charAt(i);
          }
          return newHistory;
        });
        i++;
      } else {
        clearInterval(intervalId);
        setIsRunning(false);
      }
    }, delay);
  };

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    const args = command.split(' ');
    
    switch(args[0]) {
      case 'help':
        setHistory(prev => [...prev, {
          type: 'output', 
          content: `
Available commands:
  help                 - Display this help message
  clear                - Clear the terminal
  ls                   - List projects or scripts
  cd <directory>       - Change directory
  run <script>         - Run a script
  create <type> <name> - Create a new project or script
  version              - Display CLI version
          `, 
          timestamp: getCurrentTimestamp()
        }]);
        break;
        
      case 'clear':
        setHistory([
          {type: 'info', content: 'Terminal cleared', timestamp: getCurrentTimestamp()},
        ]);
        break;
        
      case 'ls':
        if (currentDirectory === '~/projects') {
          const projectList = projects.map(p => p.name).join('\n');
          setHistory(prev => [...prev, {
            type: 'output', 
            content: projectList || 'No projects found', 
            timestamp: getCurrentTimestamp()
          }]);
        } else {
          const projectName = currentDirectory.split('/').pop();
          const projectScripts = projectName ? scripts[projectName as keyof typeof scripts] : null;
          
          if (projectScripts) {
            const scriptList = projectScripts.map(s => s.name).join('\n');
            setHistory(prev => [...prev, {
              type: 'output', 
              content: scriptList || 'No scripts found', 
              timestamp: getCurrentTimestamp()
            }]);
          } else {
            setHistory(prev => [...prev, {
              type: 'error', 
              content: 'Invalid directory', 
              timestamp: getCurrentTimestamp()
            }]);
          }
        }
        break;
        
      case 'cd':
        if (!args[1]) {
          setHistory(prev => [...prev, {
            type: 'error', 
            content: 'Please specify a directory', 
            timestamp: getCurrentTimestamp()
          }]);
          break;
        }
        
        if (args[1] === '..') {
          if (currentDirectory !== '~/projects') {
            setCurrentDirectory('~/projects');
            setHistory(prev => [...prev, {
              type: 'info', 
              content: `Changed directory to ~/projects`, 
              timestamp: getCurrentTimestamp()
            }]);
          } else {
            setHistory(prev => [...prev, {
              type: 'error', 
              content: 'Already at root directory', 
              timestamp: getCurrentTimestamp()
            }]);
          }
        } else {
          const projectExists = projects.some(p => p.name === args[1]);
          
          if (projectExists) {
            setCurrentDirectory(`~/projects/${args[1]}`);
            setHistory(prev => [...prev, {
              type: 'info', 
              content: `Changed directory to ~/projects/${args[1]}`, 
              timestamp: getCurrentTimestamp()
            }]);
          } else {
            setHistory(prev => [...prev, {
              type: 'error', 
              content: `Directory '${args[1]}' not found`, 
              timestamp: getCurrentTimestamp()
            }]);
          }
        }
        break;
        
      case 'run':
        if (!args[1]) {
          setHistory(prev => [...prev, {
            type: 'error', 
            content: 'Please specify a script to run', 
            timestamp: getCurrentTimestamp()
          }]);
          break;
        }
        
        const projectName = currentDirectory.split('/').pop();
        if (projectName && currentDirectory !== '~/projects') {
          const projectScripts = scripts[projectName as keyof typeof scripts];
          const scriptExists = projectScripts?.some(s => s.name === args[1]);
          
          if (scriptExists) {
            setHistory(prev => [...prev, {
              type: 'info', 
              content: `Running script '${args[1]}'...`, 
              timestamp: getCurrentTimestamp()
            }]);
            
            simulateTyping(`
$ Setting up environment...
$ Validating dependencies...
$ Executing ${args[1]}

[Step 1/3] Initializing components
[Step 2/3] Processing data
[Step 3/3] Finalizing execution

Script '${args[1]}' completed successfully in 3.2s
            `);
          } else {
            setHistory(prev => [...prev, {
              type: 'error', 
              content: `Script '${args[1]}' not found`, 
              timestamp: getCurrentTimestamp()
            }]);
          }
        } else {
          setHistory(prev => [...prev, {
            type: 'error', 
            content: 'You must be inside a project to run a script', 
            timestamp: getCurrentTimestamp()
          }]);
        }
        break;
        
      case 'create':
        if (!args[1] || !args[2]) {
          setHistory(prev => [...prev, {
            type: 'error', 
            content: 'Usage: create <project|script> <name>', 
            timestamp: getCurrentTimestamp()
          }]);
          break;
        }
        
        if (args[1] === 'project') {
          setHistory(prev => [...prev, {
            type: 'info', 
            content: `Creating new project '${args[2]}'...`, 
            timestamp: getCurrentTimestamp()
          }]);
          
          simulateTyping(`
$ Initializing project structure
$ Creating configuration files
$ Setting up default scripts

Project '${args[2]}' created successfully!
You can now use 'cd ${args[2]}' to navigate to it.
          `);
        } else if (args[1] === 'script') {
          const projectName = currentDirectory.split('/').pop();
          
          if (projectName && currentDirectory !== '~/projects') {
            setHistory(prev => [...prev, {
              type: 'info', 
              content: `Creating new script '${args[2]}' in project '${projectName}'...`, 
              timestamp: getCurrentTimestamp()
            }]);
            
            simulateTyping(`
$ Creating script template
$ Adding to project registry

Script '${args[2]}' created successfully!
Use 'run ${args[2]}' to execute it.
            `);
          } else {
            setHistory(prev => [...prev, {
              type: 'error', 
              content: 'You must be inside a project to create a script', 
              timestamp: getCurrentTimestamp()
            }]);
          }
        } else {
          setHistory(prev => [...prev, {
            type: 'error', 
            content: `Unknown type '${args[1]}'. Use 'project' or 'script'`, 
            timestamp: getCurrentTimestamp()
          }]);
        }
        break;
        
      case 'version':
        setHistory(prev => [...prev, {
          type: 'output', 
          content: 'Vader CLI v1.0.0', 
          timestamp: getCurrentTimestamp()
        }]);
        break;
        
      case 'vader':
        if (args[1] === 'web') {
          setHistory(prev => [...prev, {
            type: 'info', 
            content: 'Opening Vader web interface...', 
            timestamp: getCurrentTimestamp()
          }]);
          setTimeout(() => navigate('/dashboard'), 1500);
        } else {
          setHistory(prev => [...prev, {
            type: 'output', 
            content: `
  /\\   /\\__ _  __| | ___ _ __ 
  \\ \\ / / _\` |/ _\` |/ _ \\ '__|
   \\ V / (_| | (_| |  __/ |   
    \\_/ \\__,_|\\__,_|\\___|_|   
                         
The tool for seamless script automation.
            `, 
            timestamp: getCurrentTimestamp()
          }]);
        }
        break;
        
      default:
        setHistory(prev => [...prev, {
          type: 'error', 
          content: `Command not found: ${command}. Type 'help' for available commands.`, 
          timestamp: getCurrentTimestamp()
        }]);
    }
  };

  return (
    <Layout>
      <div className="container max-w-6xl py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            <Card className="shadow-lg border-2">
              <CardHeader className="bg-secondary/20 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TerminalSquare className="h-5 w-5 text-primary" />
                    <CardTitle>Vader CLI</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono bg-muted/50">
                      {currentDirectory}
                    </Badge>
                    <Button variant="ghost" size="icon" onClick={() => {
                      navigator.clipboard.writeText(history.filter(h => h.type === 'input').map(h => h.content).join('\n'));
                    }}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setHistory([
                        {type: 'info', content: 'Terminal cleared', timestamp: getCurrentTimestamp()},
                        {type: 'info', content: 'Type "help" to see available commands', timestamp: getCurrentTimestamp()},
                      ])}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Experience the power of Vader through the command line
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <div 
                  ref={terminalRef}
                  className="bg-black text-green-500 font-mono text-sm p-4 h-[400px] overflow-y-auto"
                >
                  {history.map((entry, index) => (
                    <div key={index} className="mb-1">
                      {entry.type === 'input' ? (
                        <div className="flex items-start">
                          <span className="text-cyan-300 mr-2">{currentDirectory} $</span>
                          <span>{entry.content}</span>
                        </div>
                      ) : entry.type === 'error' ? (
                        <div className="text-red-400 pl-4">{entry.content}</div>
                      ) : entry.type === 'info' ? (
                        <div className="text-yellow-300 pl-4">{entry.content}</div>
                      ) : (
                        <div className="text-green-300 pl-4 whitespace-pre-line">{entry.content}</div>
                      )}
                    </div>
                  ))}
                  {isRunning && (
                    <div className="inline-block w-2 h-4 bg-green-500 animate-pulse"></div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="border-t p-2 bg-secondary/20">
                <form onSubmit={handleSubmit} className="w-full flex gap-2">
                  <div className="flex-none text-muted-foreground font-mono flex items-center">
                    <ArrowRight className="h-3 w-3 mr-1" />
                  </div>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a command..."
                    className="flex-1 font-mono bg-background/50 focus-visible:ring-primary"
                    disabled={isRunning}
                  />
                  <Button 
                    type="submit"
                    size="icon"
                    disabled={isRunning || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>

          <div className="lg:w-1/3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-primary" />
                  Quick Reference
                </CardTitle>
                <CardDescription>Common commands for Vader CLI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Navigation</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="font-mono"><span className="text-primary">ls</span> - List projects/scripts</li>
                    <li className="font-mono"><span className="text-primary">cd &lt;dir&gt;</span> - Change directory</li>
                    <li className="font-mono"><span className="text-primary">cd ..</span> - Go up one directory</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Script Management</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="font-mono"><span className="text-primary">run &lt;script&gt;</span> - Execute a script</li>
                    <li className="font-mono"><span className="text-primary">create script &lt;name&gt;</span> - Create new script</li>
                    <li className="font-mono"><span className="text-primary">create project &lt;name&gt;</span> - Create new project</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Utilities</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="font-mono"><span className="text-primary">help</span> - Show help</li>
                    <li className="font-mono"><span className="text-primary">clear</span> - Clear terminal</li>
                    <li className="font-mono"><span className="text-primary">version</span> - Show CLI version</li>
                    <li className="font-mono"><span className="text-primary">vader web</span> - Open web interface</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 ml-auto"
                  onClick={() => setShowHints(!showHints)}
                >
                  <Italic className="h-4 w-4" />
                  {showHints ? "Hide Hints" : "Show Hints"}
                </Button>
              </CardFooter>
            </Card>

            {showHints && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Try These Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-primary text-sm h-auto py-1"
                    onClick={() => {
                      setInput("ls");
                      setHistory(prev => [...prev, {
                        type: 'info', 
                        content: 'Hint: This will list all projects', 
                        timestamp: getCurrentTimestamp()
                      }]);
                    }}
                  >
                    ls
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-primary text-sm h-auto py-1"
                    onClick={() => {
                      setInput("cd web-automation");
                      setHistory(prev => [...prev, {
                        type: 'info', 
                        content: 'Hint: Navigate to a project', 
                        timestamp: getCurrentTimestamp()
                      }]);
                    }}
                  >
                    cd web-automation
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-primary text-sm h-auto py-1"
                    onClick={() => {
                      setInput("run setup-chrome-driver");
                      setHistory(prev => [...prev, {
                        type: 'info', 
                        content: 'Hint: Execute a script within a project', 
                        timestamp: getCurrentTimestamp()
                      }]);
                    }}
                  >
                    run setup-chrome-driver
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-primary text-sm h-auto py-1"
                    onClick={() => {
                      setInput("create script monitoring");
                      setHistory(prev => [...prev, {
                        type: 'info', 
                        content: 'Hint: Create a new script in the current project', 
                        timestamp: getCurrentTimestamp()
                      }]);
                    }}
                  >
                    create script monitoring
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start font-mono text-primary text-sm h-auto py-1"
                    onClick={() => {
                      setInput("vader");
                      setHistory(prev => [...prev, {
                        type: 'info', 
                        content: 'Hint: Show the ASCII art logo', 
                        timestamp: getCurrentTimestamp()
                      }]);
                    }}
                  >
                    vader
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CLI;
