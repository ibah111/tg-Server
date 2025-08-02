# Docker инструкция для Telegram бота

## Быстрый старт

### 1. Создание .env файла
Создайте файл `.env` в корне проекта:
```env
TELEGRAM_BOT_TOKEN=ваш_токен_бота
OPENAI_API_KEY=ваш_ключ_openai
```

### 2. Сборка и запуск
```bash
# Сборка образа
docker build -t tg-bot .

# Запуск с docker-compose (рекомендуется)
docker-compose up -d

# Или запуск напрямую
docker run -d \
  --name tg-bot \
  -p 3000:3000 \
  --env-file .env \
  -v $(pwd)/database.sqlite:/app/database.sqlite \
  tg-bot
```

### 3. Проверка работы
```bash
# Просмотр логов
docker-compose logs -f

# Проверка статуса
docker-compose ps

# Доступ к Swagger документации
# http://localhost:3000/docs
```

## Команды управления

### Docker Compose
```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Перезапуск
docker-compose restart

# Просмотр логов
docker-compose logs -f tg-bot

# Обновление образа
docker-compose pull
docker-compose up -d --build
```

### Docker напрямую
```bash
# Сборка
docker build -t tg-bot .

# Запуск
docker run -d --name tg-bot -p 3000:3000 --env-file .env tg-bot

# Остановка
docker stop tg-bot

# Удаление
docker rm tg-bot

# Просмотр логов
docker logs -f tg-bot
```

## Особенности

### SQLite база данных
- База данных монтируется как volume для сохранения данных между перезапусками
- Файл `database.sqlite` будет создан автоматически при первом запуске

### Переменные окружения
- `TELEGRAM_BOT_TOKEN` - обязательная переменная для работы бота
- `OPENAI_API_KEY` - опциональная переменная для Ollama интеграции

### Безопасность
- Приложение запускается от непривилегированного пользователя
- Используется Alpine Linux для минимального размера образа

## Troubleshooting

### Проблемы с правами доступа к базе данных
```bash
# Изменение прав на файл базы данных
sudo chown 1001:1001 database.sqlite
```

### Проблемы с сетью
```bash
# Проверка доступности порта
curl http://localhost:3000/docs

# Проверка логов
docker-compose logs tg-bot
```

### Обновление приложения
```bash
# Остановка
docker-compose down

# Пересборка
docker-compose build --no-cache

# Запуск
docker-compose up -d
```
