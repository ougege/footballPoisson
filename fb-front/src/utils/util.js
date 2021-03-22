import { type } from './common/type.js'
import { xtyStorage } from './common/xtyStorage.js'

// 小于10加0处理
function addZero (e) {
  return Number(e) < 10 ? `0${e}` : e
}

const formatDate = (dateIn, fmt) => {
  if (!fmt) return false
  const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn.replace(/-/g, '/'))
  const o = {
    'y+': newDate.getFullYear(), // 年份
    'M+': addZero(newDate.getMonth() + 1), // 月份
    'd+': addZero(newDate.getDate()), // 某一天
    'h+': addZero(newDate.getHours()), // 小时
    'm+': addZero(newDate.getMinutes()), // 分钟
    's+': addZero(newDate.getSeconds()) // 秒
  }
  for (const i in o) {
    if (new RegExp(`(${i})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[i])
    }
  }
  return fmt
}

// 时间格式化
function formatDateTime (dateTime, type) {
  const newDateStr = dateTime.replace(/-/g, '/')
  const newDate = new Date(newDateStr)
  const year = newDate.getFullYear()
  const month = addZero(newDate.getMonth() + 1)
  const day = addZero(newDate.getDate())
  const weekDay = transWeekDay(newDate.getDay())
  const hour = addZero(newDate.getHours())
  const minute = addZero(newDate.getMinutes())
  const second = addZero(newDate.getSeconds())
  if (type === 1) {
    // 2019/08/30 15:20:39
    return ` ${year}/${month}/${day} ${hour}:${minute}:${second} `
  }
  if (type === 2) {
    // 2019/08/30
    return ` ${year}/${month}/${day} `
  }
  if (type === 3) {
    // 2019/08/30 周六 15:20:39
    return `${year}/${month}/${day} ${weekDay} ${hour}:${minute}`
  }
}

// 将weekday转换成星期几
function transWeekDay (e) {
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][e]
}

// 压缩图片比例, 25%和50%
function compressImg (url, type) {
  if (type === 0.25) {
    return `${url}?x-oss-process=image/resize,p_25`
  }
  if (type === 0.5) {
    return `${url}?x-oss-process=image/resize,p_50`
  }
  return url
}
// 长边压缩, value越大,图片越大
function compressImgLongLine (url, value = 200) {
  return `${url}?x-oss-process=image/resize,l_${value}`
}

// new 一个时间戳:无参返回当前时间戳,有参返回传入时间的时间戳
function newTimeStamp (dateIn) {
  if (!dateIn) {
    return new Date().getTime()
  }
  const newDate = type.isDate(dateIn) ? dateIn : new Date(dateIn.replace(/-/g, '/'))
  return newDate.getTime()
}

// 遍历scene参数,从中拼接url和键值对
function dealScene (scendObj) {
  const url = scendObj.page
  const obj = scendObj.params
  let str = ''
  const attr = []
  for (const i in obj) {
    const key = i
    const value = obj[i]
    attr.push([key, value])
  }
  if (attr.length > 0) {
    for (let m = 0; m < attr.length; m++) {
      if (m === 0) {
        str += `?${attr[m][0]}=${attr[m][1]}`
      } else {
        str += `&${attr[m][0]}=${attr[m][1]}`
      }
    }
  }
  return `/${url}${str}`
}

// 生成guid
function generateGUID () {
  let d = newTimeStamp()
  const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
  return guid
}

// 秒转时分秒
function secondsToHMS (second, type) {
  const hour = addZero(Math.floor(second / 3600))
  const minute = addZero(Math.floor((second % 3600) / 60))
  const seconds = addZero(Math.floor(second % 60))
  if (type === 1) {
    // 15小时20分钟20秒
    return `${hour}小时${minute}分钟${seconds}秒`
  }
}

/**
 * 比较某个时间是否在指定时间段内
 * @param [beginDateStr] [开始时间]
 * @param [endDateStr]   [结束时间]
 * @param [judgeDateStr]   [需要判断的时间，默认取当前时间]
 * @return Boolean
 */
function isDuringDate (beginDateStr, endDateStr, judgeDateStr) {
  // 兼容时间对象和ios时间格式
  let curDate
  if (!judgeDateStr) {
    curDate = new Date()
  } else {
    curDate = type.isDate(judgeDateStr) ? judgeDateStr : new Date(judgeDateStr.replace(/-/g, '/'))
  }
  const beginDate = type.isDate(beginDateStr) ? beginDateStr : new Date(beginDateStr.replace(/-/g, '/'))
  const endDate = type.isDate(endDateStr) ? endDateStr : new Date(endDateStr.replace(/-/g, '/'))
  if (curDate >= beginDate && curDate <= endDate) {
    return true
  }
  return false
}

// 获取当前token
function getCurrentToken () {
  let loginTokenInfo = xtyStorage.get(xtyStorage.loginTokenInfo)
  loginTokenInfo = loginTokenInfo ? (JSON.parse(loginTokenInfo)) : ''
  return loginTokenInfo
}

module.exports = {
  formatDate,
  formatDateTime,
  addZero,
  transWeekDay,
  compressImg, // 图片压缩方法
  newTimeStamp,
  type,
  compressImgLongLine, // 图片长边压缩
  xtyStorage, // 统一管理缓存
  dealScene,
  generateGUID, // 生成guid
  secondsToHMS, // 秒数转时分秒
  isDuringDate, // 比较某个时间是否在指定时间段内
  getCurrentToken // 获取当前token
}
