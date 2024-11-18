import { Page } from '@playwright/test';

export async function EnterCredentials(email: string, password: string, page: Page) {
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="pass"]', password);
  await page.click('button[name="login"]');
}
