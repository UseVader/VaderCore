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
