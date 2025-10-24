import { test, expect } from '@playwright/test';
import data from '../../test-data/bookings.json' assert { type: 'json' };
import credentials from '../../test-data/api-credentials.json' assert { type: 'json' };
import endpoints from '../../test-data/endpoints.json' assert { type: 'json' };

const BASE_URL = endpoints.RESTFUL_BOOKER_BASE_URL;
let bookingId;

test.describe('Booking CRUD Tests', () => {
  test('POST: Test API create booking', async ({ request }) => {
    const res = await request.post(`${BASE_URL}/booking`, { data: data.createBooking });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    bookingId = body.bookingid;
    expect(body.booking.firstname).toBe(data.createBooking.firstname);
  });

  test('GET: Test API retrieve booking by id', async ({ request }) => {
    const res = await request.get(`${BASE_URL}/booking/${bookingId}`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe(data.createBooking.firstname);
  });

  test('PUT: Test API update booking by id', async ({ request }) => {
    const auth = 'Basic ' + Buffer.from(`${credentials.valid.username}:${credentials.valid.password}`).toString('base64');
    const res = await request.put(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: { ...data.createBooking, firstname: 'Jane' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe('Jane');
  });

  test('PATCH: Test API partially update booking by id', async ({ request }) => {
    const auth = 'Basic ' + Buffer.from(`${credentials.valid.username}:${credentials.valid.password}`).toString('base64');
    const res = await request.patch(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json'
      },
      data: { firstname: 'Johnny' }
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe('Johnny');
  });
});
