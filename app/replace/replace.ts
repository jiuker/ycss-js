import {Cfg, HandleFileTye} from '../config/config'
import {VueReplace} from "./vue"
import { Log } from '../log/log'
export interface Replace{
    path:string
    body:string
    GetFileBody():string
    FindClass():string[]
    GetRegexpCss(css:string[]):string
    Zoom(css:string):string
    GetOldCss():string[]
    Replace(old:string,newcss:string,pos:string):string
    Save(newPos:string, old:string)
}
export function HandleChange(path:string,typ:HandleFileTye){
    setTimeout(() => {
        if (typ === HandleFileTye.Rn) {
            Log("skip RN",path)
            return
        }
        let replace!:Replace
        if(typ===HandleFileTye.Vue){
            replace = new VueReplace(path)
            Log("new vue instance")
        }
        Log("handle file is:",path)
        Log("fileBodyLength is:",`${replace.GetFileBody().length}`)
        if (replace.GetFileBody()==''){
            return
        }
        let classCss = replace.FindClass()
        Log("classCss:",...classCss)
        let regexpCss = replace.GetRegexpCss(classCss)
        Log("regexpCss:",regexpCss)
        let zoomCss = replace.Zoom(regexpCss)
        Log("zoomCss:",zoomCss)
        let [pos,old] = replace.GetOldCss()
        Log("pos:",pos)
        Log("old:",old)
        let newPos = ''
        if (pos===""){
            Log("没有插入位置！")
        }else{
            newPos = replace.Replace(old,"\r\n"+zoomCss+"\r\n",pos)
            Log("newPos:",newPos)
        }
        let same = IsTheSame(newPos,pos)
        if (!same){
            replace.Save(newPos,pos)
        }else{
            Log("just the same!doNoting!")
        }
    },500)
}
const CompareStr = 'qwertyuiopasdfghjklzxcvbnm;1234567890-=+[]'
function IsTheSame(a:string,b:string):boolean{
    let aMap = new Map();
    let bMap = new Map();
    for (const aByteStr of a) {
        let key = `${aByteStr}`
        let value:number = aMap.get(key)
        if (!value){
            value = 0
        }
        aMap.set(key,value+1)
    }
    for (const bByteStr of b) {
        let key = `${bByteStr}`
        let value:number = bMap.get(key)
        if (!value){
            value = 0
        }
        bMap.set(key,value+1)
    }
    for (const cByteStr of CompareStr) {
        if(!!aMap.get(cByteStr)&&!!bMap.get(cByteStr)&&aMap.get(cByteStr)!==bMap.get(cByteStr)){
            return false
        }
    }
    return true
}
