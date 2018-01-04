<!--
 - FileName:
 - Created: Administrator
 - CreateAt: 2017-12-27 15:42
 - version:
 - Author: main
 - E-mail: 375277023@qq.com
-->
<template lang="pug">
  .scroll
    pull-to(:top-load-method="refresh", :bottom-load-method="searchMore", :isYScroll="isYScroll")
      slot
</template>

<script type="text/ecmascript-6">
  import pullTo from 'base/vue-pull-to'

  export default {
    components: {
      pullTo
    },
    props: {
      isYScroll: Boolean
    },
    data() {
      return {}
    },
    created() {
    },
    mounted() {
    },
    methods: {
      refresh(loaded) {
        loaded('done')
      },
      searchMore(loaded) {
        loaded('done')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .scroll
    height: 100%
    overflow: hidden
</style>
