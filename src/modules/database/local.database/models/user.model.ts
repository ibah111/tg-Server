import { IsString } from 'class-validator';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import {
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @Column(DataType.NUMBER)
  id_telegram: number;
  @IsString()
  username: string;
  @Default({ defaultValue: false })
  @Column(DataType.BOOLEAN)
  ban_status: boolean;
}
