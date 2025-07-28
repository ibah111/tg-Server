import {
  Model,
  CreationOptional,
  NonAttribute,
  ForeignKey as FK,
  BelongsTo,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Users } from './User.model';

export enum Actions {
  Registred = 1,
}
@Table({ tableName: 'ActionLogs' })
export class ActionLog extends Model<
  InferAttributes<ActionLog>,
  InferCreationAttributes<ActionLog>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  row_id: FK<number>;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  actionType: Actions;

  @Column(DataType.STRING)
  field: string | null;

  @Column(DataType.STRING)
  old_value: string | null;

  @Column(DataType.STRING)
  new_value: string | null;

  @ForeignKey(() => Users)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user: number;
  User?: BelongsTo<NonAttribute<Users>>;
}
