import { Page } from '@playwright/test';


export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async selectProduct(productName: string): Promise<void> {
   await this.page.locator(`.hot-product-card`).filter({ hasText: productName }).locator('a').first().click(); 
  }
}
