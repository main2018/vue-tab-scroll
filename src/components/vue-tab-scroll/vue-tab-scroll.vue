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
        tabs: ['首页', '参与']
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
