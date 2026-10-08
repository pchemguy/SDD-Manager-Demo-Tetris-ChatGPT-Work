import { expect, test } from "@playwright/test";
test("production entry renders a game, moves/rotates and restarts", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("status")).toHaveText("Ready");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Playing");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("KeyX");
  await expect(page.locator("#board")).toBeFocused();
  await page.getByRole("button", { name: "Restart", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Playing");
  expect(errors).toEqual([]);
});
test("isolated real-engine fixture clears rows and reaches blocked spawn", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4175/tests/fixtures/gameplay.html");
  await expect(page.locator("#result")).not.toHaveText("Pending");
  const result = JSON.parse((await page.locator("#result").textContent())!);
  expect(result.clear.board.flat().filter(Boolean)).toHaveLength(0);
  expect(result.over.status).toBe("game-over");
  expect(result.over.active).toBeNull();
});
test("real production Canvas contains active and settled cells across spawn", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  const colored = () =>
    page.locator("#board").evaluate((node) => {
      const c = node as HTMLCanvasElement,
        ctx = c.getContext("2d")!,
        pixels = ctx.getImageData(0, 0, c.width, c.height).data;
      let n = 0;
      for (let i = 0; i < pixels.length; i += 4)
        if (Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) > 100) n++;
      return n;
    });
  expect(await colored()).toBeGreaterThan(1000);
  await page.clock.runFor(21000);
  expect(await colored()).toBeGreaterThan(2000);
  await page.screenshot({ path: "/tmp/tetris-playable.png" });
});
test("production controls clear rows with scoring and make no external gameplay requests", async ({
  page,
}) => {
  const requests: string[] = [],
    errors: string[] = [];
  page.on("request", (r) => requests.push(r.url()));
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => {
    Math.random = () => 0.999;
  });
  await page.goto("/");
  await page.keyboard.press("Enter");
  // Identity bag I/J/L tile the bottom row at columns 0–3/4–6/7–9.
  for (const target of [0, 4, 7]) {
    const difference = target - 3;
    for (let i = 0; i < Math.abs(difference); i++)
      await page.keyboard.press(difference < 0 ? "ArrowLeft" : "ArrowRight");
    for (let i = 0; i < 18; i++) await page.keyboard.press("ArrowDown");
    await page.clock.runFor(1016);
  }
  await expect(page.locator("#lines")).toHaveText("1");
  await expect(page.locator("#score")).toHaveText("154");
  await expect(page.locator("#level")).toHaveText("1");
  await page.keyboard.press("KeyP");
  await expect(page.getByRole("status")).toHaveText("Paused");
  expect(errors).toEqual([]);
  expect(
    requests.every((url) => url.startsWith("http://127.0.0.1:4173/")),
  ).toBe(true);
  expect(
    requests.every(
      (url) => !url.includes("/tests/") && !url.includes("/@vite"),
    ),
  ).toBe(true);
});
test("production blocked spawn retains counters/preview and Enter restarts terminal game", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => {
    Math.random = () => 0.999;
  });
  await page.goto("/");
  await page.keyboard.press("Enter");
  for (let n = 0; n < 11; n++) {
    for (let i = 0; i < 18; i++) await page.keyboard.press("ArrowDown");
    await page.clock.runFor(1016);
  }
  await expect(page.getByRole("status")).toHaveText("Game over");
  await expect(page.locator("#score")).toHaveText("101");
  await expect(page.locator("#lines")).toHaveText("0");
  await expect(page.locator("#next-type")).toHaveText("T");
  await expect(
    page.getByRole("button", { name: "Pause", exact: true }),
  ).toBeDisabled();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Playing");
  await expect(page.locator("#score")).toHaveText("0");
});
