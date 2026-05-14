import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

const items = [
  { slug: 'sauce-labs-backpack', name: 'Sauce Labs Backpack' },
  { slug: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light' },
];

test.describe('Remove from Cart Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    await inventoryPage.goto();
  });

  test('add single item, check cart, remove, verify cart is empty', async () => {
    await inventoryPage.addItemToCart(items[0].slug);
    await inventoryPage.goToCart();
    await cartPage.verifyItemCount(1);
    await cartPage.removeItem(items[0].slug);
    await cartPage.verifyCartEmpty();
  });

  test('add multiple items, remove one, verify count, remove next, verify cart empty', async () => {
    for (const item of items) {
      await inventoryPage.addItemToCart(item.slug);
    }
    await inventoryPage.goToCart();
    await cartPage.verifyItemCount(2);

    await cartPage.removeItem(items[0].slug);
    await cartPage.verifyItemCount(1);
    await cartPage.verifyItemPresent(items[1].name);

    await cartPage.removeItem(items[1].slug);
    await cartPage.verifyCartEmpty();
  });
});
