import { test, expect } from '@playwright/test';
import credentials from '../../test-data/api-credentials.json' assert { type: 'json' };
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };
const BASE_URL = endpoints.RESTFUL_BOOKER_BASE_URL;

test('POST: Test API create auth token', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/auth`, {
    data: credentials.valid
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toHaveProperty('token');
});
