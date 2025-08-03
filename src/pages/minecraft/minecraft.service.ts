import { Injectable } from '@nestjs/common';
import IpService from 'src/modules/ip/ip.service';
import { GetIpResponce, PingMinecraftServerDto } from './dto/minecraft.dto';

@Injectable()
export class MinecraftService {
  constructor(private readonly ipService: IpService) {}

  async getMinecraftServerIp(): Promise<GetIpResponce | string> {
    return this.ipService.getIp();
  }

  async pingMinecraftServer({ host, port }: PingMinecraftServerDto) {
    return this.ipService.pingMinecraftServer(host, port);
  }
}
