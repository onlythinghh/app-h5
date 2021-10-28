<template>
  <header class="header" :class="[{'white' : isWhite},{'abs' : banFixed}]">
    <div class="left">
      <i
        class="back"
        :class="[isWhite ? 'black' : 'default']"
        @click="onBack"
        v-if="isBack"
        title="返回"
      ></i>
    </div>
    <div class="content" :class="{'content_black' : isWhite}">{{ title }}</div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
import { isYZG } from "../../tools";
import ZGRoute from "../../router/watch";
export default {
  name: "Header",
  props: {
    title: String,
    isWhite: Boolean,
    isBack: Boolean,
    isBanBack: Boolean,
    banFixed: Boolean
  },
  methods: {
    onBack() {
      if (!this.isBanBack) {
        const router = ["store"];
        const { current } = this.$router.history;
        const { path } = current;
        const [first, two] = path.split("/");
        if (router.indexOf(two) < 0) {
          this.$router.back(-1);
        } else {
          if (isYZG) {
            window.location.href = "ulemobile://ulePopView";
          } else {
            window.history.go(-1);
          }
        }
      }
      this.$emit("onBack");
    }
  }
};
</script>

<style lang="scss">
@import "../../style/mixin";

header.header {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 50px;
  background: $red;
  text-align: center;
  overflow: hidden;
  z-index: 9999;

  div.left {
    position: absolute;
    height: 100%;
    top: 0px;
    left: 0px;

    i.back {
      display: block;
      width: 34px;
      height: 100%;
      top: 0px;
      left: 0px;
      cursor: pointer;
    }

    i.default {
      background: url("../../images/back.png") center no-repeat;
      background-size: 11px 19px;
    }

    i.black {
      background: url("../../images/black_back.png") center no-repeat;
      background-size: 11px 19px;
    }
  }

  div.content {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    line-height: 50px;
    color: #fff;
    font-size: 18px;
    padding: 0 50px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  div.content_black {
    color: #333;
  }

  div.right {
    position: absolute;
    height: 100%;
    top: 0px;
    right: 0px;
  }
}

header.white {
  background-color: $white;
}

header.abs {
  position: absolute;
}
</style>

