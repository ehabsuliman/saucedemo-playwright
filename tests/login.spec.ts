import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const invalidUsers = [
  { username: 'locked_out_user', password: 'secret_sauce' },
  { username: 'invalid_user', password: 'wrong_pass' },
];

test.describe('Login Feature', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('valid login navigates to inventory', async ({ page }) => {
    await loginPage.login(process.env.USERNAME1!, process.env.PASSWORD1!);
    await expect(page).toHaveURL(/inventory/);
  });

  for (const user of invalidUsers) {
    test(`invalid login - ${user.username}`, async () => {
      await loginPage.login(user.username, user.password);
      const error = await loginPage.getErrorMessage();
      expect(error).toBeTruthy();
    });
  }
});