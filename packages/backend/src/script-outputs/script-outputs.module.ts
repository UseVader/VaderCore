import { Module } from '@nestjs/common';
import { ScriptOutputsController } from './script-outputs.controller';
import { ScriptOutputsService } from './script-outputs.service';
import { ScriptsModule } from 'src/scripts/scripts.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ScriptsModule, PrismaModule],
  controllers: [ScriptOutputsController],
  providers: [ScriptOutputsService],
  exports: [ScriptOutputsService],
})
export class ScriptOutputsModule {}
