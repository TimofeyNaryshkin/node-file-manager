import { stdin, stdout } from "node:process";
import { greet, bye } from "./greet.js";
import { homedir } from "node:os";
import readline from "node:readline";
import list from "./list.js";

const curDirMessage = () => {
  console.log(`You are currently in ${workDir}`);
};

export let workDir = homedir();

greet();
curDirMessage();

const showInvalidMessage = () => {
  console.log("Invalid input");
};

const goUp = () => {
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

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on("line", async (input) => {
  const inputArr = input.split(" ");
  const command = inputArr[0];

  switch (command) {
    case "up":
      goUp();
      break;
    case "ls":
      await list();
      break;
    case ".exit":
      rl.close();
      break;
    default:
      showInvalidMessage();
  }
  curDirMessage();
});

rl.on("close", bye);
