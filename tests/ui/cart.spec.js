import { test, expect } from '@playwright/test';
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };
import users from '../../test-data/users.json' assert { type: 'json' };

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(endpoints.SOURCE_DEMO_BASE_URL);
    await page.fill('#user-name', users.standard_user.username);
    await page.fill('#password', users.standard_user.password);
    await page.click('#login-button');
  });

  test('Test UI add an item to cart', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await expect(page.locator('.cart_item')).toHaveCount(1);
  });

  test('Test UI remove item from cart', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('button[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
