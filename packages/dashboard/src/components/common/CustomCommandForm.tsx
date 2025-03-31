
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface CustomCommandFormProps {
  onAddCommand: (name: string, shellCommand: string, requiresUserInput: boolean, promptText?: string) => void;
  onCancel: () => void;
}

const CustomCommandForm = ({ onAddCommand, onCancel }: CustomCommandFormProps) => {
  const [name, setName] = useState('');
  const [shellCommand, setShellCommand] = useState('');
  const [requiresUserInput, setRequiresUserInput] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleSubmit = () => {
    if (name.trim() && shellCommand.trim()) {
      onAddCommand(
        name.trim(), 
        shellCommand.trim(), 
        requiresUserInput, 
        requiresUserInput ? promptText.trim() : undefined
      );
    }
  };

  return (
    <Card className="mb-4 shadow-sm animate-fade-in">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-3">Add Custom Command</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="custom-name">Name</Label>
            <Input
              id="custom-name"
              placeholder="Command name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="custom-shell">Shell Command</Label>
            <textarea
              id="custom-shell"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono bg-background"
              placeholder="Enter shell command"
              value={shellCommand}
              onChange={e => setShellCommand(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="requires-input" 
              checked={requiresUserInput}
              onCheckedChange={(checked) => setRequiresUserInput(checked === true)}
            />
            <Label htmlFor="requires-input" className="text-sm cursor-pointer">
              Requires user input
            </Label>
          </div>
          
          {requiresUserInput && (
            <div className="space-y-2">
              <Label htmlFor="prompt-text">Prompt Text</Label>
              <Input
                id="prompt-text"
                placeholder="Enter the prompt text for the user"
                value={promptText}
                onChange={e => setPromptText(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This text will be shown to users when they run the script to prompt them for input.
              </p>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleSubmit}
              disabled={!name || !shellCommand}
            >
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomCommandForm;
