import { test, expect } from '@playwright/test';

test('Complete E2E Checkout Flow successfully generates an order', async ({ page }) => {
  await page.goto('/');
  await page.locator('.hot-product-card a').first().click();
  await page.getByRole('button', { name: 'Add to Cart' }).click();

  // Explicitly wait for the cart page to load before filling the form
  await expect(page).toHaveURL(/.*cart/); 

// Use name attributes, which are standard in the Cymbal Shop checkout form
  await page.locator('[name="email"]').fill('siddharth@example.com');
  await page.locator('[name="street_address"]').fill('123 QA Automation Ln');
  await page.locator('[name="city"]').fill('Tech City');
  await page.locator('[name="state"]').fill('CA');
  await page.locator('[name="country"]').fill('United States');
  await page.locator('[name="zip_code"]').fill('10001');
  
  // Complete the full payment payload with a Luhn-valid test card
  await page.locator('[name="credit_card_number"]').fill('4111111111111111');
  await page.locator('[name="credit_card_expiration_month"]').selectOption('12');
  await page.locator('[name="credit_card_expiration_year"]').selectOption('2030');
  await page.locator('[name="credit_card_cvv"]').fill('123');
  
  await page.getByRole('button', { name: 'Place Order' }).click();

  await expect(page.getByRole('heading', { name: /Your order is complete/i })).toBeVisible();
});