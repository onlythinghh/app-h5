<template>
  <router-view/>
  <!-- <div>
    <div style="width:100%;height:60px;background:#ccc;"></div>
    <yzg-input
      :label="'测试'"
      :hidden="false"
      :disabled="false"
      :placeholder="'请输入内容'"
      v-model="x2"
      @chanage="chanage1"
    ></yzg-input>
    <yzg-select
      v-model="x1"
      :label="'测试'"
      :gather="[
        { label: '测试1', value: 1, isBanOther: true },
        { label: '测试2', value: 2 },
        { label: '测试3', value: 3 },
        { label: '测试4', value: 4 },
        { label: '测试5', value: 5 },
        { label: '测试6', value: 6 },
        { label: '测试7', value: 7 }
      ]"
      :hidden="false"
      :disabled="false"
      @chanage="chanage"
    />

    <div>
      <yzg-checkbox :value="true">
        这是
        <span>选择</span>框
      </yzg-checkbox>
    </div>
  </div>-->
</template>

<script>
import ZGRoute from "./router/watch";
export default {
  name: "app",
  data() {
    return {
      x1: [{ label: "测试1", value: 1 }],
      x2: "值",
      x3: true
    };
  },
  watch: {
    $route(after, before) {
      const pop = ZGRoute.routes.pop() || {};
      if (pop.path !== before.path) {
        ZGRoute.routes.push(after);
      }
    }
  },
  methods: {
    chanage(val) {
      // console.log(val, "z1");
    },
    chanage1(val) {
      // console.log(val, "z2");
    }
  },
  mounted() {
    // this.$toast("张三测试数据");
    // this.$loading('正在加载');
    // setTimeout(() => {
    //   this.$closeLoading();
    // }, 3000);
  }
};
</script>

<style lang='scss'>
@import "./style/common";
</style>
