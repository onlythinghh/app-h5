<template>
  <div class="home">
    <Header :title="title" :isBack="true" :isBanBack="true" :isWhite="true" @onBack="onBack"></Header>
    <!-- <p>{{ reversedMessage }}</p> -->
    <!-- <p>{{ title1 }}</p> -->
    <div class="button" @click="onEvent" :id="id">按钮</div>
    <Dialog/>
  </div>
</template>

<script>
import Header from "../../components/header/header.vue";

export default {
  name: "home",
  data() {
    return {
      title: "组件",
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
      // this.$router.push({
      //   path: "/store"
      // });

      //   this.$dialog.toast('提示内容');
      this.$dialog.alert({
        text:
          "这是内容1这是内容1",
        // cancelCallback: () => alert(2)
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

<style scoped lang="scss">
.home {
  position: relative;
  height: 100%;
  background-color: rgba($color: #ec6a00, $alpha: 1);
  overflow: hidden;

  .title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    background-color: #3190e8;
  }
  .button {
    margin: 70px 10px 10px 10px;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
    text-align: center;
    background-color: #ddd;
  }
}
</style>