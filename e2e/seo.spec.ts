import { test, expect } from '@playwright/test';

test('unknown slug is 404', async ({ page }) => {
  const res = await page.goto('/work/does-not-exist');
  expect(res?.status()).toBe(404);
  await expect(page.getByText('Lost? This page got reborn somewhere else.')).toBeVisible();
});

test('sitemap lists case studies', async ({ request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.ok()).toBe(true);
  expect(await res.text()).toContain('/work/yee-peng-cnx');
});
