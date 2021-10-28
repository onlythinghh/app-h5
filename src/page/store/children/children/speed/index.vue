<template>
  <div class="speed-box">
    <div class="speed-content">
      <div
        class="speed speed1"
        :class="{'curr-speed': speed == 1,'front-speed': speed > 1}"
        @click="onSwitchEvent(1)"
      >
        <i class="icon"></i>
        <i class="line"></i>
        <span class="label">银行卡信息</span>
      </div>
      <div
        class="speed speed2"
        :class="{'curr-speed': speed == 2,'front-speed': speed > 2}"
        @click="onSwitchEvent(2)"
      >
        <i class="icon"></i>
        <i class="line"></i>
        <span class="label">身份信息</span>
      </div>
      <div
        class="speed speed3"
        :class="{'curr-speed': speed == 3,'front-speed': speed > 3}"
        @click="onSwitchEvent(3)"
      >
        <i class="icon"></i>
        <span class="label">店铺信息</span>
      </div>
    </div>
    <div class="bank-seize">温馨提示：若绑定对公结算账户，一旦审核通过无法再次修改，请谨慎操作！</div>
  </div>
</template>

<script>
export default {
  name: "speed",
  props: {
    speed: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onSwitchEvent(page) {
      switch (page) {
        case 1:
          this.$router.replace("speed1");
          break;
        case 2:
          this.$router.replace("speed2");
          break;
        case 3:
          this.$router.replace("speed3");
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.speed-box {
  position: sticky;
  top: 50px;
  z-index: 999;
  background-color: #fff;

  .speed-content {
    height: 58px;
    padding: 0 46px;
    display: flex;
    overflow: hidden;

    .speed {
      flex: 1;
      position: relative;

      i.icon {
        position: absolute;
        width: 16px;
        height: 16px;
        top: 50%;
        left: 0px;
        border-radius: 16px;
        transform: translateY(-50%);
        background-color: #ececec;
        margin-top: -8px;
        z-index: 999;
      }

      i.line {
        position: absolute;
        width: 100%;
        height: 2px;
        left: 0px;
        top: 50%;
        transform: translateY(-50%);
        background-color: #ececec;
        margin-top: -8px;
        z-index: 998;
      }

      span.label {
        position: absolute;
        top: 30px;
        width: 88px;
        height: 22px;
        color: #999;
      }
    }

    div.curr-speed {
      i.icon {
        background-color: #00a43b;
      }
      i.icon::after {
        content: " ";
        position: absolute;
        width: 4px;
        height: 4px;
        top: 50%;
        left: 50%;
        border-radius: 4px;
        transform: translate(-50%, -50%);
        background-color: #fff;
      }

      span.label {
        color: #333;
      }
    }

    div.front-speed {
      i.icon {
        background-color: #00a43b;
      }
      i.icon::after {
        content: " ";
        position: absolute;
        width: 4px;
        height: 6px;
        top: 3px;
        left: 5px;
        transform: rotate(45deg);
        transform-origin: center center;
        border: 1px solid #fff;
        border-left: 0;
        border-top: 0;
      }

      i.line {
        background-color: #00a43b;
      }

      span.label {
        color: #333;
      }
    }

    .speed1 {
      span.label {
        left: -26px;
      }
    }
    .speed2 {
      span.label {
        left: -33px;
      }
    }
    .speed3 {
      position: relative;
      width: 30px;
      flex: none;

      span.label {
        left: -33px;
      }
    }
  }
}
</style>