import { Injectable } from '@nestjs/common';
import { Chats } from '../models/chat.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export default class ChatRepository {
  constructor(
    @InjectModel(Chats, 'local')
    private readonly modelChat: typeof Chats,
  ) {}

  async createChat(chat: Chats) {
    return await this.modelChat.create(chat);
  }

  async findById(id: number) {
    return await this.modelChat.findByPk(id);
  }
}
