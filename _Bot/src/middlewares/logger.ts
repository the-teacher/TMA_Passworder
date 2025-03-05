import { Context, MiddlewareFn } from 'telegraf';

/**
 * Type guards for different message types
 */
const isTextMessage = (
  ctx: Context
): ctx is Context & { message: { text: string } } =>
  ctx.message !== undefined && 'text' in ctx.message;

const isCallbackQuery = (
  ctx: Context
): ctx is Context & { callbackQuery: { data: string } } =>
  ctx.callbackQuery !== undefined && 'data' in ctx.callbackQuery;

/**
 * Logs basic information about the interaction
 */
const logInteractionStart = (): void => {
  console.log('=== New interaction ===');
  console.log(`Time: ${new Date().toISOString()}`);
};

/**
 * Logs information about the user if available
 */
const logUserInfo = (ctx: Context): void => {
  if (!ctx.from) {
    console.log('No user data available');
    return;
  }

  const { first_name, last_name = '', id, username = 'none' } = ctx.from;
  console.log(`User: ${first_name} ${last_name} (ID: ${id})`);
  console.log(`Username: @${username}`);
};

/**
 * Logs the content of the message based on its type
 */
const logMessageContent = (ctx: Context): void => {
  if (isTextMessage(ctx)) {
    console.log(`Message: ${ctx.message.text}`);
    return;
  }

  if (isCallbackQuery(ctx)) {
    console.log(`Callback data: ${ctx.callbackQuery.data}`);
    return;
  }

  console.log('Interaction type:', ctx.updateType);
};

/**
 * Middleware for logging all bot interactions
 */
// Example output:
// === New interaction ===
// Time: 2025-03-05T13:35:53.471Z
// User: Ilya Nikolaevich (ID: 99009898)
// Username: @iam_the_teacher
// Message: /start
// Start command received
export const loggerMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  logInteractionStart();
  logUserInfo(ctx);
  logMessageContent(ctx);

  return next();
};
