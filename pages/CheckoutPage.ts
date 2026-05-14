import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  private firstNameInput = () => this.page.locator('[data-test="firstName"]');
  private lastNameInput = () => this.page.locator('[data-test="lastName"]');
  private postalCodeInput = () => this.page.locator('[data-test="postalCode"]');
  private continueBtn = () => this.page.locator('[data-test="continue"]');
  private finishBtn = () => this.page.locator('[data-test="finish"]');
  private confirmationHeader = () => this.page.locator('.complete-header');
  private summaryItems = () => this.page.locator('.cart_item');
  private summaryTotal = () => this.page.locator('.summary_total_label');

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput().fill(firstName);
    await this.lastNameInput().fill(lastName);
    await this.postalCodeInput().fill(postalCode);
    await this.continueBtn().click();
  }

  async finish() {
    await this.finishBtn().click();
  }

  async verifyOrderComplete() {
    await expect(this.confirmationHeader()).toHaveText('Thank you for your order!');
  }

  async getSummaryItemCount() {
    return this.summaryItems().count();
  }

  async verifyItemCountInSummary(count: number) {
    await expect(this.summaryItems()).toHaveCount(count);
  }
}
