import { Command, Update } from 'nestjs-telegraf';
import IpService from './ip.service';
import { Context } from 'telegraf';

@Update()
export default class IpUpdate {
  constructor(private readonly IpTelegramService: IpService) {}

  @Command('ip')
  getIp(ctx: Context) {
    return this.IpTelegramService.getIp(ctx);
  }
}
