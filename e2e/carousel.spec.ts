import { test, expect, type Page } from '@playwright/test';

const work = (page: Page) => page.locator('#work');
const current = (page: Page) => work(page).locator('[aria-current="true"]');

async function open(page: Page) {
  await page.clock.install();
  await page.goto('/#work');
  // wait for hydration: the dots only exist once the client component runs
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
}

test('next button moves to the second card', async ({ page }) => {
  await open(page);
  await work(page).getByRole('button', { name: 'Next slide' }).click();
  await expect(current(page)).toHaveAccessibleName('Go to slide 2');
  await work(page).getByRole('button', { name: 'Next slide' }).click();
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
});

test('auto-advances every 6 seconds', async ({ page }) => {
  await open(page);
  await page.mouse.move(0, 0);
  await expect(work(page).locator('[data-autoplay]')).toHaveAttribute('data-autoplay', 'true');
  await page.clock.fastForward(5000);
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
  await page.clock.fastForward(1500);
  await expect(current(page)).toHaveAccessibleName('Go to slide 2');
});

test('hover pauses auto-advance', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'hover is mouse only');
  await open(page);
  await work(page).locator('article').first().hover();
  await expect(work(page).locator('[data-autoplay]')).toHaveAttribute('data-autoplay', 'false');
  await page.clock.fastForward(13000);
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
});

test('pause button stops auto-advance', async ({ page }) => {
  await open(page);
  await work(page).getByRole('button', { name: 'Pause slides' }).click();
  await page.mouse.move(0, 0);
  await page.clock.fastForward(13000);
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
  await expect(work(page).getByRole('button', { name: 'Play slides' })).toBeVisible();
});

test('reduced motion: no auto-advance', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await open(page);
  await page.mouse.move(0, 0);
  await page.clock.fastForward(13000);
  await expect(current(page)).toHaveAccessibleName('Go to slide 1');
});

test('a single card gets no controls', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#design article')).toHaveCount(1);
  await expect(page.locator('#design').getByRole('button', { name: 'Next slide' })).toHaveCount(0);
});
