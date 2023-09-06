import { Module } from '@nestjs/common';
import { ModuleOfModules } from './modules';
import { PagesModule } from './pages/index.module';
import { BotModule } from './modules/bot/bot.module';

@Module({
  imports: [ModuleOfModules, PagesModule, BotModule],
})
export class AppModule {}
