import { createReadStream, createWriteStream } from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { workDir } from "./dirWork.js";
import { errorMessage } from "./shared/constants.js";

export const compress = async (filePath, destPath) => {
  try {
    const iPath = path.resolve(workDir, filePath);
    const oPath = path.resolve(workDir, destPath);

    const readStream = createReadStream(iPath);
    const BrotliCompress = createBrotliCompress();
    const writeStream = createWriteStream(oPath);

    await pipeline(readStream, BrotliCompress, writeStream);
  } catch (error) {
    console.log(errorMessage);
    console.log(error.message);
  }
};

export const decompress = async (filePath, destPath) => {
  try {
    const iPath = path.resolve(workDir, filePath);
    const oPath = path.resolve(workDir, destPath);

    const readStream = createReadStream(iPath);
    const BrotliDecompress = createBrotliDecompress();
    const writeStream = createWriteStream(oPath);

    await pipeline(readStream, BrotliDecompress, writeStream);
  } catch (error) {
    console.log(errorMessage);
  }
};
