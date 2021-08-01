import { createStore } from 'vuex'
import * as event from '@/store/modules/event.js'
import * as user from '@/store/modules/user.js'

export default createStore({
  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  mutations: {},
  actions: {},
  modules: {
    event,
    user,
  },
})
