<template>
  <label class="yzg-checkbox-box">
    <span class="yzg-checkbox-inner">
      <input type="checkbox" v-model="model">
      <span></span>
    </span>
    <span class="yzg-checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "yzg-checkbox",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: false
    };
  },
  watch: {
    model(val) {
      this.$emit("input", val);
    }
  },
  mounted() {
    this.model = this.value;
  }
};
</script>

<style lang="scss">
.yzg-checkbox-box {
  height: 22px;
  line-height: 22px;
  position: relative;
  word-break: break-all;
  .yzg-checkbox-inner {
    width: 22px;
    height: 22px;
    display: inline-block;
    input[type="checkbox"] {
      width: 0px;
      height: 0px;
      display: none;
    }
    input[type="checkbox"] + span {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      display: inline-block;
      border: 1px solid #ccc;
      background-color: #fff;
      position: absolute;
      transition: all 0.2s;
      vertical-align: middle;
    }
    input[type="checkbox"] + span::after {
      transition: all 0.3s;
      border: 2px solid #fff;
      border-left: 0;
      border-top: 0;
      content: " ";
      top: 2px;
      left: 7px;
      position: absolute;
      width: 5px;
      height: 10px;
      transform: rotate(45deg) scale(0);
      transform-origin: center center;
    }

    input[type="checkbox"]:checked + span {
      border: 1px solid #f6001a;
      background-color: #f6001a;
    }
    input[type="checkbox"]:checked + span::after {
      transform: rotate(45deg) scale(1);
    }
  }
}
</style>