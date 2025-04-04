import { CommandType } from '@prisma/client';
import { IsNumber, IsOptional, IsString } from 'class-validator';

class GetCommandDto {
  @IsString()
  @IsOptional()
  type?: CommandType;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsString()
  @IsOptional()
  cursor?: string;
}

export default GetCommandDto;
