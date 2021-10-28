<template>
  <div class="logout">
    <section class="content" :class="client">
      <div class="protocol">
        <p class="tip">在您提交注销申请之前，请先确认以下信息，以保证您的帐号、财产安全：</p>
        <p>1、注销邮掌柜帐号后，您将无法再使用本帐号或通过该账号找回您添加、绑定的任何内容或信息（即使您使用相同的手机号码/邮箱再次注册并使用邮掌柜），包括但不限于：用户信息、店铺数据、会员信息、资产信息、代购服务、批销进货等数据或服务。</p>
        <p>2、从您提交注销申请之日开始计算，有30天公示期用于向您的顾客公示您的注销情况，在此期间，您可以继续登录邮掌柜，但您根据对应资质开通的增值服务及其他增加资产的功能将无法使用。但若您撤销注销申请，您的相关权益将会全部恢复。</p>
        <p>3、注销邮掌柜帐号前，请先确认您用邮掌柜身份没有对外产生任何欠款（包括掌柜贷欠款、货到付款等订单欠款），若有欠款，您需还清欠款才可注销您的邮掌柜帐号。</p>
        <p>4、注销邮掌柜帐号前，您需要妥善处理邮掌柜钱包里所有资金问题。若相关资产未消费完毕，您将无法注销邮掌柜帐号。</p>
        <p>5、账号注销成功后，您通过邮掌柜帐号使用的所有记录将无法找回。您获得的相关资质、增值服务、优惠券等福利视为您自行放弃，将无法继续使用。您理解并同意，邮掌柜无法协助您重新恢复前述服务。</p>
        <p>6、在邮掌柜帐号注销期间，如果您的邮掌柜帐号被他人投诉、被国家机关调查或者正处于诉讼、仲裁程序中，邮掌柜有权自行终止您邮掌柜帐号的注销而无需另行得到您的同意。请注意，注销您的邮掌柜帐号并不代表本邮掌柜帐号注销前的所有帐号行为和相关责任得到豁免或减轻。</p>
        <p>当下方“注销账户”按钮亮起时，点击并进行后续操作，即表示您已阅读并了解此情况</p>
      </div>
      <div class="button" :class="{disable: downTime}" @click="onCheck" v-if="!isHideButton">
        <span v-if="downTime">注销账户({{downTime}}s)</span>
        <span v-else>注销账户</span>
      </div>
    </section>

    <div class="wrap" v-if="show">
      <div class="bg" @touchmove="preventDefault"></div>
      <div class="win">
        <div class="content">
          <span>
            请补全您的姓名(
            <span>{{nameV1[0]||""}}</span>**)验证，进行下一步操作
          </span>
          <div class="input-box">
            <input type="text" placeholder="请输入您的全名" @blur="onBlur" v-model="name">
          </div>
          <span class="error" v-if="error">{{error}}</span>
        </div>
        <div class="button">
          <span class="confirm" @click="confirmCallback">取消</span>
          <span class="cancel" @click="cancelCallback">验证</span>
        </div>
      </div>
    </div>
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
  checkAutoRegisterVpsLogout,
  vpsLogout
} from "../../service/api.js";

export default {
  name: "logout",
  data() {
    return {
      title: "注销",
      client: getSearchString("platform") || "",
      show: false,
      error: "",
      name: "",
      nameV1: "",
      usrOnlyId: "",
      isHideButton: false,
      downTime: 11
    };
  },
  components: {},
  computed: {},
  methods: {
    preventDefault(e) {
      e.preventDefault();
    },

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

    onBlur() {
      window.scrollTo(0, this.nowScrollTop || 0);
    },

    onCheck() {
      if (!this.downTime) {
        this.show = true;
      }
    },
    confirmCallback() {
      this.show = false;
      this.name = "";
      this.error = "";
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
            // const webkit = window.webkit || {};
            // const messageHandlers = webkit.messageHandlers || {};
            // const callbackRN =
            //   (messageHandlers.callBackRn || {}).postMessage || callBackRn;
            // callbackRN && callbackRN(content);

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

    conductLogout() {
      this.$dialog.loading();
      getJSON(
        vpsLogout,
        { usrOnlyId: this.usrOnlyId, jsonp: "jsonpCallback" },
        {
          success: result => {
            const { returnCode, returnMessage } = result;
            this.$dialog.hideLoading();
            switch (returnCode) {
              case "0000":
                this.$dialog.alert({
                  title:
                    "您已成功进入注销流程，30天后，系统将清除您的全部数据!",
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

    checkLogout() {
      if (!this.name) {
        this.$dialog.hideLoading();
        this.error = "姓名不能为空";
        return false;
      }
      getJSON(
        checkAutoRegisterVpsLogout,
        {
          usrOnlyId: this.usrOnlyId,
          userName: this.name,
          jsonp: "jsonpCallback"
        },
        {
          success: result => {
            const {
              returnCode,
              zgdIsAllowLogout, // 掌柜贷是否允许注销：true：可以注销； false：不允许注销
              pxIsAllowLogout, // 批销是否允许注销： true：可以注销； false：不允许注销
              accountBalanceValue, // 账户余额：有余额则显示对应的金额，没有显示“0.00”
              postGoldCoinValue, // 邮金币数量：有则显示对应的金额，没有显示“0”
              useablePointValue, // 邮乐积分：有则显示对应的积分，没有显示“0”
              ulecardBalanceValue, // 邮乐卡余额：有则显示对应的金额，没有显示“0.00”
              orderUnFinishTotalVal, // 未完成的代购订单（零售订单）数量
              wdCountVal, // 未完成掌柜网店订单数：
              allUserAllowLogout, // 是否通过所有验证：是：“true” 否：“false”
              returnMessage
            } = result;
            this.$dialog.hideLoading();
            switch (returnCode) {
              case "0000":
                this.confirmCallback();
                const abValue = parseFloat(accountBalanceValue);
                const pgcValue = parseFloat(postGoldCoinValue);
                // const upValue = parseFloat(useablePointValue);
                const ubValue = parseFloat(ulecardBalanceValue);

                const ouftValue = parseFloat(orderUnFinishTotalVal);
                const wdcValue = parseFloat(wdCountVal);
                if (!zgdIsAllowLogout) {
                  this.$dialog.alert({
                    title:
                      "您有掌柜贷贷款未结清<br />需还清贷款才可注销账户哦!",
                    cancel: "我知道了"
                  });
                  return false;
                } else if (!pxIsAllowLogout) {
                  this.$dialog.alert({
                    title:
                      "您还有批销订单未完成，<br />需要全部签收才可注销账号哦！",
                    cancel: "我知道了"
                  });
                  return false;
                } else if (abValue || pgcValue || ubValue) {
                  this.$dialog.alert({
                    title: "",
                    custom: "logoutValueInfo",
                    customData: { abValue, pgcValue, ubValue },
                    cancel: "知道了"
                  });
                } else if (ouftValue || wdcValue) {
                  this.$dialog.alert({
                    title:
                      "您有未完成的订单，注销账户后可能会影响您的财产及其他权益，请再次确认",
                    isConfirm: true,
                    confirm: "取消",
                    cancel: "下一步",
                    cancelCallback: this.conductLogout
                  });
                } else if (allUserAllowLogout) {
                  this.$dialog.alert({
                    title: "请您再次确认，注销账户后将清除您的全部数据！",
                    isConfirm: true,
                    confirm: "取消",
                    cancel: "下一步",
                    cancelCallback: this.conductLogout
                  });
                } else {
                  this.$dialog.alert({
                    title: returnMessage,
                    cancel: "确定"
                  });
                }
                break;
              default:
                this.error = returnMessage;
                break;
            }
          },
          error: result => {
            const { returnMessage } = result;
            this.$dialog.hideLoading();
            this.error = returnMessage;
          }
        }
      );
    },

    updateGender(result) {
      const { usrOnlyId, usrName } = result || {};
      this.usrOnlyId = encodeURIComponent(usrOnlyId);
      this.nameV1 = usrName;
    },

    cancelCallback() {
      this.$dialog.loading();
      if (this.usrOnlyId) {
        this.checkLogout();
        return false;
      }
      this.getUsrInfo()
        .then(result => {
          this.updateGender(result);
          this.checkLogout();
        })
        .catch(result => {
          const { returnMessage } = result;
          this.$dialog.hideLoading();
          this.$dialog.alert({ title: returnMessage, cancel: "确定" });
        });
    },

    countDown() {
      var self = this;
      var _timeout;
      var _run = () => {
        self.downTime -= 1;
        _timeout = setTimeout(() => {
          if (self.downTime <= 0) {
            clearTimeout(_timeout);
          } else {
            _run();
          }
        }, 1000);
      };
      _run();
    },

    init() {
      this.countDown();
      document.title = "重要提醒";

      this.getUsrInfo()
        .then(result => {
          this.updateGender(result);
        })
        .catch(result => {
          const { returnMessage } = result;
          this.$dialog.alert({ title: returnMessage, cancel: "确定" });
        });
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
.logout {
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

.wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 10000;
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .win {
    position: absolute;
    width: 300px;
    left: 50%;
    top: 50%;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 0 0;
    border-radius: 16px;
    transform: translate(-50%, -50%);
    color: #fff;
    background: #fff;
    overflow: hidden;

    .close {
      position: absolute;
      font-size: 18px;
      right: 0;
      top: 0;
      padding: 2px 10px 10px 10px;
      height: 20px;
      line-height: 20px;
      color: #333;
      cursor: pointer;
      z-index: 9999;
    }
    h3 {
      font-size: 16px;
      color: #333;
      padding: 4px 10px;
    }

    div.content {
      color: #666;
      padding: 10px 10px 20px 10px;

      .input-box {
        padding: 0 10px;
        border: 1px solid #ddd;
        margin-top: 20px;
        input {
          width: 100%;
          height: 36px;
        }
      }
      span.error {
        display: inline-block;
        margin-top: 10px;
        color: red;
        text-align: left;
        font-size: 14px;
      }
    }

    div.button {
      height: 44px;
      line-height: 44px;
      font-size: 16px;
      display: flex;
      flex-direction: row;
      border-top: 1px solid #ddd;

      span {
        position: relative;
        flex: 1;
        color: #999;
        font-size: 16px;
        cursor: pointer;
      }

      span.cancel::before {
        position: absolute;
        left: 0;
        height: 100%;
        content: "";
        border-right: 1px solid #ddd;
      }
    }
  }
}
</style>
