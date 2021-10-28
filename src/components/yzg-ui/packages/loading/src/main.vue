<template>
  <transition name="fade">
    <div class="yzg-loading-box" v-if="visible" @touchmove.prevent>
      <div class="yzg-loading-bg"></div>
      <div class="yzg-loading-center">
        <img class="yzg-loading-icon" src="./images/loading.gif">
        <span class="yzg-loading-message" v-if="message">{{message}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      message: "",
      visible: false
    };
  }
};
</script>

<style lang="scss">
.yzg-loading-box {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;

  .yzg-loading-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .yzg-loading-center {
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    position: absolute;
    border-radius: 6px;
    flex-direction: column;
    justify-content: center;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);

    .yzg-loading-icon {
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }

    .yzg-loading-message {
      width: 100%;
      height: 20px;
      color: #fff;
      overflow: hidden;
      padding-top: 4px;
      line-height: 20px;
      text-align: center;
      text-overflow: ellipsis;
    }
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