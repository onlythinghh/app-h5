<template>
  <div>
    <div @click="openTips" class="tips"><i class="icon"></i>资料填写有困难，可看这里指导教程~ ~</div>
    <Speed :speed="speed"/>
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Speed from "./speed";
export default {
  name: "bankcard",
  components: {
    Speed
  },
  data() {
    return {
      speed: 1
    };
  },
  methods: {
    ...mapActions(["updateCashWithdrawalTarget"]),

    setDefaultSpeed() {
      const { current } = this.$router.history;
      const { path } = current;
      const speedPage = path.split("/")[4];
      switch (speedPage) {
        case "speed1":
          this.speed = 1;
          break;
        case "speed2":
          this.speed = 2;
          break;
        case "speed3":
          this.speed = 3;
          break;
        default:
          this.speed = 1;
          break;
      }
    },
    init() {
      this.setDefaultSpeed();
      this.updateCashWithdrawalTarget(2);
    },
    openTips() {
      // console.log(this.$router)
      this.$router.push({path:'/opinion'})
    }
  },
  updated() {
    this.setDefaultSpeed();
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
.bank-seize {
  /* height: 10px; */
  background-color: #f5f5f5;
  font-size: 12px;
  color: red;
  padding: 5px 10px;
}
.tips{
  background: #FAFAE9;
  border-bottom: 1px solid #eee;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  color: #ff8800;
  padding: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  i.icon {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: text-bottom;
    background: url("../../../../images/store/laba.png") no-repeat;
    background-size: 100%;
  }
}
</style>