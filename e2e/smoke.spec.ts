import { test, expect } from '@playwright/test';

test('home loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeAttached();
});

test('mobile menu opens and closes', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile only');
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Menu' });
  await btn.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'true');
  const work = page.getByRole('link', { name: 'Work', exact: true });
  await expect(work).toBeVisible();
  await work.click();
  await expect(btn).toHaveAttribute('aria-expanded', 'false');
});
