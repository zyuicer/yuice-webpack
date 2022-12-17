import ejs from "ejs";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";
export default () => {
  const __dirname = fileURLToPath(import.meta.url);
  const template = fs.readFileSync(
    path.resolve(__dirname, "../../template/html.ejs"),
    {
      encoding: "utf-8",
    }
  );
  const code = ejs.render(template);
  return prettier.format(code, {
    parser: "html",
  });
};
