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
  await expect(s.locator('article').first().getByRole('link', { name: /UX case study/ })).toHaveAttribute('href', '/case-study/roomiematch');
});

test('AccessCampus links to its prototype and case study page', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('#design article').nth(1);
  await expect(card.getByRole('heading', { name: 'AccessCampus' })).toBeAttached();
  await expect(card.getByRole('link', { name: /Play prototype/ })).toHaveAttribute('href', /figma\.com\/proto\/cw83ZV6F7lFHe9VYC0Roes\/.*starting-point-node-id=31%3A55/);
  await expect(card.getByRole('link', { name: /Open in Figma/ })).toHaveCount(0);
  await expect(card.getByRole('link', { name: /UX case study/ })).toHaveAttribute('href', '/case-study/accesscampus');
});

test('case study button opens the page on this site', async ({ page }) => {
  await page.goto('/');
  await page.locator('#design article').first().getByRole('link', { name: /UX case study/ }).click();
  await expect(page).toHaveURL(/\/case-study\/roomiematch$/);
  await expect(page.getByRole('heading', { level: 1, name: 'RoomieMatch' })).toBeVisible();
  await expect(page.getByTestId('phone')).toBeVisible();
  await expect(page.getByRole('link', { name: /Next case study/ })).toHaveAttribute('href', '/case-study/accesscampus');
  await expect(page.getByRole('link', { name: /Next case study/ })).toContainText('AccessCampus');
  await expect(page.getByRole('heading', { name: "What's next" })).toHaveCount(0);
  await expect(page.locator('article footer').getByRole('link', { name: /Play prototype/ })).toHaveAttribute('target', '_blank');
  await expect(page.locator('article footer').getByRole('link', { name: 'Back to home' })).toHaveAttribute('href', '/#design');
});

test('wireframe board embeds the Figma user flow', async ({ page }) => {
  await page.goto('/case-study/roomiematch');
  const frame = page.locator('iframe[title^="RoomieMatch user flow"]');
  await expect(frame).toHaveAttribute('src', /^https:\/\/embed\.figma\.com\/design\/XflnePuAHp00z4TEDtzwJx\/.*node-id=345-1588.*embed-host=portfolio/);
  await expect(page.getByRole('button', { name: 'Zoom in with Figma' })).toHaveCount(0);
});

test('unknown case study is 404', async ({ page }) => {
  const res = await page.goto('/case-study/does-not-exist');
  expect(res?.status()).toBe(404);
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
  expect(labels).toEqual(['Case Studies', 'Projects', 'Timeline', 'About', 'Contact']);
  await expect(page.getByRole('link', { name: 'Case Studies', exact: true })).toHaveAttribute('href', '/#design');
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
