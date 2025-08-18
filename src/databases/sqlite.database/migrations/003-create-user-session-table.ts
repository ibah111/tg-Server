import { SqliteTablesName } from 'src/shared/enums/tables-name.enum';
import { QueryInterface } from 'sequelize';
import { DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        SqliteTablesName.USER_SESSIONS,
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SqliteTablesName.USERS,
              key: 'telegram_id',
            },
          },
          session_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: SqliteTablesName.SESSIONS,
              key: 'id',
            },
          },
        },
        { transaction: t },
      ),
    ]),
  );
