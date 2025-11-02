import { stdin, stdout } from "node:process";
import { greet, bye } from "./greet.js";
import { homedir } from "node:os";
import readline from "node:readline";

greet();
curDir();
let workDir = homedir();
const curDir = () => {
  stdout.write(`You are currently in ${import.meta.dirname}`);
};
const errorMessage = () => {
  stdout.write("Invalid input");
};

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on("line", (input) => {
  switch (input) {
    case ".exit":
      rl.close();
      break;
    default:
      errorMessage();
  }
  curDir();
});

rl.on("close", bye);
