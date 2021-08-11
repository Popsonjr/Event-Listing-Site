<template>
  <div>
    <h1>Create an Event</h1>

    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
      />
      <!-- <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="option in categories" :key="option">{{ option }}</option>
      </select> -->

      <h3>Name & describe your event</h3>

      <div class="field">
        <BaseInput v-model="event.title" label="Title" type="text" />
      </div>
      <div class="field">
        <BaseInput
          v-model="event.description"
          label="Description"
          type="text"
        />
      </div>

      <h3>When is your event?</h3>
      <div class="field">
        <BaseInput v-model="event.date" label="Date" type="text" />
        <!-- <label>Date</label> -->
        <!-- <datepicker v-model="event.date" placeholder="select a date" /> -->
        <!-- <date-pick v-model="event.date"></date-pick> -->
        <!-- <input placeholder="12th June, 2020" type="text" v-model="event.date" /> -->
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}:00</option>
        </select>
      </div>

      <h3>Extras</h3>
      <div class="field">
        <BaseCheckbox
          label="Covid Compliant ?"
          v-model="event.covidCompliant"
        />
      </div>

      <h3>Are pets allowed ?</h3>
      <div class="field">
        <BaseRadioGroup
          v-model="event.pets"
          name="Pets"
          :options="petOptions"
          vertical
        />
      </div>
      <!-- <div class="field">
        <BaseRadio v-model="event.pets" :value="1" label="Yes" name="pets" />
      </div>
      <div class="field">
        <BaseRadio v-model="event.pets" :value="0" label="No" name="pets" />
      </div> -->

      <input type="submit" class="button -fill-gradient" value="submit" />
    </form>
  </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker'
// import DatePick from 'vue-date-pick'
// import 'vue-date-pick/dist/vueDatePick.css'
import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
// import BaseRadio from '@/components/BaseRadio.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'
export default {
  components: {
    BaseInput,
    BaseSelect,
    BaseCheckbox,
    // BaseRadio,
    BaseRadioGroup,
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
      petOptions: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
      ],
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
        covidCompliant: true,
        pets: '1',
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
