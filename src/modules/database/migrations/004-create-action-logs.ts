import { QueryInterface, DataTypes } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }) => {
  await context.createTable('ActionLogs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    actionType: { type: DataTypes.INTEGER, allowNull: false },
    field: { type: DataTypes.STRING, allowNull: false },
    row_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    old_value: { type: DataTypes.STRING(4000) },
    new_value: { type: DataTypes.STRING(4000) },
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
  });
};

export const down: MigrationFn<QueryInterface> = async ({ context }) => {
  await context.dropTable('ActionLogs');
};
