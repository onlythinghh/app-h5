<template>
  <label class="yzg-radio-box">
    {{model}}
    <span class="yzg-radio-inner">
      <input type="radio" :name="name" :value="label" v-model="model">
      <span></span>
    </span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "yzg-radio",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    label: {
      type: [Number, String],
      default: ""
    }
  },
  data() {
    return {
      model: ""
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
.yzg-radio-box {
  line-height: 20px;
  word-break: break-all;
  .yzg-radio-inner {
    input[type="radio"] + span {
      width: 20px;
      height: 20px;
      border-radius: 20px;
      display: inline-block;
      border: 1px solid #ccc;
      background-color: #fff;
      position: relative;
      transition: all 0.2s;
      vertical-align: middle;
      margin-top: -2px;
    }
    input[type="radio"] + span::after {
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

    input[type="radio"]:checked + span {
      border: 1px solid #f6001a;
      background-color: #f6001a;
    }
    input[type="radio"]:checked + span::after {
      transform: rotate(45deg) scale(1);
    }
  }
}
</style>