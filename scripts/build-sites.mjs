// Build every site bundle under sites/*.json in one pass.
// Usage: node scripts/build-sites.mjs
import { readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { buildSite, loadSite } from "./build-site.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SITES_DIR = join(ROOT, "sites");

const files = readdirSync(SITES_DIR).filter((f) => f.endsWith(".json"));
if (files.length === 0) {
  console.error("no site configs found in sites/");
  process.exit(1);
}

let failed = 0;
for (const file of files) {
  const id = file.replace(/\.json$/, "");
  try {
    const { file: out } = await buildSite(loadSite(id));
    console.log(`✓ ${id} → ${out}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${id}: ${err.message}`);
  }
}
console.log(`\n${files.length - failed}/${files.length} site bundles built.`);
process.exit(failed ? 1 : 0);
