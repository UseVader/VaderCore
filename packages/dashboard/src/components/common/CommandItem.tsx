
import { Command } from '@/lib/types';
import { Terminal, Trash, GripVertical, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CommandItemProps {
  command: Command;
  onRemove?: () => void;
  isDragging?: boolean;
}

const CommandItem = ({ command, onRemove, isDragging = false }: CommandItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div 
      className={`border rounded-lg p-4 mb-2 bg-white transition-all ${
        isDragging ? 'shadow-medium opacity-60' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="cursor-move text-muted-foreground">
            <GripVertical size={16} />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <Terminal size={16} className={command.type === 'PREDEFINED' ? 'text-primary' : 'text-vader-500'} />
              <span className="font-medium">{command.name}</span>
              {command.type === 'PREDEFINED' && (
                <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  Predefined
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDetails(!showDetails)}
            className="h-7 w-7"
          >
            <Info size={16} />
          </Button>
          
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-7 w-7 text-destructive hover:text-destructive/80"
            >
              <Trash size={16} />
            </Button>
          )}
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-4 pl-7">
          <div className="code-block">
            <code>{command.shellCommand}</code>
          </div>
          
          {command.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {command.description}
            </p>
          )}
          
          {command.expectedOutput && (
            <div className="mt-2">
              <div className="text-xs text-muted-foreground mb-1">Expected Output:</div>
              <div className="bg-muted p-2 rounded-md text-sm font-mono">
                {command.expectedOutput}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandItem;
