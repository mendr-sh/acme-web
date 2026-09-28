"use strict";

const assert = require("node:assert/strict");
const http = require("node:http");
const { after, before, test } = require("node:test");
const { createStatusClient } = require("../src/client");

let server;
let baseUrl;

before(async () => {
  server = http.createServer((request, response) => {
    const name = decodeURIComponent(request.url.replace("/services/", ""));
    if (name === "slow") return; // Never answers, so the client times out.
    if (name === "missing") {
      response.writeHead(404).end();
      return;
    }
    response.setHeader("content-type", "application/json");
    response.end(
      JSON.stringify(
        name === "web"
          ? { status: "slow", latencyMs: 900 }
          : { status: "ok", latencyMs: 12 },
      ),
    );
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.closeAllConnections();
  server.close();
});

test("reports a healthy service as up with its latency", async () => {
  const client = createStatusClient({ baseUrl });
  assert.deepEqual(await client.service("api"), {
    name: "api",
    status: "up",
    latencyMs: 12,
  });
});

test("reports a service that answers with another status as degraded", async () => {
  const client = createStatusClient({ baseUrl });
  assert.equal((await client.service("web")).status, "degraded");
});

test("reports an unknown service and a timeout differently", async () => {
  const client = createStatusClient({ baseUrl, timeoutMs: 200 });
  assert.equal((await client.service("missing")).status, "unknown");
  assert.equal((await client.service("slow")).status, "down");
});

test("a summary is healthy only when no service is down", async () => {
  const client = createStatusClient({ baseUrl, timeoutMs: 200 });
  assert.equal((await client.summary(["api", "web"])).healthy, true);
  assert.equal((await client.summary(["api", "slow"])).healthy, false);
});
