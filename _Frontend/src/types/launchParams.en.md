# LaunchParams Type

The `LaunchParams` type represents the complete structure of Telegram Mini Apps launch parameters.

## Structure

- **tgWebAppBotInline**: `boolean` (optional) - Indicates whether the application is launched in inline mode.

- **tgWebAppData**: (optional) - Initialization data at launch.

  - **initData**: `string` - An object containing data transferred to the Mini App when opened.
  - **hash**: `string` - Data hash for validation.
  - **auth_date**: `number` - Unix timestamp when the data was created.
  - **user**: (optional) - User who opened the Mini App.
    - **id**: `number` - User identifier.
    - **first_name**: `string` - User's first name.
    - **last_name**: `string` (optional) - User's last name.
    - **username**: `string` (optional) - User's Telegram username.
    - **language_code**: `string` (optional) - User's language code.
    - **is_premium**: `boolean` (optional) - Whether the user has premium status.
    - **photo_url**: `string` (optional) - URL of the user's profile photo.
  - **chat**: (optional) - Chat where the Mini App was opened.
    - **id**: `number` - Chat identifier.
    - **type**: `'private' | 'group' | 'supergroup' | 'channel'` - Chat type.
    - **title**: `string` (optional) - Chat title.
    - **username**: `string` (optional) - Chat username.
    - **photo_url**: `string` (optional) - URL of the chat photo.
  - **start_param**: `string` (optional) - Start parameter from the link.
  - **message_id**: `number` (optional) - Identifier of the message from which the Mini App was opened.
  - **session_id**: `string` (optional) - Unique identifier for the Web App session.

- **tgWebAppDefaultColors**: (optional) - Default colors.

  - **bg_color**: `string` - Background color.
  - **text_color**: `string` - Text color.
  - **hint_color**: `string` - Hint color.
  - **link_color**: `string` - Link color.
  - **button_color**: `string` - Button color.
  - **button_text_color**: `string` - Button text color.
  - **secondary_bg_color**: `string` - Secondary background color.

- **tgWebAppFullscreen**: `boolean` (optional) - Indicates whether fullscreen mode is enabled.

- **tgWebAppPlatform**: `'android' | 'ios' | 'macos' | 'tdesktop' | 'web' | 'weba' | string` - Unique identifier of the Telegram client platform.

- **tgWebAppShowSettings**: `boolean` (optional) - Indicates whether the application is required to show the Settings button.

- **tgWebAppStartParam**: `string` (optional) - Start parameter passed in the application's direct link.

- **tgWebAppThemeParams**: - Mini App palette settings.

  - **bg_color**: `string` - Background color.
  - **text_color**: `string` - Text color.
  - **hint_color**: `string` - Hint color.
  - **link_color**: `string` - Link color.
  - **button_color**: `string` - Button color.
  - **button_text_color**: `string` - Button text color.
  - **secondary_bg_color**: `string` - Secondary background color.

- **tgWebAppVersion**: `string` - Currently supported Mini Apps version.

## Usage

This type is used for typing Telegram Mini Apps launch parameters and provides a complete structure of all possible parameters in one place.
