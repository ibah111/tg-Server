import { DataTypes, QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';
import { SqliteTablesName } from '../../../shared/enums/tables-name.enum';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.createTable(
        SqliteTablesName.USERS,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          telegram_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING,
          },
          is_bot: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
          },
          first_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          last_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          language_code: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          is_premium: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
        SqliteTablesName.ROLES,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: { type: DataTypes.STRING, allowNull: false, unique: true },
          title: { type: DataTypes.STRING, allowNull: false },
        },
        { transaction: t },
      ),
      context.createTable(
        SqliteTablesName.USER_ROLES,
        {
          id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Users', key: 'id' },
          },
          role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'Roles', key: 'id' },
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
      context.dropTable('Users_Roles', { transaction: t }),
      context.dropTable('Roles', { transaction: t }),
      context.dropTable('Users', { transaction: t }),
    ]),
  );
