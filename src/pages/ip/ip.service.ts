import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';
import { exec } from 'child_process';
import { minecraft_settings } from 'src/json';
import ip from 'ip';

@Injectable()
export default class IpService {
  constructor() {}
  getIp(ctx: Context) {
    const port = minecraft_settings.port;
    const format_port = ':' + port;
    exec('curl ip-adresim.app', (err, stdout) => {
      if (err) {
        ctx.reply('error happened: ');
        console.log(err);
        return err;
      } else {
        const local_ip = ip.address() + format_port;
        const public_ip = stdout.replace('\n', '') + format_port;
        console.log(public_ip);
        ctx.reply(`Public: ${public_ip}\nLocal: ${local_ip}`);
      }
    });
  }
}
