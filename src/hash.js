import path from "node:path";
import { workDir } from "./dirWork.js";
import { errorMessage } from "./shared/constants.js";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export const calcHash = async (filePath) => {
  try {
    const fPath = path.resolve(workDir, filePath);
    const hash = createHash("sha256");
    const readStream = createReadStream(fPath);
    const hexHash = hash.digest("hex");

    await pipeline(readStream, hash);
    console.log(hexHash);
  } catch (error) {
    console.log(errorMessage);
    console.log(error.message);
  }
};
