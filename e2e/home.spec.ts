import { test, expect } from '@playwright/test';

test('home shows both case studies', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work article')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Yee-Peng-CNX' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Reborn Gacha' })).toBeVisible();
});

test('skills are plain labels, not buttons', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('list', { name: 'Skills' }).getByRole('listitem')).toHaveCount(6);
  await expect(page.getByRole('button', { name: /User Research/ })).toHaveCount(0);
  await expect(page.locator('#timeline')).toHaveCount(0);
});

test('Work covers have no placeholders', async ({ page }) => {
  await page.goto('/');
  // both Work cards have real covers now
  await expect(page.locator('#work .ph', { hasText: '[real screenshot]' })).toHaveCount(0);
});

test('Email me opens a mail to the owner', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#contact').getByRole('link', { name: 'Email me' })).toHaveAttribute('href', 'mailto:t.yamkamol.work@gmail.com');
});

test('cursor ring appears with the mouse', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'mouse-only feature');
  await page.goto('/');
  const ring = page.getByTestId('cursor-ring');
  await expect(ring.locator('svg')).toHaveCSS('opacity', '0');
  // keep moving until the client component has hydrated and picked up the pointer
  await expect(async () => {
    await page.mouse.move(40, 300);
    await page.mouse.move(45, 305);
    await expect(ring.locator('svg')).toHaveCSS('opacity', '0.8', { timeout: 500 });
  }).toPass();
  await expect(ring).toContainText('scroll');
});

test('cards reveal on scroll', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveClass(/reveal/);
  await page.locator('#work').scrollIntoViewIfNeeded();
  await expect(page.locator('#work article').first()).toHaveCSS('opacity', '1');
});

test('reduced motion hides nothing', async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/reveal/);
  await expect(page.locator('#work article').last()).toHaveCSS('opacity', '1');
  await page.close();
});
