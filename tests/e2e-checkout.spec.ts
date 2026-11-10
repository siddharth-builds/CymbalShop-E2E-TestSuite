import { test, expect } from '@playwright/test';

test.describe('Checkout flow', () => {
  test.slow();

  test('completes the full purchase journey and confirms the order is generated', async ({ page }) => {
    const customer = {
      email: 'siddharth@example.com',
      street: '123 QA Automation Ln',
      city: 'Tech City',
      state: 'CA',
      country: 'United States',
      zipCode: '10001',
      cardNumber: '4111111111111111',
      expiryMonth: '12',
      expiryYear: '2030',
      cvv: '123',
    };

    await test.step('Open the storefront and add a product to the cart', async () => {
      // Navigate to the home page and wait for the product grid to be interactive.
      await page.goto('/', { waitUntil: 'domcontentloaded' });

      const productLink = page.locator('.hot-product-card a').first();
      await expect(productLink, 'A featured product should be visible on the home page').toBeVisible({ timeout: 10_000 });
      await productLink.click();

      const addToCartButton = page.getByRole('button', { name: /add to cart/i });
      await expect(addToCartButton, 'Product details should expose the add-to-cart action').toBeVisible({ timeout: 10_000 });
      await addToCartButton.click();

      // Wait for the cart route before continuing because checkout depends on the cart state.
      await page.waitForURL(/.*cart/i, { timeout: 10_000 });
      await expect(page, 'The shopper should be redirected to the cart page after adding an item').toHaveURL(/.*cart/i);
    });

    await test.step('Fill in the customer and payment details', async () => {
      // The checkout form uses stable name attributes, which are more resilient than CSS-only selectors.
      await expect(page.locator('[name="email"]'), 'The email field should be rendered before form submission').toBeVisible();
      await page.locator('[name="email"]').fill(customer.email);
      await expect(page.locator('[name="email"]')).toHaveValue(customer.email);

      await page.locator('[name="street_address"]').fill(customer.street);
      await page.locator('[name="city"]').fill(customer.city);
      await page.locator('[name="state"]').fill(customer.state);
      await page.locator('[name="country"]').fill(customer.country);
      await page.locator('[name="zip_code"]').fill(customer.zipCode);

      // Use a Luhn-valid card number for realistic payment data while keeping the test deterministic.
      await page.locator('[name="credit_card_number"]').fill(customer.cardNumber);
      await page.locator('[name="credit_card_expiration_month"]').selectOption(customer.expiryMonth);
      await page.locator('[name="credit_card_expiration_year"]').selectOption(customer.expiryYear);
      await page.locator('[name="credit_card_cvv"]').fill(customer.cvv);

      await expect(page.locator('[name="credit_card_number"]')).toHaveValue(customer.cardNumber);
      await expect(page.locator('[name="credit_card_cvv"]')).toHaveValue(customer.cvv);
    });

    await test.step('Submit the order and assert completion', async () => {
      const placeOrderButton = page.getByRole('button', { name: /place order/i });
      await expect(placeOrderButton, 'Place Order should be enabled with valid cart and payment data').toBeEnabled();
      await placeOrderButton.click({ timeout: 30_000 });

      // This confirmation heading is the critical business assertion for the test outcome.
      const successHeading = page.getByRole('heading', { name: /your order is complete/i });
      await expect(successHeading, 'The customer should see a completed order confirmation after payment is submitted').toBeVisible({ timeout: 15_000 });

      // Extra verification to ensure the success page actually contains order confirmation content, not just a stale page.
      await expect(page.getByText(/thank you|order id|your order/i, { exact: false })).toBeVisible();
    });
  });
});