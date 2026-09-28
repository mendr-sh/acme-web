"use strict";

const { optimize } = require("svgo");

// Keeps the viewBox so icons still scale in CSS, and strips editor metadata.
const config = {
  plugins: [
    {
      name: "preset-default",
      params: {
        overrides: {
          removeViewBox: false,
        },
      },
    },
    "removeDimensions",
  ],
};

async function optimizeIcon(svg) {
  const result = optimize(svg, config);
  return result.data;
}

module.exports = { optimizeIcon };
