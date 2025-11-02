import { stdin, stdout } from "node:process";
import { greet, bye } from "./greet.js";
import readline from "node:readline";
import list from "./list.js";
import { workDir, goUp, cd } from "./dirWork.js";
import { create, createDir, read, renameFile } from "./fs.js";

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
  const args = inputArr.slice(1);

  switch (command) {
    case "up":
      goUp();
      break;
    case "cd":
      await cd(args[0]);
      break;
    case "ls":
      await list();
      break;
    case "cat":
      await read(args.join(" "));
      break;
    case "add":
      await create(args.join(" "));
      break;
    case "mkdir":
      await createDir(args.join(" "));
      break;
    case "rn":
      await renameFile(args[0], args[1]);
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
