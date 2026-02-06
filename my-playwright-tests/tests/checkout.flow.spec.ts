import { test, expect } from '@playwright/test';
import { injectSession } from '../utils/auth';

test.describe('Checkout Flow', () => {

  test.beforeEach(async ({ context, page }) => {
    await injectSession(context);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Standard user can complete checkout', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', 'Senior');
    await page.fill('[data-test="lastName"]', 'Engineer');
    await page.fill('[data-test="postalCode"]', '12345');

    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header'))
      .toHaveText('Thank you for your order!');
  });

});
