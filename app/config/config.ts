import * as fs from "fs";
import * as chokidar from "chokidar";
let configFilePath = "";
let configCallBack: { (): void };
export function SetConfigPath(path: string) {
  configFilePath = path;
}
export function SetConfigInitAndWatch(cb: () => void) {
  configCallBack = cb;
  configCallBack();
}
export enum HandleFileTye {
  Vue = "vue",
  Rn = "rn",
}
export class Cfg {
  private static _instance: Cfg;
  debug!: boolean;
  watchDir!: string[];
  common!: string[];
  single!: string[];
  type!: HandleFileTye;
  reg!: string[];
  outUnit!: string;
  zoom!: number;
  needZoomUnit!: string;
  oldCssReg!: string;
  constructor() {}
  public static GetInstance(): Cfg {
    if (!Cfg._instance) {
      let fileBody = fs.readFileSync(configFilePath, "utf8").toString();
      this._instance = JSON.parse(fileBody) as Cfg;
      let watcher = chokidar.watch(configFilePath);
      watcher.on("change", (path) => {
        let fileBody = fs.readFileSync(path, "utf8");
        try {
          this._instance = JSON.parse(fileBody) as Cfg;
        } catch (error) {
          console.log("配置文件获取异常", error);
        }
        if (
          this._instance.type !== HandleFileTye.Rn &&
          this._instance.type !== HandleFileTye.Vue
        ) {
          console.warn("the type should be one of [vue,rn],but set ${this._instance.type},now will set vue");
          this._instance.type = HandleFileTye.Vue;
        }
        configCallBack();
      });
    }
    return this._instance;
  }
}
