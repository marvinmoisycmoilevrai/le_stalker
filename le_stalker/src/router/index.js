import Vue from 'vue'
import Router from 'vue-router'
import StalkerHome from '@/components/StalkerHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StalkerHome',
      component: StalkerHome
    }
  ]
})
