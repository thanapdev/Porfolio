import { test, expect } from '@playwright/test';

test('case study renders header and tldr', async ({ page }) => {
  await page.goto('/work/yee-peng-cnx');
  await expect(page.getByRole('heading', { level: 1, name: 'Yee-Peng-CNX' })).toBeVisible();
  await expect(page.getByText('Experience Designer ·')).toBeVisible();
  const notes = page.getByTestId('tldr-note');
  await expect(notes).toHaveCount(3);
  await expect(notes.nth(0)).toContainText('Inspired by');
  await expect(notes.nth(1)).toContainText('What I made');
  await expect(notes.nth(2)).toContainText('What I want you to feel');
});

test('next project wraps', async ({ page }) => {
  await page.goto('/work/the-reborn-gacha');
  await expect(page.getByRole('link', { name: 'Next project →' })).toHaveAttribute('href', '/work/yee-peng-cnx');
});

test('BeforeAfter slider moves with keys', async ({ page }) => {
  await page.goto('/work/the-reborn-gacha');
  const slider = page.getByRole('slider', { name: 'Compare before and after' });
  const before = Number(await slider.getAttribute('aria-valuenow'));
  await slider.focus();
  await slider.press('ArrowRight');
  await expect.poll(async () => Number(await slider.getAttribute('aria-valuenow'))).toBeGreaterThan(before);
});
