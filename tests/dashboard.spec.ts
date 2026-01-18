import { test, expect } from '@playwright/test';

test.describe('Main Dashboard (US-006)', () => {
  test.beforeEach(async ({ page }) => {
    // The storageState is automatically loaded for each test as configured in playwright.config.ts
    await page.goto('/');
  });

  test('should display welcome message and header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome back');
    await expect(page.getByRole('link', { name: 'New Practice' })).toBeVisible();
  });

  test('should display statistics cards', async ({ page }) => {
    await expect(page.locator('text=Total Sessions')).toBeVisible();
    await expect(page.locator('text=Average Score')).toBeVisible();
    await expect(page.locator('text=Improvement')).toBeVisible();
  });

  test('should display recent sessions section', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Recent Sessions');
    await expect(page.getByRole('link', { name: 'View All' })).toBeVisible();
  });

  test('should navigate to new training page', async ({ page }) => {
    await page.getByRole('link', { name: 'New Practice' }).click();
    await expect(page).toHaveURL(/.*train/);
  });
});
