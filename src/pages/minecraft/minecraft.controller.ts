import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MinecraftService } from './minecraft.service';

@ApiTags('Minecraft')
@Controller('minecraft')
export default class MinecractController {
  constructor(private readonly service: MinecraftService) {}

  @Post('get-minecraft-server-ip')
  async getMinecraftIp() {
    const data = await this.service.getMinecraftServerIp();
    return data;
  }
}
