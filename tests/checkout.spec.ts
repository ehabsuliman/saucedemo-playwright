import { test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const checkoutInfo = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

const singleItem = 'sauce-labs-backpack';
const multipleItems = ['sauce-labs-backpack', 'sauce-labs-bike-light'];

test.describe('Checkout Feature', () => {
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await inventoryPage.goto();
  });

  test('checkout single item', async () => {
    await inventoryPage.addItemToCart(singleItem);
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.verifyItemCountInSummary(1);
    await checkoutPage.finish();
    await checkoutPage.verifyOrderComplete();
  });

  test('checkout multiple items', async () => {
    for (const item of multipleItems) {
      await inventoryPage.addItemToCart(item);
    }
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.fillInfo(checkoutInfo.firstName, checkoutInfo.lastName, checkoutInfo.postalCode);
    await checkoutPage.verifyItemCountInSummary(multipleItems.length);
    await checkoutPage.finish();
    await checkoutPage.verifyOrderComplete();
  });
});
