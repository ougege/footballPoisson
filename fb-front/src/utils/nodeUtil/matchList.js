const { api } = require('../index')
const params = {
    game: 0,
    date: '2021-03-19',
    pageNo: 1,
    simple: 0,
    pageSize: 10000,
    apiName: 'getMatchListByDate'
}
api.getMatchListByDate(params, function(res) {
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
            leagueName,
            homeName,
            awayName,
            homeRank,
            awayRank,
            matchTime,
            qtMatchId,
            matchDate,
            matchId,
            halfScore: score[0],
            wholeScore: score[1]
        }
        console.log(tempObj)
    })
}, function(err) {
    console.log(err)
})