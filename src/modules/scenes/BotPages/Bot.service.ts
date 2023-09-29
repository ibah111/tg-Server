import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from 'src/modules/database/local.database/models/Role.model';
import { User } from 'src/modules/database/local.database/models/User.model';
import { User_Role } from 'src/modules/database/local.database/models/User_Role';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(User, 'local')
    private readonly modelUser: typeof User,
    @InjectModel(Roles, 'local')
    private readonly modelRole: typeof Roles,
    @InjectModel(User_Role, 'local')
    private readonly modelUserRole: typeof User_Role,
  ) {}
}
