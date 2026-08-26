import { createHash } from "node:crypto";
import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const releaseRoot = path.join(root, "release");

async function filesUnder(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  }));
  return nested.flat().sort();
}

const files = (await filesUnder(releaseRoot)).filter((file) => !file.endsWith("release-manifest.json"));
const records = [];

for (const file of files) {
  const bytes = await readFile(file);
  const details = await stat(file);
  records.push({
    path: path.relative(root, file).replaceAll(path.sep, "/"),
    bytes: details.size,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  });
}

const manifest = {
  schemaVersion: "1.0",
  release: "PORTAIL-100-PRODUCTIONS-IA-V1",
  generatedAt: "2026-08-26",
  sourceSnapshot: "GitHub repository inspected on 2026-08-26",
  targets: ["Vite/Vinext", "GitHub Pages", "cPanel PHP read-only"],
  files: records,
};

await writeFile(path.join(releaseRoot, "release-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Manifeste créé: ${records.length} fichiers de release.`);

