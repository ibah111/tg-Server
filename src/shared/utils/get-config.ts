export default function getConfig() {
  return {
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT!, 10) || 1433,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    },
    tokens: {
      openai: process.env.OPENAI_API_KEY,
      telegram: process.env.TELEGRAM_BOT_TOKEN,
    },
  };
}
