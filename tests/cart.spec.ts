import { expect, test } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Cart workflows', () => {
  test.describe.configure({ mode: 'serial' });

  const products = ['Sunglasses', 'Tank Top', 'Watch', 'Loafers', 'Hairdryer', 'Candle Holder', 'Salt & Pepper Shakers', 'Bamboo Glass Jar', 'Mug'];

  test('adds a representative set of products to the cart and verifies each item is retained', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    for (const product of products) {
      await test.step(`Add ${product} to the cart`, async () => {
        await homePage.navigate();
        await homePage.selectProduct(product);
        await productPage.addToCart();
        await expect(page, `The user should land on the cart page after adding ${product}`).toHaveURL(/.*cart/i);
        await cartPage.verifyProductInCart(product);
        await page.goto('/');
      });
    }
  });

  test('empty cart resets the storefront back to the empty state', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const product = products[0];

    await test.step('Add one item to the cart', async () => {
      await homePage.navigate();
      await homePage.selectProduct(product);
      await productPage.addToCart();
    });

    await test.step('Empty the cart and validate the reset state', async () => {
      await cartPage.emptyCart();
      await cartPage.verifyCartIsEmpty();
    });
  });
});