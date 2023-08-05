/** @type {import("lint-staged").Config} */

const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const config = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "prettier --write"]
};

module.exports = config;
