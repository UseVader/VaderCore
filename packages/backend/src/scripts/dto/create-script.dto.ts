import { User } from '@prisma/client';

class CreateScriptDto {
  name: string;
  commands: {
    id: string;
    args?: string;
  }[];
  args?: string;
  user: User;
}

export default CreateScriptDto;
