// import Dotenv from "dotenv-webpack"; // dotenv-webpack 모듈을 불러옴
import path from "path"; // Node.js에서 사용되는 path 모듈
import webpack from "webpack";

export default {
  mode: "development",
  devtool: "eval-source-map",
  // plugins: [new Dotenv()],
  resolve: {
    fallback: {
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
  entry: "./src/index.js", // 진입점
};
