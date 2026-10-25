import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe.configure({ mode: 'parallel' });

const products = ['Sunglasses', 'Tank Top', 'Watch', 'Loafers', 'Hairdryer','Candle Holder', 'Salt & Pepper Shakers', 'Bamboo Glass Jar', 'Mug'];

for (const product of products) {
  test(`Add ${product} to the cart and redirect to cart page`, async ({ page }) => {
      const homePage = new HomePage(page);
      const productPage = new ProductPage(page);
      const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.selectProduct(product);
    await productPage.addToCart();
    await expect(page).toHaveURL(/.*cart/);
    await cartPage.VerifyProductInCart(product);

  })
}