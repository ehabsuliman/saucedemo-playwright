import { test as setup } from '@playwright/test';
import * as dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';

dotenv.config({ path: './config/.env' });

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(process.env.USERNAME1!, process.env.PASSWORD1!);
  await page.waitForURL('**/inventory.html');
  await page.context().storageState({ path: 'auth/storageState.json' });
});