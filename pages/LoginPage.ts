import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = () => this.page.locator('[data-test="username"]');
  private passwordInput = () => this.page.locator('[data-test="password"]');
  private loginButton = () => this.page.locator('[data-test="login-button"]');
  private errorMessage = () => this.page.locator('[data-test="error"]');

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput().fill(username);
    await this.passwordInput().fill(password);
    await this.loginButton().click();
  }

  async getErrorMessage() {
    return this.errorMessage().textContent();
  }
}
