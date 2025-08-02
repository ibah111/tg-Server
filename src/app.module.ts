import { Module } from '@nestjs/common';
import { ModuleOfModules } from './modules';
import { PagesModule } from './pages/index.module';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import getConfig from './shared/utils/get-config';
import { YtdlModule } from './modules/ytdl/ytdl.module';
import { OllamaModule } from './modules/ollama/ollama.module';

@Module({
  imports: [
    ModuleOfModules,
    PagesModule,
    BotModule,
    ConfigModule.forRoot({
      load: [getConfig],
      envFilePath: '.env',
      isGlobal: true,
    }),
    YtdlModule,
    OllamaModule,
  ],
})
export class AppModule {}
