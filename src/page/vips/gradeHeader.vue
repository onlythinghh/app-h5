<template>
  <header>
    <div class="back" @click="onBack" title="返回"></div>
    <div class="title" :style="titleStyle">{{title}}</div>
  </header>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      titleStyle: {
        opacity: 0
      }
    };
  },
  methods: {
    onBack() {
      this.$router.back();
    },

    timer() {
      var self = this;
      window.yzg._interval = window.setInterval(function() {
        var top = document.getElementById("gradeMain").scrollTop;
        var ratio = (1 * top) / 100;
        self.titleStyle = { opacity: ratio };
      }, 200);
    }
  },
  mounted() {
    this.timer();
  },
  beforeDestroy() {
    window.clearInterval(window.yzg._interval);
  }
};
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  z-index: 9999;
  div.back {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0px;
    left: 0px;
    cursor: pointer;
    background: url("../../images/back.png") center no-repeat;
    background-size: 11px 19px;
    z-index: 999;
  }
  div.title {
    font-size: 16px;
    padding: 0 50px;
    text-align: center;
    color: #fff;
    background-color: rgb(37, 35, 29);
    transition: all 0.3s;
  }
}
</style>
