import { Injectable } from '@nestjs/common';
import { UserCreateInput } from './user.input';

@Injectable()
export class UserService {
  createUserOnStart(body: UserCreateInput) {
    return;
  }
}
