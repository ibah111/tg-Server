import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { CreationAttributes } from 'sequelize';
import { Users } from 'src/modules/database/local.database/models/User.model';

export class UserCreateInput implements CreationAttributes<Users> {
  @IsNumber()
  id_telegram: number;
  @IsString()
  username: string;
  @IsBoolean()
  ban_status: boolean;
}
