import { test, expect } from '@playwright/test';

test('unknown slug is 404', async ({ page }) => {
  const res = await page.goto('/work/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('Lost? This page got reborn somewhere else.')).toBeVisible();
});

test('sitemap lists case studies', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.ok()).toBe(true);
  const xml = await res.text();
  expect(xml).toContain('/work/yee-peng-cnx');
  expect(xml).toContain('/case-study/roomiematch');
});

test('home and case study have description and canonical', async ({ page }) => {
  for (const path of ['/', '/work/yee-peng-cnx']) {
    await page.goto(path);
    await expect(page.locator('meta[name=description]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', /.+/);
  }
});
