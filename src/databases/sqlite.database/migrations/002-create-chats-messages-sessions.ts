import { DataTypes, QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        SqliteTablesName.CHATS,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          telegram_chat_id: {
            type: DataTypes.INTEGER,
          },
          first_name: {
            type: DataTypes.STRING,
          },
          last_name: {
            type: DataTypes.STRING,
          },
          username: {
            type: DataTypes.STRING,
          },
          type: {
            type: DataTypes.STRING,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        },
        { transaction: t },
      ),
      context.createTable(
        SqliteTablesName.MESSAGES,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        },
        { transaction: t },
      ),
      context.createTable(
        SqliteTablesName.SESSIONS,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
          updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
          },
        },
        { transaction: t },
      ),
    ]),
  );

export const down: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.dropTable(SqliteTablesName.SESSIONS, { transaction: t }),
      context.dropTable(SqliteTablesName.MESSAGES, { transaction: t }),
      context.dropTable(SqliteTablesName.CHATS, { transaction: t }),
    ]),
  );
