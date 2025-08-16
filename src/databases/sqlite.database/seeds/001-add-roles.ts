import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Roles.bulkCreate(
        [
          { id: 1, name: 'creator', title: 'Создатель' },
          { id: 2, name: 'developer', title: 'Разработчик' },
          { id: 3, name: 'admin-parter', title: 'Сборочник' },
          { id: 4, name: 'user', title: 'Пользователь' },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );

export const down: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Roles.destroy({
        where: {
          id: [1, 2, 3, 4],
        },
        transaction: t,
      }),
    ]),
  );
