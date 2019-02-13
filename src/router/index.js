import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/components/layout'
import login from '@/views/login'
import notebooks from '@/views/notebooks'
import notes from '@/views/notes'
import trash from '@/views/trash'
import lay from '@/components/lay'
import note from '@/components/note'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: lay,
      redirect: '/notebooks',
      children: [
        {
          path: 'notebooks',
          component: notebooks
        },
        {
          path: 'notes',
          component: notes
        },
        {
          path: 'trash',
          component: trash
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout
    },
    {
      path: '/note',
      name: 'note',
      component: note
    }
  ]
})
