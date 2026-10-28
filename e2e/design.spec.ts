import { test, expect } from '@playwright/test';

test('design section shows RoomieMatch without loading Figma', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  await expect(s.getByRole('heading', { name: 'RoomieMatch' })).toBeVisible();
  await expect(s.locator('iframe')).toHaveCount(0);
  await expect(s.locator('.ph', { hasText: '[real screenshot]' })).toHaveCount(0);
  const proto = s.locator('article').first().getByRole('link', { name: /Play prototype/ });
  await expect(proto).toHaveAttribute('href', /figma\.com\/proto\/XflnePuAHp00z4TEDtzwJx\//);
  await expect(proto).toHaveAttribute('target', '_blank');
});

test('AcessCampus links to its Figma file and Canva case study', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#design article').nth(1);
  await expect(card.getByRole('heading', { name: 'AcessCampus' })).toBeAttached();
  await expect(card.getByRole('link', { name: /Open in Figma/ })).toHaveAttribute('href', /figma\.com\/design\/cw83ZV6F7lFHe9VYC0Roes\//);
  await expect(card.getByRole('link', { name: /UX case study/ })).toHaveAttribute('href', 'https://canva.link/e0inqgga5kdhpws');
});

test('phone Play loads one titled Figma iframe, also from the keyboard', async ({ page }) => {
  await page.goto('/');
  const s = page.locator('#design');
  const play = s.getByRole('button', { name: 'Play RoomieMatch prototype' });
  // retry until the client component has hydrated and handles the key
  await expect(async () => {
    await play.focus();
    await page.keyboard.press('Enter');
    await expect(s.locator('iframe')).toHaveCount(1, { timeout: 500 });
  }).toPass();
  const frame = s.locator('iframe');
  await expect(frame).toHaveAttribute('src', /^https:\/\/embed\.figma\.com\/proto\/XflnePuAHp00z4TEDtzwJx\/.*device-frame=0/);
  await expect(frame).toHaveAttribute('title', 'RoomieMatch prototype (Figma)');
  await expect(play).toHaveCount(0);
});

test('phone fits inside the card on mobile', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile layout');
  await page.goto('/');
  const card = await page.locator('#design article').first().boundingBox();
  const phone = await page.getByTestId('phone').first().boundingBox();
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
