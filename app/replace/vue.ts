import {Replace} from './replace'
import * as fs from 'fs'
import { Cfg } from '../config/config';
import { CommonRegexp, SingleRegexp } from '../config/regexp';
import { Log } from '../log/log';
export class VueReplace implements Replace{
    path: string;
    body: string;
    GetFileBody(): string {
        return this.body
    }
    constructor(path:string){
        this.path = path
        this.body = fs.readFileSync(this.path,'utf8').toString()
    }
    Replace(old: string, newcss: string, pos: string): string {
        return pos.replace(old,newcss)
    }
    GetOldCss(): string[]{
        let result:string[] = []
        let oldCssReg= Cfg.GetInstance().oldCssReg
        let oldCssMatch = this.body.match(new RegExp(oldCssReg))
        if (!!oldCssMatch){
            result.push(oldCssMatch[0])
            result.push(oldCssMatch[1])
        }
        if (result.length==0){
            result = ['','']
        }
        return result
    }
    Zoom(css: string): string {
        let needZoomUnit = Cfg.GetInstance().needZoomUnit
        css = css.replace(new RegExp('([0-9|\.]{1,10}[ |	]{0,3}(' + needZoomUnit + '){1,5})', 'g'), (data) => {
            return parseFloat(data.replace(new RegExp(needZoomUnit),'')) * Cfg.GetInstance().zoom+Cfg.GetInstance().outUnit
        })
        return css
    }
    GetRegexpCss(css: string[]): string {
        let resultArr:string[] =[]
        for(let _css of css){
            for(let cindex=0;cindex<CommonRegexp.length;cindex++){
                let classMatch = _css.match(CommonRegexp[cindex].key)
                if (!!classMatch){
                    CommonRegexp[cindex].value.forEach(item=>{
                        let itemTemp = item
                        for (let classMatchIndex = 1;classMatchIndex<classMatch!.length&&itemTemp.indexOf('$')!=-1;classMatchIndex++){
                            itemTemp = itemTemp.replace(new RegExp(`\\$${classMatchIndex}`,'g'),classMatch![classMatchIndex])
                        }
                        // itemTemp is singal class name
                        for(let sindex=0;sindex<SingleRegexp.length;sindex++){
                            let singalMatch = itemTemp.match(SingleRegexp[sindex].key)
                            if (!!singalMatch){
                                let singalValue = SingleRegexp[sindex].value
                                for(let singalMatchIndex=0;singalMatchIndex<singalMatch.length&&singalValue.indexOf('$')!=-1;singalMatchIndex++){
                                    singalValue = singalValue.replace(new RegExp(`\\$${singalMatchIndex}`, 'g'),singalMatch![singalMatchIndex])
                                }
                                resultArr.push(`.${itemTemp}{${singalValue}}`)
                            }
                        }
                    })
                    break
                }
            }
        }
        return resultArr.join('\r\n')
    }
    FindClass(): string[] {
        let allSet = new Set()
        let allCss:string[] = []
        let resultCss:string[] = []
        for (let _reg of Cfg.GetInstance().reg) {
            allCss = allCss.concat(this.GetFileBody().match(new RegExp(_reg,'g')).filter(item=>{
                return item !==''
            }).map(item=>{
                item = item.replace(/class=/,'')
                item = item.replace(/"|'/g,'')
                return item
            }) as string[])
        }
        allCss.join(' ').split(/ |  /g).filter(item=>{
            return item !==''
        }).forEach(item=>{
            allSet.add(item)
        })
        allSet.forEach(item=>{
            resultCss.push('.'+item as string)
        })
        return resultCss
    }
    Save(newPos:string, old:string){
        let willSave = this.GetFileBody().replace(old,newPos)
        try {
            fs.writeFileSync(this.path,willSave,{mode:0o777})
            Log("save success!")
        } catch (error) {
            Log("save error",error)
        }
    }
}