import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';
import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { Sessions } from './session.model';
import { Users } from './user.model';

@Table({ tableName: SqliteTablesName.USER_SESSIONS })
export class UserSessions extends Model<
  InferAttributes<UserSessions>,
  InferCreationAttributes<UserSessions>
> {
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @ForeignKey(() => Sessions)
  @Column(DataType.INTEGER)
  session_id: number;

  @BelongsTo(() => Sessions)
  session: Sessions;
}
