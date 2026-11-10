import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Smoke tests', () => {
  test('loads the storefront with the expected page title and product content', async ({ page }) => {
    const homePage = new HomePage(page);

    await test.step('Navigate to the storefront', async () => {
      await homePage.navigate();
    });

    await test.step('Assert the storefront renders the expected shell and content', async () => {
      await expect(page, 'The browser tab title should identify the storefront').toHaveTitle(/Online Boutique|Cymbal Shops/i);
      await expect(page.getByRole('heading', { name: /hot products/i }), 'The landing page should render the product catalog').toBeVisible();
    });
  });
});