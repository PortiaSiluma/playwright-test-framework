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

test('POST: Test API create auth token with invalid credentials', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/auth`, {
    data: credentials.invalidCredentials
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).not.toHaveProperty('token');
  expect(body).toHaveProperty('reason');
  expect(body.reason).toBe('Bad credentials');
});

test('POST: Test API create auth token with invalid password', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/auth`, {
    data: credentials.invalidPassword
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).not.toHaveProperty('token');
  expect(body).toHaveProperty('reason');
  expect(body.reason).toBe('Bad credentials');
});

test('POST: Test API create auth token with invalid username', async ({ request }) => {
  const res = await request.post(`${BASE_URL}/auth`, {
    data: credentials.invalidUsername
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).not.toHaveProperty('token');
  expect(body).toHaveProperty('reason');
  expect(body.reason).toBe('Bad credentials');
});