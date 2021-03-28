# fb-front

## 分析
1. 计算出比赛日期
1. 利用比赛日期获取比赛日的比赛链接
1. 获取上赛季对阵信息
1. 将基本信息插入数据库
1. 通过基本信息获取详细信息，更新数据库：matchInfo


#### 注意
每次写入书库数据大小不要超过8M,防止 `Transact-SQL`


#### 参考
1. [足球比分直播](https://live.aicai.com/jczqList/ '足球比分直播')
1. [knex document](http://knexjs.org/#Installation-node 'knex document1. [knex模块]()')
1. [knex模块基本使用](https://www.bloglab.cn/1136.html 'knex模块基本使用')
1. [knex.js笔记](https://blog.csdn.net/liuyueyi1995/article/details/53782047 'knex.js笔记')
1. [navicat 连接mysql](https://blog.csdn.net/cxh6863/article/details/80904284 'navicat 连接mysql')