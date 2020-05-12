class HandiCap {
  constructor () {
    this.init()
  }
  // 初始化
  init () {
    // 这里添加主方法
    this.panArr = ['两球', '球半/两', '球半', '一/球半', '一球', '半/一', '半球', '平/半', '平手', '*平/半', '*半球', '*半/一', '*一球', '*一/球半', '*球半', '*球半/两', '*两球']
    this.numArr = [2.00, 1.75, 1.50, 1.25, 1.00, 0.75, 0.5, 0.25, 0.00, -0.25, -0.50, -0.75, -1.00, -1.25, -1.50, -1.75, -2.00]
    this.overArr = ['1.5', '1.5/2', '2', '2/2.5', '2.5', '2.5/3', '3', '3/3.5', '3.5', '3.5/4', '4', '4/4.5', '4.5', '4.5/5']
    this.overNumArr = [1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25, 3.50, 3.75, 4.00, 4.25, 4.50, 4.75]
  }
  // 将让球盘转化为数值:e表示让球盘
  panKou2Num (e) {
    let temp
    for(let i = 0; i < this.panArr.length; i++) {
      if (e == this.panArr[i]) {
        temp = this.numArr[i]
        break
      }
    }
    return temp
  }
  // 将大小盘转化为数组: e表示大小盘
  overUnder2Num (e) {
    let temp
    for (let i = 0; i < this.overArr.length; i++) {
      if (e == this.overArr[i]) {
        temp = this.overNumArr[i]
        break
      }
    }
    return temp
  }
}
let handiCap = new HandiCap()
// export { handiCap }