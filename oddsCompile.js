import {pageUtil} from './pageUtil'
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
  // 赔率计算出得失球 oddsW: 主胜赔率, oddsD: 平局赔率, oddsL: 负赔率
}
let oddsCompile = new OddsCompile()
export { oddsCompile }