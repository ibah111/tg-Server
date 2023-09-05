import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey as FK,
  BelongsTo,
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
import { User } from './User.model';

export enum Actions {
  /**
   * введите
   */
  Registred = 1,
}
@Table({ tableName: 'ActionLogs' })
export class ActionLog extends Model<
  InferAttributes<ActionLog>,
  InferCreationAttributes<ActionLog>
> {
  /**
   * ID действия
   */
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  /**
   * ID строки
   */
  @AllowNull(false)
  @Column(DataType.INTEGER)
  row_id: FK<number>;
  /**
   * Тип действия
   */
  @AllowNull(false)
  @Column(DataType.INTEGER)
  actionType: Actions;
  /**
   * Поле которое изменили
   */
  @Column(DataType.STRING)
  field: string | null;
  /**
   * Старое значение
   */
  @Column(DataType.STRING)
  old_value: string | null;
  /**
   * Новое значение
   */
  @Column(DataType.STRING)
  new_value: string | null;
  /**
   * Имя пользователя совершившего действие
   */
  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user: number;
  User?: BelongsTo<NonAttribute<User>>;
}
