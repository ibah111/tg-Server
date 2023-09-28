import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../modules/database/local.database/models/User.model';

@Module({
  imports: [SequelizeModule.forFeature([User], 'local')],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
