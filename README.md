# Мессенджер

Учебный проект курса «Мидл фронтенд-разработчик» на платформе Яндекс Практикум.

Веб-мессенджер, реализованный без использования фреймворков — на чистом TypeScript с Handlebars-шаблонами и собственным компонентным движком (Block + EventBus).

## Демо

Приложение развёрнуто на Netlify: **[https://lambent-lily-bc4108.netlify.app/](https://lambent-lily-bc4108.netlify.app/)**

## Технологии

- **TypeScript** — строгая типизация (noImplicitAny, strictNullChecks, noUnusedLocals)
- **Handlebars** — серверный шаблонизатор для генерации разметки компонентов
- **Vite** — сборщик
- **CSS Custom Properties** — дизайн-токены
- **ESLint** + **typescript-eslint** — статический анализ TypeScript-кода
- **Stylelint** — линтер CSS
- **EditorConfig** — единый стиль редактирования

## Архитектура (MVC)

- **Block (View)** — базовый класс компонентов с жизненным циклом (init → render → CDM → CDU)
- **EventBus** — шина событий для управления обновлениями компонентов
- **Router** — клиентский SPA-роутинг на History API
- **Validation** — переиспользуемая валидация форм (blur + submit)

### Структура проекта

```text
src/
├── components/        # Атомарные компоненты (Input, Button, Avatar, ChatItem)
├── pages/             # Страницы приложения
├── styles/            # Глобальные стили и CSS-переменные
├── types/             # TypeScript-декларации
└── utils/             # Утилиты (Block, EventBus, Router, Validation)
```

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Главная (навигация) |
| `/login` | Вход |
| `/sign-up` | Регистрация |
| `/messenger` | Мессенджер (список чатов + лента) |
| `/settings` | Профиль |
| `/settings/edit` | Редактирование профиля |
| `/settings/password` | Смена пароля |
| `/404` | Страница не найдена |
| `/500` | Ошибка сервера |

## Валидация форм

Единый механизм валидации на `blur` и `submit` для всех форм:

- **login** — 3–20 символов, латиница, цифры, дефис, нижнее подчёркивание
- **email** — латиница с обязательными `@` и точкой после
- **first_name / second_name** — буквы (лат./кир.), первая заглавная, только дефис из спецсимволов
- **password** — 8–40 символов, минимум одна заглавная буква и одна цифра
- **phone** — 10–15 цифр, допускается `+`
- **message** — не пустое

## Установка и запуск

```bash
npm install        # установка зависимостей
npm run dev        # режим разработки
npm run build      # production-сборка
npm run start      # сборка и предпросмотр на порту 3000
npm run lint       # ESLint + Stylelint + tsc --noEmit
```

## Pull Requests

- [Sprint 1](https://github.com/josejesuscp/middle.messenger.praktikum.yandex/pull/1)
- [Sprint 2](https://github.com/josejesuscp/middle.messenger.praktikum.yandex/pull/2)
