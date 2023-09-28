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
import { User } from './User.model';
import { User_Role } from './User_Role';

@Table({ tableName: 'Roles', timestamps: false })
export class Roles extends Model<
  InferAttributes<Roles>,
  InferCreationAttributes<Roles>
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
