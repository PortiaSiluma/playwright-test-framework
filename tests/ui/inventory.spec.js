import { test, expect } from '@playwright/test';
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };
import users from '../../test-data/users.json' assert { type: 'json' };

test.describe('Inventory Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(endpoints.SOURCE_DEMO_BASE_URL);
    await page.fill('#user-name', users.standard_user.username);
    await page.fill('#password', users.standard_user.password);
    await page.click('#login-button');
  });

  test('Test UI display all products', async ({ page }) => {
    const items = await page.locator('.inventory_item').count();
    expect(items).toBeGreaterThan(0);
  });

  test('Test UI sort products by price high to low', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'hilo');
    const firstPrice = await page.locator('.inventory_item_price').first().innerText();
    expect(firstPrice).toContain('$');
  });
});
