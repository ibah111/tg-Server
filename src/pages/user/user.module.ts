import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../modules/database/local.database/models/User.model';
import { GreeterUpdate } from './User.update';
import { UserService } from './User.service';

@Module({
  imports: [SequelizeModule.forFeature([User], 'local')],
  providers: [GreeterUpdate, UserService],
})
export class UserModule {}
