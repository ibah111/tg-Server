import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MinecraftService } from './minecraft.service';

@ApiTags('Minecraft')
@Controller('Minecraft')
export default class MinecractController {
  constructor(private readonly service: MinecraftService) {}

  @Post('getMinecraftServerIp')
  async getMinecraftIp() {
    const data = await this.service.getMinecraftServerIp();
    return data;
  }
}
