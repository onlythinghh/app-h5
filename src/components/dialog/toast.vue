<template>
  <transition name="fade">
    <div class="wrap" v-if="show">{{text}}</div>
  </transition>
</template>
<style scoped>
.wrap {
  position: fixed;
  left: 50%;
  top: 50%;
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: fade-in 0.3s forwards;
}

.fade-leave-active {
  animation: fade-out 0.3s forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
