// const axios = require('../common/request')
const superagent = require('superagent')
const config = require('../config')
module.exports = {
    getMatchListByDate: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })},
    getMatchInfoByMatchId: (params, cb, fialCb) => { return superagent.post(config.host + 'sportdata/f').send(params).end((err, res) => { 
        if (err) fialCb(err)
        if (res) cb(res.body)
    })}
}
