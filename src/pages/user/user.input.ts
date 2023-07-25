import { IsBoolean, IsNumber, IsString } from "class-validator";

export class UserCreateInput {
  @IsNumber()
  id: number;
  @IsNumber()
  id_telegram: number;
  @IsString()
  first_name: string;
  @IsString()
  username: string;
  @IsBoolean()
  ban_status: boolean;
}
