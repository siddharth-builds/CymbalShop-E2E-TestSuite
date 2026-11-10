import { expect, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    // Use the storefront entry point and assert the page is truly ready before the test acts on it.
    await this.page.goto('/');
    await expect(this.page.getByRole('heading', { name: /hot products/i })).toBeVisible({ timeout: 15_000 });
  }

  async selectProduct(productName: string): Promise<void> {
    const productCard = this.page.locator('.hot-product-card').filter({ hasText: productName }).first();

    await expect(productCard, `Product "${productName}" should be visible on the home page`).toBeVisible({ timeout: 15_000 });
    await productCard.locator('a').first().click();
  }
}
