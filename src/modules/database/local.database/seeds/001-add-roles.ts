import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Role.bulkCreate(
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
