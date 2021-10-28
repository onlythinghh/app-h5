<template>
  <div class="revoke-logout">
    <section class="content" :class="client">
      <div class="protocol">
        <p class="tip">在您撤销注销申请之前，请先确认以下信息：</p>
        <p>1、在您申请注销邮掌柜帐号后，有30天公示期用于向您的顾客公示您的注销情况，在此期间，您可以随时撤销注销申请，撤销注销后，系统将恢复您已经具备的所有相关权益并解除相关服务限制。</p>
        <p>2、若您撤销注销申请，30天保留期将不再保留，当您再重新提交注销申请时，30天保留期将根据您重新提交注销申请之日开始重新计算。</p>
        <p>点击下方“撤销注销申请”按钮，即表示您已阅读并了解此情况</p>
      </div>
      <div class="button" @click="onRevoke" v-if="!isHideButton">
        <span>撤销注销申请</span>
      </div>
    </section>
  </div>
</template>

<script>
import {
  domain,
  getSearchString,
  getJSON,
  isAndroid,
  closeYZG
} from "../../tools";
import {
  getUsrOnlyId,
  checkAutoRegisterVpsbackout
} from "../../service/api.js";

export default {
  name: "revokelogout",
  data() {
    return {
      title: "撤销注销申请",
      client: getSearchString("platform") || "",
      isHideButton: false,
      usrOnlyId: ""
    };
  },
  components: {},
  computed: {},
  methods: {
    // 获取掌柜信息
    getUsrInfo() {
      return new Promise((resolve, reject) => {
        getJSON(getUsrOnlyId, {
          success: result => {
            const { returnCode, data } = result;
            if (returnCode == "0000") {
              resolve(data);
            } else {
              reject(result);
            }
          },
          error: result => {
            reject(result);
          }
        });
      });
    },

    // 发送事件到各个终端(更新界面)
    sendMessage() {
      switch (this.client) {
        case "app":
          const content = '{"key":"logoutChange"}';
          if (isAndroid) {
            // 安卓
            group && group.callBackRn(content);
          } else {
            window.webkit.messageHandlers.callBackRn.postMessage(content);
          }
          // closeYZG();
          break;
        case "pad":
          Yzg.exec("logoutChange");
          // Yzg.exec("closeWebView");
          break;
        default:
          break;
      }
      this.isHideButton = true;
    },

    conductRevoke() {
      getJSON(
        checkAutoRegisterVpsbackout,
        { usrOnlyId: this.usrOnlyId, jsonp: "jsonpCallback" },
        {
          success: result => {
            const { returnCode, returnMessage } = result;
            this.$dialog.hideLoading();
            switch (returnCode) {
              case "0000":
                this.$dialog.alert({
                  title: "您已成功撤销注销申请，系统即将恢复您的相关权益！",
                  cancel: "我知道了"
                });
                this.sendMessage();
                break;
              default:
                this.$dialog.alert({ title: returnMessage, cancel: "确认" });
                break;
            }
          },
          error: result => {
            const { returnMessage } = result;
            this.$dialog.hideLoading();
            this.$dialog.alert({ title: returnMessage, cancel: "确认" });
          }
        }
      );
    },

    onTransfer() {
      this.$dialog.loading();
      if (this.usrOnlyId) {
        this.conductRevoke();
        return false;
      }
      this.getUsrInfo()
        .then(result => {
          const { usrOnlyId, usrName } = result || {};
          this.usrOnlyId = encodeURIComponent(usrOnlyId);
          this.conductRevoke();
        })
        .catch(result => {
          const { returnMessage } = result;
          this.$dialog.hideLoading();
          this.$dialog.alert({ title: returnMessage, cancel: "确定" });
        });
    },

    onRevoke() {
      this.$dialog.alert({
        title: "请您再次确认，撤销注销申请后，若要注销账号需要重新发起申请！",
        isConfirm: true,
        confirm: "取消",
        cancel: "下一步",
        cancelCallback: this.onTransfer
      });
    },
    init() {
      document.title = "重要提醒";
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.init();
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {}
};
</script>

<style lang="scss">
.revoke-logout {
  position: relative;
  height: 100%;
  background-color: #f5f5f5;

  section.content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    div.protocol {
      padding: 16px;
      color: #333;
      line-height: 26px;
      font-size: 14px;
      p.tip {
        color: #999;
      }
      padding-bottom: 51px;
    }
    div.button {
      position: fixed;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      bottom: 0;
      cursor: pointer;
      background-color: #fff;
      border-top: 1px solid #f9f9f9;
      span {
        font-size: 16px;
        font-weight: bold;
        color: #ff192e;
      }
    }
    div.disable {
      background-color: #fff;
      span {
        color: #999;
      }
    }
  }

  section.pad {
    div.protocol {
      font-size: 16px;
    }
  }
}
</style>

