import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('has correct title for Online Boutique or Cymbal Shops', async ({ page }) => {
  
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(page).toHaveTitle(/Online Boutique/);

});