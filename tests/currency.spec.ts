import { test, expect } from '@playwright/test';

test.describe('Cymbal Shop - Currency Conversion', () => {
  test('should dynamically update product prices when currency is changed', async ({ page }) => {
    await page.goto('/');

    // 1. Verify default currency displays USD ($)
    const firstProductPrice = page.locator('.hot-product-card').first();
    await expect(firstProductPrice).toContainText('$');

    // 2. Select EUR from the top navigation dropdown
    await page.getByRole('combobox').selectOption('EUR');

    // 3. Assert the page reloads and prices reflect Euros (€)
    await expect(firstProductPrice).toContainText('€');
    await expect(firstProductPrice).not.toContainText('$');
    
    // 4. Select JPY from the dropdown
    await page.getByRole('combobox').selectOption('JPY');
    
    // 5. Assert the prices reflect Japanese Yen (¥)
    await expect(firstProductPrice).toContainText('¥');
  });
});