import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const singleItem = { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' };
const multipleItems = [
  { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
  { slug: 'sauce-labs-bolt-t-shirt', name: 'Sauce Labs Bolt T-Shirt' },
];

test.describe('Add to Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await inventoryPage.goto();
  });

  test('add single item and verify in cart', async () => {
    await inventoryPage.addItemToCart(singleItem.slug);
    await inventoryPage.verifyCartBadge(1);
    await inventoryPage.goToCart();
    await cartPage.verifyItemPresent(singleItem.name);
    await cartPage.verifyItemCount(1);
  });

  test('add multiple items and verify in cart', async () => {
    for (const item of multipleItems) {
      await inventoryPage.addItemToCart(item.slug);
    }
    await inventoryPage.verifyCartBadge(multipleItems.length);
    await inventoryPage.goToCart();
    await cartPage.verifyItemCount(multipleItems.length);
    for (const item of multipleItems) {
      await cartPage.verifyItemPresent(item.name);
    }
  });
});
