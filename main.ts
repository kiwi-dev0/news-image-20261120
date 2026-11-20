import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const botDir = process.env.MAKEFUN_BOT_DIR || dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const src = join(botDir, "entry.png");
if (!existsSync(src)) {
  console.error(`entry.png not found at ${src}`);
  process.exit(1);
}

try {
  mkdirSync(outDir, { recursive: true });
  copyFileSync(src, join(outDir, "entry.png"));
} catch (err) {
  console.error(`could not write to ${outDir}: ${(err as Error).message}`);
  process.exit(1);
}
console.log(`wrote ${join(outDir, "entry.png")}`);
