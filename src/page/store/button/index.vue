<template>
  <div class="button-box">
    <div class="button" @click="onEvent">{{text}}</div>
  </div>
</template>

<script>
export default {
  name: "buttons",
  props: {
    text: {
      type: String,
      default: "确认"
    },
    onEvent: {
      type: Function,
      default: () => {}
    }
  }
};
</script>

<style lang="scss">
.button-box {
  padding: 10px;

  .button {
    color: #fff;
    text-align: center;
    height: 45px;
    line-height: 45px;
    border-radius: 5px;
    font-size: 16px;
    background-color: #f03b3b;
  }
}
</style>