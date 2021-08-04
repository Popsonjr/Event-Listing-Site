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
    data() {
      return {
        timeout: null,
        isError: false,
        isSuccess: true,
      }
    },
    mounted() {
      this.timeout = setTimeout(() => this.remove(this.notification), 5000)
    },
    beforeDestroy() {
      clearTimeout(this.timeout)
    },
    computed: {
      typeClass() {
        return {
          '-text-primary': this.isSuccess,
          textError: this.notification.type === 'error',
        }
      },
      error() {
        if (this.notification.type == 'error') {
          return 'true'
        }
        return 'false'
      },
      notificationTypeClass() {
        return `this.notification.type`
        // return '-text-error'
      },
    },
    methods: mapActions(['notification', 'remove']),
  },
}
</script>

<style scoped>
.notification-bar {
  margin: 1em 0 1em;
}
</style>
