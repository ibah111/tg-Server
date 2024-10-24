import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MinecraftService } from './minecraft.service';

@ApiTags('Minecraft')
@Controller('Minecraft')
export default class MinecractController {
  private readonly service: MinecraftService;

  @Post('getMinecraftServerIp')
  async getMinecraftIp() {
    console.log('getMinecraftServerIp');
    return await this.service.getMinecraftServerIp();
  }
}
