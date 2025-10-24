import { test, expect } from '@playwright/test';
import data from '../../test-data/bookings.json' assert { type: 'json' };
import credentials from '../../test-data/api-credentials.json' assert { type: 'json' };
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };

const BASE_URL = endpoints.RESTFUL_BOOKER_BASE_URL;
let bookingId;
let token;

test.describe('Booking CRUD Tests', () => {
  test('POST: Test API create booking for delete', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/booking`, { data: data.createBooking });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    bookingId = body.bookingid;
    expect(body.booking.firstname).toBe(data.createBooking.firstname);
  });

  test('POST: Test API create auth token for cookie-based authorization', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/auth`, {
      data: credentials.valid,
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    token = body.token;
    expect(token).toBeTruthy();
  });

  test('DELETE: Test API delete booking using Cookie and Token', async ({ request }) => {
    test.skip(!bookingId || !token, 'No booking or token available');
    const res = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
    expect([200, 201]).toContain(res.status());
  });

  test('POST: Test API create new booking for Basic Auth delete', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/booking`, { data: data.createBooking });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    bookingId = body.bookingid;
  });

  test('DELETE: Test API delete booking using Basic Auth', async ({ request }) => {
    const auth = 'Basic ' + Buffer.from(`${credentials.valid.username}:${credentials.valid.password}`).toString('base64');
    const res = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: auth,
      },
    });
    expect([200, 201]).toContain(res.status());
  });
});
