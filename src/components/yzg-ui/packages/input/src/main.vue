<template>
  <div class="yzg-input-box" :class="{'yzg-tips-box': tips}" v-if="!hidden" :style="{height: height,display: isText ? 'flex': 'block'}">
    <div class="yzg-input-label" :style="{ width: labelWidth + 'px' }" v-html="label"></div>
    <p v-if="labelTips" class="label-tip">{{labelTips}}</p>
    <div :class="isText ? 'yzg-input-center' : 'yzg-input-below'">
      <div v-if="isTextarea" class="yzg-textarea hair-border">
        <textarea
          cols="30"
          rows="8"
          :placeholder="placeholder"
          :disabled="disabled"
          v-model="yzgValue"
          :maxlength="maxLength"
          @input="onInput"
          @focus="yzgfocus"
          @blur="yzgblur"
        >
        </textarea>
        <p>{{yzgValueLength}}/{{maxLength}}</p>
      </div>
      <div v-else-if="disabled" class="yzg-value">{{yzgValue}}</div>
      <div v-else-if="isText" class="yzg-input">
        <input
          type="text"
          :placeholder="placeholder"
          :maxlength="maxLength"
          @input="onInput"
          v-model="yzgValue"
         @focus="yzgfocus"
         @blur="yzgblur"
        >
      </div>

      <div class="yzg-input-tips" v-if="tips">{{tips}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "yzg-input",
  props: {
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    hidden: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    maxLength: {
      type: Number,
      default: 70
    },
    value: {
      type: [String, Number],
      default: ""
    },
    tips: {
      type: String,
      default: ""
    },
    labelTips: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      yzgValue: "",
      height: ''
    };
  },
  methods: {
    yzgfocus(){
      this.$emit('onFocus', this.yzgValue)
    },
    yzgblur() {
      this.$emit('onBlur', this.yzgValue)
    },
    onInput(value) {
      // console.log(this.yzgValue);
    }
  },
  mounted() {
    this.yzgValue = this.value;
    this.height = this.type === 'text' ? '46px' : ''
  },
  computed: {
    isText(){
      return this.type === 'text'
    },
    isTextarea(){
      return this.type === 'textarea'
    },
    yzgValueLength(){
      return this.yzgValue.length || 0
    }
  },
  watch: {
    value(val) {
      this.yzgValue = val;
    },
    yzgValue(val) {
      this.$emit("input", val);
      this.$emit("chanage", val);
    }
  }
};
</script>

<style lang="scss">
.yzg-input-box {
  width: 100%;
  display: flex;
  padding: 0 10px;
  font-size: 14px;
  line-height: 46px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  position: relative;

  .yzg-input-label {
    width: 100px;
    height: 100%;
    color: #333;
  }

  .label-tip{
    position: absolute;
    left: 10px;
    top: 14px;
    color: #f13a3c;
    font-weight: 500;
    transform: scale(0.7);
    transform-origin: 0 50%;
  }

  .yzg-input {
    flex: 1;
    color: #666;
    display: flex;
    padding: 0px 10px;
    input {
      flex: 1;
      color: #666;
      font-size: 14px;
    }
  }

  .yzg-textarea{
    flex: 1;
    color: #666;
    display: flex;
    margin-bottom: 10px;
    padding: 5px 5px 0;
    flex-direction: column;
    textarea {
      flex: 1;
      color: #666;
      font-size: 14px;
      resize: none;
      border: none;
      &:disabled {
        background-color: inherit;
        -webkit-text-fill-color: #666;
        color: #666;
      }
    }
    & > p {
      box-sizing: border-box;
      width: 100%;
      height: 40px;
      line-height: 30px;
      padding: 10px 10px 0;
      text-align: right;
    }
  }

  .yzg-input-center {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
    .yzg-value {
      flex: 1;
      color: #666;
      overflow: hidden;
      padding: 0px 10px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .yzg-input-tips {
      position: absolute;
      bottom: -2px;
      left: 10px;
      height: 20px;
      line-height: 20px;
      font-size: 11px;
      color: #999;
      width: 95%;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .yzg-input-below{

  }
}

.yzg-tips-box {
  height: 56px;
  .yzg-input {
    input {
      height: 46px;
    }
  }
}
</style>
