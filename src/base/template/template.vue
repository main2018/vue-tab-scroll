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
    .header
      .tab-btn(ref="tabBtn")
        slot(name="tab-btn")
      .tab-container(ref="tabContainer")
        ul.tab(ref="tab", :style="{width: tabsW + 'px',background: tabColor}")
          li.tab-item(
          :style="{padding: `0 ${tabGap}px`, flex: tabFlex}",
          v-for="(tab, index) in tabs",
          :class="{'active-tab': currentIndex === index}",
          @click="selectTab(index)"
          ) {{tab}}
          .bottom-line(:style="{width: (tabsWArr[currentIndex] || 0) + 'px', left: lineLeft + 'px', transition: `left ${lineTransition}s ease-out`}")

    .container
      ul(
        ref="ul",
        :style="{width: 100 * tabs.length + 'vw', left: left + 'px', transition: `all ${seconds}s ease-out`}",
        @touchstart="touchStart",
        @touchmove="touchMove",
        @touchend="touchEnd",
        )
        li.content(v-for="(item, index) in tabs")
          scroll(:isYScroll="isYScroll")
            slot(:name="`slot${index}`")

</template>

<script type="text/ecmascript-6">
  import Scroll from 'base/scroll/scroll'

  const PERCENT = 30 // 触发切换的阈值
  const TRANSITION_SECONDS = 0.2 // 动画时间
  const LINE_TRANSITION_SECONDS = 0.4 // line动画时间
  const GAP = 10 // tab之间的间隙

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
        default: 'none'
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
        tabsWArr: [],
        tabGap: GAP,
        tabFlex: 0,
        lineLeft: 0,
        lineTransition: 0,
        isYScroll: true
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
      let tabContainerW = this.$refs.tabContainer.offsetWidth
      this.tabsW = Math.max(tabsW, tabContainerW)
      if (tabsW <= tabContainerW) this.tabFlex = 1
      let t = setTimeout(() => {
        tabsWArr = Array.from(tabs).map((item) => {
          return item.offsetWidth
        })
        this.tabsWArr = tabsWArr
        let [arr, maxL] = [this.tabsWArr.slice(0, -1)]
        if (!arr[0]) {
          maxL = 0
        } else {
          maxL = arr.reduce((a, b) => a + b)
        }
        this.touch.lineMaxL = maxL
        clearTimeout(t)
      }, 600)
    },
    methods: {
//      scroll() { this.scrolling = true },
      selectTab(index) {
        this.currentIndex = index
        this._setLineLeft(index)
//        this._eleIntoView(event.target)
      },
      touchStart(e) {
        this.lineTransition = 0
        this.seconds = 0
        this.touch.initiated = true
        const touch = e.touches[0]
        this.touch.startX = touch.pageX
        this.touch.startY = touch.pageY
        this.touch.lineLeft = this.lineLeft
        this.isYScroll = true
//        e.preventDefault()
      },
      touchMove(e) {
        if (!this.touch.initiated) return
        const touch = e.touches[0]
        let deltaX = touch.pageX - this.touch.startX
        let deltaY = touch.pageY - this.touch.startY
        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          this.isYScroll = false
        }
        if (this.isYScroll) return
        this.touch.deltaX = Math.round(deltaX)
        this.left = Math.max(Math.min(0, Math.round((this.touch.left || 0) + deltaX)), -(this.touch.maxW - this.touch.liW))
        // line
        let lineW = this.tabsWArr[this.currentIndex]
        this.lineLeft = Math.min(Math.max(this.touch.lineLeft - deltaX / this.touch.liW * lineW, 0), this.touch.lineMaxL)
        e.preventDefault()
      },
      touchEnd(e) {
        if (this.isYScroll) return
        this.lineTransition = LINE_TRANSITION_SECONDS
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
        this._setLineLeft(this.currentIndex)
        this.touch.lineLeft = this.lineLeft
        this.touch.left = this.left
        this.touch.initiated = false
        e.preventDefault()
      },
      _setLineLeft(index) {
        let arr = this.tabsWArr.slice(0, index)
        if (!arr[0]) {
          this.lineLeft = 0
        } else {
          this.lineLeft = arr.reduce((a, b) => a + b)
        }
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
        this._setLineLeft(index)
        this.touch.lineLeft = this.lineLeft
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  $color-text = rgba(0,0,0,.87)
  $color-text-bl = rgba(0,0,0,.36)
  $color-text-l = rgba(0,0,0,.54)

  .template
    overflow: hidden
  .header
    display flex
    /*box-shadow 0 1px 3px 1px rgba(0,0,0,.6)*/
  .tab-container
    flex 1
    width: 100%
    overflow-x scroll
    transition all .5s ease-out
  .tab
    position: relative
    display flex
    height: 40px
    transition all .5s ease-in-out
    .bottom-line
      height: 3px
      background $color-text
      position: absolute
      bottom: 0
    .tab-item
      display flex
      align-items center
      justify-content center
      /*flex: 1*/
      height: 100%
      box-sizing border-box
      white-space nowrap
      word-break keep-all
      color $color-text-l
      &.active-tab
        color $color-text
        font-weight: 700
        /*border-bottom 3px solid $color-text*/
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
