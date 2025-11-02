import { EOL, arch, cpus, homedir, userInfo } from "node:os";
import { showInvalidMessage } from "./index.js";

export const printOS = (arg) => {
  switch (arg) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      const tableInfo = cpus().map((el) => {
        return { Model: el.model, "Clock rate": el.speed };
      });
      console.log(`overall amount of CPUS: ${tableInfo.length}`);
      console.table(tableInfo);
      break;
    case "--homedir":
      console.log(homedir());
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
      showInvalidMessage();
      break;
  }
};
