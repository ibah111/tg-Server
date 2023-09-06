import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../database/local.database/models/user.model';

@Injectable()
export class BotService {
  constructor(
    @InjectModel(User, 'local')
    private readonly modelUser: typeof User,
  ) {}
}
