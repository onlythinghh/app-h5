<template>
  <transition name="fade">
    <div class="yzg-toast-box" v-if="visible">
      <div class="yzg-toast">{{message}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      visible: false
    };
  }
};
</script>

<style lang="scss">
.yzg-toast-box {
  left: 50%;
  width: 80%;
  bottom: 20px;
  padding: 12px;
  position: fixed;
  font-size: 14px;
  text-align: center;
  border-radius: 6px;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.8);

  .yzg-toast {
    color: #fff;
    word-wrap: break-word;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>