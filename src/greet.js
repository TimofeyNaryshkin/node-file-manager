import { argv } from "node:process";

let userName = "";

const getUserName = () => {
  const userNameString = argv.slice(2)[0];
  userName = userNameString.slice(userNameString.indexOf("=") + 1);
};

export const greet = () => {
  getUserName();
  console.log(`Welcome to the File Manager, ${userName}!`);
};

export const bye = () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
};
