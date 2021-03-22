class OddsCompile {
  constructor () {
    this.init()
  }
  // 初始化
  init () {
    // 这里添加主方法
  }
  // 计算主场优势 getArr:主场得球数据, loseArr:客场得球数据, matches: 比赛总场次 
  // 数据来源: http://zq.win007.com/cn/SubLeague/2019-2020/37.html
  homeAdvantage (getArr, loseArr, matches) {
    let get = pageUtil.arraySum(getArr)
    let lose = pageUtil.arraySum(loseArr)
    let result = {getMean: get / matches, loseMean: lose / matches}
    return result
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