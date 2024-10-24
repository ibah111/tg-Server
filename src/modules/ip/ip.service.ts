import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import ip from 'ip';

@Injectable()
export default class IpService {
  constructor() {}
  getIp() {
    return exec('curl ip-adresim.app', (err, stdout) => {
      if (err) {
        console.log(err);
      } else {
        const local_ip = ip.address();
        const public_ip = stdout.replace('\n', '');
        return { local_ip, public_ip };
      }
    });
  }
}
