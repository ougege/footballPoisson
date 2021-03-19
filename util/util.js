class Util {
  constructor () {
    this.init()
  }
  // 初始化
  init () {
    // 这里添加主方法
  }
  // 计算数组的和值: arr为传入的数组
  arraySum (arr)  {
    let result = 0
    for (let i = 0; i < arr.length; i++) {
      result += arr[i]
    }
    return result
  }
  // 返回数组的平均值: arr为传入的数组
  arrayMean (arr) {
    let length = arr.length
    let total = this.arraySum(arr)
    return total / length
  }
  // 计算返还率 a:胜赔率, b:平赔率, c:负赔率
  calPayOut (a, b, c) {
    return 1 / (1 / a + 1 / b + 1 / c)
  }
  // 计算概率为赔率 pWin: 胜概率, pDraw: 平概率, pLose:输概率, payOut: 返还率
  calChance2Odds (pWin, pDraw, pLose, payOut) {
    let oddsW = payOut / pWin
    let oddsD = payOut / pDraw
    let oddsL = payOut / pLose
    let result = {oddsW, oddsD, oddsL}
    return result
  }
  // 计算赔率为概率 oddsW: 胜赔率, oddsD: 平赔率, oddsL: 输赔率
  calOdds2Chance (oddsW, oddsD, oddsL) {
    let p = this.calPayOut(oddsW, oddsD, oddsL)
    let pWin = p / oddsW
    let pDraw = p / oddsD
    let pLose = p / oddsL
    let result = {pWin, pDraw, pLose}
    return result
  }
  // 计算胜平负场次数量 getArr:得球数组, loseArr: 失球数组
  calAmount310 (getArr, loseArr) {
    let result = []
    for (let i = 0; i < getArr.lenght; i++) {
      let value = this.judge310(getArr[i], loseArr[i])
      result.push(value)
    }
    return result
  }
  // 比分判断胜平负 胜3平1负0
  judge310 (homeGoal, awayGoal) {
    let temp = homeGoal - awayGoal
    return temp > 0 ? 3 : (temp == 0 ? 1 : 0)
  }
  // 比较俩个数组中公用的值
  compareArr (a, b) {
    let array = []
    for (let i = 0; i < a.length; i++) {
      for (let k = 0; k < b.length; k++) {
        if (a[i] == b[k]) {
          array.push(a[i])
        }
      }
    }
    return array
  }
}
let Util = new Util()