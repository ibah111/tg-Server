import { Roles } from './role.model';
import { Users } from './user.model';
import { User_Role } from './user-role.model';
import { Chats } from './chat.model';
import { Messages } from './message.model';
import { Sessions } from './session.model';
import { Model, ModelCtor } from 'sequelize-typescript';

export const models: ModelCtor<Model>[] = [
  Users,
  Roles,
  User_Role,
  Chats,
  Messages,
  Sessions,
];
