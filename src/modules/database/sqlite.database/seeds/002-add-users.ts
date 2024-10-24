/**
 * Убери игнор линтов когда разберешься в чем дело
 */
/* eslint-disable prettier/prettier */
import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = async ({ context }) =>
  await context.sequelize.transaction((t) =>
    Promise.all([
      context.sequelize.models.Users.bulkCreate(
        [
          {
            id: 1,
            id_telegram: 745387960,
            username: 'Nbahvc',
            ban_status: false,
          },
          {
            id: 2,
            id_telegram: 562144232,
            username: 'pozhiloi_kusaka_22',
            ban_status: false,
          },
          {
            id: 3,
            id_telegram: 758167652,
            username: 'hvostv',
            ban_status: false,
          },
          {
            id: 4,
            id_telegram: 1881548260,
            username: 'see_you_space',
            ban_status: false,
          },
          {
            id: 5,
            id_telegram: 631490411,
            username: 'sucleb',
            ban_status: false,
          },
          {
            id: 6,
            id_telegram: 840825008,
            username: 'eel1sheva',
            ban_status: false,
          },
        ],
        {
          transaction: t,
        },
      ),
    ]),
  );
