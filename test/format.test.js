"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { formatSummary } = require("../src/format");

test("prints one line per service and an overall result", () => {
  assert.equal(
    formatSummary({
      healthy: false,
      services: [
        { name: "api", status: "up", latencyMs: 12 },
        { name: "worker", status: "down", latencyMs: null },
      ],
    }),
    "● api      up 12 ms\n○ worker   down\nSome services are down.\n",
  );
});
