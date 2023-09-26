export default function getConfig() {
  return {
    database: {
      host: process.env.DATABASE_HOST,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      port: parseInt(process.env.DATABASE_PORT!, 10) || 1433,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    bot: {
      token: process.env.BOT_TOKEN,
    },
  };
}
