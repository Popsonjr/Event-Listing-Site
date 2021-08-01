<template>
  <div class="events">
    <h1>Events for {{ user.user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <div>
      <span v-if="page != 1">
        <router-link
          :to="{ name: 'EventList', query: { page: page - 1 } }"
          rel="prev"
          >Prev Page</router-link
        >

        <span> | </span>
      </span>
      <span v-if="hasNextPage">
        <router-link
          :to="{ name: 'EventList', query: { page: page + 1 } }"
          rel="next"
          >Next Page</router-link
        ></span
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
// import EventService from '@/services/EventService.js'
import { mapState } from 'vuex'
export default {
  name: 'EventList',
  components: {
    EventCard,
  },

  created() {
    this.$store.dispatch('event/getAllEvents', {
      perPage: this.perPage,
      page: this.page,
    })
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    perPage() {
      return 3
    },
    totalPage() {
      return this.page * this.perPage
    },
    hasNextPage() {
      return this.event.eventsTotal > this.totalPage
    },
    ...mapState(['user', 'event']),
  },
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
