import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

@Table({ tableName: SqliteTablesName.CHATS })
export class Chats extends Model<
  InferAttributes<Chats>,
  InferCreationAttributes<Chats>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

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
