// import { util } from '../util'
const util = require('../util')
class MatchDate {
  constructor () {
    // 每天的毫秒数
    this.daySeconds = 24 * 60 * 60 * 1000
    // 存储日期的对象
    this.dateObj = {}
    // 初始化
    this.cutDateBetween()
  }
  // 计算时间段的日期
  cutDateBetween (dateA = '2018-01-01', dateB = new Date()) {
    const start = util.newTimeStamp(dateA)
    const end = util.newTimeStamp(dateB)
    const totalDay = Math.floor((end - start) / this.daySeconds)
    const startYear = new Date(dateA).getFullYear()
    const endYear = new Date(dateB).getFullYear()
    // 增加年份
    if (startYear <= endYear) {
      for (let i = 0; i <= (endYear - startYear); i++) {
        const liYear = i + startYear
        this.dateObj[liYear] = []
      }
    }
    // 将每个日期分配到所属年
    for (let k = 0; k <= totalDay; k++) {
      const currentTimeStamp = start + k * this.daySeconds
      const fullDate = util.formatDate(new Date(currentTimeStamp), 'yyyy-MM-dd')
      const currentYear = util.formatDate(new Date(currentTimeStamp), 'yyyy')
      const dateHasId = { id: k, date: fullDate }
      this.dateObj[currentYear].push(dateHasId)
    }
  }
}
const matchDate = new MatchDate()
const dateObj = matchDate.dateObj
module.exports = { dateObj }