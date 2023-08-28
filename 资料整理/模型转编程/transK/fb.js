var fb = {
  // let tempObj ={upOdds: 1.10, asiaTip: '一球', downOdds: 0.78}
  calLastGoal: function (asiaObj) {
    let upOdds = Number(asiaObj.upOdds)
    let asiaTip = asiaObj.asiaTip
    let downOdds = Number(asiaObj.downOdds)
    // 获取页面url
    let pageUrl = window.location.href
    let panKou
    // 亚盘
    if (pageUrl.indexOf('changeDetail/handicap') > 0) {
      panKou = this.dealAsiaPan(asiaTip, 1)
    }
    // 欧赔(赛前和走地)
    if (pageUrl.indexOf('changeDetail/1x2') > 0 || pageUrl.indexOf('1x2/oddslist') > 0) {
      panKou = this.dealAsiaPan(asiaTip, 2)
    }
    // 大小球
    if (pageUrl.indexOf('changeDetail/overunder') > 0) {
      // let minute = Number(asiaObj.minute)
      // if (minute <= 70) {
      // }
      panKou = this.dealAsiaPan(asiaTip, 3)
    }
    let calResult = panKou - (upOdds - downOdds) / 2
    return calResult.toFixed(4)
  },
  // 使用Echart k线格式:开始值，结束值，最小值，最大值
  judgeKObj: function (arr) {
    let result
    if (arr.length == 1) {
      result = [arr[0], arr[0], arr[0], arr[0]]
    }
    if (arr.length >= 2) {
      result = [arr[0], arr[arr.length - 1], this.judgeBigSmall(arr, 'small'), this.judgeBigSmall(arr, 'big')]
    }
    return result
  },
  // 判断数组中的最大数和最小数
  judgeBigSmall: function (arr, type) {
    if (type == 'big') {
      return arr.reduce(function (x, y) {
        return x > y ? x : y
      })
    }
    if (type == 'small') {
      return arr.reduce(function (x, y) {
        return x < y ? x : y
      })
    }
  },
  // 将盘口数据按时间间隔处理:arr,  m分钟
  cutAsianDataByMinutes: function (arr, m) {
    let resultArr = []
    let cut_seconds = m * 60 * 1000
    let beginStamp = this.dateToStamp((arr[0]).time)
    let closeStamp = this.dateToStamp((arr[arr.length - 1]).time)
    let groupLen = Math.ceil(((closeStamp - beginStamp) / cut_seconds))
    for (let i = 0; i <= groupLen; i++) {
      let item = []
      let startTime = this.timeStampToDate(beginStamp + cut_seconds * i)
      let endTime =  this.timeStampToDate(beginStamp + cut_seconds * (i + 1))
      for (let j = 0; j < arr.length; j++) {
        let num = Math.ceil((this.dateToStamp(arr[j].time) - beginStamp) / cut_seconds)
        if (num == i) {
          item.push(arr[j].goal)
        }
      }
      let itemObj = {data: item, slideDate: startTime + ' - ' + endTime, groupDate: startTime}
      resultArr.push(itemObj)
    }
    return resultArr
  },
  // 时间数字小于10补全
  timeBigThan10: function (num) {
    return num > 10 ? num : '0' + num
  },
  // 将清洗过的得失球和时间数组处理成k线需要
  dataTransToKNeed: function (arr) {
    let resultArr = []
    arr.forEach(item => {
      if (item.data.length > 0) {
        let tempArr = this.judgeKObj(item.data)
        let tempObj = {data: tempArr, slideDate: item.slideDate, groupDate: item.groupDate}
        resultArr.push(tempObj)
      }
    })
    return resultArr
  },
  // 欧赔转得失球=> 亚盘
  deShiQiuTransAsia: function(homeGoal, awayGoal) {
    let score = Number(homeGoal) - Number(awayGoal)
    let degree = Math.floor(score / 0.25)
    let panKou = degree * 0.25
    let homeOdds = 0.90 - (score - panKou)
    let awayOdds = 0.90 + (score - panKou)
    let item = {upOdds: homeOdds.toFixed(3), asiaTip: panKou, downOdds: awayOdds.toFixed(3)}
    return item
  },
}