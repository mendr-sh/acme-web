"use strict";

const SVGO = require("svgo");

// Keeps the viewBox so icons still scale in CSS, and strips editor metadata.
const svgo = new SVGO({
  plugins: [{ removeViewBox: false }, { removeDimensions: true }],
});

async function optimizeIcon(svg) {
  const result = await svgo.optimize(svg);
  return result.data;
}

module.exports = { optimizeIcon };
