import React from "react";
import { X, Terminal, Clipboard, AlertCircle } from "lucide-react";
import { Command } from "@/types/Command";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CommandCardProps {
  command: Command;
  onRemove: () => void;
}

const CommandCard = ({ command, onRemove }: CommandCardProps) => {
  return (
    <div className="border rounded-lg p-3 bg-card shadow-sm hover:shadow transition-shadow">
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-primary" />
          <h3 className="font-medium text-foreground">{command.name}</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={onRemove}
        >
          <X size={16} />
        </Button>
      </div>

      <div className="mt-2 bg-secondary/30 p-2 rounded-md">
        <code className="text-xs font-mono text-foreground">
          {command.shellCommand}
        </code>
      </div>

      {command.description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {command.description}
        </p>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {command.requiresUserInput && (
          <Badge variant="outline" className="text-xs">
            Requires Input: {command.promptText || "User input"}
          </Badge>
        )}

        {command.type === "PREDEFINED" && (
          <Badge variant="secondary" className="text-xs">
            Predefined
          </Badge>
        )}

        {command.type === "CUSTOM" && (
          <Badge variant="secondary" className="text-xs">
            Custom
          </Badge>
        )}

        {command.expectedOutput && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Clipboard size={12} className="mr-1" />
            Expected: {command.expectedOutput}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommandCard;
