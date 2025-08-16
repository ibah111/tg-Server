import { InferAttributes, InferCreationAttributes } from 'sequelize';
import {
  Model,
  AllowNull,
  Column,
  DataType,
  Table,
  Unique,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

@Table({ tableName: SqliteTablesName.CHATS })
export class Chats extends Model<
  InferAttributes<Chats>,
  InferCreationAttributes<Chats>
> {
  @Unique(true)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  telegram_chat_id: number;

  @Column(DataType.STRING)
  first_name: string;

  @Column(DataType.STRING)
  last_name: string;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  type: string;
}
