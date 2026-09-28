"use strict";

const parseArgs = require("minimist");

const defaults = {
  baseUrl: "http://localhost:8080",
  services: ["api", "web", "worker"],
  json: false,
};

function readArgs(argv) {
  const args = parseArgs(argv, {
    string: ["base-url", "services"],
    boolean: ["json"],
    alias: { b: "base-url", s: "services", j: "json" },
  });
  return {
    baseUrl: args["base-url"] || defaults.baseUrl,
    services: args.services
      ? args.services.split(",").map((name) => name.trim()).filter(Boolean)
      : defaults.services,
    json: Boolean(args.json),
  };
}

module.exports = { readArgs, defaults };
