/**
 * Created by 张伟 on 2019/3/29.
 * modify分成2种：1. 要修改的节点的父节点本身是对象，则填写规则，直接设置4个key：parentKey/method/keyName/keyValue
 *                 2. 要修改的节点的父节点本身是数组，则填写规则，需要额外设置index，告知要修改的节点位于数据的哪个元素中
 *                 3. 从根到父节点只能包含一次数组（即父节点），如果包含多次数组，不支持
 * append类似modify，但是父节点为数组时，虽然设置了index，但实际处理是push，即添加到数据最后，所以index虽然必须设置，其实无用
 */
'use strict'

let wholeContent={}


let desc="本配置文件根据网页https://confluence.int.net.nokia.com/display/~z0015ttc/gNB+PBIM+Modification+Guide的描述，对pbim和cbim进行修改" //字符，对配置文件的一些说明

/******************************************************************************************/
/***************************         cbim            *************************************/
/******************************************************************************************/
let cbim_repo=[
    {'parentKey':'c.cbts.1.testState',method:'modify',keyName:'state',keyValue:'GNBWORU'},
    {'parentKey':'c.cbts.1.gNbWithoutRuInfo',method:'modify',index:[0],keyName:'nodeId',keyValue:'0x502A'},
    {'parentKey':'c.cbts.1.gNbWithoutRuInfo',method:'modify',index:[0],keyName:'ipAddress',keyValue:'192.168.2.80'},
]

/******************************************************************************************/
/***************************         pbim            *************************************/
/******************************************************************************************/
let tmp1=[
    {
        "comment": "syscom route configuration towards AP-L1Bypass",
        "msg": {
            "msgId": "AASYSCOM_GW_REG_REQ_MSG",
            "receiver": {
                "mcuRef": "/mz/p/v1/pbts/1/fsm/1/fct/mcu/1",
                "cpId": 798
            },
            "data": {
                "localSicAddr": "0x1011FFFF",
                "remoteSicAddr": "0x523AFFFF",
                "localIP": {
                    "address": "192.168.2.60",
                    "port": 29211
                },
                "remoteIP": {
                    "address": "192.168.2.80",
                    "port": 29211
                },
                "protocol": 4,
                "retainMsgHeader": 1,
                "msgID": 0,
                "reliability": 1,
                "protocolDataLen": 0,
                "protocolData": []
            }
        },
        "response": {
            "msgId": "AASYSCOM_GW_REG_REPLY_MSG",
            "data.status": [
                0
            ]
        }
    },

    {

        "comment": "syscom route configuration towards AP-L1Bypass",
        "msg": {
            "msgId": "AASYSCOM_GW_REG_REQ_MSG",
            "receiver": {
                "mcuRef": "/mz/p/v1/pbts/1/fsm/1/fct/mcu/1",
                "cpId": 798
            },
            "data": {
                "localSicAddr": "0x1011FFFF",
                "remoteSicAddr": "0x502AFFFF",
                "localIP": {
                    "address": "192.168.2.60",
                    "port": 29211
                },
                "remoteIP": {
                    "address": "192.168.2.80",
                    "port": 29211
                },
                "protocol": 4,
                "retainMsgHeader": 1,
                "msgID": 0,
                "reliability": 1,
                "protocolDataLen": 0,
                "protocolData": []
            }
        },
        "response": {
            "msgId": "AASYSCOM_GW_REG_REPLY_MSG",
            "data.status": [
                0
            ]
        }

    }
]

let tmp2=[
    {
        "comment": "syscom route configuration towards AP-L1Bypass",
        "msg": {
            "msgId": "AASYSCOM_GW_REG_REQ_MSG",
            "receiver": {
                "mcuRef": "/mz/p/v1/pbts/1/fsm/1/fct/mcu/2/core/1",
                "cpId": 798
            },
            "data": {
                "localSicAddr": "0x1021FFFF",
                "remoteSicAddr": "0x523AFFFF",
                "localIP": {
                    "address": "192.168.253.17",
                    "port": 29211
                },
                "remoteIP": {
                    "address": "192.168.253.16",
                    "port": 29211
                },
                "protocol": 4,
                "retainMsgHeader": 1,
                "msgID": 0,
                "reliability": 1,
                "protocolDataLen": 0,
                "protocolData": []
            }
        },
        "response": {
            "msgId": "AASYSCOM_GW_REG_REPLY_MSG",
            "data.status": [
                0
            ]
        }
    }
    ]

let tmp3=[
    {
        "comment": "syscom route configuration towards AP-L1Bypass",
        "msg": {
            "msgId": "AASYSCOM_GW_REG_REQ_MSG",
            "receiver": {
                "mcuRef": "/mz/p/v1/pbts/1/fbb/1/fsp/mcu/1/core/1",
                "cpId": 798
            },
            "data": {
                "localSicAddr": "0x123AFFFF",
                "remoteSicAddr": "0x523AFFFF",
                "localIP": {
                    "address": "192.168.253.20",
                    "port": 29211
                },
                "remoteIP": {
                    "address": "192.168.253.16",
                    "port": 29211
                },
                "protocol": 4,
                "retainMsgHeader": 1,
                "msgID": 0,
                "reliability": 1,
                "protocolDataLen": 0,
                "protocolData": []
            }
        },
        "response": {
            "msgId": "AASYSCOM_GW_REG_REPLY_MSG",
            "data.status": [
                0
            ]
        }
    },
    {
        "comment": "syscom route configuration towards L2RT",
        "msg": {
            "msgId": "AASYSCOM_GW_REG_REQ_MSG",
            "receiver": {
                "mcuRef": "/mz/p/v1/pbts/1/fbb/1/fsp/mcu/1/core/1",
                "cpId": 798
            },
            "data": {
                "localSicAddr": "0x123AFFFF",
                "remoteSicAddr": "0x502AFFFF",
                "localIP": {
                    "address": "192.168.253.20",
                    "port": 29211
                },
                "remoteIP": {
                    "address": "192.168.253.16",
                    "port": 29211
                },
                "protocol": 4,
                "retainMsgHeader": 1,
                "msgID": 0,
                "reliability": 1,
                "protocolDataLen": 0,
                "protocolData": []
            }
        },
        "response": {
            "msgId": "AASYSCOM_GW_REG_REPLY_MSG",
            "data.status": [
                0
            ]
        }

    }
]
let pbim_repo=[
    {'parentKey':'fsm',method:'append',keyName:'1',keyValue:[{"L1Bypass": true}]},//append的value必须是array
    {'parentKey':'fsm.1.application.5g.config.pools.1.deployableUnits',method:'modify',index:[0,1],keyName:'nodeAddr',keyValue:21050},
    {'parentKey':'fsm.1.application.5g.config.pools.1.deployableUnits',method:'modify',index:[0,1],keyName:'uri',keyValue:"/mz/p/v1/pbts/1/fsm/1/fct/mcu/2/core/2"},
    {'parentKey':'fsm.1',method:'append',index:[4],keyName:'platformConfig',keyValue:tmp1},//append index无所谓，但是必须有
    {'parentKey':'fsm.1.fct.mcu.2',method:'append',index:[4],keyName:'platformConfig',keyValue:tmp2},//append index无所谓，但是必须有
    {'parentKey':'fsm.1.transport.config.routingTable.1.staticRoute.0',method:'modify',keyName:'gateway',keyValue:'0.0.0.0'},
    {'parentKey':'fbb.1.fsp.mcu.1',method:'append',index:[4],keyName:'platformConfig',keyValue:tmp3},//append index无所谓，但是必须有
]

wholeContent['desc']=desc
wholeContent['cbim_repo']=cbim_repo
wholeContent['pbim_repo']=pbim_repo

module.exports={
    wholeContent
}