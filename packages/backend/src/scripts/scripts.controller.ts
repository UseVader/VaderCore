import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import CreateScriptDto from './dto/create-script.dto';
import UpdateScriptDto from './dto/update-script.dto';
import GetScriptsDto from './dto/get-scripts.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as E from 'fp-ts/Either';
import { throwHTTPErr } from 'src/utils';
@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getScripts(@Query() query: GetScriptsDto) {
    const take =
      query && typeof query.take === 'string'
        ? parseInt(query.take)
        : query?.take;
    const response = await this.scriptsService.getScripts({ ...query, take });
    return response;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getScript(@Param('id') id: string) {
    const script = await this.scriptsService.getScript(id);
    if (E.isLeft(script)) {
      throwHTTPErr(script.left);
    }
    return script.right;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createScript(@Body() script: CreateScriptDto) {
    const newScript = await this.scriptsService.createScript(script);
    if (E.isLeft(newScript)) {
      throwHTTPErr(newScript.left);
    }
    return newScript.right;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateScript(@Param('id') id: string, @Body() script: UpdateScriptDto) {
    const updatedScript = await this.scriptsService.updateScript(id, script);
    if (E.isLeft(updatedScript)) {
      throwHTTPErr(updatedScript.left);
    }
    return updatedScript.right;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteScript(@Param('id') id: string) {
    const deletedScript = await this.scriptsService.deleteScript(id);
    if (E.isLeft(deletedScript)) {
      throwHTTPErr(deletedScript.left);
    }
    return deletedScript.right;
  }

  @Get(':id/parsed')
  async getParsedScript(@Param('id') id: string) {
    const parsedScript = await this.scriptsService.getParsedScript(id);
    if (E.isLeft(parsedScript)) {
      throwHTTPErr(parsedScript.left);
    }
    return parsedScript.right;
  }
}
