<template>
  <div class="home">
    <Header :title="title" :isBack="true" :isWhite="true" @onBack="onBack"></Header>
    <!-- <p>{{ reversedMessage }}</p> -->
    <!-- <p>{{ title1 }}</p> -->
    <!-- <div class="button" @click="onEvent" :id="id">跳转店铺页</div> -->
  </div>
</template>

<script>
import Header from "../../components/header/header.vue";
export default {
  name: "home",
  data() {
    return {
      title: "首页",
      id: 123
    };
  },
  components: {
    Header
  },
  watch: {
    title: function() {
      console.log(this.title, "watch-title");
    }
  },
  computed: {
    reversedMessage: function() {
      return "这是内容";
    },
    title1: function() {
      console.log(this.title, "computed-title");
      return this.title + "computed";
    }
  },
  methods: {
    async initData() {
      console.log(this.$route.query.name);
    },
    onEvent() {
      // this.title = "456";
      // return false;
      this.$router.push({
        path: "/store"
      });
    },
    onBack() {
      console.log("这是返回");
    }
  },
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
    this.initData();
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdate", this.$data.title);
  },
  updated() {
    console.log("updated", this.$data.title);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>

<style lang="scss">
.home {
  position: relative;
  height: 100%;
  background-color: rgba($color: #ec6a00, $alpha: 1.0);

  .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    background-color: #3190e8;
  }
  .button {
    margin: 10px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    text-align: center;
    background-color: #ddd;
  }
}
</style>