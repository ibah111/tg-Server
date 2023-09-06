import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'User' })
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.NUMBER)
  id: number;
  @Column(DataType.NUMBER)
  id_telegram: number;
  @Column(DataType.STRING)
  first_name: string;
  @Column(DataType.STRING)
  username: string;
  @Default({ defaultValue: false })
  @Column(DataType.BOOLEAN)
  ban_status: boolean;
}
