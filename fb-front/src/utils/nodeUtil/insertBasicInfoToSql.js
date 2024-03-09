// 通过比赛日获取的球赛列表基本信息
const fs = require('fs')
// const { api } = require('../index')
// 获取目录下所有文件名
const dataDir = fs.readdirSync('../../resource/data/')
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '192.168.199.128',
        user : 'MuYi086',
        password : 'MuYi086',
        database : 'knex'
    }
})

// 删除所有
// knex('dataDetail').delete().then(res => {
//     console.log('删除完')
// })

const tasks = []
// 每次请求都是一个promise，保证一定时间间隔，防止频繁请求封ip
const output = (jsonName, k) => new Promise((resolve) => {
    setTimeout(() => {
        storeMatchData(jsonName, k, function() {
            console.log(`这是第${k}天`)
            resolve()
        })
    }, 2)
})
function storeMatchData (jsonName, k, cb) {
    const data = fs.readFileSync(jsonName)
    const jsonData = JSON.parse(data)
    const everyDayTask = []
    jsonData.forEach(li => {
        const everyTask = (li) => new Promise((resolve) => {
            // 插入
            knex('dataDetail').insert(li).then(res => {
                resolve()
            })
        }, 2)
        everyDayTask.push(everyTask(li))
    })
    Promise.all(everyDayTask).then(() => {
        cb()        
    })
    // Object.assign(jsonData, {id: new Date().getTime()})
}
// // 遍历所有日期
for (var i = 0; i < dataDir.length; i++) {
    const jsonName = `../../resource/data/${dataDir[i]}`
    tasks.push(output(jsonName, i))
}
Promise.all(tasks).then(() => {
    knex.destroy(() => {
        console.log('数据插入完成')
        console.log('已经断开连接')
    })
})
