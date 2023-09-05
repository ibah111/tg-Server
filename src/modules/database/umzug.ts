import path from 'path';
import { DataTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';

export default function createUmzug(
  seq: Sequelize,
  mig: string,
  name?: string,
) {
  /**
   * @todo после relative был replaceAll
   */
  const direction = path.relative('', mig);
  return new Umzug({
    logger: console,
    migrations: {
      glob: direction,
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
  });
}
