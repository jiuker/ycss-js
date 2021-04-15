import { Cfg } from "../config/config";

export function Log(...args:string[]){
    if (Cfg.GetInstance().debug){   
        console.log(...args)
    }
}