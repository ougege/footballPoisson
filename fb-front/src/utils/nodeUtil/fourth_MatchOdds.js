const fs = require('fs')
const { api } = require('../index')
const bookieArr = require('../common/bookieName')
const dataDir = fs.readdirSync('../../resource/data/')
const async = require('async')

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
          pageNo: 1,
          pageSize: 1000,
          isPrimary: '0',
          apiName: 'getFtAicaiAllEuropeOdds'
        }
        api.getFtAicaiAllEuropeOdds(params, function(res) {
          if (res.list) {
            for (let m = 0; m < bookieArr.length; m++) {
                for (let n = 0; n < res.list.length; n++) {
                    if (bookieArr[m].name === res.list[n].providerName) {
                        paramObj[bookieArr[m].label] = res.list[n].oddsId
                        break
                    }
                }
            }
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