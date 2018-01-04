<!--
 - FileNavue-tab-scrollhome
 - Created: Administrator
 - CreateAt: 2017-12-26 09:48
 - version:
 - Author: main
 - E-mail: 375277023@qq.com
-->
<template lang="pug">
  .home
    v-template(:tabs="tabs")
      .icon(slot="tab-btn") &equiv;
      .demo(slot="slot0") 首页的内容
      .demo(slot="slot1") 参与页的内容
</template>

<script type="text/ecmascript-6">
  import Template from 'base/template/template'

  export default {
    components: {
      'v-template': Template
    },
    data() {
      return {
        tabs: ['首页', '参与', '首页', '参与', '首页', '参与', '首页', '参与']
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .icon
    padding: 0 10px
    display flex
    align-items center
    height: 100%
    font-size: 20px
    background rgba(0,0,0,.3)
</style>
