import * as cheerio from 'cheerio'
import { readFileSync } from 'fs'
interface commonRegexp{
    key:RegExp
    value:string[]
}
interface singleRegexp{
    key:RegExp
    value:string
}
export let CommonRegexp:commonRegexp[] = []
export let SingleRegexp:singleRegexp[] = []
export function SetCommonRegexp(paths:string[]){
    CommonRegexp = []
    for(let path of paths){
       try {
            let $ = cheerio.load(readFileSync(path,'utf8'))
            $("css").each((index,element)=>{
                try {
                    let value = (element.children[0].data as string).trim().split(/\r\n/g).filter(item=>{
                        return item !== ''
                    })
                    CommonRegexp.push({
                        key:new RegExp(element.attribs['key'].trim()),
                        value:value,
                    })
                } catch (error) {
                    console.log('common正则初始化失败',error)
                }
               
            })
       } catch (error) {
        console.log('获取common文件失败',error)
       }
    }
}
export function SetSingleRegexp(paths:string[]){
    SingleRegexp = []
    for(let path of paths){
       try {
            let $ = cheerio.load(readFileSync(path,'utf8'))
            $("css").each((index,element)=>{
                try {
                    let value = (element.children[0].data as string).trim()
                    SingleRegexp.push({
                        key:new RegExp(element.attribs['key'].trim()),
                        value:value,
                    })
                } catch (error) {
                    console.log('singal正则初始化失败',error)
                }
               
            })
       } catch (error) {
        console.log('获取singal文件失败',error)
       }
    }
}