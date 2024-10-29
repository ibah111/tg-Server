import { Module } from '@nestjs/common';
import MinecractController from './minecraft.controller';
import IpService from 'src/modules/ip/ip.service';
import { MinecraftService } from './minecraft.service';
import MinecraftUpdate from './minecraft.update';

@Module({
  controllers: [MinecractController],
  providers: [MinecraftService, MinecraftUpdate, IpService],
})
export default class MinecraftModule {}
