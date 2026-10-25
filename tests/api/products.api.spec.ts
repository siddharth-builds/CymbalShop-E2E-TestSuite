import {test, expect} from '@playwright/test';

test('should display the correct product information', async ({ request }) => {
    
    const response = await request.get('/product/OLJCESPC7Z');

    expect(response.status()).toBe(200);
    //const product = await response.json();
    
});