<template>
  <div class="open-bank-box" v-if="!hidden">
    <div class="open-bank-label" :style="{ width: labelWidth + 'px' }">开卡银行</div>
    <div class="open-bank-center">
      <i class="icon"></i>
      <div class="open-bank">中国邮政储蓄银行</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "openbank",
  props: {
    labelWidth: {
      type: Number,
      default: 100
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.open-bank-box {
  width: 100%;
  height: 46px;
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  line-height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;

  .open-bank-label {
    width: 100px;
    height: 100%;
    color: #333;
  }

  .open-bank-center {
    display: flex;
    flex: 1;
    overflow: hidden;
    padding: 0 10px;
    position: relative;
    align-items: center;

    i.icon {
      width: 22px;
      height: 20px;
      background: url("../../../assets/img/store/postal.png") no-repeat;
      background-size: 100%;
    }

    .open-bank {
      flex: 1;
      color: #666;
      overflow: hidden;
      padding: 0px 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>