// 将特定日期之间的日期生成按年份分类的json
const fs = require('fs')
const { dateObj } = require('../fbUtil/matchDate')
for (let key in dateObj) {
    let name = '../../resource/date/' + key + '.json'
    let data = JSON.stringify(dateObj[key])
    fs.writeFile(name, data, (err) => {
        if (err) {
            throw err
        }
    })
}