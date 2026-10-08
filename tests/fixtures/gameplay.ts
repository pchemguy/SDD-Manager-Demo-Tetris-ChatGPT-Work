/** Isolated deterministic entry, never imported by the production app. Uses real public game operations. */
import { GameSession } from "../../src/engine/session";
import { sequenceFactory } from "./piece-sources";
const clear = new GameSession(sequenceFactory(["O"]));
clear.start();
for (const target of [0, 2, 4, 6, 8]) {
  while (clear.snapshot().active!.x > target) clear.command("left");
  while (clear.snapshot().active!.x < target) clear.command("right");
  clear.advance(19000);
}
const over = new GameSession(sequenceFactory(["O"]));
over.start();
for (let i = 0; i < 10; i++) over.advance(19000 - i * 2000);
document.querySelector("#result")!.textContent = JSON.stringify({
  clear: clear.snapshot(),
  over: over.snapshot(),
});
