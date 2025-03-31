
import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Command as CommandType } from '@/types/Command';

interface CommandSearchProps {
  commands: CommandType[];
  onSelectCommand: (command: CommandType) => void;
  onClose: () => void;
}

const CommandSearch = ({ commands, onSelectCommand, onClose }: CommandSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState<CommandType[]>(commands);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCommands(commands);
      return;
    }

    const filtered = commands.filter(cmd => 
      cmd.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cmd.shellCommand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cmd.description && cmd.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredCommands(filtered);
  }, [searchTerm, commands]);

  return (
    <div className="animate-fade-in">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center space-x-2 p-2 border-b">
          <Search className="h-4 w-4 text-muted-foreground" />
          <CommandInput 
            placeholder="Search commands..." 
            autoFocus
            value={searchTerm}
            onValueChange={setSearchTerm}
            className="border-0 outline-none p-0 focus-visible:ring-0"
          />
        </div>
        <CommandList className="max-h-[300px] overflow-y-auto">
          <CommandGroup heading="Available Commands">
            {filteredCommands.length > 0 ? (
              filteredCommands.map(command => (
                <CommandItem
                  key={command.id}
                  onSelect={() => onSelectCommand(command)}
                  className="flex flex-col items-start p-3 cursor-pointer hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-center w-full">
                    <Terminal size={14} className="text-primary mr-2 flex-shrink-0" />
                    <span className="font-medium">{command.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 pl-6">
                    <code className="font-mono">{command.shellCommand}</code>
                  </p>
                  {command.description && (
                    <p className="text-xs text-muted-foreground mt-1 pl-6 line-clamp-2">
                      {command.description}
                    </p>
                  )}
                  {command.requiresUserInput && (
                    <div className="mt-1 pl-6">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        Requires user input
                      </span>
                    </div>
                  )}
                </CommandItem>
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
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Command>
    </div>
  );
};

export default CommandSearch;
