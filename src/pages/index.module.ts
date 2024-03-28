import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';
import IpModule from './ip/ip.module';

@Module({
  imports: [UserModule, IpModule],
})
export class PagesModule {}
