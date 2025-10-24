import { test, expect } from '@playwright/test';
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };
import users from '../../test-data/users.json' assert { type: 'json' };
import checkout from '../../test-data/checkout.json' assert { type: 'json' };

test.describe('Checkout Process', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(endpoints.SOURCE_DEMO_BASE_URL);
    await page.fill('#user-name', users.standard_user.username);
    await page.fill('#password', users.standard_user.password);
    await page.click('#login-button');
  });

  test('Test UI complete checkout successfully', async ({ page }) => {
    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', checkout.firstName);
    await page.fill('[data-test="lastName"]', checkout.lastName);
    await page.fill('[data-test="postalCode"]', checkout.postalCode);
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');

    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});
