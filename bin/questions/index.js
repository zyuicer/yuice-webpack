import inquirer from "inquirer";
import description from "./_package/description.js";
import packageName from "./_package/packageName.js";
import webpackPlugin from "./plugin/webpack-plugin.js";
import changeCssLoader from "./loader/change-css-loader.js";
import changeLanguageLoader from "./loader/change-language-loader.js";

async function createQuestion() {
  const raw = await inquirer.prompt([
    packageName(),
    description(),
    webpackPlugin(),
    changeCssLoader(),
    changeLanguageLoader(),
  ]);
  return raw;
}

export default createQuestion;
