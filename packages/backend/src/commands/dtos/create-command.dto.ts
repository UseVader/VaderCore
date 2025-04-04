import { CommandType } from '@prisma/client';

class CreateCommandDto {
  title: string;
  cmd: string;
  type: CommandType;
  isInputAllowed?: boolean;
}

export default CreateCommandDto;
