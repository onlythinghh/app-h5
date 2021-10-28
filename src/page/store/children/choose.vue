<template>
  <div class="choose-box">
    <ul class="tabs" v-if="!checkStatus">
      <li
        v-if="!(cashWithdrawalTarget==2 && auditStatus=='2')"
        class="tab wallet"
        :class="{'tab-on': tabKey == 'wallet'}"
        @click="onSwitchTab('wallet')"
      >
        <i class="icon"></i>
        提现到钱包
      </li>
      <li
        v-if="tagRadio=='1'"
        class="tab bank-card"
        :class="{'tab-on': tabKey == 'bankcard'}"
        @click="onSwitchTab('bankcard')"
      >
        <i class="icon"></i>
        提现到银行卡
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "choose",
  data() {
    return {
      tabKey: "wallet"
    };
  },
  computed: {
    ...mapGetters([
      "pageloca",
      "speedloca",
      "checkStatus",
      "cashWithdrawalTarget",
      "tagRadio",
      "auditStatus",
    ])
  },
  methods: {
    onSwitchTab(key) {
      this.tabKey = key;
      let page =
        (key == "bankcard" && this.speedloca) || "/store/choose/" + key;
      this.$router.replace(page);
    },
    setDefaultTab() {
      const { current } = this.$router.history;
      const { path } = current;
      const defaultTab = path.split("/")[3];
      if (defaultTab) {
        this.tabKey = defaultTab;
      }
    },
    init() {
      this.setDefaultTab();
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    cashWithdrawalTarget() {
      if (this.cashWithdrawalTarget == "2") {
        this.onSwitchTab("bankcard");
      } else {
        this.onSwitchTab("wallet");
      }
    }
  }
};
</script>

<style lang="scss">
.choose-box {
  background-color: #fff;
  ul.tabs {
    display: flex;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;

    li.tab {
      flex: 1;
      font-size: 14px;
      padding: 0 20px 0 40px;
      list-style: none;
      position: relative;
    }

    li.tab .icon {
      position: absolute;
      width: 20px;
      height: 20px;
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
      width: 4px;
      height: 8px;
      top: 3px;
      left: 7px;
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