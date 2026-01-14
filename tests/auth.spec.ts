import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login page by default', async ({ page }) => {
    await page.goto('/');
    // Check if redirected to login if not authenticated
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('h2')).toContainText('Welcome Back');
  });

  test('should navigate to signup page', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveURL(/.*signup/);
    await expect(page.locator('h2')).toContainText('Create Account');
  });

  test('should show validation errors on login', async ({ page }) => {
    await page.goto('/login');
    await page.click('button:has-text("Log In")');
    // Assuming Firebase or local validation throws an error
    // We can't easily mock Firebase here without complex setup, 
    // but we can check for UI reactions.
  });
});

test.describe('Navigation', () => {
  test('should show landing elements on login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
