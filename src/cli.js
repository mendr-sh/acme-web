#!/usr/bin/env node
"use strict";

const { readArgs } = require("./args");
const { createStatusClient } = require("./client");
const { formatSummary } = require("./format");

async function main(argv) {
  const options = readArgs(argv);
  const client = createStatusClient({ baseUrl: options.baseUrl });
  const summary = await client.summary(options.services);
  process.stdout.write(
    options.json ? `${JSON.stringify(summary)}\n` : formatSummary(summary),
  );
  return summary.healthy ? 0 : 1;
}

if (require.main === module) {
  main(process.argv.slice(2)).then((code) => {
    process.exitCode = code;
  });
}

module.exports = { main };
