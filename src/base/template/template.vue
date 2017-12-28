<!--
 - FileNavue-templatelate
 - Created: Administrator
 - CreateAt: 2017-12-26 10:22
 - version:
 - Author: main
 - E-mail: 375277023@qq.com
-->
<template lang="pug">
  .template(ref="template")
    .tab-container
      ul.tab(ref="tab", :style="{width: tabsW + 'px',background: tabColor}")
        li.tab-item(
        :style="{padding: `0 ${tabGap}px`, flex: tabFlex}",
        v-for="(tab, index) in tabs",
        :class="{'active-tab': currentIndex === index}",
        @click="selectTab(index)"
        ) {{tab}}
    .container
      ul(
        ref="ul",
        :style="{width: 100 * tabs.length + 'vw', left: left + 'px', transition: `all ${seconds}s ease-out`}",
        @touchstart="touchStart",
        @touchmove="touchMove",
        @touchend="touchEnd",
        )
        li.content(v-for="(item, index) in tabs")
          scroll
            slot(:name="`slot${index}`")

</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  const PERCENT = 30 // 触发切换的阈值
  const TRANSITION_SECONDS = 0.2 // 动画时间
  const GAP = 15 // tab之间的间隙

  export default {
    components: {
      Scroll
    },
    props: {
      tabs: {
        type: Array,
        default: () => []
      },
      tabColor: {
        type: String,
        default: '#0B7180'
      }
    },
    data() {
      return {
//        tabs: ['a', 'bbbbbb', 'cc', 'dddddddddddd', 'e', 'fff', 'gggg'],
//        tabs: ['a', 'bbbbbb'],
        currentIndex: 0,
        left: 0,
        seconds: 0,
        tabsW: 0,
        tabGap: GAP,
        tabFlex: 0
      }
    },
    created() {
      this.touch = {}
    },
    mounted() {
      // 宽度设置
      this.touch.maxW = this.$refs.ul.clientWidth
      this.touch.liW = this.$refs.ul.getElementsByTagName('li')[0].offsetWidth
      let tabs = this.$refs.tab.getElementsByClassName('tab-item')
      let tabsWArr = Array.from(tabs).map((item) => {
        return item.offsetWidth
      })
      let tabsW = tabsWArr.reduce((a, b) => {
        return a + b
      })
      let templateW = this.$refs.template.offsetWidth
      this.tabsW = Math.max(tabsW, templateW)
      if (tabsW <= templateW) this.tabFlex = 1
    },
    methods: {
//      scroll() { this.scrolling = true },
      selectTab(index) {
        this.currentIndex = index
//        this._eleIntoView(event.target)
      },
      touchStart(e) {
        this.seconds = 0
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
      },
      touchMove(e) {
        if (!this.touch.initiated) return
        const touch = e.touches[0]
        let deltaX = touch.pageX - this.touch.startX
//        let deltaY = touch.pageY - this.touch.startY
        this.touch.deltaX = Math.round(deltaX)
        this.left = Math.max(Math.min(0, Math.round((this.touch.left || 0) + deltaX)), -(this.touch.maxW - this.touch.liW))
      },
      touchEnd() {
        this.seconds = TRANSITION_SECONDS
        if (Math.abs(this.touch.deltaX) >= this.touch.liW * PERCENT / 100) {
          if (this.touch.deltaX > 0) {
            this.currentIndex = Math.max(0, this.currentIndex - 1)
          } else {
            this.currentIndex = Math.min(this.currentIndex + 1, this.tabs.length - 1)
          }
        } else {
          this.left = -this.currentIndex * this.touch.liW
        }
        this.touch.left = this.left
        this.touch.initiated = false
      },
      _eleIntoView(element) {
        // 让元素进入视口
        if (document.documentElement.scrollIntoViewIfNeeded) {
          element.scrollIntoViewIfNeeded()
        } else {
          element.scrollIntoView() // {block: 'end', behavior: 'smooth'}
        }
      }
    },
    watch: {
      currentIndex(index) {
        let tabs = this.$refs.tab.getElementsByClassName('tab-item')
        this._eleIntoView(tabs[index])
        this.left = -index * this.touch.liW
        this.touch.left = this.left
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .template
    overflow: hidden
  .tab-container
    width: 100%
    overflow-x scroll
    transition all 1s ease-out
    box-shadow 0 1px 3px 1px rgba(0,0,0,.6)
  .tab
    transition all 1s ease-out
    display flex
    height: 40px
    .tab-item
      display flex
      align-items center
      justify-content center
      /*flex: 1*/
      height: 100%
      box-sizing border-box
      &.active-tab
        color #fff
        font-weight: 700
        border-bottom 3px solid #fff
  .container
    width: 100%
    height: calc(100vh - 40px)
    position: relative
    ul
      position: absolute
      height: 100%
    .content
      display inline-block
      width: 100vw
      height: 100%
      /*border 1px solid #ccc*/
      box-sizing border-box
</style>
