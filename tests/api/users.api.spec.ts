// tests/api/users.api.spec.ts
import { expect, test } from '@playwright/test';
import { UsersApiClient } from './UsersApiClient';

test.describe('External API Validation (ReqRes)', () => {
  let usersApi: UsersApiClient;

  test.beforeEach(({ request }) => {
    usersApi = new UsersApiClient(request);
  });

  test('GET /api/users returns the user list payload successfully', async () => {
    const response = await usersApi.getUsers();
    const body = await response.json();

    expect(response.status(), 'The external user listing endpoint should be reachable').toBe(200);
    expect(body.page).toBeDefined();
    expect(Array.isArray(body.data)).toBeTruthy();
  });

  test('POST /api/users creates a new user with the supplied identity data', async () => {
    const response = await usersApi.createUser('Siddhu Affiliate', 'SDET');
    const user = await response.json();

    expect(response.status(), 'The create-user endpoint should return a successful creation status').toBe(201);
    expect(user.name).toBe('Siddhu Affiliate');
    expect(user.job).toBe('SDET');
    expect(user.id).toBeDefined();
    expect(user.createdAt).toBeDefined();
  });
});