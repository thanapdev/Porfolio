import { test, expect } from '@playwright/test';

test('hero has the sketch sticker instead of the control panel', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveAttribute('aria-label', 'Thanapong Yamkamol');
  await expect(page.getByRole('button', { name: /wireframe that turns into a finished screen/ })).toBeVisible();
  await expect(page.getByRole('switch')).toHaveCount(0);
  await expect(page.locator('#boom')).toHaveCount(0);
});

test('sticker stays in zone', async ({ page }) => {
  await page.goto('/');
  const st = page.getByRole('button', { name: /Hello there/ });
  await st.scrollIntoViewIfNeeded();
  const b = (await st.boundingBox())!;
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 1000, cy + 1000, { steps: 5 });
  await page.mouse.move(cx + 2000, cy + 2000, { steps: 5 });
  await page.mouse.up();
  const s = (await st.boundingBox())!;
  const z = (await page.getByTestId('sticker-zone').boundingBox())!;
  const tol = 24; // clamp allows 8px slack; rotated/hover-scaled bounding box adds ~12px
  expect(s.x).toBeGreaterThanOrEqual(z.x - tol);
  expect(s.y).toBeGreaterThanOrEqual(z.y - tol);
  expect(s.x + s.width).toBeLessThanOrEqual(z.x + z.width + tol);
  expect(s.y + s.height).toBeLessThanOrEqual(z.y + z.height + tol);
});

test('sticker moves with arrow keys', async ({ page }) => {
  await page.goto('/');
  const st = page.getByRole('button', { name: /Hello there/ });
  const left = () => st.evaluate((el) => parseFloat(getComputedStyle(el).left));
  const before = await left();
  await st.focus();
  await page.keyboard.press('ArrowLeft');
  expect(await left()).toBeCloseTo(before - 12, 1);
});

test('sticker re-clamps when the viewport shrinks', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'desktop only');
  await page.goto('/');
  const st = page.getByRole('button', { name: /Hello there/ });
  await st.scrollIntoViewIfNeeded();
  const b = (await st.boundingBox())!;
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 400, cy, { steps: 5 });
  await page.mouse.up();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
});
