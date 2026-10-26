// tests/api/products.api.spec.ts
import { test, expect } from '@playwright/test';
import { ProductsApiClient } from './productsApiClient';

test.describe('Cymbal Shop - Native API Validation', () => {
  let apiClient: ProductsApiClient;

  // Initialize the API Object before each test
  test.beforeEach(({ request }) => {
    apiClient = new ProductsApiClient(request);
  });

  test('GET / should return 200 OK', async () => {
    const response = await apiClient.getHomePage();
    expect(response.status()).toBe(200);
  });

  test('GET /product/OLJCESPC7Z should return 200 OK and contain product data', async () => {
    const response = await apiClient.getProduct('OLJCESPC7Z');
    expect(response.status()).toBe(200);
    
    const body = await response.text();
    expect(body).toContain('Sunglasses');
  });
  
  test('POST /cart should add item and handle redirection', async () => {
    const response = await apiClient.addToCart('OLJCESPC7Z', 1);
    
    expect(response.ok()).toBeTruthy();
    expect(response.url()).toContain('/cart');
  });
});