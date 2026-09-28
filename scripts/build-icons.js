"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");
const { optimizeIcon } = require("../src/icons");

async function build() {
  const source = path.join(__dirname, "..", "icons");
  const target = path.join(__dirname, "..", "dist", "icons");
  await fs.mkdir(target, { recursive: true });
  const files = (await fs.readdir(source)).filter((name) => name.endsWith(".svg"));
  for (const name of files) {
    const svg = await fs.readFile(path.join(source, name), "utf8");
    await fs.writeFile(path.join(target, name), await optimizeIcon(svg));
  }
  console.log(`Optimized ${files.length} icons into dist/icons.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
