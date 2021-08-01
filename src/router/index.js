import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/EventDetails.vue'
import About from '@/views/About.vue'
import EventCreate from '@/views/EventCreate.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: '/create',
    name: 'EventCreate',
    component: EventCreate,
  },
]

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
