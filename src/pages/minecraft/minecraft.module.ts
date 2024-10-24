import { Module } from '@nestjs/common';
import MinecractController from './minecraft.controller';
import IpService from 'src/modules/ip/ip.service';
import { MinecraftService } from './minecraft.service';

@Module({
  controllers: [MinecractController],
  providers: [MinecraftService, IpService],
})
export default class MinecraftModule {}
