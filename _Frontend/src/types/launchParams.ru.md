# LaunchParams Type

Тип `LaunchParams` представляет собой полную структуру параметров запуска Telegram Mini Apps.

## Структура

- **tgWebAppBotInline**: `boolean` (опционально) - Указывает, запущено ли приложение в инлайн-режиме.

- **tgWebAppData**: (опционально) - Данные инициализации при запуске.

  - **initData**: `string` - Объект, содержащий данные, передаваемые в Mini App при открытии.
  - **hash**: `string` - Хеш данных для валидации.
  - **auth_date**: `number` - Unix-время создания данных.
  - **user**: (опционально) - Пользователь, открывший Mini App.
    - **id**: `number` - Идентификатор пользователя.
    - **first_name**: `string` - Имя пользователя.
    - **last_name**: `string` (опционально) - Фамилия пользователя.
    - **username**: `string` (опционально) - Имя пользователя в Telegram.
    - **language_code**: `string` (опционально) - Код языка пользователя.
    - **is_premium**: `boolean` (опционально) - Имеет ли пользователь премиум-статус.
    - **photo_url**: `string` (опционально) - URL фотографии пользователя.
  - **chat**: (опционально) - Чат, в котором было открыто Mini App.
    - **id**: `number` - Идентификатор чата.
    - **type**: `'private' | 'group' | 'supergroup' | 'channel'` - Тип чата.
    - **title**: `string` (опционально) - Название чата.
    - **username**: `string` (опционально) - Имя пользователя чата.
    - **photo_url**: `string` (опционально) - URL фотографии чата.
  - **start_param**: `string` (опционально) - Стартовый параметр из ссылки.
  - **message_id**: `number` (опционально) - Идентификатор сообщения, из которого было открыто Mini App.
  - **session_id**: `string` (опционально) - Уникальный идентификатор сессии Web App.

- **tgWebAppDefaultColors**: (опционально) - Цвета по умолчанию.

  - **bg_color**: `string` - Цвет фона.
  - **text_color**: `string` - Цвет текста.
  - **hint_color**: `string` - Цвет подсказок.
  - **link_color**: `string` - Цвет ссылок.
  - **button_color**: `string` - Цвет кнопок.
  - **button_text_color**: `string` - Цвет текста кнопок.
  - **secondary_bg_color**: `string` - Вторичный цвет фона.

- **tgWebAppFullscreen**: `boolean` (опционально) - Указывает, включен ли полноэкранный режим.

- **tgWebAppPlatform**: `'android' | 'ios' | 'macos' | 'tdesktop' | 'web' | 'weba' | string` - Уникальный идентификатор платформы клиента Telegram.

- **tgWebAppShowSettings**: `boolean` (опционально) - Указывает, требуется ли приложению показывать кнопку настроек.

- **tgWebAppStartParam**: `string` (опционально) - Стартовый параметр, переданный в прямой ссылке приложения.

- **tgWebAppThemeParams**: - Настройки палитры Mini App.

  - **bg_color**: `string` - Цвет фона.
  - **text_color**: `string` - Цвет текста.
  - **hint_color**: `string` - Цвет подсказок.
  - **link_color**: `string` - Цвет ссылок.
  - **button_color**: `string` - Цвет кнопок.
  - **button_text_color**: `string` - Цвет текста кнопок.
  - **secondary_bg_color**: `string` - Вторичный цвет фона.

- **tgWebAppVersion**: `string` - Текущая поддерживаемая версия Mini Apps.

## Использование

Этот тип используется для типизации параметров запуска Telegram Mini Apps и обеспечивает полную структуру всех возможных параметров в одном месте.
