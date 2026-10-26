import { test, expect } from '@playwright/test';

test.describe('Cymbal Shop - Native API Validation', () => {
  test('GET / should return 200 OK', async ({ request }) => {
    const response = await request.get(`${process.env.API_BASE_URL}/`);
    expect(response.status()).toBe(200);
  });

  test('GET /product/OLJCESPC7Z should return 200 OK and contain product data', async ({ request }) => {
    const response = await request.get(`${process.env.API_BASE_URL}/product/OLJCESPC7Z`);
    expect(response.status()).toBe(200);
    
    // Assert the raw HTML response contains the expected product name
    const body = await response.text();
    expect(body).toContain('Sunglasses');
  });
  
  test('POST /cart should add item and handle redirection', async ({ request }) => {
    const response = await request.post(`${process.env.API_BASE_URL}/cart`, {
      form: {
        product_id: 'OLJCESPC7Z',
        quantity: 1
      }
    });
    
    // Playwright automatically follows the 302 redirect to the cart page
    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain('/cart');
  });
});