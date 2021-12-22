const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
console.log(path.resolve(__dirname, "assets", "js"));

module.exports = {
    entry: "./src/client/js/main.js",
    mode: "development",
    watch:true, // 변경이 있을때 마다
    // clean: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/styles.css",
        }),
    ],
  output: {
    filename: "js/main.js",
    clean:true,
    path: path.resolve(__dirname, "assets"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};