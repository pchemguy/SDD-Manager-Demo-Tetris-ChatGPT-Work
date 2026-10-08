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

test("C and both Shift controls show held shape, eligibility and fresh restart", async ({page}) => {
  await expect(page.locator("#held-type")).toHaveText("None");
  await expect(page.locator("#hold-availability")).toHaveText("Unavailable");
  await page.keyboard.press("Enter");
  await expect(page.locator("#hold-availability")).toHaveText("Available");
  await page.keyboard.press("KeyC");
  await expect(page.locator("#held-type")).toHaveText("I");
  await expect(page.locator("#next-type")).toHaveText("L");
  await expect(page.locator("#hold-availability")).toHaveText("Used");
  await page.keyboard.press("ShiftLeft");
  await expect(page.locator("#held-type")).toHaveText("I");
  await page.keyboard.press("KeyX"); await page.keyboard.press("Space"); await page.clock.runFor(1016);
  await expect(page.locator("#hold-availability")).toHaveText("Available");
  await page.keyboard.press("ShiftRight");
  await expect(page.locator("#held-type")).toHaveText("L");
  await expect(page.locator("#next-type")).toHaveText("O");
  expect(await page.locator("#held-preview").evaluate(node => {
    const c = node as HTMLCanvasElement; const p=c.getContext("2d")!.getImageData(0,0,c.width,c.height).data;
    let orange=0; for(let i=0;i<p.length;i+=4) if(p[i]===255&&p[i+1]===178&&p[i+2]===103)orange++; return orange;
  })).toBeGreaterThan(100);
  await page.keyboard.press("KeyP");
  await expect(page.locator("#hold-availability")).toHaveText("Used");
  await page.screenshot({path:"/tmp/tetris-modern-hold.png"});
  await page.getByRole("button",{name:"Restart",exact:true}).click();
  await expect(page.locator("#held-type")).toHaveText("None");
  await expect(page.locator("#hold-availability")).toHaveText("Available");
  await expect(page.locator("#next-type")).toHaveText("J");
  await page.keyboard.press("ShiftLeft");
  await expect(page.locator("#held-type")).toHaveText("I");
  await expect(page.locator("#hold-availability")).toHaveText("Used");
});

test("hold draw failure displays unavailable and restart restores usability", async ({page}) => {
  await page.goto("http://127.0.0.1:4175/tests/fixtures/recovery.html");
  await page.getByRole("button",{name:"Start",exact:true}).click();
  await page.keyboard.press("KeyC");
  await expect(page.getByRole("status")).toContainText("Runtime error");
  await expect(page.locator("#hold-availability")).toHaveText("Unavailable");
  await expect(page.locator("#held-type")).toHaveText("None");
  await page.getByRole("button",{name:"Restart",exact:true}).click();
  await expect(page.locator("#hold-availability")).toHaveText("Available");
});

test("semantic button Space and editable/link focus retain native behavior",async({page})=>{
  await page.getByRole("button",{name:"Start",exact:true}).focus(); await page.keyboard.press("Space");
  await expect(page.getByRole("status")).toHaveText("Playing"); await expect(page.locator("#score")).toHaveText("0");
  await page.getByRole("button",{name:"Pause",exact:true}).focus(); await page.keyboard.press("Space");
  await expect(page.getByRole("status")).toHaveText("Paused"); await page.keyboard.press("Space");
  await expect(page.getByRole("status")).toHaveText("Playing"); await page.keyboard.press("KeyC");
  await expect(page.locator("#held-type")).toHaveText("None");
  await page.evaluate(()=>{const i=document.createElement("input");i.id="modern-input";document.body.append(i);const a=document.createElement("a");a.id="modern-link";a.href="#";a.textContent="Focus link";document.body.append(a);});
  await page.locator("#modern-input").focus(); await page.keyboard.press("KeyC"); await page.keyboard.press("Space");
  await expect(page.locator("#modern-input")).toHaveValue("c ");
  await page.locator("#modern-link").focus(); await page.keyboard.press("Space");await page.keyboard.press("ShiftLeft");
  await expect(page.locator("#held-type")).toHaveText("None");await expect(page.locator("#score")).toHaveText("0");
});

test("production I wall kick publishes the first valid translated horizontal shape",async({page})=>{
  await page.keyboard.press("Enter");await page.keyboard.press("KeyZ");
  for(let n=0;n<8;n++)await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("KeyX");
  expect(await page.locator("#board").evaluate(node=>{
    const c=node as HTMLCanvasElement,cell=c.width/10;
    return Array.from(c.getContext("2d")!.getImageData(Math.floor(cell/2),Math.floor(cell*1.5),1,1).data);
  })).toEqual([101,219,232,255]);
  await expect(page.locator("#score")).toHaveText("0");
});
