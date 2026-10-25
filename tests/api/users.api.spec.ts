import {test, expect} from '@playwright/test';

test('POST /api/users should successfully create user and return 201 Created', async ({ request }) => {
    
    const response = await request.post(`${process.env.API_BASE_URL}/api/users`, {
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