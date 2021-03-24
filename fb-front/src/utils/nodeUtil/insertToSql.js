const fs = require('fs')
// const { api } = require('../index')
// 获取目录下所有文件名
const dataDir = fs.readdirSync('../../resource/data2/')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '192.168.199.128',
        user : 'ougege',
        password : 'ougege',
        database : 'knex'
    }
})

const tasks = []
// 每次请求都是一个promise，保证一定时间间隔，防止频繁请求封ip
const output = (jsonName, i) => new Promise((resolve) => {
    setTimeout(() => {
        storeMatchData(jsonName, i, function() {
            console.log(`这是第${i}条`)
            resolve()
        })
    }, 2)
})
function storeMatchData (jsonName, i, cb) {
    const data = fs.readFileSync(jsonName)
    const jsonData = JSON.parse(data)
    // Object.assign(jsonData, {id: new Date().getTime()})
    // 插入
    knex('dataDetail').insert(jsonData).then(res => {
        cb()
    })
}
// // 遍历所有日期
for (var i = 0; i < dataDir.length; i++) {
    const jsonName = `../../resource/data2/${dataDir[i]}`
    tasks.push(output(jsonName, i))
}
Promise.all(tasks).then(() => {
    knex.destroy(() => {
        console.log('数据插入完成')
        console.log('已经断开连接')
    })
})
