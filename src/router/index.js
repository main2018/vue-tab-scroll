import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/vue-tab-scroll/vue-tab-scroll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
