import { BrowserContext } from '@playwright/test';

// This function acts like your 'Login' but skips the UI
export async function injectSession(context: BrowserContext) {
  await context.addCookies([{
    name: 'session-username',
    value: 'standard_user',
    domain: 'www.saucedemo.com',
    path: '/',
  }]);
}