<template>
  <div class="hello">
    <h1>测试</h1>
  </div>
</template>

<script>
import { api, config } from '../utils/index'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {}
  },
  mounted () {
    console.log(config)
    const params = {
      game: 0,
      date: '2021-03-19',
      pageNo: 1,
      simple: 0,
      pageSize: 1,
      apiName: 'getMatchListByDate'
    }
    api.getMatchListByDate(params).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
