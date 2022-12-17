const webpackComm = require("./config/webpack.comm.js");
const webpackProd = require("./config/webpack.prod.js");
const webpackDev = require("./config/webpack.dev.js");
const { merge } = require("webpack-merge");

module.exports = ({ production }) => {
  const isProduction = production ? true : false;

  const webpackConfig = webpackComm(isProduction);
  let webpackSetup = null;
  if (isProduction) {
    webpackSetup = webpackProd();
  } else {
    webpackSetup = webpackDev();
  }
  process.env.production = isProduction;
  return merge(webpackConfig, webpackSetup);
};
