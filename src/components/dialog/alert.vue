<template>
  <div class="wrap" :class="[(!text&&!custom) ? 'title' : '']" v-if="show">
    <div class="bg" @touchmove="preventDefault"></div>
    <div class="win">
      <div class="close" v-if="isClose" @click="close">×</div>
      <h3 v-if="title" v-html="title"></h3>
      <div class="content">
        <ScratchCardRules v-if="custom=='scratchCardRules'"></ScratchCardRules>
        <LogoutValueInfo v-if="custom=='logoutValueInfo'" :customData="customData"/>
        <span v-else>{{text}}</span>
      </div>
      <div class="button">
        <span class="confirm" v-if="isConfirm" @click="confirmCallback">{{confirm}}</span>
        <span class="cancel" @click="cancelCallback">{{cancel}}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 10000;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .win {
    position: absolute;
    width: 300px;
    left: 50%;
    top: 50%;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 0 0;
    border-radius: 16px;
    transform: translate(-50%, -50%);
    color: #fff;
    background: #fff;
    animation: fade-in 0.3s forwards;
    overflow: hidden;

    .close {
      position: absolute;
      font-size: 18px;
      right: 0;
      top: 0;
      padding: 2px 10px 10px 10px;
      height: 20px;
      line-height: 20px;
      color: #333;
      cursor: pointer;
      z-index: 9999;
    }
    h3 {
      font-size: 16px;
      color: #333;
      padding: 4px 10px;
    }

    div.content {
      color: #666;
      padding: 6px 10px 20px 10px;
    }

    div.button {
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      display: flex;
      flex-direction: row;
      border-top: 1px solid #ddd;

      span {
        position: relative;
        flex: 1;
        color: #999;
        font-size: 16px;
        cursor: pointer;
      }

      span.cancel::before {
        position: absolute;
        left: 0;
        height: 100%;
        content: "";
        border-right: 1px solid #ddd;
      }
    }
  }
}

@keyframes fade-in {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

.title {
  .win {
    h3 {
      margin-top: 20px;
    }
  }
}
</style>
