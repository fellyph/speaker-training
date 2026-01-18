import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Use environment variables for credentials
  const email = process.env.TEST_USER_EMAIL;
  const password = process.env.TEST_USER_PASSWORD;

  if (!email || !password) {
    throw new Error('TEST_USER_EMAIL and TEST_USER_PASSWORD environment variables are required');
  }

  await page.goto('/login');
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill(password);
  await page.getByRole('button', { name: 'Log In' }).click();

  // Wait until the page receives the cookies/localStorage from Firebase
  // Usually, a redirect to the home page or dashboard indicates success
  await expect(page).toHaveURL('/');

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});
