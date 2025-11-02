import { readdir } from "fs/promises";
import { workDir } from "./index.js";
import { errorMessage } from "./shared/constants.js";

const list = async () => {
  try {
    const list = await readdir(workDir, { withFileTypes: true });
    const directories = list.filter((f) => f.isDirectory());
    const files = list.filter((f) => f.isFile());
    const alphabeticalSort = (a, b) => a.name.localeCompare(b.name);
    directories.sort(alphabeticalSort);
    files.sort(alphabeticalSort);

    const tableData = [...directories, ...files].map((f) => {
      return { Name: f.name, Type: f.isDirectory() ? "directory" : "file" };
    });
    console.table(tableData);
  } catch (error) {
    console.log(errorMessage);
  }
};

export default list;
