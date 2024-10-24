import { Module } from '@nestjs/common';
import IpService from './ip.service';

@Module({
  providers: [IpService],
  exports: [IpService],
})
export default class IpModule {}
