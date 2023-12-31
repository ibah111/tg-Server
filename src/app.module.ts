import { Module } from '@nestjs/common';
import { ModuleOfModules } from './modules';
import { PagesModule } from './pages/index.module';
import { BotModule } from './modules/bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import getConfig from './utils/getConfig';

@Module({
  imports: [
    ModuleOfModules,
    PagesModule,
    BotModule,
    ConfigModule.forRoot({
      load: [getConfig],
      envFilePath: '.env',
    }),
  ],
})
export class AppModule {}
