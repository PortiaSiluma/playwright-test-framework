import { test, expect } from '@playwright/test';
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };
import users from '../../test-data/users.json' assert { type: 'json' };

const BASE_URL = endpoints.SOURCE_DEMO_BASE_URL;

test.describe('SauceDemo Login Scenarios', () => {

  test('Test UI login as standard_user should succeed', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.standard_user.username);
    await page.fill('#password', users.standard_user.password);
    await page.click('#login-button');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test UI login as locked_out_user should show error', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.locked_out_user.username);
    await page.fill('#password', users.locked_out_user.password);
    await page.click('#login-button');
    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
  });

  test('Test UI login as problem_user should load products with issues', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.problem_user.username);
    await page.fill('#password', users.problem_user.password);
    await page.click('#login-button');
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_item_img').first()).toBeVisible();
  });

  test('Test UI login as performance_glitch_user should still succeed', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.performance_glitch_user.username);
    await page.fill('#password', users.performance_glitch_user.password);
    await page.click('#login-button');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test UI login as error_user should succeed', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.error_user.username);
    await page.fill('#password', users.error_user.password);
    await page.click('#login-button');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Test UI login as visual_user should succeed and display products', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.fill('#user-name', users.visual_user.username);
    await page.fill('#password', users.visual_user.password);
    await page.click('#login-button');
    await expect(page.locator('.title')).toHaveText('Products');
  });
});
