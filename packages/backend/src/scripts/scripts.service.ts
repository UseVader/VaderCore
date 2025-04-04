import { HttpStatus, Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import CreateScriptDto from './dto/create-script.dto';
import UpdateScriptDto from './dto/update-script.dto';
import * as E from 'fp-ts/Either';
import { RESTError } from 'src/types/RESTError';

@Injectable()
export class ScriptsService {
  constructor(private readonly prisma: PrismaService) {}

  async getScripts({
    take = 10,
    cursor = undefined,
  }: {
    take?: number;
    cursor?: string;
  }) {
    if (!cursor) {
      return this.prisma.script.findMany({
        take,
        orderBy: {
          id: 'asc',
        },
      });
    }

    return this.prisma.script.findMany({
      take,
      skip: 1,
      cursor: { id: cursor },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async getScript(id: string) {
    const script = await this.prisma.script.findUnique({
      where: { id },
    });

    if (!script) {
      return E.left(<RESTError>{
        message: 'scripts/not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return E.right(script);
  }

  async createScript(script: CreateScriptDto) {
    try {
      const newScript = await this.prisma.script.create({
        data: {
          name: script.name,
          alias: 'some-thing',
          User: {
            connect: {
              uid: script.user.uid,
            },
          },
        },
      });

      if (!newScript) {
        return E.left(<RESTError>{
          message: 'scripts/create_failed',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        });
      }

      const newScriptCommands = await this.prisma.scriptCommand.createMany({
        data: script.commands?.map(
          (command: { id: string; args?: string }, index) => ({
            commandId: command.id,
            scriptId: newScript.id,
            order: index,
            args: command.args,
          }),
        ),
      });

      return E.right({
        ...newScript,
        commands: newScriptCommands,
      });
    } catch (error) {
      console.log(error);
      return E.left(<RESTError>{
        message: 'scripts/create_failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async deleteScript(id: string) {
    try {
      const script = await this.getScript(id);
      if (E.isLeft(script)) {
        return script;
      }

      await this.prisma.script.delete({
        where: { id },
      });

      return E.right(script.right);
    } catch {
      return E.left(<RESTError>{
        message: 'scripts/delete_failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async updateScript(id: string, script: UpdateScriptDto) {
    try {
      const scriptToUpdate = await this.getScript(id);
      if (E.isLeft(scriptToUpdate)) {
        return scriptToUpdate;
      }

      if (!scriptToUpdate) {
        return E.left(<RESTError>{
          message: 'scripts/not_found',
          statusCode: HttpStatus.NOT_FOUND,
        });
      }

      if (script?.name) {
        scriptToUpdate.right.name = script.name;
        await this.prisma.script.update({
          where: { id },
          data: { name: script.name },
        });
      }

      if (script?.commands) {
        await this.prisma.script.update({
          where: { id },
          data: { revision: { increment: 1 } },
        });

        await this.prisma.scriptCommand.deleteMany({
          where: { scriptId: id },
        });

        await this.prisma.scriptCommand.createMany({
          data: script.commands?.map(
            (command: { id: string; args?: string }, index) => ({
              commandId: command.id,
              scriptId: id,
              order: index,
              args: command.args,
            }),
          ),
        });
      }

      return E.right(scriptToUpdate.right);
    } catch {
      return E.left(<RESTError>{
        message: 'scripts/update_failed',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async getParsedScript(id: string) {
    const script = await this.getScript(id);
    if (E.isLeft(script)) {
      return script;
    }

    const scriptCommands = await this.prisma.scriptCommand.findMany({
      where: {
        scriptId: id,
      },
      include: {
        command: true,
        script: true,
      },
    });

    const parsedScript = scriptCommands?.map((command) => {
      if (command.command.isInputRequired) {
        const args: any = command.inputArgs
          ? JSON.parse(command.inputArgs)
          : {};
        let cmd = command.command.cmd;
        Object.keys(args).forEach((key) => {
          cmd = cmd.replaceAll(`${key}`, args[key]);
        });
        return {
          command: cmd,
          title: command.command.title,
          id: command.command.id,
          scriptCommandId: command.id,
          scriptId: script.right.id,
          scriptName: script.right.name,
        };
      }
      return {
        command: command.command.cmd,
        title: command.command.title,
        id: command.command.id,
        scriptCommandId: command.id,
        scriptId: script.right.id,
        scriptName: script.right.name,
      };
    });

    return E.right(parsedScript);
  }

  async getScriptCommand(id: string) {
    const scriptCommand = await this.prisma.scriptCommand.findUnique({
      where: { id },
      include: {
        command: true,
        script: true,
      },
    });

    if (!scriptCommand) {
      return E.left(<RESTError>{
        message: 'scripts/not_found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }

    return E.right(scriptCommand);
  }
}
