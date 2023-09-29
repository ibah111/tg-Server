import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../database/local.database/models/User.model';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(Users, 'local')
    private readonly modelUser: typeof Users,
  ) {}
}
