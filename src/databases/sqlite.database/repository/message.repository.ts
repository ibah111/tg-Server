import { Injectable } from '@nestjs/common';
import { Messages } from '../models/message.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class MessageRepository {
  constructor(
    @InjectModel(Messages, 'local')
    private readonly modelMessage: typeof Messages,
  ) {}

  async createMessage(message: Messages) {
    return await this.modelMessage.create(message);
  }

  async findById(id: number) {
    return await this.modelMessage.findByPk(id);
  }
}
