import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Column,
  DataType,
  AllowNull,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

@Table({ tableName: SqliteTablesName.USERS })
export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  @Unique(true)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  telegram_id: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_bot: boolean;

  @AllowNull(true)
  @Column(DataType.STRING)
  first_name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  last_name: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  language_code: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_premium: boolean;
}
