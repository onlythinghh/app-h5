<template>
  <div class="runtype">
    <Header :title="title" :isBack="true" :banFixed="true"></Header>
    <div class="run-content">
      <div v-for="list in professionInfo" v-bind:key="list.id">
        <h3>{{list.name}}</h3>
        <div class="type">
          <div
            class="type-item"
            v-for="sp in list.subProfessions"
            v-bind:key="sp.id"
            :data-key="sp.id"
            @click="onSelected(sp)"
          >
            <span :class="{'focus':selected.id==sp.id}">{{sp.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="button" :class="{'disable':!selected.id}" @click="submit">确认</div>

    <!-- 兼容iPhone X -->
    <div class="seize"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "../../components/header/header.vue";
import { getListProfessionInfo } from "../../service";
import config from "../../config";
import store from "../../store";
export default {
  name: "runtype",
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      title: "主营行业",
      selected: {}
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters(["professionInfo", "mainBusiness"])
  },
  methods: {
    onSelected(item) {
      this.selected = item;
    },
    submit() {
      const { id, name, type } = this.selected;
      if (id || name) {
        this.$store.dispatch("updateMainBusiness", {
          value: id,
          label: name,
          type
        });
      }

      this.$router.back(-1);
    },

    // 设置主营行业集合
    setProfessionInfo() {
      getListProfessionInfo()
        .then(result => {
          const { returnCode, returnMessage } = result;
          if (returnCode == "0000") {
            this.$store.dispatch("setProfessionInfo", returnMessage);
          } else {
            this.$toast(config.error);
          }
        })
        .catch(ex => {
          this.$toast(config.error);
        });
    },
    init() {
      if (!this.professionInfo.length) {
        this.setProfessionInfo();
      }
      const { value, label, mainBusiType } = this.mainBusiness.value[0] || {};
      if (value) {
        this.selected = { id: value, name: label, type: mainBusiType };
      }
    }
  },
  beforeCreate() {
    // console.log("beforeCreate");
  },
  created() {
    // console.log("created");
  },
  beforeMount() {
    // console.log("beforeMount");
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    // console.log("beforeUpdate", this.$data.title);
  },
  updated() {
    // console.log("updated", this.$data.title);
  },
  beforeDestroy() {
    // console.log("beforeDestroy");
  },
  destroyed() {
    // console.log("destroyed");
  }
};
</script>

<style lang="scss">
.runtype {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #f2f2f2;
  z-index: 9999;
  overflow: hidden;
  .load {
    padding-top: 50px;
    text-align: center;
    color: #666;
    height: 40px;
    line-height: 40px;
  }
  .run-content {
    padding-top: 50px;
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    height: 100%;
    padding-bottom: 44px;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: auto;
    h3 {
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      color: #a6a6a6;
      font-size: 16px;
      font-weight: 100;
    }

    div.type {
      padding-right: 5px;
      padding-bottom: 10px;
    }
    div.type:after {
      content: ".";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    div.type-item {
      width: 25%;
      height: 46px;
      text-align: center;
      float: left;
      padding-left: 5px;
      padding-top: 10px;
      box-sizing: border-box;
      span {
        display: block;
        width: 100%;
        height: 100%;
        line-height: 36px;
        font-size: 14px;
        background-color: #fff;
        border: 1px solid #fff;
        color: #666;
        border-radius: 5px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      span.focus {
        color: #e31b30;
        border: 1px solid #e31b30;
      }
    }
  }
  .button {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    font-size: 16px;
    border-radius: 0;
    box-shadow: 0px 0px 0px #fff;
    background: #e31b30;
  }
  .disable {
    background-color: #d2d2d2;
  }

  .disable img {
    display: none;
  }
}

@media screen and (device-width: 375px) and (device-height: 812px) {
  div.store div.seize {
    // position: fixed;
    width: 100%;
    height: 34px;
    background-color: #fff;
  }
}
</style>