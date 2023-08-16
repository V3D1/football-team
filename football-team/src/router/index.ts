import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Interns - Home page',
        routeName: 'Home',
        metaTags: [
          {
            name: 'title',
            content: 'Interns - Home page'
          },
          {
            name: 'description',
            content: 'Home page with list of users'
          },
          {
            property: 'og:description',
            content: 'Home page with list of users'
          }
        ]
      }
    },
    {
      path: '/edit_user',
      name: 'edit user',
      props: (route) => ({ ...route.params, id: route.query.id }),
      component: () => import('@/views/EditUserView.vue'),
      meta: {
        title: 'Interns - Edit user',
        routeName: 'Edit user',
        metaTags: [
          {
            name: 'description',
            content: 'Page with editing user'
          },
          {
            property: 'og:description',
            content: 'Page with editing user'
          }
        ]
      }
    },
    {
      path: '/add_user',
      name: 'add user',
      component: () => import('@/views/AddUserView.vue'),
      meta: {
        title: 'Interns - Add new user',
        routeName: 'Add new user',
        metaTags: [
          {
            name: 'description',
            content: 'Page with adding new user'
          },
          {
            property: 'og:description',
            content: 'Page with adding new user'
          }
        ]
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})
export default router
