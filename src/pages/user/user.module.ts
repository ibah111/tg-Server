import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GreeterUpdate } from './User.update';
import { UserService } from './User.service';
import { Users } from 'src/modules/database/sqlite.database/models/User.model';

@Module({
  imports: [SequelizeModule.forFeature([Users], 'local')],
  providers: [GreeterUpdate, UserService],
})
export class UserModule {}
