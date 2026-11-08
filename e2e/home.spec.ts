import { test, expect } from '@playwright/test';

test('home shows both case studies', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#work article')).toHaveCount(2);
  await expect(page.getByRole('heading', { name: 'Yee-Peng-CNX' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'The Reborn Gacha' })).toBeVisible();
});

test('skill chip flips', async ({ page }) => {
  await page.goto('/');
  const chip = page.getByRole('button', { name: /User Research/ });
  await chip.click();
  await expect(chip).toHaveAttribute('aria-pressed', 'true');
});

test('timeline lists every project, newest first', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#timeline tbody tr td:first-child')).toHaveText(['AccessCampus', 'The Reborn Gacha', 'Yee-Peng-CNX', 'RoomieMatch']);
  const roomie = page.locator('#timeline tbody tr').last();
  await expect(roomie.locator('td[data-l=year]')).toHaveText('2024–2025');
  await expect(roomie.locator('td[data-l=link] a')).toHaveText(['Prototype ↗', 'UX case study ↗']);
});

test('timeline roles and Work covers have no placeholders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#timeline tbody td[data-l=role] .ph')).toHaveCount(0);
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

test('timeline rows and cards reveal on scroll', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#timeline tbody tr').first();
  await expect(page.locator('html')).toHaveClass(/reveal/);
  await card.scrollIntoViewIfNeeded();
  await expect(card).toHaveCSS('opacity', '1');
  await page.locator('#work').scrollIntoViewIfNeeded();
  await expect(page.locator('#work article').first()).toHaveCSS('opacity', '1');
});

test('reduced motion hides nothing', async ({ browser }) => {
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveClass(/reveal/);
  await expect(page.locator('#timeline tbody tr').last()).toHaveCSS('opacity', '1');
  await page.close();
});
