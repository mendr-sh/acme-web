"use strict";

const axios = require("axios");

// Reads service health from the status API. A service that does not answer
// within the timeout is reported as down, not as an error.
function createStatusClient({ baseUrl, timeoutMs = 2000 }) {
  const http = axios.create({ baseURL: baseUrl, timeout: timeoutMs });

  async function service(name) {
    try {
      const response = await http.get(`/services/${encodeURIComponent(name)}`);
      return {
        name,
        status: response.data.status === "ok" ? "up" : "degraded",
        latencyMs: response.data.latencyMs ?? null,
      };
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return { name, status: "unknown", latencyMs: null };
      }
      return { name, status: "down", latencyMs: null };
    }
  }

  async function summary(names) {
    const services = await Promise.all(names.map(service));
    const down = services.filter((item) => item.status === "down").length;
    return { services, healthy: down === 0 };
  }

  return { service, summary };
}

module.exports = { createStatusClient };
