import {
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Column,
  DataType,
  AllowNull,
  ForeignKey as FKDecorator,
} from 'sequelize-typescript';
import { Users } from './user.model';
import {
  BelongsTo,
  CreationOptional,
  ForeignKey as FK,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
} from 'sequelize';

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

  @FKDecorator(() => Users)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user: number;
  User?: BelongsTo<NonAttribute<Users>>;
}
