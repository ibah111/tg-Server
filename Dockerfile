# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY yarn.lock ./


RUN yarn install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN yarn build

# Устанавливаем sqlite3 глобально для совместимости
RUN apk add --no-cache sqlite

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Меняем владельца файлов
RUN chown -R nestjs:nodejs /app
USER nestjs

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start:prod"]
