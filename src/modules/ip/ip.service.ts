import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import ip from 'ip';
import util from 'util';

@Injectable()
export default class IpService {
  constructor() {}
  async getIp(command = 'curl ip-adresim.app') {
    const execProm = util.promisify(exec);
    const public_ip = (await execProm(command)).stdout.replace('\n', '');
    const local_ip = ip.address();
    const data = {
      local_ip,
      public_ip,
    };
    console.log(data);
    return data;
  }
}
