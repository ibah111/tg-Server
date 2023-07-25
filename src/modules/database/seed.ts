import { InjectConnection } from '@nestjs/sequelize';
import { join } from 'path';
import { Sequelize } from 'sequelize';
import createUmzug from './umzug';

export class LocalDatabaseSeed {
  constructor(@InjectConnection('local') private sequelize: Sequelize) {}
  async sync() {
    const umzug = createUmzug(
      this.sequelize,
      join(__dirname, 'migrations'),
      'MigrationMeta',
    );
    try {
      await this.sequelize.authenticate();
      await umzug.up();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async seed() {
    /**
     * createUmzug - кастом функция, которая возвращает обращение/создание
     * файлов, __dirname указан в функции, как @params - расписал выше
     */
    const umzug = createUmzug(
      this.sequelize, // подключение
      join(__dirname, 'seeds'), // директория
      'SeedMeta', // название таблицы - как МетаМиграции
    );
    try {
      umzug.up();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
