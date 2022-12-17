#!/usr/bin/env node
import path from "path";
import fs from "fs";
import createQuestion from "./questions/index.js";
import createPackage from "./create/createPackage.js";
import { execa } from "execa";
import chalk from "chalk";
import createWebpackComm from "./create/createWebpackComm.js";
import createWebpackDev from "./create/createWebpackDev.js";
import createWebpackProd from "./create/createWebpackProd.js";
import createWebpackConfig from "./create/createWebpackConfig.js";
import copyFavicon from "./copy/copyFavicon.js";
import copyHtml from "./copy/copyHtml.js";
import createPostcssConfig from "./create/createPostcssConfig.js";
import createBabelConfig from "./create/createBabelConfig.js";

function hasOption(list, name) {
  return list.indexOf(name) !== -1;
}

async function main() {
  const answer = await createQuestion();
  const mkPath = path.resolve(process.cwd(), answer.packageName);

  fs.mkdirSync(mkPath);
  fs.mkdirSync(mkPath + "/config");
  fs.mkdirSync(mkPath + "/src");
  fs.mkdirSync(mkPath + "/public");

  const config = {
    packageName: answer.packageName.trim(),
    description: answer.description.trim(),
    language: answer.language,
    loader: {
      "css-loader": hasOption(answer.loaders, "css-loader"),
      "less-loader": hasOption(answer.loaders, "less-loader"),
      "sass-loader": hasOption(answer.loaders, "sass-loader"),
    },
    plugin: {
      "html-webpack-plugin": hasOption(answer.plugins, "html-webpack-plugin"),
      "clean-webpack-plugin": hasOption(answer.plugins, "clean-webpack-plugin"),
      "copy-webpack-plugin": hasOption(answer.plugins, "copy-webpack-plugin"),
    },
  };

  const faviconCopy = copyFavicon();
  const htmlCopy = copyHtml();

  const packageCode = createPackage(config);
  const commCode = createWebpackComm(config);
  const devCode = createWebpackDev(config);
  const prodCode = createWebpackProd(config);
  const configCode = createWebpackConfig(config);
  const postcssCode = createPostcssConfig(config);
  const babelCode = createBabelConfig(config);

  fs.copyFileSync(faviconCopy, mkPath + "/public/favicon.ico");
  fs.copyFileSync(htmlCopy, mkPath + "/public/index.html");

  fs.writeFileSync(mkPath + "/package.json", packageCode);
  fs.writeFileSync(mkPath + "/config/webpack.comm.js", commCode);
  fs.writeFileSync(mkPath + "/config/webpack.dev.js", devCode);
  fs.writeFileSync(mkPath + "/config/webpack.prod.js", prodCode);
  fs.writeFileSync(mkPath + "/webpack.config.js", configCode);
  fs.writeFileSync(mkPath + "/postcss.config.js", postcssCode);
  fs.writeFileSync(mkPath + "/babel.config.js", babelCode);
  fs.writeFileSync(mkPath + `/src/index.${config.language}`, "");

  console.log(chalk.green("Yuice webpack Creating..."));

  execa("pnpm", ["i"], {
    cwd: mkPath,
    stdio: "inherit",
  });
}

main();
