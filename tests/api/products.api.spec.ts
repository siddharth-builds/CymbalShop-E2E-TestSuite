import { expect, test } from '@playwright/test';
import { ProductsApiClient } from './ProductsApiClient';

test.describe('Cymbal Shop - Native API Validation', () => {
  let apiClient: ProductsApiClient;

  test.beforeEach(({ request }) => {
    apiClient = new ProductsApiClient(request);
  });

  test('GET / returns a successful storefront response', async () => {
    const response = await apiClient.getHomePage();

    expect(response.status(), 'The storefront should be reachable over HTTP').toBe(200);
    await expect(response.headers()['content-type'] ?? '').toMatch(/text\/html|application\/json/i);
  });

  test('GET /product/OLJCESPC7Z returns product details for a known catalog item', async () => {
    const response = await apiClient.getProduct('OLJCESPC7Z');
    const body = await response.text();

    expect(response.status(), 'The product detail endpoint should respond successfully').toBe(200);
    expect(body, 'The product payload should contain the expected item name').toContain('Sunglasses');
  });

  test('POST /cart adds the requested item and redirects the user to the cart', async () => {
    const response = await apiClient.addToCart('OLJCESPC7Z', 1);

    expect(response.ok(), 'The cart write should succeed').toBeTruthy();
    expect(response.url(), 'The API should redirect to the cart route after submission').toContain('/cart');
  });
});