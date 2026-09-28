"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { test } = require("node:test");
const { optimizeIcon } = require("../src/icons");

test("keeps the viewBox and removes editor metadata and fixed sizes", async () => {
  const svg = await fs.readFile(
    path.join(__dirname, "..", "icons", "status-up.svg"),
    "utf8",
  );
  const optimized = await optimizeIcon(svg);
  assert.match(optimized, /viewBox="0 0 16 16"/);
  assert.match(optimized, /fill="#1a7f37"/);
  assert.doesNotMatch(optimized, /Sketch|<title>|<desc>|width="16px"/);
  assert.ok(optimized.length < svg.length / 2);
});
