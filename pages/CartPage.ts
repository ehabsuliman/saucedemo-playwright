import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  private cartItems = () => this.page.locator('.cart_item');
  private itemNames = () => this.page.locator('.inventory_item_name');
  private checkoutBtn = () => this.page.locator('[data-test="checkout"]');
  private continueShoppingBtn = () => this.page.locator('[data-test="continue-shopping"]');
  private removeBtn = (itemSlug: string) =>
    this.page.locator(`[data-test="remove-${itemSlug}"]`);

  async goto() {
    await this.page.goto('/cart.html');
  }

  async getCartItemCount() {
    return this.cartItems().count();
  }

  async getItemNames(): Promise<string[]> {
    return this.itemNames().allTextContents();
  }

  async removeItem(itemSlug: string) {
    await this.removeBtn(itemSlug).click();
  }

  async proceedToCheckout() {
    await this.checkoutBtn().click();
  }

  async verifyItemPresent(name: string) {
  await expect(this.page.locator('[data-test="inventory-item-name"]', { hasText: name })).toBeVisible();
}

  async verifyCartEmpty() {
    await expect(this.cartItems()).toHaveCount(0);
  }

  async verifyItemCount(count: number) {
    await expect(this.cartItems()).toHaveCount(count);
  }
}
