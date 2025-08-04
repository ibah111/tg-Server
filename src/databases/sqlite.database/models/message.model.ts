import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import {
  DataType,
  Column,
  AutoIncrement,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../tables-name.enum';

@Table({
  tableName: SqliteTablesName.MESSAGES,
})
export class Messages extends Model<
  InferAttributes<Messages>,
  InferCreationAttributes<Messages>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
}
