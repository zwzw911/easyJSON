/**
 * Created by 张伟 on 2019/3/29.
 */
'use strict'

const ap=require('awesomeprint')
const fs=require('fs')

/*
function  main() {
    fs.access
}*/


/**     判断文件是否存在        **/
// @file: 文件路径+文件名
function ifFileExist({file}){
    try {
        fs.accessSync(file, fs.constants.F_OK);
        return true
        // console.log('可以读写');
    } catch (err) {
        return false
        // console.error('无权访问');
    }
}
/**     判断文件是否可读        **/
// @file: 文件路径+文件名
function ifFileReadable({file}){
    let result=fs.accessSync(file,fs.constants.W_OK)
    return undefined===result
/*    if(undefined===result){
        return true
    }else{
        // ap.err(`file ${file} not readable`)
        return false
    }*/
}

/**     读取JSON文件，转换成JSON变量       **/
// @file: 文件路径+文件名
function readJSONFile({file}){
    return JSON.parse(fs.readFileSync(file))

}

/**     读取JSON文件，转换成JSON变量       **/
// @file: 文件路径+文件名
function writeJSONFile({file,json}){
    // fs.writeFileSync(file,JSON.parse(json,undefined,'   '))
    fs.writeFileSync(file,JSON.stringify(json,undefined,'    '))
}
/**     检查父节点是否存在   **/
//@parentKey:要修改的json节点的父节点。类似parentKey1.subParentKey1的字符串，以.分隔
//@return: boolean
function ifParentKeyExists({parentKey, jsonVar}){
    let parentKeyArray= parentKey.split('.')
    let partJson=jsonVar //记录当前校验是否存在的JSON部分，因为是从原始的JSON一级级往下检查，因此需要记录当前到达的级别
    let partParentKey=''//记录检查过的parentKey

    for(let singleParentKey of parentKeyArray){
        if(''!==partParentKey){
            partParentKey+='.'
        }
        partParentKey+=singleParentKey

        // ap.inf(`key ${singleParentKey} type is `,typeof singleParentKey)
        if(undefined===partJson[singleParentKey]){
            ap.err(`parent ${partParentKey} not exist`)
            return false
        }

        //用当前获得的存在的节点覆盖之前的父节点（以便继续检查下去）
        partJson=partJson[singleParentKey]
    }

    // ap.inf(`final jsonVar`,jsonVar)
    return true
}


/**     检查配置文件的设置是否正确       **/
//检查单个配置是否正确
//singleModifyContent: 单个节点修改的内容。必须不是undefined
function ifConfigurationCorrect({singleModifyContent}) {

    //2 是否为4~5个key
    if(4>Object.keys(singleModifyContent).length || 5<Object.keys(singleModifyContent).length ){
        ap.wrn(`configuration ${singleModifyContent} format wrong, not contain 4 or 5 key: parentKey, method, index, keyName, keyValue`)
        return false
    }
    //3  所有key，必须是预定义的一种parentKey/method/index/keyName/keyValue
    let  mandatoryKey=['parentKey','method','index','keyName','keyValue']
    let toBeCheckedKeys=Object.keys(singleModifyContent)
    for(let singleToBeCheckedKeys of toBeCheckedKeys){
        if(-1===mandatoryKey.indexOf(singleToBeCheckedKeys)){
            ap.wrn(`configuration ${JSON.stringify(singleModifyContent)} format wrong, '${singleToBeCheckedKeys}' not one of 'parentKey, method, index, keyName, keyValue'`)
            return false
        }
/*        if(undefined===singleModifyContent[singleMandatoryKey]){

        }*/
    }
    //4 如果index存在，必须是array
    if(undefined!==singleModifyContent['index']){
        if(false===singleModifyContent['index'] instanceof  Array){
            ap.wrn(`configuration ${JSON.stringify(singleModifyContent)} format wrong, 'index' not array`)
            return false
        }
    }
    //5  method是否为modify或者append
    let mandatoryMethod=['modify','append']
    if(-1===mandatoryMethod.indexOf(singleModifyContent['method'])){
        ap.wrn(`method only support 'modify' and 'append', ${singleModifyContent['method']} not supported `)
        return false
    }

    //6 如果是append，这keyValue必须是array
    if('append'===singleModifyContent['method']){
        if(false===singleModifyContent['keyValue'] instanceof  Array){
            ap.wrn(`when method is 'append', 'keyValue' must be array`)
            return false
        }
    }
}


/**     对单个需要修改的内容，进行append。默认修改内容的格式是符合要求的    **/
function appendJSON({origJson,singleModifyContent}){
    let partJson=origJson
    //1 根据parentKey，抵达要修改的节点
    let convertedParentKey=singleModifyContent['parentKey'].split('.')
    for(let singleParentKey of convertedParentKey){
        // ap.inf(`input orig partJson`, partJson)
        partJson=partJson[singleParentKey]
    }

    //如果是添加，直接抵达要操作的节点
    if('append'===singleModifyContent['method']){
        partJson=partJson[singleModifyContent['keyName']]
    }else{
        return //保护代码，理论不需要
    }

    // ap.inf(`reach node`, partJson)

    // let ifOperatorNodeArray=false,ifOperatorNodeObject=false

    let ifArray=false,ifObject=false  //待操作节点的类型.如果是append，是待操作节点


    if(true=== partJson instanceof Array){
        ifArray=true
    }
    if(true===(typeof partJson === 'object' && partJson!==null && Object == partJson.constructor)){
        ifObject=true
    }
    //既不是array，也不是object，则无法处理
    if(false===ifArray && false===ifObject){
        ap.err(`can't handle key ${singleModifyContent['keyName']}, since its value neither array nor object`)
        return
    }


    if(true===ifObject){
        for(let singleEle of singleModifyContent['keyValue']){
            let appendKey=Object.keys(singleEle)[0]
            // ap.inf('appendkey',appendKey)
            ap.inf(`key '${singleModifyContent['parentKey']}.${singleModifyContent['keyName']}' append value '${JSON.stringify(singleEle)}' successfully.`)
            partJson[appendKey]=singleEle[appendKey]
            // ap.inf(`after append partJson[singleModifyContent['keyName']] ${partJson[singleModifyContent['keyName']][singleAppendKey]}`)
        }
        return

    }
    if(true===ifArray){
        if(undefined===singleModifyContent['index']){
            ap.err(`${singleModifyContent['keyName']} is in an array, but modifyContent not include index`)
            return
        }
        //append

        //如果被插的内容不是array，直接push
        if(false===singleModifyContent['keyValue'] instanceof Array){
            ap.inf(`key '${singleModifyContent['parentKey']}.${singleModifyContent['keyName']}' append value '${JSON.stringify(singleModifyContent['keyValue'])}' successfully.`)
            partJson.push(singleModifyContent['keyValue'])
        }else{
            //如果被插的内容是array，展开后push
            for(let singleEle of singleModifyContent['keyValue']){
                ap.inf(`key '${singleModifyContent['parentKey']}.${singleModifyContent['keyName']}' append value '${JSON.stringify(singleEle)}' successfully.`)
                partJson.push(singleEle)
            }
        }
    }

}

/**     修改JSON      **/
function modifyJSON({origJson,singleModifyContent}){

    // let changedParentJson
    let partJson=origJson
    //1 根据parentKey，抵达要修改的节点的父节点
    let convertedParentKey=singleModifyContent['parentKey'].split('.')
    for(let singleParentKey of convertedParentKey){
        // ap.inf(`input orig partJson`, partJson)
        partJson=partJson[singleParentKey]
    }
    // ap.inf(`reach node`, partJson)

    // let ifOperatorNodeArray=false,ifOperatorNodeObject=false

    let ifArray=false,ifObject=false  //待操作节点的类型.如果是modify，是待操作节点的父节点


    if(true=== partJson instanceof Array){
        ifArray=true
    }
    if(true===(typeof partJson === 'object' && partJson!==null && Object == partJson.constructor)){
        ifObject=true
    }
    //既不是array，也不是object，则无法处理
    if(false===ifArray && false===ifObject){
        ap.err(`can't handle parentey ${singleModifyContent['parentKey']}, since its value neither array nor object`)
        return
    }


    if(true===ifObject){
        ap.inf(`key '${singleModifyContent['keyName']}' original value is '${partJson[singleModifyContent['keyName']]}', modify to new value '${singleModifyContent['keyValue']}' successfully.`)
        partJson[singleModifyContent['keyName']] = singleModifyContent['keyValue']
        return

    }
    if(true===ifArray){
        if(undefined===singleModifyContent['index']){
            ap.err(`${singleModifyContent['keyName']} is in an array, but modifyContent not include index`)
            return
        }


        for(let singleIdx of singleModifyContent['index']){
            ap.inf(`key '${singleModifyContent['keyName']}' original value is '${partJson[singleIdx][singleModifyContent['keyName']]}', modify to new value '${singleModifyContent['keyValue']}' successfully.`)
            partJson[singleIdx][singleModifyContent['keyName']]=singleModifyContent['keyValue']
        }


    }

}
//origJson:原始JSON文件
//singleModifyContent：变量，单个修改配置
function changeJSON({origJson,singleModifyContent}){
    if('modify'===singleModifyContent['method']){
        modifyJSON({origJson:origJson,singleModifyContent:singleModifyContent})
        return
    }

    if('append'===singleModifyContent['method']){
        appendJSON({origJson:origJson,singleModifyContent:singleModifyContent})
        // return
    }
}



/***********************************************************************************/
/**************************      主程序       *************************************/
/***********************************************************************************/
let fileToBeModify=['cbim_repo.json','pbim_repo.json']
const fileModifyContent=require('./configuration').wholeContent
const path=require('path')

if(undefined!==fileModifyContent['desc'] && ''!==fileModifyContent){
    ap.title(fileModifyContent['desc'])
}

for(let singleFile of fileToBeModify){

    ap.title(`start deal file ${singleFile}`)

    if(false===ifFileExist({file:singleFile})){
        ap.wrn(`set modify content for file ${singleFile} in configuration ,but ${singleFile} not exist, skip.........`)
        continue
    }
    if(false===ifFileReadable({file:singleFile})){
        ap.err(`file ${singleFile} not readable, skip, please check.........`)
        continue
    }

    //读取json内容为变量
    let origJson=readJSONFile({file:singleFile})
    //根据文件名，读取对应的需要修改的json
    //根据文件名获得修改内容对应的key，例如cbim_repo.json===>cbim_repo
    let baseName=path.basename(singleFile,'.json')
    // ap.inf('baseName',baseName)
    let modifyContent=fileModifyContent[baseName]
    // ap.inf('modifyContent',modifyContent)
    if(undefined===modifyContent){
        ap.err(`file ${singleFile} has no releated configuratin in config file`)
        continue
    }
    for(let singleModifyContent of modifyContent){
        //1 是否存在
        if (undefined === singleModifyContent){
            ap.wrn(`empty configuration detected, skip.......`)
            continue
        }
        //2 配置是否合格
        if(false===ifConfigurationCorrect({singleModifyContent:singleModifyContent})){
            continue
        }
        //3 父级点是否存在
        if(false===ifParentKeyExists({parentKey:singleModifyContent['parentKey'], jsonVar:origJson})){
            // ap.wrn(`parentKey ${singleModifyContent['parentKey']}`)
            continue
        }
        //4 执行对应的操作
        changeJSON({origJson:origJson,singleModifyContent:singleModifyContent})

    }
    // writeJSONFile({file:`${baseName}_${Date.now()}.json`, json:origJson})
    writeJSONFile({file:`${baseName}_changed.json`, json:origJson})
}