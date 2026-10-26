import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
    async VerifyProductInCart(productName: string): Promise<void> {
    await expect(this.page.getByText(productName)).toBeVisible();
    }
    async emptyCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Empty Cart' }).click();
    }

   async verifyCartIsEmpty(): Promise<void> {
    // Assert the application successfully redirected back to the home page
    await expect(this.page.getByRole('heading', { name: 'Hot Products' })).toBeVisible();
    
    // Assert the cart icon reverts to its empty state (no trailing number like "Cart icon 1")
    await expect(this.page.getByRole('link', { name: 'Cart icon', exact: true })).toBeVisible();
  }
    

}
