import { Injectable } from '@nestjs/common';
import { User_Role } from '../models/user-role.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class UserRoleRepository {
  constructor(
    @InjectModel(User_Role, 'local')
    private readonly modelUserRole: typeof User_Role,
  ) {}

  async createUserRole(userRole: User_Role) {
    return await this.modelUserRole.create(userRole);
  }

  async findById(id: number) {
    return await this.modelUserRole.findByPk(id);
  }
}
