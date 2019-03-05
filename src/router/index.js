import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import login from '@/views/login'
import notebooks from '@/views/notebooks'
import notes from '@/views/notes'
import trash from '@/views/trash'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/notebooks',
      children: [
        {
          path: 'notebooks',
          name:'notebooks',
          component: notebooks
        },
        {
          path: 'notes',
          name:'notes',
          component: notes
        },
        {
          path: 'trash',
          name:'trash',
          component: trash
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
