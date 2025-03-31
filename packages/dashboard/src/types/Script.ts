import { Command } from "./Command";

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

// export interface Script {
//   id: string;
//   name: string;
//   createdAt: string;
//   updatedAt: string;
//   commands: ScriptCommand[];
// }
