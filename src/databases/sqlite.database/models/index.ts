import { Roles } from './role.model';
import { Users } from './user.model';
import { User_Role } from './user-role.model';
import { ActionLog } from './action-log.model';
import { ModelCtor } from 'sequelize-typescript';

export const models: ModelCtor[] = [Users, Roles, User_Role, ActionLog];
