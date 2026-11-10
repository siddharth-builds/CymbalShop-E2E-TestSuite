import { expect, Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addToCart(): Promise<void> {
    const addToCartButton = this.page.getByRole('button', { name: /add to cart/i });

    await expect(addToCartButton, 'The product detail view should expose the Add to Cart action').toBeVisible({ timeout: 15_000 });
    await addToCartButton.click();

    // Wait for app state to move into the cart flow before continuing.
    await this.page.waitForURL(/.*cart/i, { timeout: 15_000 });
    await expect(this.page).toHaveURL(/.*cart/i, 'The shopper should be redirected to the cart after adding an item');
  }
}
