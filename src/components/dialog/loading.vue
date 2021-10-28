<template>
  <div class="wrap" v-if="show" @touchmove="preventDefault">
    <div class="loading" :class="{text: text}">
      <img src="../../images/loading.gif">
      <span class="es" v-if="text">{{text}}</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);

  .loading {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    text-align: center;
    font-size: 14px;
    img {
      position: absolute;
      width: 40px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span {
      display: block;
      color: #fff;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
    }
  }
  .text {
    img {
      margin-top: -12px;
    }
    span {
      padding: 64px 6px 0 6px;
    }
  }
}
</style>
