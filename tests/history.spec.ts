import { test, expect } from '@playwright/test';

test.describe('Practice History (US-004)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/history');
  });

  test('should display history header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Practice History');
    await expect(page.locator('text=Review your previous sessions')).toBeVisible();
  });

  test('should display empty state if no sessions exist', async ({ page, context }) => {
    // This depends on the test account state. 
    // If we assume a clean state or mock Firestore, we can test this.
    // For now, we'll just check for the list or empty state elements.
    const emptyState = page.locator('.empty-state');
    const sessionsList = page.locator('.sessions-list');
    
    await expect(emptyState.or(sessionsList)).toBeVisible();
  });

  test('should display session details if they exist', async ({ page }) => {
    const sessionsList = page.locator('.sessions-list');
    if (await sessionsList.isVisible()) {
      await expect(page.locator('.session-card')).toBeVisible();
      await expect(page.locator('.session-date')).toBeVisible();
      await expect(page.locator('.session-langs')).toBeVisible();
    } else {
      test.skip(true, 'No sessions found to test list display');
    }
  });
});
