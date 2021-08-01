import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
}
export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENT(state, event) {
    state.event = event
  },
  SET_ALL_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
}
export const actions = {
  createEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit('ADD_EVENT', event)
    })
  },
  getEvent({ commit, getters }, id) {
    let event = getters.getSingleEventWIthId(id)
    if (event) {
      console.log(event)
    } else {
      EventService.getEvent(id).then((response) => {
        commit('SET_EVENT', response.data)
      })
    }
  },
  getAllEvents({ commit }, { perPage, page }) {
    EventService.getEvents(perPage, page).then((response) => {
      commit('SET_ALL_EVENTS', response.data)
      commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
    })
  },
}
export const getters = {
  // getSingleEventWIthId: function (state) {
  //   return function (id) {
  //     return state.events.find((event) => event.id === id)
  //   }
  // },
  getSingleEventWIthId: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
