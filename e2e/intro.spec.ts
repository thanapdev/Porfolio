import { test, expect } from '@playwright/test';

// start without the "seen" cookie the config gives every other test
test.use({ storageState: { cookies: [], origins: [] } });

test('intro shows on the first visit, then leaves by itself', async ({ page }) => {
  await page.goto('/');
  const splash = page.getByTestId('intro');
  await expect(splash).toBeVisible();
  await expect(splash).toBeHidden({ timeout: 2500 });
});

test('intro does not show again in the same session', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('intro')).toBeHidden({ timeout: 2500 });
  await page.reload();
  await expect(page.getByTestId('intro')).toBeHidden();
  await expect(page.locator('html')).not.toHaveAttribute('data-intro');
});

test('any key skips the intro', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('intro')).toBeVisible();
  await page.keyboard.press('Space');
  await expect(page.getByTestId('intro')).toBeHidden({ timeout: 600 });
});

test('reduced motion: no intro', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-intro');
  await expect(page.getByTestId('intro')).toBeHidden();
});
