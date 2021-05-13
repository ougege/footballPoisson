// 每个交易日获取比赛列表，生成基础信息
const fs = require('fs')
const async = require('async')
const { type } = require('../common/type')
const { api } = require('../index')
const data = fs.readFileSync('../../resource/date/2021.json')
const jsonData = JSON.parse(data)
const tasks = []
for (let k = 0; k < jsonData.length; k++) {
    var itreator = function (finish) {
        const paramObj = jsonData[k]
        const date = paramObj.date
        const params = {
            game: 0,
            date: date,
            pageNo: 1,
            simple: 0,
            pageSize: 10000,
            apiName: 'getMatchListByDate'
        }
        api.getMatchListByDate(params, function(res) {
            if (type.isArray(res.matchList)) {
                const dateMatchArr = []
                res.matchList.forEach(li => {
                    let {
                        leagueName,
                        homeName,
                        awayName,
                        homeRank,
                        awayRank,
                        qtMatchId,
                        matchTime,
                        matchDate,
                        matchId,
                        score
                    } = li
                    let tempObj = {
                        leagueName, // 联赛名称
                        homeName, // 主队名称
                        awayName, // 客队名称
                        homeRank, // 主队排名
                        awayRank, // 客队排名
                        matchTime, // 比赛时分
                        qtMatchId, // 赛事id
                        matchDate, // 比赛日期
                        matchId, // 比赛id(赔率查询用)
                        halfScore: score[0], // 半场比分
                        wholeScore: score[1], // 全场比分
                        lastHAWholeScore: '', // 上次主客对阵全场比分
                        lastHAHalfScore: '', // 上次主客对阵半场比分
                        lastHAMatchDate: '', // 上次主客对阵比赛日期
                        lastHAMatchResult: '', // 上次主客对阵胜平负
                        lastHAPWin: '', // 上次主客对阵胜概率
                        lastHAPDraw: '', // 上次主客对阵平概率
                        lastHAPLose: '', // 上次主客对阵负概率
                        oddsIdWilliamHill: '', // 当前赛事赔率对应威廉唯一id
                        oddsIdCrown: '', // 当前赛事赔率对应Crown唯一id
                        oddsIdLadbroke: '', // 当前赛事赔率对立博廉唯一id
                        oddsIdInterwetten: '', // 当前赛事赔率对应interwetten唯一id
                        oddsIdMacau: '', // 当前赛事赔率对应澳门唯一id
                        oddsIdVictor: '', // 当前赛事赔率对应韦德唯一id
                        oddsIdBet365: '', // 当前赛事赔率对应bet365唯一id
                        oddsIdEasybet: '', // 当前赛事赔率对应易胜博唯一id
                        oddsIdBwin: '', // 当前赛事赔率对应bwin唯一id
                        oddsIdUnibet: '', // 当前赛事赔率对应优胜客唯一id
                        oddsIdIntralot: '', // 当前赛事赔率对应introlot唯一id
                    }
                    dateMatchArr.push(tempObj)
                })
                let name = '../../resource/data/' + date + '.json'
                let tempJson = JSON.stringify(dateMatchArr)
                fs.writeFile(name, tempJson, (err) => {
                    if (err) {
                        throw err
                    }
                    console.log(`${k}完成`)
                    finish()
                })
            } else {
                finish()
            }
        }, function (err) {
            console.log(err)
        })
    }
    tasks.push(itreator)
}
async.parallelLimit(tasks, 70, function (err) {
    if (err) console.log(err)
    console.log('所有都完成')
})
