// tests/api/users.api.spec.ts
import { test, expect } from '@playwright/test';
import { UsersApiClient } from './UsersApiClient';

test.describe('External API Validation (ReqRes)', () => {
  let usersApi: UsersApiClient;

  test.beforeEach(({ request }) => {
    usersApi = new UsersApiClient(request);
  });

  test('GET /api/users should return valid response', async () => {
    const response = await usersApi.getUsers();
    expect(response.status()).toBe(200);
  });

  test('POST /api/users should successfully create user and return 201 Created', async () => {
    const response = await usersApi.createUser('Siddhu Affiliate', 'SDET');
    
    expect(response.status()).toBe(201);
    const user = await response.json();
    expect(user.name).toBe('Siddhu Affiliate');
    expect(user.job).toBe('SDET');
    expect(user.id).toBeDefined();
  });
});