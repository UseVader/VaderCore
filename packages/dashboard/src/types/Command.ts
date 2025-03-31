export type CommandType = "PREDEFINED" | "CUSTOM";

export interface Command {
  id: string;
  name: string;
  shellCommand: string;
  type: "PREDEFINED" | "CUSTOM";
  description?: string;
  expectedOutput?: string;
  scriptId: string;
  order: number;
  requiresUserInput?: boolean;
  promptText?: string;
}

// export interface Command {
//   id: string;
//   title: string;
//   cmd: string;
//   type: "USER_DEFINED" | "DEFAULT";
//   isInputAllowed: boolean;
//   createdAt: string;
//   updatedAt: string;
// }