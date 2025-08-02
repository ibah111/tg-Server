import { Injectable } from '@nestjs/common';
import IpService from 'src/modules/ip/ip.service';
import { PingMinecraftServerDto } from './dto/minecraft.dto';

@Injectable()
export class MinecraftService {
  constructor(private readonly ipService: IpService) {}

  async getMinecraftServerIp() {
    return this.ipService.getIp();
  }

  async pingMinecraftServer({ host, port }: PingMinecraftServerDto) {
    return this.ipService.pingMinecraftServer(host, port);
  }
}
