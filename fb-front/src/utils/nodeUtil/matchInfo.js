const { api } = require('../index')
const params = {
    matchId: 3344195,
    Number: 10,
    isHomeAway: 0, // 0 部分主客,1 主場; 2客場
    europeProviderId: 9999,
    handicapProviderId: 2,
    bigSmallProviderId: 2,
    apiName: 'TeamBoutExploitsQueryAiCaiApi'
}

api.getMatchListByDate(params, function(res) {
    console.log(res.list[0])
}, function(err) {
    console.log(err)
})