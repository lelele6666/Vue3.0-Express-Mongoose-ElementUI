import Vue from 'vue'
import Router from 'vue-router'
// import Nofind from '@/views/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'Nofind',
      component: () => import('@/views/404')
    },
    
  ]
})
