import path from 'path';
import { DataTypes, Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug } from 'umzug';

export default function createUmzug(
  seq: Sequelize,
  mig: string,
  name?: string,
) {
  /**
   * path.relative - можно указать путь к файлу основываясь на текущей директории
   * replace заменяет символы
   */
  const dir = path.relative('', mig).replaceAll('\\', '/') + '/*.js';
  console.log(dir);
  return new Umzug({
    logger: console,
    context: seq.getQueryInterface(),
    migrations: {
      glob: dir,
    },
    storage: new SequelizeStorage({
      sequelize: seq,
      tableName: name,
      model: seq.define(
        name || 'SequelizeMeta',
        {
          name: {
            type: DataTypes.STRING,
            unique: true,
            primaryKey: true,
            allowNull: false,
          },
        },
        { timestamps: false },
      ),
    }),
  });
}
