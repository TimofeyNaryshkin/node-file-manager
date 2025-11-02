import path from "node:path";
import { workDir } from "./dirWork.js";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";
import { errorMessage } from "./shared/constants.js";

export const read = async (filePath) => {
  const newPath = path.resolve(workDir, filePath);
  const stream = createReadStream(newPath, { encoding: "utf-8" });

  return new Promise((resolve) => {
    stream.on("data", (chunk) => {
      stdout.write(chunk);
    });
    stream.on("end", () => {
      console.log();
      resolve();
    });
    stream.on("error", () => {
      console.log(errorMessage);
      resolve();
    });
  });
};
