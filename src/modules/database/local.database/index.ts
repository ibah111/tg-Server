import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models';
import { LocalDatabaseSeed } from './seed';
import { User } from './models/User.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      name: 'local',
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models,
    }),
    SequelizeModule.forFeature([User], 'local'),
  ],
  providers: [LocalDatabaseSeed],
})
export default class LocalDatabase {}
