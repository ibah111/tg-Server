import { Module } from '@nestjs/common';
import MinecractController from './minecraft.controller';
import IpService from 'src/modules/ip/ip.service';
import { MinecraftService } from './minecraft.service';
import MinecraftUpdate from './minecraft.update';
import { BotModule } from 'src/modules/bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [MinecractController],
  providers: [MinecraftService, IpService, MinecraftUpdate],
  exports: [MinecraftUpdate],
})
export default class MinecraftModule {}
