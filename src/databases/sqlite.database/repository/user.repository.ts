import { Injectable } from '@nestjs/common';
import { Users } from '../models/user.model';
import { FindOptions } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectModel(Users, 'local')
    private readonly modelUser: typeof Users,
  ) {}

  async createUser(user: Users) {
    return await this.modelUser.create(user);
  }

  async findById(id: number) {
    return await this.modelUser.findByPk(id);
  }

  async findAll(name?: string) {
    const options: FindOptions = {};
    if (name) {
      options.where = {
        username: name,
      };
    }
    return await this.modelUser.findAll(options);
  }
}
