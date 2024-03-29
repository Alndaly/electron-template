#!/usr/bin/env node
import esbuild from "esbuild";
import { spawn } from "child_process";
import * as path from "path";
import electronPath from "electron";
import { MainBuildConfig, PreloadBuildConfig } from "./esbuild.base.mjs";
import { __dirname } from "./esbuild.base.mjs";

let spawnProcess: any = null;

const restartElectron = () => {
  if (spawnProcess !== null) {
    spawnProcess.off("exit", process.exit);
    spawnProcess.kill("SIGINT");
    spawnProcess = null;
  }

  const appPath = path.resolve(__dirname, "../");
  spawnProcess = spawn(String(electronPath), ['--inspect', appPath]);

  spawnProcess.stdout.on("data", (d: any) =>
    console.warn(d.toString())
  );
  spawnProcess.stderr.on("data", (d: any) => {
    console.error(d.toString());
  });

  // Stops the watch script when the application has been quit
  spawnProcess.on("exit", process.exit);
}

const mainBuild = async () => {
  await esbuild.build({
    ...MainBuildConfig,
    plugins: [{
      name: "restart-electron",
      setup(build) {
        build.onEnd((result) => {
          restartElectron();
        })
      }
    }]
  })
}


const preloadBuild = async () => {
  let ctx = await esbuild.context({
    ...PreloadBuildConfig,
    plugins: [{
      name: "rebuild-notify",
      setup(build) {
        build.onEnd((result) => {
          // ctx.send({
          //   type: "full-reload",
          // });
        })
      }
    }]
  })
  await ctx.watch({})
}


(async () => {
  try {
    await mainBuild();
    await preloadBuild();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
