const fs = require('fs')
const { api } = require('../index')
const fbUtil = require('../fbUtil/fbUtil')
const { promisePro } = require('../common/promisePro')
const { asyncPool } = require('../common/asyncPool')
const dataDir = fs.readdirSync('../../resource/data/')

// 将字符串赔率转换为概率的方法
function dealStringOddsToChance (strOdds) {
    const oddsArr = strOdds.split(',')
    const newArr = []
    for (let i = 0; i < oddsArr.length; i++) {
        const temp = Math.ceil(Number(oddsArr[i]) / 100) / 100
        newArr.push(temp)
    }
    return fbUtil.calOdds2Chance(...newArr)
}

function dealEveryDayJson (jsonName) {
    const name = '../../resource/data/' + jsonName
    const data = fs.readFileSync(name)
    const jsonData1 = JSON.parse(data)
    const dealMatchArr = []
    const fn1 = (paramObj, cb1, failCb1) => {
        const params = {
            matchId: paramObj.matchId,
            Number: 10,
            isHomeAway: 1, // 0 部分主客,1 主場; 2客場
            europeProviderId: 9999,
            handicapProviderId: 2,
            bigSmallProviderId: 2, // 1:澳门;２:皇冠;3:立博;5:bet365;6:威廉;8:韦德
            apiName: 'TeamBoutExploitsQueryAiCaiApi'
        }
        api.getMatchInfoByMatchId(params, function(res) {
            if (res.list) {
                const lastObj = res.list[0]
                let tempObj = {
                    lastHAWholeScore: lastObj.fullResult, // 上次主客对阵全场比分
                    lastHAHalfScore: lastObj.halfResult, // 上次主客对阵半场比分
                    lastHAMatchDate: lastObj.matchTime, // 上次主客对阵比赛日期
                    lastHAMatchResult: lastObj.amidithion // 上次主客对阵胜平负
                }
                // 给tempObj追加赔率数据
                if (lastObj.europeOdds) {
                    const oddsObj = dealStringOddsToChance(lastObj.europeOdds)
                    let tempOdds = {
                        lastHAPWin: (oddsObj.pWin).toFixed(4), // 上次主客对阵胜概率
                        lastHAPDraw: (oddsObj.pDraw).toFixed(4), // 上次主客对阵平概率
                        lastHAPLose: (oddsObj.pLose).toFixed(4) // 上次主客对阵负概率
                    }
                    Object.assign(tempObj, tempOdds)
                }
                Object.assign(paramObj, tempObj)
                dealMatchArr.push(paramObj)
                cb1()
            } else {
                dealMatchArr.push(paramObj)
                cb1()
            }
        }, function(err) {
            failCb1()
        })
    }
    const fnArr1 = [fn1]
    const callback1 = (res) => {
        let name = '../../resource/data/' + jsonName
        let tempJson = JSON.stringify(dealMatchArr)
        fs.writeFile(name, tempJson, (err) => {
            if (err) {
                throw err
            }
            console.log(`${jsonName}完成`)
        })
    }
    promisePro.all(jsonData1, fnArr1, callback1, 200)
}

dealEveryDayJson('2013-03-29.json')

// asyncPool(1, dataDir, dealEveryDayJson).then(() => {
//     console.log('全部执行完成')
// })
