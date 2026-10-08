import { expect, test } from "@playwright/test";
test("physical controlled repeats and semantic button Enter activation", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.addInitScript(() => {
    Math.random = () => 0.45;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await page.keyboard.down("ArrowDown");
  await expect(page.locator("#score")).toHaveText("1");
  await page.clock.runFor(49);
  await expect(page.locator("#score")).toHaveText("1");
  await page.clock.runFor(1);
  await page.keyboard.up("ArrowDown");
  await expect(page.locator("#score")).toHaveText("2");
  await page.getByRole("button", { name: "Pause", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Paused");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("status")).toHaveText("Playing");
  await page.clock.runFor(100);
  await expect(page.locator("#score")).toHaveText("2");
});
test("restarts preserve one input listener set and return focus to board", async ({
  page,
}) => {
  await page.goto("/");
  for (let i = 0; i < 5; i++) {
    await page.getByRole("button", { name: "Restart", exact: true }).click();
    await expect(page.locator("#board")).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.locator("#score")).toHaveText("1");
  }
});
test("editable and link focus keep native input and do not command the game", async ({
  page,
}) => {
  await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
  await page.clock.pauseAt(new Date("2026-01-01T00:00:00Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Start", exact: true }).click();
  await page.evaluate(() => {
    const input = document.createElement("input");
    input.id = "focus-fixture";
    document.body.append(input);
  });
  await page.locator("#focus-fixture").fill("abc");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("KeyP");
  await expect(page.locator("#score")).toHaveText("0");
  await expect(page.getByRole("status")).toHaveText("Playing");
  await expect(page.locator("#focus-fixture")).toHaveValue("abcp");
  await page.evaluate(() => {
    const link = document.createElement("a");
    link.href = "#";
    link.id = "link-fixture";
    link.textContent = "Test link";
    document.body.append(link);
  });
  await page.locator("#link-fixture").focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.locator("#score")).toHaveText("0");
});
