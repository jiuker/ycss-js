import * as chokidar from 'chokidar'
import { Cfg, HandleFileTye } from '../config/config'
export function SetWatchPaths(paths:string[],cb:(path:string,typ:HandleFileTye) => void){
    chokidar
    .watch(paths)
    .removeAllListeners()
    .on('change',(path)=>{
        if (Cfg.GetInstance().type === HandleFileTye.Vue){
            if (/(vue)$/.test(path)){
                cb(path,HandleFileTye.Vue)
            }
        }
        if (Cfg.GetInstance().type === HandleFileTye.Rn){
            if (/(js)$/.test(path)){
                cb(path,HandleFileTye.Rn)
            }
        }
    })
}