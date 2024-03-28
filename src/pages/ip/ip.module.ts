import { Module } from '@nestjs/common';
import IpService from './ip.service';
import IpUpdate from './ip.update';

@Module({
  providers: [IpService, IpUpdate],
})
export default class IpModule {}
