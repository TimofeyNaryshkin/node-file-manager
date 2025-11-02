import { stdin, stdout } from "node:process";
import { greet, bye } from "./greet.js";
import readline from "node:readline";
import list from "./list.js";
import { workDir, goUp } from "./dirWork.js";

const curDirMessage = () => {
  console.log(`You are currently in ${workDir}`);
};

greet();
curDirMessage();

const showInvalidMessage = () => {
  console.log("Invalid input");
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
