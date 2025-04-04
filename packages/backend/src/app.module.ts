import { Module } from '@nestjs/common';
import { CommandsModule } from './commands/commands.module';
import { ScriptsModule } from './scripts/scripts.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ScriptOutputsModule } from './script-outputs/script-outputs.module';

@Module({
  imports: [
    CommandsModule,
    ScriptsModule,
    AuthModule,
    PrismaModule,
    UserModule,
    ScriptOutputsModule,
  ],
})
export class AppModule {}
