import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

@Table({
  tableName: SqliteTablesName.SESSIONS,
})
export class Sessions extends Model<
  InferAttributes<Sessions>,
  InferCreationAttributes<Sessions>
> {
  @Column(DataType.STRING)
  model: string;

  @Column(DataType.ARRAY(DataType.INTEGER))
  context: number[];
}
