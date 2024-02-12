import { test, expect } from '@playwright/test';

test('obstructions.spec.js', async ({ page }) => {
  const firstRule = '40% of the element was visible for at least 2 consecutive seconds. #whenFourtyForTwo';
  const secondRule = '50% of the element was visible for at least 4 consecutive seconds. #whenFiftyForFour';
  const thirdRule = '100% of the element was visible for at least 6 consecutive seconds. #whenHundredForSix';

  await page.goto('http://localhost:3000');

  await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'smooth' }));
  await page.waitForTimeout(500);

  await page.click('[data-testid="toggle-obstructions"]');
  await page.waitForSelector('[data-testid="middle"]');

  await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo({ top: 760, behavior: 'smooth' }));
  await expect(page.locator('[data-testid="middle"]')).toContainText(firstRule);
  await page.waitForTimeout(500);

  await page.setViewportSize({ width: 420, height: 768 });
  await page.evaluate(() => window.scrollTo({ top: 820, behavior: 'smooth' }));
  await page.waitForTimeout(2000);

  await page.click('[data-testid="toggle-obstructions"]');
  await page.waitForSelector('[data-testid="middle"]');

  await page.waitForTimeout(3000);
  await expect(page.locator('[data-testid="middle"]')).toContainText(secondRule);
  await page.waitForTimeout(1000);

  await page.click('[data-testid="toggle-obstructions"]');
  await page.evaluate(() => window.scrollTo({ top: 820, left: 420, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  await page.setViewportSize({ width: 1024, height: 768 });
  await page.click('[data-testid="toggle-obstructions"]');
  await page.waitForTimeout(6000);

  await expect(page.locator('[data-testid="middle"]')).toContainText(thirdRule);
});

test('rules.spec.js', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const firstRule = '40% of the element was visible for at least 2 consecutive seconds. #whenFourtyForTwo';
  const secondRule = '50% of the element was visible for at least 4 consecutive seconds. #whenFiftyForFour';
  const thirdRule = '100% of the element was visible for at least 6 consecutive seconds. #whenHundredForSix';

  await page.evaluate(() => window.scrollTo({ top: 1300, behavior: 'smooth' }));
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'smooth' }));
  await page.waitForTimeout(400);

  await page.waitForSelector('[data-testid="middle"]');
  await expect(page.locator('[data-testid="middle"]')).toContainText(firstRule);

  await page.waitForTimeout(1000);

  await page.evaluate(() => window.scrollTo({ top: 10, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  await page.waitForSelector('[data-testid="top"]');
  await expect(page.locator('[data-testid="top"]')).toContainText(firstRule);

  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'smooth' }));
  await page.waitForTimeout(800);

  await page.waitForSelector('[data-testid="bottom"]');
  await expect(page.locator('[data-testid="bottom"]')).toContainText(firstRule);

  await page.waitForTimeout(4000);

  await expect(page.locator('[data-testid="bottom"]')).toContainText(secondRule);
  await expect(page.locator('[data-testid="bottom"]')).toContainText(thirdRule);

  await page.evaluate(() => window.scrollTo({ top: 520, behavior: 'smooth' }));
  await page.waitForTimeout(3000);

  await expect(page.locator('[data-testid="top"]')).toContainText(secondRule);
  await expect(page.locator('[data-testid="middle"]')).toContainText(secondRule);

  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }));
  await page.waitForTimeout(3000);

  await expect(page.locator('[data-testid="top"]')).toContainText(thirdRule);
});
