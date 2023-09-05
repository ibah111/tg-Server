import { Controller, Get, Post } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser() {
    return this.userService.createUserOnStart();
  }
  @Get()
  async getUser() {
    return 'this method must return user by id';
  }
  @Get()
  async getAllUsers() {
    return 'this method must return all Users from DB';
  }
}
