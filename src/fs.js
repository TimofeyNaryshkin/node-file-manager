import path from "node:path";
import { workDir } from "./dirWork.js";
import { createReadStream, createWriteStream } from "node:fs";
import { stdout } from "node:process";
import { errorMessage } from "./shared/constants.js";
import { mkdir, writeFile, rename, rm } from "node:fs/promises";
import { pipeline } from "node:stream/promises";

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
    const newPath = path.resolve(workDir, fileName);
    await writeFile(newPath, "", { flag: "wx" });
  } catch (error) {
    console.log(errorMessage);
  }
};

export const createDir = async (dirName) => {
  try {
    const newPath = path.resolve(workDir, dirName);
    await mkdir(newPath);
  } catch (error) {
    console.log(errorMessage);
  }
};

export const renameFile = async (filePath, newName) => {
  try {
    const oldPath = path.resolve(workDir, filePath);
    const newPath = path.resolve(workDir, newName);
    await rename(oldPath, newPath);
  } catch (error) {
    console.log(errorMessage);
  }
};

export const copyFile = async (filePath, dirPath) => {
  try {
    const oldPath = path.resolve(workDir, filePath);
    const copyPath = path.resolve(workDir, dirPath, path.basename(filePath));
    const read = createReadStream(oldPath);
    const write = createWriteStream(copyPath);

    await pipeline(read, write);
  } catch (error) {
    console.log(errorMessage);
  }
};

export const moveFile = async (filePath, dirPath) => {
  try {
    const oldPath = path.resolve(workDir, filePath);
    const copyPath = path.resolve(workDir, dirPath, path.basename(filePath));
    const read = createReadStream(oldPath);
    const write = createWriteStream(copyPath);

    await pipeline(read, write);
    await rm(oldPath);
  } catch (error) {
    console.log(errorMessage);
  }
};

export const removeFile = async (filePath) => {
  try {
    const oldPath = path.resolve(workDir, filePath);
    await rm(oldPath);
  } catch (error) {
    console.log(errorMessage);
  }
};
