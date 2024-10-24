import { Injectable } from '@nestjs/common';
import IpService from 'src/modules/ip/ip.service';

@Injectable()
export class MinecraftService {
  constructor(private readonly ipService: IpService) {}

  async getMinecraftServerIp() {
    try {
      return this.ipService.getIp();
    } catch (error) {
      console.log('Error happened', error);
      throw Error(`${error}`);
    }
  }
}
