import { expect, test } from "@playwright/test";
test("idle counters/preview, running soft-drop score and next shape are visible", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => {
    Math.random = () => 0.999;
  });
  await page.goto("/");
  await expect(page.locator("#score")).toHaveText("0");
  await expect(page.locator("#next-type")).toHaveText("—");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await expect(page.locator("#next-type")).toHaveText("J");
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#score")).toHaveText("1");
  await expect(page.locator("#lines")).toHaveText("0");
  await expect(page.locator("#level")).toHaveText("1");
  expect(
    await page.locator("#preview").evaluate((node) => {
      const c = node as HTMLCanvasElement,
        d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
      return Array.from(d).some((v, i) => i % 4 === 2 && v > 200);
    }),
  ).toBe(true);
  await page.screenshot({ path: "/tmp/tetris-progression.png" });
});
for (const viewport of [
  { width: 800, height: 600 },
  { width: 1280, height: 720 },
])
  for (const dpr of [1, 2])
    test.describe(`layout ${viewport.width}x${viewport.height} DPR ${dpr}`, () => {
      test.use({ viewport, deviceScaleFactor: dpr });
      test("square sharp board, visible labeled controls and no overlapping panels", async ({
        page,
      }) => {
        await page.goto("/");
        await expect(
          page.getByRole("button", { name: "Pause", exact: true }),
        ).toBeDisabled();
        await page.getByRole("button", { name: "Start", exact: true }).click();
        await expect(page.locator("#board")).toBeFocused();
        await expect(
          page.getByRole("button", { name: "Start", exact: true }),
        ).toBeDisabled();
        await expect(
          page.getByRole("button", { name: "Pause", exact: true }),
        ).toBeEnabled();
        await page.keyboard.press("KeyC");
        await expect(page.locator("#held-type")).toHaveText(/^[IJLOSTZ]$/);
        await expect(page.locator("#hold-availability")).toHaveText("Used");
        const metrics = await page.evaluate(() => {
          const canvas = document.querySelector<HTMLCanvasElement>("#board")!,
            board = canvas.getBoundingClientRect(),
            aside = document.querySelector("aside")!.getBoundingClientRect();
          return {
            buffer: canvas.width,
            css: canvas.clientWidth,
            ratio: board.height / board.width,
            overlap: board.right > aside.left,
            scroll: document.documentElement.scrollWidth,
            bottom: Math.max(board.bottom, aside.bottom),
          };
        });
        expect(
          Math.abs(metrics.buffer - metrics.css * dpr),
        ).toBeLessThanOrEqual(1);
        expect(metrics.ratio).toBeCloseTo(2, 2);
        expect(metrics.overlap).toBe(false);
        expect(metrics.scroll).toBeLessThanOrEqual(viewport.width);
        expect(metrics.bottom).toBeLessThanOrEqual(viewport.height);
        await expect(page.locator("#board")).toHaveAccessibleName(
          /Tetris game board/,
        );
        await expect(page.getByRole("status")).toHaveAttribute(
          "aria-live",
          "polite",
        );
        await page.screenshot({
          path: `/tmp/tetris-${viewport.width}-${dpr}.png`,
        });
      });
    });
test("preview identifier/color becomes the next active type after locking", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => {
    Math.random = () => 0.999;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await expect(page.locator("#next-type")).toHaveText("J");
  for (let i = 0; i < 18; i++) await page.keyboard.press("ArrowDown");
  await page.clock.runFor(1016);
  await expect(page.locator("#next-type")).toHaveText("L");
  expect(
    await page.locator("#board").evaluate((node) => {
      const c = node as HTMLCanvasElement,
        p = c.getContext("2d")!.getImageData(0, 0, c.width, c.height / 4).data;
      let blue = 0;
      for (let i = 0; i < p.length; i += 4)
        if (p[i] === 118 && p[i + 1] === 157 && p[i + 2] === 255) blue++;
      return blue;
    }),
  ).toBeGreaterThan(100);
});
