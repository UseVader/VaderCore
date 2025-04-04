import { Injectable } from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import { CreateScriptOutputDto } from './dto/create-script.dto';
import { ScriptsService } from 'src/scripts/scripts.service';
import * as E from 'fp-ts/Either';
// import { PublicOutputsService } from 'src/public-outputs/public-outputs.service';

@Injectable()
export class ScriptOutputsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scriptService: ScriptsService,
    // private readonly publicOutputsService: PublicOutputsService,
  ) {}

  // async createScriptOutputs(scriptOutputs: CreateScriptOutputDto[]) {
  //   const createdOutputIds: string[] = [];

  //   await Promise.all(
  //     scriptOutputs.map(async (output) => {
  //       const scriptCommand = await this.scriptService.getScriptCommand(
  //         output.scriptCommandId,
  //       );
  //       if (E.isLeft(scriptCommand)) {
  //         return scriptCommand.left;
  //       }

  //       const createdOutput = await this.prisma.commandOutput.create({
  //         data: {
  //           output: output.output,
  //           scriptCommand: {
  //             connect: {
  //               id: scriptCommand.right.id,
  //             },
  //           },
  //           script: {
  //             connect: {
  //               id: scriptCommand.right.scriptId,
  //             },
  //           },
  //         },
  //       });
  //       createdOutputIds.push(createdOutput.id);
  //     }),
  //   );

  //   const publicOutputs =
  //     await this.publicOutputsService.createPublicOutputs(createdOutputIds);

  //   return {
  //     outputURL: publicOutputs.id,
  //   };
  // }
}
