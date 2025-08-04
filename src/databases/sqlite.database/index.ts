import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models';
import { SqliteDatabaseSeed } from './seed';
import { Users } from './models/user.model';
import { Roles } from './models/role.model';
import { User_Role } from './models/user-role.model';
import { Chats } from './models/chat.model';
import { Messages } from './models/message.model';
import { Sessions } from './models/session.model';
import UserRepository from './repository/user.repository';
import RoleRepository from './repository/role.repository';
import UserRoleRepository from './repository/user-role.repository';
import ChatRepository from './repository/chat.repository';
import MessageRepository from './repository/message.repository';
import SessionRepository from './repository/session.repository';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      name: 'local',
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models: models,
    }),
    SequelizeModule.forFeature(
      [Users, Roles, User_Role, Chats, Messages, Sessions],
      'local',
    ),
  ],
  providers: [
    SqliteDatabaseSeed,
    UserRepository,
    RoleRepository,
    UserRoleRepository,
    ChatRepository,
    MessageRepository,
    SessionRepository,
  ],
  exports: [
    UserRepository,
    RoleRepository,
    UserRoleRepository,
    ChatRepository,
    MessageRepository,
    SessionRepository,
  ],
})
export default class SqliteDatabase {}
