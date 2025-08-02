import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MinecraftService } from './minecraft.service';
import {
  GetIpResponce,
  PingMinecraftServerDto,
  PingMinecraftServerResponse,
} from './dto/minecraft.dto';

@ApiTags('Minecraft')
@Controller('minecraft')
export default class MinecractController {
  constructor(private readonly service: MinecraftService) {}

  @ApiResponse({
    status: 200,
    description: 'Get minecraft server ip',
    type: GetIpResponce,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
    type: String,
    schema: {
      example: 'Server possbily shotdown, ask admin or try later',
    },
  })
  @Get('get-minecraft-server-ip')
  async getMinecraftIp(): Promise<GetIpResponce | string> {
    const data = await this.service.getMinecraftServerIp();
    return data;
  }

  @ApiResponse({
    status: 200,
    description: 'Ping minecraft server',
    type: PingMinecraftServerResponse,
  })
  @Post('ping-minecraft-server')
  async pingMinecraftServer(@Body() body: PingMinecraftServerDto) {
    const data = await this.service.pingMinecraftServer(body);
    return data;
  }
}
