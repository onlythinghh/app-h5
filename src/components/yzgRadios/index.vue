<!--
 * @Description: 
 * @Author: hzh
 * @Date: 2021-06-22 15:08:19
 * @FilePath: \app-h5\src\components\yzgRadios\index.vue
-->
<template>
  <div class="Radio-box">
    <ul class="tabs">
      <li class="title">{{title}}</li>
      <li class="tab wallet" :class="{'tab-on': curres == i}" v-for="(item, i) in list" :key="i" @click="onRadioTab(item, i)">
        <i class="icon"></i>{{item.name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "yzg-radios",
  props:{
    title:{
      type: String,
      default: '请选择'
    },
    list: {
      type: Array,
      default: () => []
    },
    dftcur: {
      type: String|Number,
      default: '0'
    }
  },
  data() {
    return {
      curres: '0'
    }
  },
  mounted() {
    this.curres = this.dftcur
  },
  methods:{
    onRadioTab(item, i) {
      this.curres = i
      this.$emit("setRadio", item, i)
    }
  },
  watch: {
    dftcur(newval) {
      this.curres = newval
    }
  }
}
</script>
<style lang="scss" scoped>
  .Radio-box {
    background-color: #fff;
    ul.tabs {
      display: flex;
      height: 46px;
      line-height: 46px;
      padding: 0 10px;
      border-bottom: 1px solid #eee;
      li.title {
        font-size: 14px;
        color: #333;
      }
      li.tab {
        flex: 1;
        font-size: 14px;
        padding: 0 20px 0 35px;
        list-style: none;
        position: relative;
      }

      li.tab .icon {
        position: absolute;
        width: 15px;
        height: 15px;
        left: 12px;
        top: 50%;
        border-radius: 20px;
        transform: translateY(-50%);
        border: 1px solid #999;
      }
      li.tab .icon::after {
        transition: all 0.3s;
        content: " ";
        position: absolute;
        width: 3px;
        height: 6px;
        top: 2px;
        left: 5px;
        border: 2px solid #fff;
        border-left: 0px;
        border-top: 0px;
        transform: rotate(45deg) scale(0);
        transform-origin: center center;
      }

      li.tab-on .icon {
        border: 1px solid #f6001a;
        background-color: #f6001a;
      }

      li.tab-on .icon::after {
        transform: rotate(45deg) scale(1);
      }
    }
  }
</style>