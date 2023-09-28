import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Roles } from './Role.model';
import { User } from './User.model';
import { CreationOptional } from 'sequelize';
@Table({ tableName: 'user', timestamps: false })
export class User_Role extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;
  @BelongsTo(() => User)
  User?: User;
  @ForeignKey(() => Roles)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id: number;
  @BelongsTo(() => Roles)
  Role?: Roles;
}