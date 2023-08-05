import { nextBuild as wronglyTypedBuild } from "next/dist/cli/next-build";
import path from "path";

const nextBuild = wronglyTypedBuild as (args?: string[]) => Promise<void>;

const globalSetup = async () => {
  //you can set environment variables for your tests here

  if (process.env.SKIP_BUILD !== "false") {
    //skip the build and test with previously built app
    console.log("\x1b[1m \x1b[34m Playwright \x1b[0m skipping build...");
  } else {
    //use this if you plan to do a fixture which requires you to build
    await nextBuild([path.join(__dirname, "..")]);
  }
};

export default globalSetup;
