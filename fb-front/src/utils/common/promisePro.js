/**
 * 封装一个promisePro对象,实现一些高级用法
 * yanglu
 */
class PromisePro {
  all (arr, fnArr, callback = null, timeInterVal = 10) {
    const tasks = []
    const outPut = (params, k) => new Promise((resolve, reject) => {
      setTimeout(() => {
        const cb = (res) => { resolve(res) }
        const failCb = () => { reject(new Error('遍历出错了')) }
        const fn = fnArr.length === 1 ? fnArr[0] : fnArr[k]
        fn(params, cb, failCb)
      }, timeInterVal)
    })
    for (let i = 0; i < arr.length; i++) {
      console.log(new Date, i)
      tasks.push(outPut(arr[i], i))
    }
    Promise.all(tasks).then((res) => {
      if (callback) {
        callback(res)
      }
    })
  }
}
const promisePro = new PromisePro()
module.exports = { promisePro }
