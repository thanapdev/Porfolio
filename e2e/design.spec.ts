import { test, expect } from '@playwright/test';

test('design section shows RoomieMatch without loading Figma', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  await expect(s.getByRole('heading', { name: 'RoomieMatch' })).toBeVisible();
  await expect(s.locator('iframe')).toHaveCount(0);
  await expect(s.locator('.ph', { hasText: '[real screenshot]' })).toHaveCount(1);
  await expect(s.getByRole('link', { name: /Open in Figma/ })).toHaveAttribute('target', '_blank');
});

test('Play loads one titled Figma iframe, also from the keyboard', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  const play = s.getByRole('button', { name: /Play prototype/ });
  // retry until the client component has hydrated and handles the key
  await expect(async () => {
    await play.focus();
    await page.keyboard.press('Enter');
    await expect(s.locator('iframe')).toHaveCount(1, { timeout: 500 });
  }).toPass();
  const frame = s.locator('iframe');
  await expect(frame).toHaveAttribute('src', /^https:\/\/embed\.figma\.com\/proto\/XflnePuAHp00z4TEDtzwJx\/.*device-frame=0/);
  await expect(frame).toHaveAttribute('title', 'RoomieMatch prototype (Figma)');
  await play.click();
  await expect(frame).toHaveCount(1);
});

test('phone fits inside the card on mobile', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile layout');
  await page.goto('/');
  const card = await page.locator('#design article').boundingBox();
  const phone = await page.getByTestId('phone').boundingBox();
  expect(phone!.x + phone!.width).toBeLessThanOrEqual(card!.x + card!.width);
});

test('nav links to the design section in order', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'mobile nav is a menu');
  await page.goto('/');
  const labels = await page.locator('nav li a').allInnerTexts();
  expect(labels).toEqual(['Work', 'Design', 'Timeline', 'About', 'Contact']);
  await expect(page.getByRole('link', { name: 'Design', exact: true })).toHaveAttribute('href', '/#design');
});

test('focus moves into the prototype after the phone Play button', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  await expect(async () => {
    await s.getByRole('button', { name: 'Play RoomieMatch prototype' }).focus();
    await page.keyboard.press('Enter');
    await expect(s.locator('iframe')).toHaveCount(1, { timeout: 500 });
  }).toPass();
  // short timeout: Figma grabs focus itself seconds later, which would hide the bug
  await expect(s.locator('iframe')).toBeFocused({ timeout: 300 });
});
