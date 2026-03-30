# Мессенджер

Учебный проект курса «Мидл фронтенд-разработчик» на платформе Яндекс Практикум.

Веб-мессенджер, реализованный без использования фреймворков — на чистом TypeScript с Handlebars-шаблонами и собственным компонентным движком (Block + EventBus).

## Демо

Приложение развёрнуто на Netlify: **[https://storied-semifreddo-d7cfae.netlify.app](https://storied-semifreddo-d7cfae.netlify.app)**

## Технологии

- **TypeScript** — строгая типизация
- **Handlebars** — шаблонизатор
- **Vite** — сборщик
- **CSS Custom Properties** — дизайн-токены

## Архитектура

- `Block` — базовый класс компонентов с жизненным циклом (init → render → CDM → CDU)
- `EventBus` — шина событий для управления обновлениями компонентов
- `Router` — клиентский SPA-роутинг на History API
- Валидация форм на стороне клиента

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Вход |
| `/sign-up` | Регистрация |
| `/messenger` | Мессенджер |
| `/settings` | Профиль |
| `/settings/edit` | Редактирование профиля |
| `/settings/password` | Смена пароля |
| `/404` | Страница не найдена |
| `/500` | Ошибка сервера |

## Установка и запуск

```bash
npm install   # установка зависимостей
npm run dev   # режим разработки
npm run build # сборка
npm start     # предпросмотр сборки
```

## Pull Request

[Sprint 1](https://github.com/josejesuscp/middle.messenger.praktikum.yandex/pull/1)
