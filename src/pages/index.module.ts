import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';

@Module({
  imports: [UserModule],
})
export class PagesModule {}
