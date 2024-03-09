// 基于已有的sql数据获取往期主客对阵数据和赔率,并插入到数据库
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : '192.168.199.128',
        user : 'MuYi086',
        password : 'MuYi086',
        database : 'knex'
    }
})

knex('dataDetail').count('homeName').then(res => {
    // console.log(res[0])
    console.log(typeof (res[0]['count(`homeName`)']))
})