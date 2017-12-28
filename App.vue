<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import VConsole from 'vconsole/dist/vconsole.min'
const vConsole = new VConsole()

export default {
  name: 'app',
  created () {
    var obj = {
      token: '29626633-29fa-488d-97c4-609fa8daa117'
    }
    this.$http.post('/agent/list', obj).then((resp) => {
      console.log(resp)
    }).catch((err) => { console.log(err) })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
