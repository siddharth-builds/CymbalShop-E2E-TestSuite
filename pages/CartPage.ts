import { expect, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyProductInCart(productName: string): Promise<void> {
    const cartItem = this.page.getByText(productName, { exact: true }).first();

    await expect(cartItem, `Product "${productName}" should be in the cart`).toBeVisible({ timeout: 15_000 });
  }

  async emptyCart(): Promise<void> {
    const emptyCartButton = this.page.getByRole('button', { name: /empty cart/i });

    await expect(emptyCartButton, 'The cart page should provide the empty-cart action').toBeVisible({ timeout: 15_000 });
    await emptyCartButton.click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    // The empty-cart flow should return the shopper to the storefront and clear the active cart state.
    await expect(this.page.getByRole('heading', { name: /hot products/i })).toBeVisible({ timeout: 15_000 });
    await expect(this.page.getByRole('link', { name: /cart icon/i })).toBeVisible({ timeout: 15_000 });
  }
}
