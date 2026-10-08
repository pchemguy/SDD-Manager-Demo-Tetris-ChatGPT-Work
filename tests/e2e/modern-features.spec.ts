/** Actual production inputs and Canvas observations, with injected randomness/time only. */
import { expect, test } from "@playwright/test";
test.beforeEach(async ({ page }) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => { Math.random = () => 0.999; });
  await page.goto("/");
});

test("production bag, outlined ghost and Space preserve delayed locking", async ({ page }) => {
  await page.keyboard.press("Enter");
  await expect(page.locator("#next-type")).toHaveText("J");
  const bottomColors = () => page.locator("#board").evaluate((node) => {
    const c = node as HTMLCanvasElement;
    const p = c.getContext("2d")!.getImageData(0, c.height * 0.9, c.width, c.height * 0.1).data;
    let cyan = 0;
    for (let i = 0; i < p.length; i += 4)
      if (p[i] === 101 && p[i + 1] === 219 && p[i + 2] === 232) cyan++;
    return cyan;
  });
  expect(await bottomColors()).toBeGreaterThan(100);
  await page.clock.runFor(400);
  await page.keyboard.press("Space");
  await expect(page.locator("#score")).toHaveText("36");
  await expect(page.locator("#next-type")).toHaveText("J");
  expect(await bottomColors()).toBeGreaterThan(1000);
  await page.clock.runFor(900);
  await page.keyboard.press("Space");
  await expect(page.locator("#score")).toHaveText("36");
  await expect(page.locator("#next-type")).toHaveText("J");
  await page.clock.runFor(116);
  await expect(page.locator("#next-type")).toHaveText("L");
  await page.screenshot({ path: "/tmp/tetris-modern-drop.png" });
});
