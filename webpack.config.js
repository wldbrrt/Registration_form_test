const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./client/src/index.js",
  plugins: [
    new HTMLWebpackPlugin({
      template: "./client/src/index.html",
      inject: true,
      title: "Dev Server",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: true,
        },
      },

      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: {
          loader: "handlebars-loader",
        },
      },
    ],
  },
  devServer: {
    static: "./client/dist",
    watchFiles: ["client/src/*html"],
    hot: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./client/dist"),
    clean: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
  }

  if (argv.mode === "production") {
    config.plugins = [
      new HTMLWebpackPlugin({
        template: "./client/src/index.html",
        title: "Registration form",
        filename: "index.html",
      }),
    ];
  }

  return config;
};
