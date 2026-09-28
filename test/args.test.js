"use strict";

const assert = require("node:assert/strict");
const { test } = require("node:test");
const { defaults, readArgs } = require("../src/args");

test("uses the defaults without arguments", () => {
  assert.deepEqual(readArgs([]), defaults);
});

test("reads long and short options", () => {
  assert.deepEqual(
    readArgs(["--base-url", "https://status.acme.test", "-s", "api, web", "-j"]),
    { baseUrl: "https://status.acme.test", services: ["api", "web"], json: true },
  );
});

test("ignores empty service names", () => {
  assert.deepEqual(readArgs(["--services", "api,,worker,"]).services, [
    "api",
    "worker",
  ]);
});
