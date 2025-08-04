import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  DataType,
  Column,
  AutoIncrement,
  PrimaryKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

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
