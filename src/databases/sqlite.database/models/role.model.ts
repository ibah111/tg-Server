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
import { Users } from './user.model';
import { User_Role } from './user-role.model';
import { SqliteTablesName } from '../tables-name.enum';

@Table({ tableName: SqliteTablesName.ROLES, timestamps: false })
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
  @BelongsToMany(() => Users, () => User_Role)
  Users?: BelongsTo<Users, User_Role>;
}
