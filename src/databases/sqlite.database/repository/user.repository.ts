import { Injectable } from '@nestjs/common';
import { Users } from '../models/User.model';

@Injectable()
export default class UserRepository {
  constructor(private readonly modelUser: typeof Users) {}

  async createUser(user: Users) {
    return await this.modelUser.create(user);
  }

  async findAll() {
    return await this.modelUser.findAll();
  }
}
