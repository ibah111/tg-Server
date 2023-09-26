import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsTo,
} from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';
import { User_Role } from './user.role';

@Table({ tableName: 'Roles', timestamps: false })
export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @Unique
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
  @AllowNull(false)
  @Column(DataType.STRING)
  title: string;
  @BelongsToMany(() => User, () => User_Role)
  Users?: BelongsTo<User, User_Role>;
}
