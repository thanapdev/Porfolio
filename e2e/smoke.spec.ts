import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

test('axe: home and case study have no violations', async ({ page }) => {
  for (const path of ['/', '/work/yee-peng-cnx']) {
    await page.goto(path);
    const { violations } = await new AxeBuilder({ page }).analyze();
    expect(violations, path).toEqual([]);
  }
});

test('no horizontal scroll', async ({ page }) => {
  for (const path of ['/', '/work/the-reborn-gacha']) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    );
    expect(overflow, path).toBe(true);
  }
});

test('journey: home to case study and back', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: /View Case Study/ }).first().click();
  await expect(page).toHaveURL(/\/work\//);
  await page.getByRole('link', { name: /Back to all work/ }).first().click();
  await expect(page).toHaveURL(/\/#work$/);
});
