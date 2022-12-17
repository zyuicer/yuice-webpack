import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export default () => {
  const __dirname = fileURLToPath(import.meta.url);
  return path.resolve(__dirname, "../../template/public/index.html");
};
