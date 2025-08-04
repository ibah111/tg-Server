import { Injectable } from '@nestjs/common';
import { Sessions } from '../models/session.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class SessionRepository {
  constructor(
    @InjectModel(Sessions, 'local')
    private readonly modelSession: typeof Sessions,
  ) {}

  async createSession(session: Sessions) {
    return await this.modelSession.create(session);
  }

  async findById(id: number) {
    return await this.modelSession.findByPk(id);
  }
}
