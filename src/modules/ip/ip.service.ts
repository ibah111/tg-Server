import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import ip from 'ip';
import util from 'util';

@Injectable()
export default class IpService {
  constructor() {}
  async getIp(command = 'curl ip-adresim.app') {
    const port = 25565;
    const execProm = util.promisify(exec);
    const public_ip =
      (await execProm(command)).stdout.replace('\n', '') + `:${port}`;
    const local_ip = ip.address() + `:${port}`;
    const domain_name = 'ibahbalezin.ddns.net';
    const data = {
      local_ip,
      public_ip,
      domain_connect: `${domain_name}:${port}`,
    };
    return data;
  }
}
