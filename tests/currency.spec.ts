import { expect, test } from '@playwright/test';

test.describe('Cymbal Shop - Currency Conversion', () => {
  test('updates displayed prices when the shopper changes currency', async ({ page }) => {
    const firstProductCard = page.locator('.hot-product-card').first();
    const currencySelector = page.getByRole('combobox');

    await test.step('Open the storefront and confirm it starts in USD', async () => {
      await page.goto('/', { waitUntil: 'domcontentloaded' });
      await expect(firstProductCard, 'The default storefront prices should render in USD').toBeVisible({ timeout: 15_000 });
      await expect(firstProductCard).toContainText('$');
    });

    await test.step('Switch to EUR and confirm the displayed value changes', async () => {
      await currencySelector.selectOption('EUR');
      await expect(firstProductCard).toContainText('€');
      await expect(firstProductCard).not.toContainText('$');
    });

    await test.step('Check whether JPY is supported in this environment before validating the yen symbol', async () => {
      const jpyOption = page.locator('option', { hasText: /^JPY$/i }).first();

      if (await jpyOption.count()) {
        await currencySelector.selectOption('JPY');
        await expect(firstProductCard).toContainText('¥');
      }
    });
  });
});