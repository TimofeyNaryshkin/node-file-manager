import { stat } from "node:fs/promises";
import { homedir } from "node:os";
import { errorMessage } from "./shared/constants.js";
import path from "node:path";

export let workDir = homedir();

export const goUp = () => {
  const lastSlashIndex = workDir.lastIndexOf("\\");
  const slashIndex = workDir.indexOf("\\");

  if (lastSlashIndex !== -1) {
    if (lastSlashIndex !== slashIndex) {
      workDir = workDir.slice(0, lastSlashIndex);
    } else {
      workDir = workDir.slice(0, lastSlashIndex) + "\\";
    }
  }
};

export const cd = async (dirName) => {
  try {
    const newPath = path.resolve(workDir, dirName);
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      workDir = newPath;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(errorMessage);
  }
};
