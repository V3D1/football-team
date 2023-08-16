import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Users - Home page',
        routeName: 'Home',
        metaTags: [
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
        title: 'Users - Edit user',
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
        title: 'Users - Add new user',
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

export default router
