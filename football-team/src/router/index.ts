import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: {
        title: 'Football Team - Home',
        routeName: 'Home',
        metaTags: [
          {
            name: 'description',
            content: 'Strona domowa przedstawiająca listę stażystów.'
          },
          {
            property: 'og:description',
            content: 'Strona domowa przedstawiająca listę stażystów.'
          }
        ]
      }
    },
    {
      path: '/edit_user',
      name: 'edit user',
      component: () => import('@/views/EditUserView.vue'),
      meta: {
        title: 'Football Team - Edytuj użytkownika',
        routeName: 'Edytuj użytkownika',
        metaTags: [
          {
            name: 'description',
            content: 'Strona służąca do edycji danych użytkownika.'
          },
          {
            property: 'og:description',
            content: 'Strona służąca do edycji danych użytkownika.'
          }
        ]
      }
    },
    {
      path: '/add_user',
      name: 'add user',
      component: () => import('@/views/AddUserView.vue'),
      meta: {
        title: 'Football Team - Dodaj użytkownika',
        routeName: 'Dodaj użytkownika',
        metaTags: [
          {
            name: 'description',
            content: 'Strona służąca do dodawania nowego użytkownika.'
          },
          {
            property: 'og:description',
            content: 'Strona służąca do dodawania nowego użytkownika'
          }
        ]
      }
    }
  ]
})

export default router
