import { Command } from "./Command";

export interface ScriptCommand {
  id: string;
  commandId: string;
  scriptId: string;
  order: number;
  args: null;
  createdAt: string;
  updatedAt: string;
  command: Command;
}
