import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UserCreateInput {
  @IsNumber()
  id_telegram: number;
  @IsString()
  username: string;
  @IsBoolean()
  ban_status: boolean;
}
