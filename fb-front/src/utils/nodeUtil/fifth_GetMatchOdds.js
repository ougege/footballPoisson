const fs = require('fs')
const { api } = require('../index')
const {　bookieArr　} = require('../common/bookieName')
const dataDir = fs.readdirSync('../../resource/data/')
const async = require('async')

var tasks = []
for (let k = 0; k < dataDir.length; k++) {
  const dealEveryDayJson = (finish) => {
    const name = `../../resource/data/${dataDir[k]}`
    const oddsName = `../../resource/matchOdds/${dataDir[k]}`
    const data = fs.readFileSync(name)
    const jsonData1 = JSON.parse(data)
    var matchOddsArr = []
    var innerTasks = []
    for (let m = 0; m < jsonData1.length; m++) {
      const paramObj = jsonData1[m]
      const arrAfterDeal = dealBookieArr(bookieArr, paramObj)
      for (let n = 0; n < arrAfterDeal.length; n++) {
        const itreator = function (next) {
          const tempObj = arrAfterDeal[n]
          const params = {
            matchId: tempObj.matchId,
            pageNo: 1,
            oddsId:tempObj.oddsId,
            pageSize: 1000,
            apiName: 'getOneEuropeOddsDetail'
          }
          api.getOneEuropeOddsDetail(params, function(res) {
            if (res.list) {
              for (let w = 0; w < res.list.length; w++) {
                let lineOdds = {
                  changeTime:　res.list[w].changeTime,
                  drawOdds:　res.list[w].drawOdds,
                  loseOdds:　res.list[w].loseOdds,
                  winOdds:　res.list[w].winOdds,
                  loseRation:　res.list[w].loseRation,
                  index: w
                }
                Object.assign(lineOdds, tempObj)
                matchOddsArr.push(lineOdds)
              }
              next()
            } else {
              next()
            }
          }, function(err) {
            console.log(err)
          })
        }
        innerTasks.push(itreator)
      }
    }
    async.series(innerTasks, function(err) {
      if (err) console.log(err)
      let tempJson = JSON.stringify(matchOddsArr)
      fs.writeFile(oddsName, tempJson, (err) => {
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

// 组合出当前赔率公司所对应的数组
function dealBookieArr (bookieArr, paramObj) {
  let arr = []
  bookieArr.forEach(bk => {
    if (paramObj[bk.label])　{
        arr.push({name: bk.name, matchId: paramObj.matchId, oddsId:　paramObj[bk.label]})
    }
  })
  return arr
}