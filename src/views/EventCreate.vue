<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="option in categories" :key="option">{{ option }}</option>
      </select>

      <h3>Name & describe your event</h3>
      <div class="field">
        <label>Title</label>
        <input
          v-model="event.title"
          type="text"
          placeholder="Add an event title"
        />
      </div>
      <div class="field">
        <label>Description</label>
        <input
          v-model="event.description"
          type="text"
          placeholder="Add a description"
        />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <!-- <datepicker v-model="event.date" placeholder="select a date" /> -->
        <!-- <date-pick v-model="event.date"></date-pick> -->
        <input placeholder="12th June, 2020" type="text" v-model="event.date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}:00</option>
        </select>
      </div>

      <input type="submit" class="button -fill-gradient" value="submit" />
    </form>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker'
// import DatePick from 'vue-date-pick'
// import 'vue-date-pick/dist/vueDatePick.css'
export default {
  components: {
    // Datepicker,
    // DatePick,
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i)
    }
    return {
      categories: this.$store.state.categories,
      event: this.createNewEventObject(),
      times,
    }
  },
  methods: {
    createEvent() {
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: this.event.id },
          })
          this.event = this.createNewEventObject()
        })
        .catch(() => {})
    },
    createNewEventObject() {
      const id = Math.floor(Math.random() * 100000000)
      return {
        id: id,
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
        organiser: '',
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
