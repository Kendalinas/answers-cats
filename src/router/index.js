import Vue from 'vue'
import Router from 'vue-router'
import AskQuestion from '@/components/AskQuestion'
import Cats from '@/components/Cats'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AskQuestion',
      component: AskQuestion
    },
    {
      path: '/Cats',
      name: 'Cats',
      component: Cats
    }
  ]
})
