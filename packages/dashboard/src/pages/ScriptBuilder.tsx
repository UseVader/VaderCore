
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, Plus, Save, Tag, X, Terminal, Search } from 'lucide-react';
import CommandItem from '@/components/ui/CommandItem';
import { Command as CommandType } from '@/lib/types';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem as CommandMenuItem, CommandList } from "@/components/ui/command";

// Mock data for predefined commands
const predefinedCommands: CommandType[] = [
  {
    id: 'predef-1',
    name: 'Check Node Version',
    shellCommand: 'node --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Node.js version',
    expectedOutput: 'v18.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-2',
    name: 'Check NPM Version',
    shellCommand: 'npm --version',
    type: 'PREDEFINED',
    description: 'Displays the installed npm version',
    expectedOutput: '9.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-3',
    name: 'Docker Version',
    shellCommand: 'docker --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Docker version',
    expectedOutput: 'Docker version 24.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-4',
    name: 'Git Version',
    shellCommand: 'git --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Git version',
    expectedOutput: 'git version 2.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-5',
    name: 'Check Python Version',
    shellCommand: 'python --version || python3 --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Python version',
    expectedOutput: 'Python 3.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-6',
    name: 'Java Version',
    shellCommand: 'java -version',
    type: 'PREDEFINED',
    description: 'Displays the installed Java version',
    expectedOutput: 'java version "11.x.x"',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-7',
    name: 'Ruby Version',
    shellCommand: 'ruby --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Ruby version',
    expectedOutput: 'ruby 3.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-8',
    name: 'Go Version',
    shellCommand: 'go version',
    type: 'PREDEFINED',
    description: 'Displays the installed Go version',
    expectedOutput: 'go version go1.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-9',
    name: 'Maven Version',
    shellCommand: 'mvn --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Maven version',
    expectedOutput: 'Apache Maven 3.x.x',
    scriptId: '',
    order: 0
  },
  {
    id: 'predef-10',
    name: 'Gradle Version',
    shellCommand: 'gradle --version',
    type: 'PREDEFINED',
    description: 'Displays the installed Gradle version',
    expectedOutput: 'Gradle 7.x.x',
    scriptId: '',
    order: 0
  }
];

const ScriptBuilder = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [scriptName, setScriptName] = useState('');
  const [scriptDescription, setScriptDescription] = useState('');
  const [scriptTags, setScriptTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedCommands, setSelectedCommands] = useState<CommandType[]>([]);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [customCommandName, setCustomCommandName] = useState('');
  const [customCommandShell, setCustomCommandShell] = useState('');
  const [showCustomCommandForm, setShowCustomCommandForm] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filteredCommands, setFilteredCommands] = useState(predefinedCommands);
  
  useEffect(() => {
    if (searchValue) {
      setFilteredCommands(
        predefinedCommands.filter(cmd => 
          cmd.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          cmd.shellCommand.toLowerCase().includes(searchValue.toLowerCase()) ||
          (cmd.description && cmd.description.toLowerCase().includes(searchValue.toLowerCase()))
        )
      );
    } else {
      setFilteredCommands(predefinedCommands);
    }
  }, [searchValue]);
  
  const addTag = () => {
    if (tagInput.trim() && !scriptTags.includes(tagInput.trim())) {
      setScriptTags([...scriptTags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const removeTag = (tag: string) => {
    setScriptTags(scriptTags.filter(t => t !== tag));
  };
  
  const addCommand = (command: CommandType) => {
    setSelectedCommands([
      ...selectedCommands, 
      { 
        ...command, 
        id: `cmd-${Date.now()}`, 
        order: selectedCommands.length,
        scriptId: 'new-script'
      }
    ]);
    setShowCommandPalette(false);
    setSearchValue('');
  };
  
  const addCustomCommand = () => {
    if (customCommandName.trim() && customCommandShell.trim()) {
      const newCommand: CommandType = {
        id: `custom-${Date.now()}`,
        name: customCommandName.trim(),
        shellCommand: customCommandShell.trim(),
        type: 'CUSTOM',
        scriptId: 'new-script',
        order: selectedCommands.length
      };
      
      setSelectedCommands([...selectedCommands, newCommand]);
      setCustomCommandName('');
      setCustomCommandShell('');
      setShowCustomCommandForm(false);
    }
  };
  
  const removeCommand = (index: number) => {
    const newCommands = [...selectedCommands];
    newCommands.splice(index, 1);
    setSelectedCommands(newCommands);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1">
        {/* Script Builder Header */}
        <div className="bg-secondary/50 border-b border-border">
          <div className="container-custom py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <Link to={`/projects/${projectId}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Project
                </Link>
                <h1 className="text-2xl font-bold">New Script</h1>
                <p className="text-muted-foreground mt-1">
                  Create a diagnostic script by adding commands below
                </p>
              </div>
              
              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button variant="outline">
                  Cancel
                </Button>
                <Button disabled={!scriptName || selectedCommands.length === 0}>
                  <Save size={16} className="mr-2" />
                  Save Script
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Script Builder Content */}
        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Metadata */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Script Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Script Name */}
                    <div className="space-y-2">
                      <Label htmlFor="script-name">Name *</Label>
                      <Input
                        id="script-name"
                        placeholder="Enter script name"
                        value={scriptName}
                        onChange={e => setScriptName(e.target.value)}
                      />
                    </div>
                    
                    {/* Script Description */}
                    <div className="space-y-2">
                      <Label htmlFor="script-description">Description</Label>
                      <textarea
                        id="script-description"
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] bg-background"
                        placeholder="Enter a description of what this script checks or verifies"
                        value={scriptDescription}
                        onChange={e => setScriptDescription(e.target.value)}
                      />
                    </div>
                    
                    {/* Script Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="script-tags">Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {scriptTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1 py-1">
                            <span>{tag}</span>
                            <button
                              onClick={() => removeTag(tag)}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex">
                        <Input
                          id="script-tags"
                          className="rounded-r-none"
                          placeholder="Add a tag"
                          value={tagInput}
                          onChange={e => setTagInput(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && addTag()}
                        />
                        <Button
                          onClick={addTag}
                          className="rounded-l-none"
                          variant="secondary"
                        >
                          <Plus size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Script ID</h3>
                    <div className="bg-muted p-2 rounded-md text-sm font-mono text-muted-foreground">
                      auto-generated-upon-save
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      The script ID will be generated automatically when you save the script.
                      You'll use this ID with the CLI to run the script.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Commands Builder */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">Commands</CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setShowCustomCommandForm(true);
                          setShowCommandPalette(false);
                        }}
                      >
                        <Plus size={14} className="mr-1" />
                        Custom Command
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => {
                          setShowCommandPalette(true);
                          setShowCustomCommandForm(false);
                        }}
                      >
                        <Plus size={14} className="mr-1" />
                        Add Command
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Custom Command Form */}
                  {showCustomCommandForm && (
                    <Card className="mb-4 shadow-sm animate-fade-in">
                      <CardContent className="p-4">
                        <h3 className="text-sm font-medium mb-3">Add Custom Command</h3>
                        <div className="space-y-3">
                          <div className="space-y-2">
                            <Label htmlFor="custom-name">Name</Label>
                            <Input
                              id="custom-name"
                              placeholder="Command name"
                              value={customCommandName}
                              onChange={e => setCustomCommandName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="custom-shell">Shell Command</Label>
                            <textarea
                              id="custom-shell"
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono bg-background"
                              placeholder="Enter shell command"
                              value={customCommandShell}
                              onChange={e => setCustomCommandShell(e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setShowCustomCommandForm(false)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              size="sm"
                              onClick={addCustomCommand}
                              disabled={!customCommandName || !customCommandShell}
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Predefined Commands Palette with Search */}
                  {showCommandPalette && (
                    <div className="mb-4 animate-fade-in">
                      <Command className="rounded-lg border shadow-md">
                        <div className="flex items-center space-x-2 p-2 border-b">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <CommandInput 
                            placeholder="Search commands..." 
                            autoFocus
                            value={searchValue}
                            onValueChange={setSearchValue}
                            className="border-0 outline-none p-0 focus-visible:ring-0"
                          />
                        </div>
                        <CommandList>
                          <CommandGroup heading="Predefined Commands">
                            {filteredCommands.length > 0 ? (
                              filteredCommands.map(command => (
                                <CommandMenuItem
                                  key={command.id}
                                  onSelect={() => addCommand(command)}
                                  className="flex flex-col items-start"
                                >
                                  <div className="flex items-center w-full">
                                    <Terminal size={14} className="text-primary mr-2" />
                                    <span className="font-medium">{command.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground mt-1 truncate w-full pl-6">
                                    {command.shellCommand}
                                  </p>
                                </CommandMenuItem>
                              ))
                            ) : (
                              <CommandEmpty>No commands found.</CommandEmpty>
                            )}
                          </CommandGroup>
                        </CommandList>
                        <div className="flex justify-end p-2 border-t">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setShowCommandPalette(false);
                              setSearchValue('');
                            }}
                          >
                            Close
                          </Button>
                        </div>
                      </Command>
                    </div>
                  )}
                  
                  {/* Selected Commands List */}
                  <div>
                    {selectedCommands.length > 0 ? (
                      <div className="space-y-2">
                        {selectedCommands.map((command, index) => (
                          <CommandItem 
                            key={command.id} 
                            command={command} 
                            onRemove={() => removeCommand(index)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed rounded-lg">
                        <Terminal size={24} className="mx-auto text-muted-foreground mb-2" />
                        <h3 className="text-lg font-medium mb-1">No Commands Added</h3>
                        <p className="text-muted-foreground">
                          Add commands to create your diagnostic script
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ScriptBuilder;
