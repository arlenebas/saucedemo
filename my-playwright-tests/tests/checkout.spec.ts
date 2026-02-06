import { test, expect } from '@playwright/test';
import { injectSession } from '../utils/auth';

test.describe('SauceDemo Checkout Flow', () => {

  test.beforeEach(async ({ context, page }) => {
    // 1. Inject the cookie so we don't have to use the login page
    await injectSession(context);
    
    // 2. Go directly to the inventory page
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  test('Verify Backpack Purchase & UI Color Change', async ({ page }) => {
    // 3. Add item to cart
    const addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addBtn.click();

    // 4. senior check: Assert the button color changed to red (RGB value)
    const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
    const color = await removeBtn.evaluate((el) => window.getComputedStyle(el).color);
    expect(color).toBe('rgb(226, 35, 26)');

    // 5. Standard Checkout Flow
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    // Fill details
    await page.fill('[data-test="firstName"]', 'Senior');
    await page.fill('[data-test="lastName"]', 'Engineer');
    await page.fill('[data-test="postalCode"]', '90210'); 

    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    // Final Assertion
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });

//   // This is for UI Testing
// test('UX Check: Button should turn red when item is added', async ({ page }) => {
//   await page.goto('https://www.saucedemo.com/inventory.html');

//   const addBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
//   const removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');

//   // 1. Click to add
//   await addBtn.click();

//   // 2. The button now says "Remove". Let's check its color.
//   // In SauceDemo, the "Remove" button uses the color: rgb(226, 35, 26)
//   const color = await removeBtn.evaluate((el) => {
//     return window.getComputedStyle(el).color;
//   });

//   console.log(`Button color is: ${color}`);
//   expect(color).toBe('rgb(226, 35, 26)'); // This is the red color
// }); 


});