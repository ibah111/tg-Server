import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserCreateInput } from './user.input';
import { UserService } from './user.service';

@Module({
  imports: [UserCreateInput],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
