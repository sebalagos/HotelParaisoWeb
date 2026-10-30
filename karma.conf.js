const path = require("path");

module.exports = function (config) {
  const cobertura = process.argv.includes("--coverage");
  config.set({
    frameworks: ["jasmine", "webpack"],
    files: [{ pattern: "tests/**/*.spec.ts*", watched: false }],
    preprocessors: { "tests/**/*.spec.ts*": ["webpack"] },
    webpack: {
      mode: "development",
      devtool: "inline-source-map",
      resolve: { extensions: [".ts", ".tsx", ".js"], alias: { "@": path.resolve(__dirname) } },
      module: {
        rules: [{
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }], "@babel/preset-typescript"],
              plugins: cobertura ? [["istanbul", { exclude: ["tests/**"] }]] : [],
            },
          },
        }],
      },
    },
    browsers: ["ChromeHeadless"],
    reporters: cobertura ? ["progress", "coverage"] : ["progress"],
    coverageReporter: { dir: "coverage", reporters: [{ type: "html" }, { type: "text-summary" }] },
    singleRun: true,
  });
};
