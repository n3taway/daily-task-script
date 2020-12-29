import path from "path";
import fs from "fs-extra";
import cp from "child_process";

async function clearDir(dir) {
  await fs.removeSync(path.join(__dirname, dir));
}

async function build() {
  const pwd = path.resolve(__dirname, "../");
  // 命令, 参数, 运行时路径
  await cp.spawnSync("npm", ["run", "build"], { cwd: pwd });
}

async function move(movePath, targetPath) {
  const _movePath = path.join(__dirname, movePath);
  const _targetPath = path.join(__dirname, targetPath);
  await fs.moveSync(_movePath, _targetPath, { overwrite: true });
}

async function main() {
  await clearDir("../dist");
  await clearDir("../scf_daily_task/src");
  await build();
  await move("../dist", "../scf_daily_task/src");
  console.log("File move completed！");
}

main();
