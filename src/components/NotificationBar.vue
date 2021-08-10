<template>
  <div class="notification-bar">
    <p :class="typeClass">{{ notification.message }}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    notification: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      timeout: null,
    }
  },
  computed: {
    typeClass() {
      return {
        '-text-primary': this.notification.type === 'primary',
        textError: this.notification.type === 'error',
      }
    },
  },
  mounted() {
    this.timeout = setTimeout(() => this.remove(this.notification), 3000)
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },

  methods: mapActions('notification', ['remove']),
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
