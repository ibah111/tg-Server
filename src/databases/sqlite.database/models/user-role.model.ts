import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';
import { Roles } from './role.model';
import { Users } from './user.model';
import { InferAttributes, InferCreationAttributes } from 'sequelize';
@Table({ tableName: SqliteTablesName.USER_ROLES, timestamps: false })
export class User_Role extends Model<
  InferAttributes<User_Role>,
  InferCreationAttributes<User_Role>
> {
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
