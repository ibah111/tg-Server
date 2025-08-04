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

@Table({
  tableName: SqliteTablesName.SESSIONS,
})
export class Sessions extends Model<
  InferAttributes<Sessions>,
  InferCreationAttributes<Sessions>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
}
