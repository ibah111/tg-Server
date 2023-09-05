import path from 'path';
import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
export default function createUmzug(
  seq: Sequelize,
  mig: string,
  name?: string,
) {
  const dir = path.relative('', mig).replaceAll('\\', '/') + '/*.js';
  return new Umzug({
    context: seq.getQueryInterface(),
    migrations: {
      glob: dir,
    },
    storage: new SequelizeStorage({
      sequelize: seq,
      tableName: name,
      model: seq.define(
        name || 'SeqelizeMeta',
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
    logger: console,
  });
}
