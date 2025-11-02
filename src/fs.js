import path from "node:path";
import { workDir } from "./dirWork.js";
import { createReadStream } from "node:fs";
import { stdout } from "node:process";
import { errorMessage } from "./shared/constants.js";
import { mkdir, writeFile, rename } from "node:fs/promises";

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

export const create = async (fileName) => {
  try {
    const newPath = path.join(workDir, fileName);
    await writeFile(newPath, "", { flag: "wx" });
  } catch (error) {
    console.log(errorMessage);
  }
};

export const createDir = async (dirName) => {
  try {
    const newPath = path.join(workDir, dirName);
    await mkdir(newPath);
  } catch (error) {
    console.log(errorMessage);
  }
};

export const renameFile = async (filePath, newName) => {
  try {
    const oldPath = path.join(workDir, filePath);
    const newPath = path.join(workDir, newName);
    await rename(oldPath, newPath);
  } catch (err) {
    console.log(errorMessage);
  }
};
