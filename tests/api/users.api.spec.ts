import {test, expect} from '@playwright/test';

test('should display the correct user information', async ({ request }) => {
    
    const response = await request.post('https://reqres.in/api/users', {
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