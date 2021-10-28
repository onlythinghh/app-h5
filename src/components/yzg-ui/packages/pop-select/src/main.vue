<template>
  <transition name="fade">
    <div class="yzg-pop-select-box" @touchmove.prevent v-if="visible">
      <div class="yzg-pop-select-bg" @click="onCloseSelect"></div>
      <div class="yzg-pop-select-center">
        <div class="yzg-pop-select-header">
          <div class="cancel" @click="onCloseSelect">取消</div>
          <div class="title">
            {{title}}
            <span v-if="!single" class="is-multiple">(可多选)</span>
          </div>
          <div class="confirm" @click="onCheck">确定</div>
        </div>
        <div class="scoll-wrapper-gather">
          <ul>
            <li
              class="select-item"
              v-for="(item, index) in yzgGather"
              :key="index"
              :class="{'on':item.checked, 'disabled':item.disabled}"
              @click="onEvent(item)"
            >
              <div class="label">{{item.label}}</div>
              <div class="checkbox">
                <span></span>
              </div>
            </li>
            <li class="select-item-size"></li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "yzg-pop-select",
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // true为单选 否则为多选
    single: {
      type: Boolean,
      default: false
    },
    gather: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      myScroll: null,
      visible: false,
      yzgGather: []
    };
  },
  methods: {
    getCheckItem() {
      return this.yzgGather.filter(item => item.checked);
    },
    onChange(currItem) {
      const { value, isBanOther } = currItem;
      if (isBanOther) {
        this.yzgGather.map(gatherItem => {
          gatherItem.checked = false;
        });
        currItem.checked = true;
      } else {
        currItem.checked = true;
      }
    },
    onCheck() {
      this.onCloseSelect();
      const checkItem = this.getCheckItem();
      this.$emit("input", checkItem);
    },
    onOpenSelect() {
      this.visible = true;
    },
    onCloseSelect() {
      this.visible = false;
    },
    onEvent(currItem) {
      const { checked, isBanOther, disabled } = currItem;
      if (disabled) return;
      this.yzgGather.map(gatherItem => {
        if (this.single) {
          if (gatherItem.value != currItem.value) {
            gatherItem.checked = false;
          }
        } else {
          if (isBanOther) {
            if (!gatherItem.isBanOther) {
              gatherItem.checked = false;
            }
          } else {
            if (gatherItem.isBanOther) {
              gatherItem.checked = false;
            }
          }
        }
      });
      currItem.checked = !currItem.checked;
      this.yzgGather = JSON.parse(JSON.stringify(this.yzgGather));
    },
    getDefaultCheckItem() {
      const yzgGather = JSON.parse(JSON.stringify(this.gather));
      return yzgGather.map(gatherItem => {
        this.value.map(valueItem => {
          if (gatherItem.value == valueItem.value) {
            if (gatherItem.resetStatus && valueItem.checked) {
              gatherItem.checked = false;
            } else {
              gatherItem.checked = true;
            }
          }
        });
        return gatherItem;
      });
    },
    init() {
      this.yzgGather = this.getDefaultCheckItem();
      this.myScroll = new IScroll(".scoll-wrapper-gather", {
        scrollY: true,
        preventDefault: false
      });
    }
  },
  mounted() {},
  updated() {
    if (this.myScroll) {
      this.myScroll.refresh();
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        setTimeout(this.init);
      } else {
        this.myScroll = null;
      }
    }
  }
};
</script>

<style lang="scss">
.yzg-pop-select-box {
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;

  .yzg-pop-select-bg {
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(20, 7, 7, 0.2);
  }

  .yzg-pop-select-center {
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 10;
    position: absolute;
    background-color: #fff;
  }

  .yzg-pop-select-header {
    height: 50px;
    display: flex;
    font-size: 16px;
    border-bottom: 1px solid #eee;
    .title {
      flex: 1;
      color: #333;
      overflow: hidden;
      text-align: center;
      white-space: nowrap;
      text-overflow: ellipsis;

      span.is-multiple {
        color: #999;
        font-size: 16px;
      }
    }
    .cancel,
    .confirm {
      color: #999;
      padding: 0 15px;
    }

    .confirm {
      color: #f03b3b;
    }
  }

  .scoll-wrapper-gather {
    max-height: 260px;
    overflow: hidden;

    .select-item {
      height: 48px;
      line-height: 48px;
      display: flex;
      padding: 0 15px;
      border-bottom: 1px solid #eee;
      div.label {
        flex: 1;
        font-size: 16px;
        color: #666;
      }

      .checkbox {
        display: flex;
        align-items: center;
        span {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: inline-block;
          border: 1px solid #ccc;
          background-color: #fff;
          position: relative;
          transition: all 0.2s;
        }
        span::after {
          transition: all 0.3s;
          border: 2px solid #fff;
          border-left: 0;
          border-top: 0;
          content: " ";
          top: 3px;
          left: 7px;
          position: absolute;
          width: 4px;
          height: 8px;
          transform: rotate(45deg) scale(0);
          transform-origin: center center;
        }
      }
    }

    .select-item.on {
      .checkbox {
        span {
          border: 1px solid #f03b3b;
          background-color: #f03b3b;
        }
        span::after {
          transform: rotate(45deg) scale(1);
        }
      }
    }

    .select-item.disabled {
      .checkbox { 
        span {
          border: 1px solid #edf0f3;
          background-color: #edf0f3;
        }
      }
    }

    .select-item-size {
      height: 16px;
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