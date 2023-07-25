import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCreateInput } from './user.input';

@Module({
  imports: [UserCreateInput],
  controllers: [UserController],
  providers: [], // user serivce
})
export class UserModule {}
