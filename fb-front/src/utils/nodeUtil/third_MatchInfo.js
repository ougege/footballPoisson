const fs = require('fs')
const path = require('path')
const { api } = require('../index')
const fbUtil = require('../fbUtil/fbUtil')
const { promisePro } = require('../common/promisePro')
const dataDir = fs.readdirSync('../../resource/data/')
const async = require('async')


// const data = fs.readFileSync('../../resource/data/2013-01-02.json')
//     const jsonData1 = JSON.parse(data)
var tasks = []
for (let k = 0; k < dataDir.length; k++) {
  const dealEveryDayJson = (finish) => {
    const name = `../../resource/data/${dataDir[k]}`
    const data = fs.readFileSync(name)
    const jsonData1 = JSON.parse(data)
    const dealMatchArr = []
    var innerTasks = []
    for (let m = 0; m < jsonData1.length; m++) {
      const itreator = function (next) {
        const paramObj = jsonData1[m]
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
            next()
          } else {
            dealMatchArr.push(paramObj)
            next()
          }
        }, function(err) {
          console.log(err)
        })
      }
      innerTasks.push(itreator)
    }
    async.series(innerTasks, function(err) {
      if (err) console.log(err)
      let tempJson = JSON.stringify(dealMatchArr)
      fs.writeFile(name, tempJson, (err) => {
        if (err) {
          throw err
        }
        console.log(`${k}完成`)
        finish()
      })
    })
  }
  tasks.push(dealEveryDayJson)
}
async.parallelLimit(tasks, 2, function(err) {
  if (err) console.log(err)
  console.log('所有都完成')
})

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