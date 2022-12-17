import ejs from "ejs";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";
export default (config) => {
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(
    path.resolve(__dirname, "../../template/webpack/config/webpack.prod.ejs"),
    {
      encoding: "utf-8",
    }
  );
  const code = ejs.render(template, {
    language: config.language,
    packageName: config.packageName,
    description: config.description,
    plugin: config.plugin,
    loader: config.loader,
  });
  return prettier.format(code, {
    parser: "babel",
  });
};
