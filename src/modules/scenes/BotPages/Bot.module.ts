import { Module } from '@nestjs/common';
import { BaseBotUpdateController } from './Bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/database/local.database/models/User.model';

@Module({
  imports: [SequelizeModule.forFeature([User], 'local')],
  controllers: [BaseBotUpdateController],
})
export class BaseBotModule {}
