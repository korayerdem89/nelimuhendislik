import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

/** Repository root (parent of `server/`), regardless of `process.cwd()`. */
export const PROJECT_ROOT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
);
