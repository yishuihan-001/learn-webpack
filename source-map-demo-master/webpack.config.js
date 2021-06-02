const path = require("path");

module.exports = {
  devtool: "hidden-source-map",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};