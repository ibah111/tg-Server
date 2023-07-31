import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction(
    async (t) =>
      await context.bulkInsert(
        'Roles',
        [
          { id: 1, name: 'maintainer', title: 'создатель' },
          { id: 2, name: 'admin', title: 'админ-сборочник' },
          { id: 3, name: 'moderator', title: 'модератор' },
          { id: 4, name: 'user', title: 'пользователь' },
        ],
        { transaction: t },
      ),
  );
