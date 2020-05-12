// import {pageUtil} from './pageUtil'
// import {chance} from './scoreToChance'
class OddsCompile {
  constructor () {
    this.init()
  }
  // 初始化
  init () {
    // 这里添加主方法
  }
  // 将主客队得失球转化为让球; a:主队得球数组, b:主队失球数组, c:客队得球数组, d:客队失球数组
  matches2Goals (a, b, c, d) {
    let result, homeTotal, awayTotal, length
    homeTotal = pageUtil.arraySum(a) - pageUtil.arraySum(b)
    awayTotal = pageUtil.arraySum(c) - pageUtil.arraySum(d)
    length = a.length
    result = ((homeTotal - awayTotal) / length).toFixed(2)
    return result
  }
  // 计算主场优势 getArr:主场得球数据, loseArr:客场得球数据, matches: 比赛总场次 
  // 数据来源: http://zq.win007.com/cn/SubLeague/2019-2020/37.html
  homeAdvantage (getArr, loseArr, matches) {
    let get = pageUtil.arraySum(getArr)
    let lose = pageUtil.arraySum(loseArr)
    return [(get / matches).toFixed(3), (lose / matches).toFixed(3)]
  }
  // 赔率计算出得失球 oddsW: 主胜赔率, oddsD: 平局赔率, oddsL: 负赔率, step: 步长
  odds2Goal (oddsW, oddsD, oddsL, step = 0.005) {
    let p310 = pageUtil.calOdds2Chance(oddsW, oddsD, oddsL)
    let winAndDraw, loseAndDraw, commonValue, arrayWin=[], arrayDraw=[], arrayLose=[]
    for (var i = 0; i < chance.length; i++) {
      //主胜匹配数组
      if (chance[i][2] > (p310[0] - step) && chance[i][2] < (p310[0] + step)) {
        arrayWin.push(i)
      }
      if (chance[i][3] > (p310[1] - step) && chance[i][3] < (p310[1] + step)) {
        arrayDraw.push(i)
      }
      if (chance[i][4] > (p310[2] - step) && chance[i][4] < (p310[2] + step)) {
        arrayLose.push(i)
      }
    }
    winAndDraw = pageUtil.compareArr(arrayWin, arrayDraw)
    loseAndDraw = pageUtil.compareArr(arrayLose, arrayDraw)
    commonValue = pageUtil.compareArr(winAndDraw, loseAndDraw)
    // 计算出得球数组和失球数组
    let homeGoalArr = this.getListFromChance(commonValue, 0)
    let awayGoalArr = this.getListFromChance(commonValue, 1)
    let avHomeGoal = pageUtil.arrayAv(homeGoalArr)
    let avAwayGoal = pageUtil.arrayAv(awayGoalArr)
    return [avHomeGoal, avAwayGoal]
  }
  // 从chance中取出固定下标的值,返回数组 arr: 传入取值下标, type: 0表示得球，1表示失球
  getListFromChance (arr, type) {
    let goalArr = []
    arr.forEach(item => {
      goalArr.push(chance[item][type])
    })
    return goalArr
  }
}
let oddsCompile = new OddsCompile()
// export { oddsCompile }