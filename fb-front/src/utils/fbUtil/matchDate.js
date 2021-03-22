import { type } from '../common/type'
class MatchDate {
  constructor () {
    // 每天的毫秒数
    this.daySeconds = 24 * 60 * 60 * 1000
    // 存储日期的数组
    this.dataList = []
    // 初始化
    this.cutDateBetween()
  }
  // 小于10加0
  addZero (e) {
    return Number(e) < 10 ? `0${e}` : e
  }
  // 时间戳转换
  newTimeStamp (dateIn) {
    if (!dateIn) {
      return new Date().getTime()
    }
    const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn.replace(/-/g, '/'))
    return newDate.getTime()
  }
  // 时间格式化
  formatDate (dateIn, fmt) {
    if (!fmt) return false
    const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn.replace(/-/g, '/'))
    const o = {
      'y+': newDate.getFullYear(), // 年份
      'M+': this.addZero(newDate.getMonth() + 1), // 月份
      'd+': this.addZero(newDate.getDate()), // 某一天
      'h+': this.addZero(newDate.getHours()), // 小时
      'm+': this.addZero(newDate.getMinutes()), // 分钟
      's+': this.addZero(newDate.getSeconds()) // 秒
    }
    for (const i in o) {
      if (new RegExp(`(${i})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, o[i])
      }
    }
    return fmt
  }
  // 计算时间段的日期
  cutDateBetween (dateA = '2018-01-01', dateB = new Date()) {
    const start = this.newTimeStamp(dateA)
    const end = this.newTimeStamp(dateB)
    const totalDay = Math.floor((end - start) / this.daySeconds)
    console.log(totalDay)
    const startYear = new Date(dateA).getFullYear()
    const endYear = new Date(dateB).getFullYear()
    const dateObj = {}
    // 增加年份
    if (startYear <= endYear) {
      for (let i = 0; i <= (endYear - startYear); i++) {
        const liYear = i + startYear
        dateObj[liYear] = []
      }
    }
    // 将每个日期分配到所属年
    for (let k = 0; k <= totalDay; k++) {
      const currentTimeStamp = start + k * this.daySeconds
      const fullDate = this.formatDate(new Date(currentTimeStamp), 'yyyy-MM-dd')
      const currentYear = this.formatDate(new Date(currentTimeStamp), 'yyyy')
      dateObj[currentYear].push(fullDate)
    }
  }
}
const matchDate = new MatchDate()
export { matchDate }