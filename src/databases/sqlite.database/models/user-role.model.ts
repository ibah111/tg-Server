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
import { Roles } from './role.model';
import { Users } from './user.model';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
@Table({ tableName: 'user', timestamps: false })
export class User_Role extends Model<
  InferAttributes<User_Role>,
  InferCreationAttributes<User_Role>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;
  @BelongsTo(() => Users)
  User?: Users;
  @ForeignKey(() => Roles)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  role_id: number;
  @BelongsTo(() => Roles)
  Role?: Roles;
}
