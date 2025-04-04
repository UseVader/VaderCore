import { Body, Controller, Post } from '@nestjs/common';
import { ScriptOutputsService } from './script-outputs.service';
import { CreateScriptOutputDto } from './dto/create-script.dto';

@Controller('outputs')
export class ScriptOutputsController {
  constructor(private readonly scriptOutputsService: ScriptOutputsService) {}

  // @Post()
  // async createScriptOutputs(@Body() scriptOutputs: CreateScriptOutputDto[]) {
  //   return await this.scriptOutputsService.createScriptOutputs(scriptOutputs);
  // }
}
