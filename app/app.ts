import {Cfg,SetConfigPath,SetConfigInitAndWatch} from './config/config'
import {SetWatchPaths} from './watch/watch'
import { SetCommonRegexp, SetSingleRegexp } from './config/regexp'
import {HandleChange} from './replace/replace'
SetConfigPath('./res/config/config.json')
SetConfigInitAndWatch(()=>{
    SetWatchPaths(Cfg.GetInstance().watchDir,(path,typ)=>{
        HandleChange(path,typ)
    })
    SetCommonRegexp(Cfg.GetInstance().common)
    SetSingleRegexp(Cfg.GetInstance().single)
})

// 让程序停住
setInterval(function(){
    
},10000000)