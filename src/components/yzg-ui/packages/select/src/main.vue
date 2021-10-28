<template>
  <div
    class="yzg-select-box"
    v-if="!hidden"
    :class="{'yzg-select-disabled': disabled,'yzg-tips-box': tips}"
  >
    <div class="yzg-select-main" @click="onOpenSelect" @click.stop>
      <div class="yzg-select-label" :style="{ width: labelWidth + 'px' }" v-html="label"></div>
      <div class="yzg-select-value">
        <span v-if="!disabled&&!xValueText">{{placeholder}}</span>
        <span v-else>{{xValueText}}</span>

        <div class="yzg-input-tips" v-if="tips">{{tips}}</div>
      </div>
    </div>
    <yzg-pop-select
      v-if="!other"
      ref="popSelect"
      :title="placeholder"
      :value="xValue"
      :gather="gather"
      :single="single"
      v-model="xValue"
    />
  </div>
</template>

<script>
import YzgPopSelect from "../../pop-select";

export default {
  name: "yzg-select",
  props: {
    label: {
      type: String,
      default: "Select"
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
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: ""
    },
    gather: {
      type: Array,
      default: () => []
    },
    tips: {
      type: String,
      default: ""
    },
    chanage: {
      type: Function,
      default: () => {}
    },
    other: {
      type: Boolean,
      default: false
    },

    // true为单选 否则为多选
    single: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      title: "请选择",
      xValue: [],
      xValueText: ""
    };
  },

  watch: {
    value(val) {
      this.xValue = val;
    },
    xValue(val) {
      this.xValueText = val
        .map(item => {
          const { label } = item;
          return label;
        })
        .join(",");
      this.$emit("input", val);
      this.$emit("chanage", val);
    }
  },

  components: {
    YzgPopSelect
  },
  methods: {
    onOpenSelect() {
      if (this.disabled) return;
      if (this.other) {
        this.onClick();
      } else {
        this.$refs["popSelect"].onOpenSelect();
      }
    }
  },
  mounted() {
    this.xValue = this.value;
    this.title = "请选择" + this.label;
  }
};
</script>

<style lang="scss">
.yzg-select-box {
  width: 100%;
  height: 45px;
  font-size: 14px;
  padding: 0 10px;
  line-height: 46px;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid #eee;

  .yzg-select-main {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;

    .yzg-select-label {
      width: 100px;
      height: 100%;
      color: #333;
    }

    .yzg-select-value {
      flex: 1;
      color: #666;
      overflow: hidden;
      padding: 0px 10px;
      position: relative;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .yzg-select-main::after {
    content: " ";
    top: 50%;
    width: 8px;
    height: 8px;
    right: 2px;
    position: absolute;
    border: 2px solid #ccc;
    border-left: 0px;
    border-bottom: 0px;
    transform: translate(0, -50%) rotate(45deg);
  }
  .yzg-input-tips {
    position: absolute;
    bottom: 2px;
    left: 10px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    width: 95%;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.yzg-select-disabled {
  .yzg-select-main::after {
    visibility: hidden;
  }
}

.yzg-tips-box {
  height: 56px;
}
</style>