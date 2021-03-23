const fs = require('fs')
const { api } = require('../index')
const data = fs.readFileSync('../../resource/data/2018-09-01-1613900.json')
const jsonData = JSON.parse(data)