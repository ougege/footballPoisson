class PossionGoal {
  constructor () {
    this.init()
  }
  // 初始化
  init () {
    // 这里添加主方法
  }
  // 阶乘函数
  factorial (n) {
    return (n <= 1) ? 1 : n * this.factorial(n - 1)
  }
  // 计算不同进球数的概率 e:平均进球, i：期望进球数
  goal (e, i) {
    return i == 0 ? Math.pow(Math.E, -e ) : (Math.pow(e, i) * Math.pow(Math.E, -e ) / this.factorial(i))
  }
  // 输入对阵双方总和进球率,计算获胜概率 a:主队进球率, b:客队进球率, i:比分层级
  p310 (a, b, i) {
    let p310 = [], pWin = 0, pDraw = 0, pLose = 0
    for (let j = 0; j <= i; j++) {
      for (let k = 0; k <= j; k++) {
        if (k != j) {
          pWin += this.goal(a, j) * this.goal(b, k)
          pLose += this.goal(b, j) * this.goal(a, k)
        } else {
          pDraw += this.goal(a, j) * this.goal(b, k)
        }
      }
    }
    // 返回概率
    p310.push(pWin.toFixed(4), pDraw.toFixed(4), pLose.toFixed(4))
    return p310
  }
  // 生成所有比分的概率对象, a:主队进球率, b:客队进球率, i:比分层级
  allChance (a, b, i) {
    let obj = {}
    for (let j = 0; j <= i; j++) {
      for (let k = 0; k <= i; k++) {
        let attr = 'p' + j + k
        obj[attr] = this.goal(a, j) * this.goal(b, k)
      }
    }
    return obj
  }
}
let possionGoal = new PossionGoal()
// export { possionGoal }