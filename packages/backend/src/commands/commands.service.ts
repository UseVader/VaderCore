import { HttpStatus, Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateCommandDto from './dtos/create-command.dto';
import UpdateCommandDto from './dtos/update-command.dto';
import * as E from 'fp-ts/Either';
import { RESTError } from 'src/types/RESTError';
import { CommandType } from '@prisma/client';
import { validateCommand } from 'src/utils';

@Injectable()
export class CommandsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCommand(id: string) {
    const command = await this.prisma.command.findUnique({
      where: { id },
    });

    if (!command) {
      return E.left(<RESTError>{
        message: 'commands/not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return E.right(command);
  }

  async getCommands({
    type,
    take = 10,
    cursor = undefined,
  }: {
    type?: string;
    take?: number;
    cursor?: string;
  }) {
    if (!cursor) {
      return this.prisma.command.findMany({
        take,
        where: {
          type: type as CommandType,
        },
        orderBy: {
          id: 'asc',
        },
      });
    }

    return this.prisma.command.findMany({
      take,
      skip: 1,
      cursor: { id: cursor },
      where: {
        type: type as CommandType,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async updateCommand(id: string, command: UpdateCommandDto) {
    try {
      const cmd = await this.getCommand(id);

      if (E.isLeft(cmd)) {
        return E.left(cmd.left);
      }

      if (!validateCommand(command.cmd)) {
        return E.left(<RESTError>{
          message: 'commands/invalid_command',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const updatedCommand = await this.prisma.command.update({
        where: { id },
        data: command,
      });
      return E.right(updatedCommand);
    } catch (error) {
      return E.left(<RESTError>{
        message: 'commands/failed_to_update',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async createCommand(command: CreateCommandDto) {
    if (!validateCommand(command.cmd)) {
      return E.left(<RESTError>{
        message: 'commands/invalid_command',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }

    const newCommand = await this.prisma.command.create({
      data: command,
    });

    return E.right(newCommand);
  }

  async deleteCommand(id: string) {
    try {
      const command = await this.getCommand(id);
      if (E.isLeft(command)) {
        return E.left(command.left);
      }

      await this.prisma.command.delete({
        where: { id },
      });

      return E.right(command);
    } catch (error) {
      return E.left(<RESTError>{
        message: 'commands/failed_to_delete',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
