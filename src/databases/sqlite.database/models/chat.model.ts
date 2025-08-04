import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../tables-name.enum';

/**
 * chat: {
    id: 745387960,
    first_name: 'Иван',
    last_name: 'Балезин',
    username: 'Nbahvc',
    type: 'private'
  },
 */
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
