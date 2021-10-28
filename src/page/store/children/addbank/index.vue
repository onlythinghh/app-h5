<template>
  <div class="add-bank-box">
    <!-- Header -->
    <yzg-header :title="'添加银行卡'" :isBack="true"/>

    <div class="add-bank-content">
      <div class="Radio-box">
        <ul class="tabs">
          <li class="title">银行账户性质</li>
          <li class="tab wallet" :class="{'tab-on': settleAccountType == '2'}" @click="onRadioTab('2')">
            <i class="icon"></i>个人银行卡
          </li>
          <li class="tab bank-card" :class="{'tab-on': settleAccountType == '1'}" @click="onRadioTab('1')">
            <i class="icon"></i>公司对公账户
          </li>
        </ul>
      </div>

      <!-- 开卡银行 -->
      <open-bank :labelWidth="labelWidth" :hidden="false"/>

      <div class="settleAccount" v-show="settleAccountType == '1'">
        <yzg-input
          :labelWidth="labelWidth"
          :label="'结算户号'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入结算户号'"
          v-model="settleAccountNo"
        />

        <yzg-input
          :labelWidth="labelWidth"
          :label="'结算户名'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入结算户名'"
          v-model="settleAccount"
        />
      </div>
      <div class="userBankBox" v-show="settleAccountType == '2'">
        <yzg-input
          :labelWidth="labelWidth"
          :label="'卡类型'"
          :hidden="false"
          :disabled="true"
          :value="'储蓄卡'"
        />

        <yzg-input
          :labelWidth="labelWidth"
          :label="'开卡人姓名'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入开卡人姓名'"
          v-model="usrName"
        />

        <yzg-input
          :labelWidth="labelWidth"
          :label="'银行卡号'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入银行卡号'"
          v-model="cardNo"
        />

        <yzg-input
          :labelWidth="labelWidth"
          :label="'身份证号码'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入身份证号码'"
          v-model="certNo"
        />

        <yzg-input
          :labelWidth="labelWidth"
          :label="'手机号码'"
          :hidden="false"
          :disabled="false"
          :placeholder="'请输入手机号码'"
          v-model="mobileNumber"
        />

        <div class="msg-code">
          <input type="text" placeholder="请输入短信验证码" v-model="smsVerifyCode">
          <div
            class="get-code"
            :class="{'get-code-disabled': countDown > 0}"
            @click="onSend"
          >{{countDown > 0 ? `重新发送(${countDown}S)` : deft}}</div>
        </div>

        <div class="treaty-box">
          <div class="checkbox" :class="{on : treaty}" @click="treaty=!treaty">
            <i class="icon"></i>
          </div>
          <div class="treaty-content">
            我接受
            <span class="treaty" @click="onUlePayTreaty">《邮乐快捷支付服务相关协议》</span>和
            <br>
            <span class="treaty" @click="onQuickTreaty">《中国邮政储蓄银行借记卡快捷支付业务线上服务协议》</span>
            <br>并开通快捷支付
          </div>
        </div>
      </div>  
      <div class="add-bank-button">
        <Button :onEvent="onAddBank"/>
      </div>
    </div>

    <!-- 兼容iPhone X -->
    <div class="seize"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import YzgHeader from "../../../../components/header/header.vue";
import OpenBank from "../../bankinfo/openbank";
import Button from "../../button";
import { sendBindBankMessage, addBank, addPubilcBank } from "../../../../service";

export default {
  name: "addBank",
  components: {
    YzgHeader,
    OpenBank,
    Button
  },
  data() {
    return {
      labelWidth: 80,
      countDown: 0,
      deft: "获取验证码",
      times: 30,
      treaty: false,

      settleAccountType: "2", // 银行账户性质  1: 对公账户 2: 个人账户
      usrName: "",
      cardNo: "",
      certType: "1", // 身份证类型
      certNo: "",
      mobileNumber: "",
      cardType: "D",  // 银行卡类型 D:储蓄卡 C:信用卡。目前只支持储蓄卡
      smsVerifyCode: "",
      settleAccountNo: "", // 结算户号
      settleAccount: "", // 结算户名
    };
  },
  computed: {
    ...mapGetters(["bankInfo"])
  },
  methods: {
    ...mapActions(["updates", "updateBankAccountType"]),

    execSend() {
      const params = {
        usrName: this.usrName,
        cardNo: this.cardNo,
        certType: this.certType,
        certNo: this.certNo,
        mobileNumber: this.mobileNumber,
        cardType: this.cardType
      };
      sendBindBankMessage(params).then(result => {});
    },
    onSend() {
      if (this.countDown > 0) return;
      this.deft = "重新获取";
      this.execSend();
      const _run = nv => {
        this.countDown = nv;
        this._timeout = setTimeout(() => {
          if (nv > 0) {
            _run(nv - 1);
          } else {
            clearTimeout(this._timeout);
          }
        }, 1000);
      };
      if (this.countDown <= 0) _run(this.times);
    },

    onUlePayTreaty() {
      this.$router.push("ulepaytreaty");
    },

    onQuickTreaty() {
      this.$router.push("quicktreaty");
    },

    onRadioTab(val) {
      this.settleAccountType = val;
      // this.updateBankAccountType(val);   
    },

    onSelectBank(bank) {
      const {
        settleAccountType,
        cardNoCipher,
        usrName,
        cardNo,
        mobileNumber,
        usrNameCipher,
        mobileNumberCipher,
        settleNo,
        settleNoCipher,
        settleName,
        settleNameCipher
      } = bank;
      const settleTypeStatus = settleAccountType == '1' ? true : false;
      const { lists } = this.bankInfo;
      let params = {
        lists: lists.concat(bank),
        currentBank: bank
      };
      this.updates({
        key: "bankInfo",
        infos: params
      });

      this.updates({
        key: "cardNumber",
        infos: { value: cardNo, cipher: cardNoCipher, hidden: settleTypeStatus }
      });

      this.updates({
        key: "cardOwnerName",
        infos: { value: usrName, cipher: usrNameCipher, hidden: settleTypeStatus }
      });

      this.updates({
        key: "reservePhone",
        infos: {
          value: mobileNumber,
          cipher: mobileNumberCipher,
          hidden: false,
          disabled: !settleTypeStatus
        }
      });

      this.updates({
        key: "frontBank",
        infos: { hidden: settleTypeStatus }
      });

      this.updates({
        key: "settleAccountNo",
        infos: { value: settleNo, cipher: settleNoCipher, hidden: !settleTypeStatus }
      });

      this.updates({
        key: "settleAccount",
        infos: { value: settleName, cipher: settleNameCipher, hidden: !settleTypeStatus }
      });

      this.updates({
        key: "openingLicenseAccountPhoto",
        infos: { hidden: !settleTypeStatus }
      });

      this.updates({
        key: "cardOwner",
        infos: {
          value: [],
          gather: [
              { value: 1, label: "公司结算账户", disabled: !settleTypeStatus, resetStatus: false },
              { value: 2, label: "营业执照注册人", disabled: settleTypeStatus, resetStatus: false },
              // { value: 3, label: "其他", disabled: settleTypeStatus, resetStatus: false }
          ]
        }
      });
      
      this.$router.back(-1);
    },

    onAddBank() {
      this.$loading();
      this.settleAccountType == '2' ? this.sendAddBank() : this.sendAddPubilcBank();
    },
    sendAddBank() {
      if (!this.treaty && this.settleAccountType == '2') {
        this.$toast("请勾选相关协议");
        this.$closeLoading();
        return;
      }
      const params = { // 个人银行
        usrName: this.usrName,
        cardNo: this.cardNo,
        certType: this.certType,
        certNo: this.certNo,
        mobileNumber: this.mobileNumber,
        cardType: this.cardType,
        smsVerifyCode: this.smsVerifyCode
      }
      addBank(params).then(result => {
        const { returnCode, returnMessage, data } = result;
        this.$closeLoading();
        if (returnCode === "0000") {
          this.onSelectBank(data);
        } else {
          this.$toast(returnMessage);
        }
      });
    },
    sendAddPubilcBank() {
      const publicParams = { // 对公账户
        bankCode: 'PSBC',
        settleNo: this.settleAccountNo,
        settleName: this.settleAccount
      };
      addPubilcBank(publicParams).then(result => {
        const { returnCode, returnMessage, data } = result;
        this.$closeLoading();
        if (returnCode === "0000") {
          this.$toast(returnMessage);
          this.onSelectBank(data);
        } else {
          this.$toast(returnMessage);
        }
      });
    }
  },
  watch: {
    settleAccountType: {
      handler(newValue) {
        this.settleAccountType = newValue
      }
    }
  }
};
</script>

<style lang="scss">
.add-bank-box {
  top: 0;
  left: 0;
  min-width: 100%;
  max-width: 100%;
  padding: 50px 0 0;
  position: absolute;

  .add-bank-content {
    padding-bottom: 70px;
  }

  .msg-code {
    height: 45px;
    display: flex;
    padding: 0 10px;
    font-size: 14px;
    align-items: center;
    border-bottom: 1px solid #eee;

    input {
      flex: 1;
    }

    .get-code {
      height: 30px;
      padding: 0 10px;
      font-size: 14px;
      line-height: 30px;
      border-radius: 30px;
      color: rgba(240, 59, 59, 1);
      border: 1px solid rgba(240, 59, 59, 1);
    }

    .get-code-disabled {
      color: #aaa;
      border-color: #aaa;
    }
  }

  .treaty-box {
    display: flex;
    padding: 10px;
    font-size: 12px;
    align-items: center;
    position: relative;
    .checkbox {
      width: 22px;
      height: 22px;
      .icon {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        border: 1px solid #999;
        position: relative;
      }
      .icon::after {
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
    }

    .checkbox.on {
      .icon {
        border: 1px solid #f6001a;
        background-color: #f6001a;
      }

      .icon::after {
        transform: rotate(45deg) scale(1);
      }
    }

    .treaty-content {
      flex: 1;
      padding-left: 6px;

      .treaty {
        color: #f03b3b;
        font-size: 12px;
      }
    }

    .yzg-checkbox-box {
      width: 22px;
      height: 22px;
    }
  }

  .add-bank-button {
    bottom: 0px;
    width: 100%;
    position: fixed;
    background-color: #fff;
  }

  .Radio-box {
    background-color: #fff;
    ul.tabs {
      display: flex;
      height: 46px;
      line-height: 46px;
      padding: 0px 10px;
      border-bottom: 1px solid #eee;
      li.title {
        font-size: 14px;
        color: #333;
      }
      li.tab {
        /* flex: 1; */
        font-size: 14px;
        padding: 0 10px 0 30px;
        list-style: none;
        position: relative;
      }

      li.tab .icon {
        position: absolute;
        width: 14px;
        height: 14px;
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
        width: 3px;
        height: 6px;
        top: 2px;
        left: 5px;
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
}

@media screen and (device-width: 375px) and (device-height: 812px) {
  div.add-bank-box div.seize {
    // position: fixed;
    width: 100%;
    height: 34px;
    background-color: #fff;
  }
}
</style>