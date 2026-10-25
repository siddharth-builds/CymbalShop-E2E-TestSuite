import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
    async VerifyProductInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName)).toBeVisible();
    }

}
