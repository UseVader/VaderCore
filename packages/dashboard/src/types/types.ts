export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
};

export type Workspace = {
  id: string;
  name: string;
  isPersonal: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  workspaceId: string;
  scriptsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Script = {
  id: string;
  name: string;
  description: string;
  projectId: string;
  tags: string[];
  commands: Command[];
  createdAt: string;
  updatedAt: string;
};

export type CommandType = 'PREDEFINED' | 'CUSTOM';

export interface Command {
  id: string;
  name: string;
  shellCommand: string;
  type: 'PREDEFINED' | 'CUSTOM';
  description?: string;
  expectedOutput?: string;
  scriptId: string;
  order: number;
  requiresUserInput?: boolean;
  promptText?: string;
}

export type ExecutionLog = {
  id: string;
  scriptId: string;
  scriptName: string;
  userId: string;
  timestamp: string;
  stdout: string;
  stderr: string;
  environment: {
    os: string;
    architecture: string;
    [key: string]: string;
  };
};
