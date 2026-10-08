/** Provision pinned Linux test-only browser assets into an owned, ignored cache. */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
if (process.platform !== "linux" || process.arch !== "x64")
  throw Error(
    "Packaged browser route supports Linux x64. Use Playwright browser provisioning on other systems.",
  );
const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.resolve("@sparticuz/chromium"))),
  "..",
);
const manifest = JSON.parse(
  fs.readFileSync(path.join(packageRoot, "package.json"), "utf8"),
);
if (manifest.version !== "153.0.0")
  throw Error("Unexpected packaged browser version.");
const cache = path.resolve(
  process.env.TETRIS_BROWSER_CACHE ?? "node_modules/.cache/tetris-browser",
);
fs.mkdirSync(cache, { recursive: true });
for (const name of ["chromium", "fonts.tar", "swiftshader.tar"]) {
  const bytes = zlib.brotliDecompressSync(
    fs.readFileSync(path.join(packageRoot, "bin", name + ".br")),
  );
  if (name === "chromium") {
    if (bytes.subarray(0, 4).toString("hex") !== "7f454c46")
      throw Error("Expected ELF executable.");
    fs.writeFileSync(path.join(cache, "chromium"), bytes, { mode: 0o700 });
  } else {
    const archive = path.join(cache, name);
    fs.writeFileSync(archive, bytes);
    const entries = execFileSync("tar", ["-tf", archive], { encoding: "utf8" })
      .trim()
      .split("\n");
    if (
      entries.some(
        (entry) => entry.startsWith("/") || entry.split("/").includes(".."),
      )
    )
      throw Error("Unsafe archive member.");
    const destination =
      name === "fonts.tar" ? path.join(cache, "fonts") : cache;
    fs.mkdirSync(destination, { recursive: true });
    execFileSync("tar", ["--no-same-owner", "-xf", archive, "-C", destination]);
  }
}
const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
const fontPath = path.join(cache, "fontconfig");
fs.mkdirSync(fontPath, { recursive: true });
fs.writeFileSync(
  path.join(fontPath, "fonts.conf"),
  `<?xml version="1.0"?><fontconfig><include ignore_missing="yes">/etc/fonts/fonts.conf</include><dir>${escapeXml(path.join(cache, "fonts", "fonts"))}</dir><cachedir>${escapeXml(path.join(cache, "font-cache"))}</cachedir></fontconfig>`,
);
const config = {
  executablePath: path.join(cache, "chromium"),
  fontPath,
  args: [
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "--use-gl=angle",
    "--use-angle=swiftshader",
    "--enable-unsafe-swiftshader",
  ],
};
fs.writeFileSync(
  path.join(cache, "config.json"),
  JSON.stringify(config, null, 2) + "\n",
);
console.log(
  execFileSync(config.executablePath, ["--version"], {
    encoding: "utf8",
  }).trim(),
);
console.log(
  "Test-only browser provisioned; multiprocess launch, ownership-safe extraction and local fonts configured.",
);
