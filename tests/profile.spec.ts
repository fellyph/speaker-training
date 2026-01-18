import { test, expect } from '@playwright/test';

test.describe('Profile and Preferences (US-007)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('should display profile settings header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Settings');
    await expect(page.locator('text=Manage your account and preferences')).toBeVisible();
  });

  test('should display personal information section', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Personal Information');
    await expect(page.locator('label:has-text("Display Name")')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
  });

  test('should display language preferences section', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('Language Preferences');
    await expect(page.locator('label:has-text("Native Language")')).toBeVisible();
    await expect(page.locator('label:has-text("Target Language")')).toBeVisible();
  });

  test('should display AI voice configuration section', async ({ page }) => {
    await expect(page.locator('h2')).toContainText('AI Voice Configuration');
    await expect(page.locator('label:has-text("Preferred AI Voice")')).toBeVisible();
  });
});
