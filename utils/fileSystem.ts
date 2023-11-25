import fs from "fs";

export const writeToJSON = <T>(obj: T): void => {
  const jsonObj = JSON.stringify(obj);
  fs.writeFile(
    process.cwd() + "/fileStore/data.json",
    jsonObj,
    "utf-8",
    (err) => {
      if (err) {
        console.log("error writing to JSON file:", err);
      } else {
        console.log("successfully wrote to file");
      }
    }
  );
};

export const readFromJSON = async (): Promise<Record<
  string,
  boolean
> | void> => {
  const jsonData = await fs.promises.readFile(
    process.cwd() + "/fileStore/data.json",
    "utf-8"
  );
  try {
    const data = JSON.parse(jsonData);
    return data;
  } catch (e) {
    console.log("error parsing data", e);
    return undefined;
  }
};
