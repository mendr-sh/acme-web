"use strict";

const marks = { up: "●", degraded: "◐", down: "○", unknown: "?" };

function formatSummary(summary) {
  const lines = summary.services.map((item) => {
    const latency = item.latencyMs === null ? "" : ` ${item.latencyMs} ms`;
    return `${marks[item.status]} ${item.name.padEnd(8)} ${item.status}${latency}`;
  });
  lines.push(summary.healthy ? "All services up." : "Some services are down.");
  return `${lines.join("\n")}\n`;
}

module.exports = { formatSummary };
