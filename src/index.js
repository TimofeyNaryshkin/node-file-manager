import { stdin, stdout } from "node:process";
import { greet, bye } from "./greet.js";
import readline from "node:readline";

greet();

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on("line", (input) => {
  switch (input) {
    case ".exit":
      bye();
      break;
  }
});
