import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  private cartBadge = () => this.page.locator('.shopping_cart_badge');
  private cartLink = () => this.page.locator('.shopping_cart_link');
  private sortDropdown = () => this.page.locator('[data-test="product-sort-container"]');
  private inventoryItems = () => this.page.locator('.inventory_item_name');
  private inventoryPrices = () => this.page.locator('.inventory_item_price');

  private addToCartBtn = (itemName: string) =>
    this.page.locator(`[data-test="add-to-cart-${itemName}"]`);

  private removeBtn = (itemName: string) =>
    this.page.locator(`[data-test="remove-${itemName}"]`);

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart(itemSlug: string) {
    await this.addToCartBtn(itemSlug).click();
  }

  async removeItemFromCart(itemSlug: string) {
    await this.removeBtn(itemSlug).click();
  }

  async goToCart() {
    await this.cartLink().click();
  }

  async getCartCount() {
    const badge = this.cartBadge();
    const visible = await badge.isVisible();
    if (!visible) return 0;
    return parseInt(await badge.textContent() ?? '0');
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown().selectOption(option);
  }

  async getItemNames(): Promise<string[]> {
    return this.inventoryItems().allTextContents();
  }

  async getItemPrices(): Promise<number[]> {
    const texts = await this.inventoryPrices().allTextContents();
    return texts.map(t => parseFloat(t.replace('$', '')));
  }

  async verifyCartBadge(count: number) {
    if (count === 0) {
      await expect(this.cartBadge()).not.toBeVisible();
    } else {
      await expect(this.cartBadge()).toHaveText(String(count));
    }
  }
}
