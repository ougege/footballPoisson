// const axios = require('../common/request')
const superagent = require('superagent')
const config = require('../config')
module.exports = {
    // 获取比赛日赛事 apiName:getMatchListByDate
    getMatchListByDate: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })},
    // 获取比赛详细信息 apiName:TeamBoutExploitsQueryAiCaiApi
    getMatchInfoByMatchId: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })},
    // 获取赛事赔率列表 apiName:getFtAicaiAllEuropeOdds
    getFtAicaiAllEuropeOdds: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })},
    // 获取某个博彩公司某赛事赔率 apiName:getOneEuropeOddsDetail
    getOneEuropeOddsDetail: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })}
}
