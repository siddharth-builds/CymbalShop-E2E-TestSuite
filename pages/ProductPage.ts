import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
    async addToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to Cart' }).click();
    }

}
