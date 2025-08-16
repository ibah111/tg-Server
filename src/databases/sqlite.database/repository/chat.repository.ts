import { Injectable } from '@nestjs/common';
import { Chats } from '../models/chat.model';
import { InjectModel } from '@nestjs/sequelize';
import { InferCreationAttributes } from 'sequelize';

@Injectable()
export default class ChatRepository {
  constructor(
    @InjectModel(Chats, 'local')
    private readonly modelChat: typeof Chats,
  ) {}

  async createChat(chat: InferCreationAttributes<Chats>) {
    return await this.modelChat.create(chat);
  }

  async findById(id: number) {
    return await this.modelChat.findByPk(id);
  }
}
