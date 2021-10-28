<template>
  <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="false">
    <div class="pop-header" @touchmove.prevent>
      <div class="cancel" @click="cancelChoose">
        <span>取消</span>
      </div>
      <div class="title">
        {{ title }}
        <span v-if="isMultipleSelect" class="isMultipleSelect">(可多选)</span>
      </div>
      <div class="confirm" @click="confirmChoose">
        <span>确定</span>
      </div>
    </div>
    <div class="scoll-wrapper" @touchmove="abb">
      <ul class="pop-content">
        <!-- :max="maxLength" -->
        <mt-checklist align="right" v-model="value" :options="lists"></mt-checklist>
      </ul>
    </div>
    <!-- 兼容iPhone X -->
    <div class="seize"></div>
  </mt-popup>
</template>

<script>
export default {
  data() {
    return {
      value: [],
      myScroll: {},
      readValue: [],
    }
  },
  props: ['title', 'isMultipleSelect', 'lists', 'popupVisible', 'initValue'],
  mounted() {
    var that = this
    this.value = this.initValue
    // 初始化iscroll
    this.myScroll = new IScroll('.scoll-wrapper', {
      scrollY: true
    })
    // 解决fastclick带来的ios下的点击失效问题
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // console.log(isAndroid, isiOS);
    if (isAndroid) {
      console.log('isAndroid', isAndroid);
      $('.mint-checkbox-core').on('click', that.changeStatus)
      $('.mint-checklist-label').on('click', that.changeStatus)
    } else {
      $('.mint-checkbox-core').on('click', that.changeStatus)
      $('.mint-checklist-label').on('click', that.changeStatus)
      $('.mint-checkbox-core').on('click', function () {
        $(this).parent().parent('.mint-checklist-label').click()
      })
    }
  },
  updated() {
    this.myScroll.refresh()
  },
  computed: {
    // maxLength() {
    //   var flag = false
    //   var num = 1
    //   flag = this.value.some(v => v.value === '')
    //   if (flag) {
    //     this.value = this.value.filter(v => v.value === '')
    //     return 1
    //   } else {
    //     return this.lists.length
    //   }
    // }
  },
  methods: {
    // 阻止掉除select、option、input、textarea外的默认事件
    abb(e) {
      var nodeType = e.explicitOriginalTarget ? e.explicitOriginalTarget.nodeName.toLowerCase() : (e.target ? e.target.nodeName.toLowerCase() : '');
      if (nodeType != 'select' && nodeType != 'option' && nodeType != 'input' && nodeType != 'textarea') {
        e.preventDefault();
      }
    },
    changeStatus() {
      var that = this
      var flag = false
      setTimeout(() => {
        // console.log(typeof that.value[that.value.length - 1]);
        if (typeof that.value[that.value.length - 1] === 'object') {
          flag = true
        } else if (typeof that.value[that.value.length - 1] === 'string') {
          flag = false
        }
        if (flag) {
          that.value = that.lists.filter(v => v.value === '')
        } else {
          that.value = that.value.filter(v => v.value !== '')
        }
      }, 50);
    },
    cancelChoose() {
      this.$emit('cancelChoose')
    },
    confirmChoose() {
      const value = this.value || []
      this.$emit('sendValue', value)
      this.$emit('cancelChoose')
    }
  }
}
</script>

<style lang="scss">
.mint-popup-bottom {
  width: 100%;
  background-color: #fff;
  font-family: "Microsoft YaHei";
}
.pop-header {
  height: 50px;
  width: 100%;
  display: flex;
  font-size: 16px;
  color: #333333;
  line-height: 50px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  span {
    font-size: 16px;
  }
  .cancel {
    padding: 0 15px;
    color: #999;
  }
  .title {
    flex: 1;
    text-align: center;
    .isMultipleSelect {
      color: #999;
    }
  }
  .confirm {
    padding: 0 15px;
    color: #f03b3b;
  }
}
.scoll-wrapper {
  height: 260px;
  overflow: hidden;
}
.pop-content {
  // 覆盖mint-ui的样式
  .mint-checklist-title {
    display: none;
  }
  .mint-checklist-label {
    padding: 10px 20px 10px 0;
    // line-height: 48px;
    // margin-right: 15px;
  }
  .mint-cell-wrapper {
    width: auto;
    background-size: 0 0;
    padding: 0;
    margin-left: 15px;
    // min-height: 45px;
    // height: 45px;
  }
  .mint-cell {
    &:last-child {
      background-size: 0 0;
    }
    &:not(:last-child) {
      .mint-cell-wrapper {
        border-bottom: 1px solid rgba(238, 238, 238, 1);
      }
    }
    // height: 45px;
    // min-height: 45px;
  }
  .mint-checkbox-label {
    margin: 0;
    font-size: 16px;
    color: #666;
  }
  .mint-checkbox.is-right {
    margin: 0;
  }
  .mint-checkbox-core {
    border-radius: 4px;
  }
  .mint-checkbox-core::after {
    width: 5px;
    height: 10px;
  }
  .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #f03b3b;
    border-color: #f03b3b;
  }
}
@media screen and (device-width: 375px) and (device-height: 812px) {
  div.seize {
    width: 100%;
    height: 34px;
  }
}
</style>
