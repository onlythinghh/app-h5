<template>
  <div v-if="visible" :class="['alert']">{{message}}</div>
</template>

<script>
export default {
  name: "Alert",
  data() {
    return {
      message: "",
      visible: false
    };
  },
  methods: {
    close() {
      this.visible = false;
    }
  }
};
</script>