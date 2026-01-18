import { test, expect } from '@playwright/test';

// Note: These tests assume an authenticated user. 
// For real E2E, we'd use a test account or mock auth.
// This is a UI-structure test.

test.describe('Training Flow (US-001 & US-002)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/train');
  });

  test('should allow script preparation (US-001)', async ({ page }) => {
    // Check initial state
    await expect(page.locator('h1')).toContainText('New Presentation');
    
    // Fill configuration
    await page.selectOption('select >> nth=0', 'pt-BR'); // Native
    await page.selectOption('select >> nth=1', 'en-US'); // Target
    await page.selectOption('select >> nth=2', 'informal'); // Tone
    
    const textarea = page.locator('textarea');
    await textarea.fill('I want to talk about my experience with React and Playwright.');
    
    // Check button
    const generateBtn = page.getByRole('button', { name: 'Generate Script' });
    await expect(generateBtn).toBeVisible();
    await expect(generateBtn).not.toBeDisabled();
  });

  test('should navigate to practice mode after script generation', async ({ page }) => {
    // This test might be slow or fail if Gemini service is not mocked/working, 
    // but we are testing the UI flow.
    await page.locator('textarea').fill('Simple test script.');
    await page.getByRole('button', { name: 'Generate Script' }).click();
    
    // Wait for step transition to preview
    // Using a longer timeout because of AI generation
    await expect(page.locator('h1')).toContainText('Generated Script', { timeout: 30000 });
    
    // Transition to practice
    await page.getByRole('button', { name: 'Start Practice' }).click();
    await expect(page.locator('.teleprompter-badge')).toContainText('Practice Mode');
  });

  test('should show recording controls in practice mode (US-002)', async ({ page }) => {
    // Mocking the flow to reach practice mode directly if possible or going through it
    await page.locator('textarea').fill('Practice session test.');
    await page.getByRole('button', { name: 'Generate Script' }).click();
    await page.getByRole('button', { name: 'Start Practice' }).click();
    
    // Check recording UI
    await expect(page.getByRole('button', { name: 'Start Recording' })).toBeVisible();
    await expect(page.locator('.timer')).toBeVisible();
  });
});
