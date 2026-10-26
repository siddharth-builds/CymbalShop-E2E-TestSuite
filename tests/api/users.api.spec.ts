import { test, expect } from '@playwright/test';

test.describe('Cymbal Shop - Users API Validation', () => {
  test('GET /users should return valid response', async ({ request }) => {
    const response = await request.get(`/users`);
    expect(response.status()).toBe(200);
  });

  test('POST /api/users should successfully create user and return 201 Created', async ({ request }) => {
    // Drop process.env and use the relative path
    const response = await request.post(`/api/users`, {
      headers: {
        'Authorization': '' 
      },
      data: {
        name: 'Siddhu Affiliate',
        job: 'SDET'
      }
    });

    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.name).toBe('Siddhu Affiliate');
    expect(user.job).toBe('SDET');
    expect(user.id).toBeDefined();
  });
});