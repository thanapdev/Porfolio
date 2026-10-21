import { test, expect } from '@playwright/test';

test('home shows both case studies', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('article')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Yee-Peng-CNX' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Reborn Gacha' })).toBeVisible();
});

test('skill chip flips', async ({ page }) => {
  await page.goto('/');
  const chip = page.getByRole('button', { name: /User Research/ });
  await chip.click();
  await expect(chip).toHaveAttribute('aria-pressed', 'true');
});

test('timeline lists 4 rows', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#timeline tbody tr')).toHaveCount(4);
});
