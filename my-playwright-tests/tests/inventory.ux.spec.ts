import { test, expect } from '@playwright/test';
import { injectSession } from '../utils/auth';

test.describe('Inventory UX', () => {

  test.beforeEach(async ({ context, page }) => {
    await injectSession(context);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Add to Cart button turns red and becomes Remove', async ({ page }) => {
    const addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addBtn.click();

    const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');

    const color = await removeBtn.evaluate(el =>
      window.getComputedStyle(el).color
    );

    expect(color).toBe('rgb(226, 35, 26)');
    await expect(removeBtn).toHaveText('Remove');
  });

});
