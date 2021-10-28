<template>
  <div class="bankinfo-box" v-if="!checkStatus">
    <div class="add-bank" v-if="!bankInfo.lists.length" @click="onAddBank">
      <i class="icon"></i>
      <span>添加银行卡</span>
    </div>
    <div v-else class="bank-content">
      <div class="curr-bank-info">
        <i class="icon postal"></i>
        <span>中国邮政储蓄银行({{ getBankLater4Digits(bankInfo.currentBank.cardNo || bankInfo.currentBank.settleNo)}})</span>
      </div>
      <div v-if="auditStatus == 2 && bankInfo.currentBank.settleAccountType == 1"></div>
      <div v-else class="other-bank" @click="onOtherBank">其他银行卡</div>
    </div>

    <transition name="fade">
      <div class="select-bank" v-if="visible" @touchmove.prevent>
        <div class="select-bank-bg" @click="onClose"></div>
        <div class="select-bank-content">
          <div class="select-bank-header">
            <i class="close" @click="onClose">×</i>
            <span>选择银行卡</span>
          </div>
          <div class="scoll-wrapper-bank">
            <div>
              <ul>
                <li
                  class="bank-item"
                  v-for="(bank, index) in bankInfo.lists"
                  :key="index"
                  :class="{'bank-item-on': hasBankStatus(bank)}"
                  @click="onSelectBank(bank)"
                >
                  <i class="icon"></i>
                  <div class="bank-info">
                    <span class="bank-name">中国邮政储蓄银行({{ getBankLater4Digits(bank.cardNo || bank.settleNo)}})</span>
                    <span class="accountTypeName">{{ getSettleAccountTypeName(bank.settleAccountType) }}</span>
                  </div>
                  <i class="check-icon"></i>
                </li>
              </ul>
              <div class="add-bank" @click.stop="onAddBank">
                <i class="icon"></i>
                <span>添加银行卡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "bankinfo",
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(["bankInfo", "checkStatus", "cardOwner", "auditStatus"])
  },
  methods: {
    ...mapActions(["updates"]),

    onAddBank() {
      this.$router.push("/addbank");
    },
    onOtherBank() {
      this.visible = true;
    },

    onSelectBank(bank) {
      const {
        cardNoCipher,
        usrName,
        cardNo,
        mobileNumber,
        usrNameCipher,
        mobileNumberCipher,
        settleNo,
        settleName,
        settleNoCipher,
        settleNameCipher,
        settlebankPhone = '',
        settlebankPhoneCipher = '',
        settleAccountType
      } = bank;
      const settleTypeStatus = settleAccountType && settleAccountType == '1' ? true : false;

      this.updates({
        key: "bankInfo",
        infos: { currentBank: bank }
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
        infos: { value: mobileNumber || settlebankPhone, cipher: mobileNumberCipher || settlebankPhoneCipher, hidden: false, disabled: !settleTypeStatus }
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
      
      const { value = [] } = this.cardOwner;
      let cardValue = [];
      if (value && value.length > 0) {
          cardValue = value.map((item) => {
            const { value, checked } = item;
              if (((value == 2 || value == 3) && settleAccountType != 1) || (settleAccountType == value && settleAccountType == '1')) {
                return item;
              } else {
                return [];
              }
          });
      }

      this.updates({
        key: "cardOwner",
        infos: {
          value: cardValue,
          gather: [
            { value: 1, label: "公司结算账户", disabled: !settleTypeStatus, resetStatus: !settleTypeStatus },
            { value: 2, label: "营业执照注册人", disabled: settleTypeStatus, resetStatus: settleTypeStatus },
            // { value: 3, label: "其他", disabled: settleTypeStatus, resetStatus: settleTypeStatus }
          ]
        }
      });

      this.onClose();
    },

    hasBankStatus(bank) {
      return (bank.settleAccountType == '1' ? bank.settleNoCipher == this.bankInfo.currentBank.settleNoCipher :  bank.cardNoCipher == this.bankInfo.currentBank.cardNoCipher);
    },

    onClose() {
      this.visible = false;
    },

    setScroll() {
      this.myScroll = new IScroll(".scoll-wrapper-bank", { scrollY: true, preventDefault: false });
    },

    getBankLater4Digits(card = "") {
      return card.substring(card.length - 4);
    },

    getSettleAccountTypeName(settleAccountType = "") {
      return settleAccountType = settleAccountType == '1' ? '对公账户' : '个人银行';
    },

    init() {}
  },
  mounted() {
    this.init();
  },
  updated() {
    if (this.myScroll) {
      this.myScroll.refresh();
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        setTimeout(this.setScroll);
      } else {
        this.myScroll = null;
      }
    },
    bankInfo: {
      handler(newValue) {
        const { lists, currentBank } = this.bankInfo;
      },
      deep: true
    },
  }
};
</script>

<style lang="scss">
.bankinfo-box {
  .add-bank {
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0px 10px;
    border-bottom: 1px solid #eee;
    position: relative;

    i.icon {
      width: 22px;
      height: 15.1px;
      background: url("../../../assets/img/store/add_bank.png") no-repeat 0px
        center;
      background-size: 100%;
    }
    span {
      flex: 1;
      font-size: 15px;
      padding-left: 10px;
    }
  }
  .add-bank::after {
    content: " ";
    top: 50%;
    width: 8px;
    height: 8px;
    right: 12px;
    position: absolute;
    border: 2px solid #ccc;
    border-left: 0px;
    border-bottom: 0px;
    transform: translate(0, -50%) rotate(45deg);
  }

  .bank-content {
    .curr-bank-info {
      height: 50px;
      color: #333;
      display: flex;
      padding: 0 10px;
      align-items: center;
      border-bottom: 1px solid #eee;

      i.icon {
        width: 22px;
        height: 20px;
        background: url("../../../assets/img/store/postal.png") no-repeat;
        background-size: 100%;
      }

      span {
        flex: 1;
        padding-left: 10px;
      }
    }

    .other-bank {
      display: flex;
      height: 50px;
      padding: 0 10px;
      align-items: center;
      font-size: 14px;
      position: relative;
      color: rgba(102, 102, 102, 1);
      border-bottom: 1px solid #eee;
    }
    .other-bank::after {
      content: " ";
      top: 50%;
      width: 8px;
      height: 8px;
      right: 12px;
      position: absolute;
      border: 2px solid #ccc;
      border-left: 0px;
      border-bottom: 0px;
      transform: translate(0, -50%) rotate(45deg);
    }
  }

  .select-bank {
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99999;

    .select-bank-bg {
      top: 0px;
      left: 0px;
      z-index: 1;
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(20, 7, 7, 0.2);
    }

    .select-bank-content {
      width: 100%;
      bottom: 0px;
      height: 250px;
      position: absolute;
      background: #fff;
      z-index: 10;

      .select-bank-header {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;

        i.close {
          top: 0px;
          left: 0px;
          width: 50px;
          height: 50px;
          font-size: 28px;
          line-height: 50px;
          font-style: normal;
          position: absolute;
          color: rgba(190, 190, 190, 1);
        }

        span {
          color: #333;
          font-size: 16px;
        }
      }

      .scoll-wrapper-bank {
        max-height: 200px;
        overflow: hidden;

        ul {
          li.bank-item {
            height: 50px;
            display: flex;
            padding: 0 16px;
            font-size: 16px;
            line-height: 50px;
            align-items: center;
            box-sizing: border-box;
            border-bottom: 1px solid #eee;

            i.icon {
              width: 22px;
              height: 20px;
              background: url("../../../assets/img/store/postal.png") no-repeat;
              background-size: 100%;
            }

            .bank-info {
              flex: 1;
              overflow: hidden;
              padding: 0px 10px;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: rgba(51, 51, 51, 1);
              span.bank-name {
                font-size: 16px;
              }
              span.accountTypeName {
                padding: 2px;
                margin-left: 10px;
                font-size: 12px;
                color: #E54645;
                border: 1px solid #E54645; 
                border-radius: 4px;
              }
            }
          }
          li.bank-item {
            position: relative;
            i.check-icon { 
              position: absolute;
              width: 16px;
              height: 16px;
              right: 12px;
              top: 50%;
              border-radius: 16px;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              border: 1px solid #999;
              &::after {
                -webkit-transition: all 0.3s;
                transition: all 0.3s;
                content: " ";
                position: absolute;
                width: 4px;
                height: 8px;
                top: 2px;
                left: 5px;
                border: 2px solid #fff;
                border-left: 0px;
                border-top: 0px;
                -webkit-transform: rotate(45deg) scale(0);
                transform: rotate(45deg) scale(0);
                -webkit-transform-origin: center center;
                transform-origin: center center;
              }
            }
          }
          li.bank-item-on {
            i.check-icon {
              border: 1px solid #f6001a;
              background-color: #f6001a;
              &::after {
                -webkit-transform: rotate(45deg) scale(1);
                transform: rotate(45deg) scale(1);
              }
            }
          }
          /* li.bank-item-on::after {
            content: " ";
            width: 15px;
            height: 11px;
            background: url("../../../assets/img/store/on_icon.png") no-repeat;
            background-size: 100%;
          } */
        }

        .add-bank {
          padding: 0 16px;
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>