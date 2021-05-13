const { execFile } = require('child_process')
console.log('欧哥哥执行shell')
setTimeout(() => {
    const child = execFile('./do.sh', ['--version'], (error, stdout, stderr) => {
      if (error) {
        throw error
      }
      console.log(stdout)
    })
}, 1000)