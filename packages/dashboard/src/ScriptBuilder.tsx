import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Plus, Save, Tag, X, Terminal } from "lucide-react";
import CommandCard from "@/components/common/CommandCard";
import CommandSearch from "@/components/common/CommandSearch";
import CustomCommandForm from "@/components/common/CustomCommandForm";
import { Command as CommandType } from "@/lib/types";

// Mock data for predefined commands
const predefinedCommands: CommandType[] = [
  {
    id: "predef-1",
    name: "Check Node Version",
    shellCommand: "node --version",
    type: "PREDEFINED",
    description: "Displays the installed Node.js version",
    expectedOutput: "v18.x.x",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-2",
    name: "Check NPM Version",
    shellCommand: "npm --version",
    type: "PREDEFINED",
    description: "Displays the installed npm version",
    expectedOutput: "9.x.x",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-3",
    name: "Docker Version",
    shellCommand: "docker --version",
    type: "PREDEFINED",
    description: "Displays the installed Docker version",
    expectedOutput: "Docker version 24.x.x",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-4",
    name: "Git Version",
    shellCommand: "git --version",
    type: "PREDEFINED",
    description: "Displays the installed Git version",
    expectedOutput: "git version 2.x.x",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-5",
    name: "Check Python Version",
    shellCommand: "python --version || python3 --version",
    type: "PREDEFINED",
    description: "Displays the installed Python version",
    expectedOutput: "Python 3.x.x",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-6",
    name: "Java Version",
    shellCommand: "java -version",
    type: "PREDEFINED",
    description: "Displays the installed Java version",
    expectedOutput: 'java version "11.x.x"',
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-7",
    name: "Check Environment Variable",
    shellCommand: "echo $ENV_NAME",
    type: "PREDEFINED",
    description: "Gets the value of a specific environment variable",
    requiresUserInput: true,
    promptText: "Enter the environment variable name:",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-8",
    name: "List Installed NPM Packages",
    shellCommand: "npm list --depth=0",
    type: "PREDEFINED",
    description: "Lists all installed npm packages in the current directory",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-9",
    name: "Check Database Connection",
    shellCommand: "ping -c 3 DATABASE_HOST",
    type: "PREDEFINED",
    description: "Checks connectivity to a database host",
    requiresUserInput: true,
    promptText: "Enter the database hostname:",
    scriptId: "",
    order: 0,
  },
  {
    id: "predef-10",
    name: "Free Disk Space",
    shellCommand: "df -h",
    type: "PREDEFINED",
    description: "Displays available disk space",
    scriptId: "",
    order: 0,
  },
];

const ScriptBuilder = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [scriptName, setScriptName] = useState("");
  const [scriptDescription, setScriptDescription] = useState("");
  const [scriptTags, setScriptTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [selectedCommands, setSelectedCommands] = useState<CommandType[]>([]);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [showCustomCommandForm, setShowCustomCommandForm] = useState(false);

  const addTag = () => {
    if (tagInput.trim() && !scriptTags.includes(tagInput.trim())) {
      setScriptTags([...scriptTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setScriptTags(scriptTags.filter((t) => t !== tag));
  };

  const addCommand = (command: CommandType) => {
    setSelectedCommands([
      ...selectedCommands,
      {
        ...command,
        id: `cmd-${Date.now()}`,
        order: selectedCommands.length,
        scriptId: "new-script",
      },
    ]);
    setShowCommandPalette(false);
  };

  const addCustomCommand = (
    name: string,
    shellCommand: string,
    requiresUserInput: boolean,
    promptText?: string
  ) => {
    const newCommand: CommandType = {
      id: `custom-${Date.now()}`,
      name: name,
      shellCommand: shellCommand,
      type: "CUSTOM",
      scriptId: "new-script",
      order: selectedCommands.length,
      requiresUserInput,
      promptText,
    };

    setSelectedCommands([...selectedCommands, newCommand]);
    setShowCustomCommandForm(false);
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
                <Link
                  to={`/projects/${projectId}`}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Back to Project
                </Link>
                <h1 className="text-2xl font-bold">New Script</h1>
                <p className="text-muted-foreground mt-1">
                  Create a diagnostic script by adding commands below
                </p>
              </div>

              <div className="flex space-x-3 mt-4 md:mt-0">
                <Button variant="outline">Cancel</Button>
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
                  <CardTitle className="text-lg font-semibold">
                    Script Details
                  </CardTitle>
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
                        onChange={(e) => setScriptName(e.target.value)}
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
                        onChange={(e) => setScriptDescription(e.target.value)}
                      />
                    </div>

                    {/* Script Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="script-tags">Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {scriptTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1 py-1"
                          >
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
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && addTag()}
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
                      The script ID will be generated automatically when you
                      save the script. You'll use this ID with the CLI to run
                      the script.
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
                    <CardTitle className="text-lg font-semibold">
                      Commands
                    </CardTitle>
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
                    <CustomCommandForm
                      onAddCommand={addCustomCommand}
                      onCancel={() => setShowCustomCommandForm(false)}
                    />
                  )}

                  {/* Command Search */}
                  {showCommandPalette && (
                    <CommandSearch
                      commands={predefinedCommands}
                      onSelectCommand={addCommand}
                      onClose={() => setShowCommandPalette(false)}
                    />
                  )}

                  {/* Selected Commands List */}
                  <div>
                    {selectedCommands.length > 0 ? (
                      <div className="grid grid-cols-1 gap-3">
                        {selectedCommands.map((command, index) => (
                          <CommandCard
                            key={command.id}
                            command={command}
                            onRemove={() => removeCommand(index)}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed rounded-lg">
                        <Terminal
                          size={24}
                          className="mx-auto text-muted-foreground mb-2"
                        />
                        <h3 className="text-lg font-medium mb-1">
                          No Commands Added
                        </h3>
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
