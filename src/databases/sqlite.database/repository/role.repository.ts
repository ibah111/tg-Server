import { Injectable } from '@nestjs/common';
import { Roles } from '../models/role.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class RoleRepository {
  constructor(
    @InjectModel(Roles, 'local')
    private readonly modelRole: typeof Roles,
  ) {}

  async createRole(role: Roles) {
    return await this.modelRole.create(role);
  }

  async findById(id: number) {
    return await this.modelRole.findByPk(id);
  }
}
