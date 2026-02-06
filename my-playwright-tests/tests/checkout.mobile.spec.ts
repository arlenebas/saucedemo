import { test, expect, devices } from '@playwright/test';
import { injectSession } from '../utils/auth';

test.use({ ...devices['iPhone 13'] });

test.describe('Mobile Checkout Flow', () => {

  test.beforeEach(async ({ context, page }) => {
    await injectSession(context);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Checkout works on mobile viewport', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'Arlene');
    await page.fill('[data-test="lastName"]', 'Bas');
    await page.fill('[data-test="postalCode"]', '54321');

    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

});
