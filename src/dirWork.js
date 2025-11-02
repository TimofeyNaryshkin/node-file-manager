import { homedir } from "node:os";

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
