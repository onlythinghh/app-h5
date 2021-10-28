<template>
  <div class="store">
    <!-- Header -->
    <yzg-header :title="'店铺资料'" :isBack="istitle">
      <div v-if="isYZG" class="custom" slot="right" @click="onCustomEvent">
        <i class="icon"></i>
        <span class="text">客服</span>
      </div>
    </yzg-header>
    <section class="store-content">
      <upload/>
      <!-- 审核状态 0 未审核  1 待审核 2 复审通过 3 复审退回 4 初审通过 5 初审退回
      auditStatus = "11"; // 默认是11 2--审核通过; 3--未审核通过;4--提交审核; 5--银联系统审核退回; 11--未提交审核;-->
      <div class="store-audit-status">
        <div v-if="examineStatus==0">
          <h3>未审核</h3>
          <p>{{tips[0]}}</p>
        </div>
        <div v-else-if="examineStatus==1 || examineStatus==4 || auditStatus==4">
          <h3>审核中</h3>
          <p v-if="auditStatus==4">{{tips[4]}}</p>
          <p v-else>{{tips[1]}}</p>
        </div>
        <div v-else-if="examineStatus==2 && auditStatus==11">
          <h3>复审通过</h3>
          <p class="clearcss">{{tips[2]}}</p>
        </div>
        <div v-else-if="examineStatus==3 || examineStatus==5 || auditStatus==3 || auditStatus ==5">
          <h3>审核未通过</h3>
          <p>
            {{tips[3]}}
            <span
              @click="remarkTips(uleRremark)"
              v-if="examineStatus==3 || examineStatus==5"
            >{{uleRremark?`退回原因：${uleRremark}`:uleRremark}}</span>
            <span
              @click="remarkTips(unionPayRremark)"
              v-else-if="auditStatus==3 || auditStatus ==5"
            >{{unionPayRremark?`退回原因：${unionPayRremark}`:unionPayRremark}}</span>
          </p>
        </div>
        <div v-else-if="auditStatus==2">
          <h3>审核通过</h3>
          <!-- <p>{{tips[4]}}</p> -->
        </div>

        <!-- <h3 v-else>审核通过</h3> -->
        <!-- <p>审核中不可修改，如有信息错误，请联系客服。</p> -->
      </div>

      <div class="tabs">
        <!-- 必填项 -->
        <div class="mask-line"></div>
        <div
          class="must-tab tab-item"
          :class="{'tab-item-on': tabKey == 'must'}"
          @click="onSwitchTab('must')"
        >
          <div class="seat"></div>
          <div class="tab-item-content">
            <h3>必填信息</h3>
            <p>用于开通批销业务</p>
          </div>
        </div>

        <div class="tab-item-seat" :class="'tab-item-seat-' + tabKey"></div>

        <!-- 选填项 -->
        <div
          class="choose-tab tab-item"
          :class="{'tab-item-on': tabKey == 'choose'}"
          @click="onSwitchTab('choose')"
        >
          <div class="tab-item-content">
            <h3>选填信息</h3>
            <p>用于开通掌柜码业务</p>
          </div>
          <div class="seat"></div>
        </div>
      </div>

      <router-view/>

      <!-- 兼容iPhone X -->
      <div class="seize"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import YzgHeader from "../../components/header/header.vue";
import Upload from "./upload";
import {
  getJSON,
  isYZG,
  isAndroid,
  closeYZG,
  getSearchString,
  getClokie
} from "../../tools";
import {
  findShopkeeperInfo,
  getStreetMsgByH5,
  getListProfessionInfo,
  getBankList,
  getUserInfo
} from "../../service";
import config from "../../config";

export default {
  name: "storeInfo",
  components: {
    YzgHeader,
    Upload
  },
  data() {
    return {
      isYZG,
      tabKey: "must",
      tips: [
        "补全资料可开通批销和扫码付功能", // 未审核
        "掌柜的，小二加紧审核中，请耐心等待", // 审核中
        "资料审核已通过，补全身份信息更可使用扫码付及网店功能哦!", // 复审通过
        "资料有误，请重新上传并提交资料。", // 审核未通过
        "银联审核中，请耐心等待3-5工作日", // 银联审核中
      ],
      uleRremark: '', // 接口返回邮乐审核信息
      unionPayRremark: '', // 返回银联审核信息
      istitle: true,
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
      "examineStatus",
      "auditStatus",
      "isExisInfos",
      "pageloca",
      "name",
      "storeName",
      "storeSignName",
      "licenseName",
      "mainBusiness",
      "agencyBusiness",
      "urbanAndRural",
      "region",
      "street",
      "detailedAddress",
      "postalNumber",
      "businessLicense",
      "facade",
      "internalEnvironment",
      "cashier",
      "goodsShelves",
      "IDCard",
      "frontIDCard",
      "versoIDCard",
      "holdIDCard",
      "cardOwner",
      "cardNumber",
      "cardOwnerName",
      "settleAccountNo",
      "settleAccount",
      "openCardBank",
      "meetingBranch",
      "linkNumber",
      "reservePhone",
      "coverEmpowerIDCard",
      "merchantReceipt",
      "openingLicenseAccountPhoto",
      "frontBank",
      "coverEmpower",
      "settlement",
      "IDCardBank",
      "contactPhone",
      "frontIDCardBank",
      "versoIDCardBank",
      "businessNumber",
      "businessScope",
      "businessTermValidity",
      "outdoorScene",
      "professionInfo",
      "bankInfo",
      "tagRadio",
      "licenseType",
      "taxCode",
      "taxExpired",
      "tax"
    ])
  },
  methods: {
    ...mapActions([
      "updates",
      "setUserInfo",
      "setIsPower",
      "setCheckStatus",
      "setAuditStatus",
      "setExamineStatus",
      "updateCashWithdrawalTarget",
      "updatetagRadioStatus"
    ]),

    onCustomEvent() {
      const content = '{"key":"RNJump","result":"RN##CustomerService"}';
      if (isAndroid) {
        // 安卓
        group && group.callBackRn(content);
      } else {
        if (parseFloat(getSearchString("version")) >= 3.24) {
          window.webkit.messageHandlers.callBackRn.postMessage(content);
        } else {
          callBackRn && callBackRn(content);
        }
      }
      closeYZG();
    },

    // 显示退回原因
    remarkTips(val) {
      let tip = '退回原因：' + val
      this.$dialog.alert(tip)
    },

    onSwitchTab(key) {
      this.tabKey = key;
      let page = (key == "choose" && this.pageloca) || "/store/" + key;
      if (key == 'choose' && this.tagRadio == '2') {
        page = "/store/choose/wallet"
        this.$store.dispatch("setPageLoca", page);
      }
      this.$router.replace(page);
    },
    setDefaultTab() {
      const { current } = this.$router.history;
      const { path } = current;
      const defaultTab = path.split("/")[2];
      if (defaultTab) {
        this.tabKey = defaultTab;
      }
    },
    getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      if(window.location.hash.indexOf("?") < 0){
        return '';
      }
      let r = window.location.hash.split("?")[1].match(reg); 　　
      if (r != null) return decodeURIComponent(r[2]);
      return '';
    },
    getHrefData() {
       let str = this.getQueryString('delTitle')
       console.log('ztr',str)
       if(str&&str == '0') {
        this.istitle = false
       } else {
        this.istitle = true
       }
    },

    setUser() {
      getUserInfo().then(result => {
        const { returnCode, data } = result;
        if (returnCode == "0000") {
          this.setUserInfo(data || {});
        }
      });
    },

    // 设置相机权限
    setCameraPower() {
      const appVersionNo = parseInt(getClokie("appVersionNo") || 0);
      if (appVersionNo >= 340) {
        if (isAndroid) {
          dsBridge &&
            dsBridge.call("ulePermission", "android.permission.CAMERA", val => {
              this.setIsPower(!!+val);
            });
        } else {
          bridge &&
            bridge.call("ulePermission", { msg: "camera" }, val => {
              this.setIsPower(!!+val);
            });
        }
      }
    },

    // 设置主营行业集合
    setProfessionInfo(fn) {
      getListProfessionInfo()
        .then(result => {
          const { returnCode, returnMessage } = result;
          if (returnCode == "0000") {
            this.$store.dispatch("setProfessionInfo", returnMessage);
            fn();
          } else {
            this.$toast(config.error);
          }
        })
        .catch(ex => {
          this.$toast(config.error);
        });
    },

    setAgencyBusiness() {
      this.$store.dispatch("updateAgencyBusiness", {
        gather: [
          { label: "无", value: "999", isBanOther: true },
          { label: "手机充值", value: "1" },
          { label: "生活缴费", value: "2" },
          { label: "快递收寄", value: "3" },
          { label: "文印", value: "4" },
          { label: "报刊邮品", value: "5" },
          { label: "彩票", value: "6" },
          { label: "交通代订", value: "7" },
          { label: "酒店代订", value: "8" },
          { label: "旅游服务", value: "9" },
          { label: "劳务中介", value: "10" },
          { label: "金融服务", value: "11" },
          { label: "三农产品服务", value: "12" },
          { label: "积分兑换", value: "13" }
        ]
      });
    },

    setUrbanAndRural() {
      this.$store.dispatch("updateUrbanAndRural", {
        gather: [
          { value: "111", label: "主城区" },
          { value: "112", label: "城乡结合区" },
          { value: "121", label: "镇中心区" },
          { value: "122", label: "镇乡结合区" },
          { value: "123", label: "特殊区域" },
          { value: "210", label: "乡中心区" },
          { value: "220", label: "村庄" }
        ]
      });
    },

    setStreetMsgByH5() {
      getStreetMsgByH5().then(result => {
        const { returnCode, data } = result;
        console.log('result',result)
        if (returnCode == "0000" && data) {
          const tempArray = data.map(item => {
            return { value: item.code, label: item.name };
          });
          let hasHidden = tempArray.length ? false : true;
          this.$store.dispatch("updateStreet", { gather: tempArray, hidden: hasHidden });
        } else {
          // this.$toast(config.error);
          // 查询失败或者没有街道数据
          this.$store.dispatch("updateStreet", { hidden: true });
        }
      });
    },

    setCardOwner() {
      this.updates({
        key: "cardOwner",
        infos: {
          gather: [
            { value: 1, label: "公司结算账户", disabled: false, resetStatus: false },
            { value: 2, label: "营业执照注册人", disabled: false, resetStatus: false },
            // { value: 3, label: "其他", disabled: false, resetStatus: false }
          ]
        }
      });
    },

    onSelectBank(params) {
      console.log('params:', params);
      const { currentBank } = params;
      const {
        cardNoCipher,
        usrName,
        cardNo,
        cardName,
        cardNameCipher,
        mobileNumber,
        usrNameCipher,
        mobileNumberCipher,
        settleNo,
        settleName,
        settleNoCipher,
        settleNameCipher,
        bankReservePhone,
        bankReservePhoneCipher,
        settlebankPhone,
        settlebankPhoneCipher,
        settleAccountType,
        auditStatus
      } = currentBank || {};
      const { lists } = this.bankInfo;
      const settleTypeStatus = settleAccountType == 1 ? true : false;
      const isShowReservePhone = (settleTypeStatus && !settlebankPhone) ? false : (mobileNumber || settlebankPhone || bankReservePhone) ? false : true;
      const checKdisbled = auditStatus == "2" || auditStatus == "4";
      const settleDisbleds = checKdisbled && settleAccountType == 1 ? true : false;
      const reservePhone = mobileNumber ? mobileNumber : settleTypeStatus ? settlebankPhone : bankReservePhone;
      const reservePhoneCipher = mobileNumberCipher ? mobileNumberCipher : settleTypeStatus ? settlebankPhoneCipher : bankReservePhoneCipher;

      this.updates({
        key: "bankInfo",
        infos: params
      });

      this.updates({
        key: "cardNumber",
        infos: { value: cardNo, cipher: cardNoCipher, hidden: (!cardNo || settleTypeStatus) }
      });

      this.updates({
        key: "cardOwnerName",
        infos: { value: cardName || usrName, cipher: cardNameCipher || usrNameCipher, hidden: !cardName || settleTypeStatus }
      });

      this.updates({
        key: "reservePhone",
        infos: {
          value: reservePhone,
          cipher: reservePhoneCipher,
          hidden: isShowReservePhone,
          disabled: settleDisbleds || !settleTypeStatus,
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
          gather: [
            { value: 1, label: "公司结算账户", disabled: (settleAccountType ? !settleTypeStatus : false), resetStatus: false },
            { value: 2, label: "营业执照注册人", disabled: settleTypeStatus, resetStatus: false },
            // { value: 3, label: "其他", disabled: settleTypeStatus, resetStatus: false }
          ]
        }
      });
    },

    setBankList() {
      getBankList().then(result => {
        const { returnCode, data } = result;
        if (returnCode == "0000") {
          const { cardList } = data || {};
          const { currentBank } = this.bankInfo;
          const { settleNoCipher = '', settlebankPhone = '', settlebankPhoneCipher = '', auditStatus = '' } = currentBank || {};
          if (cardList && cardList.length > 0) {
              cardList.map((item) => {
                if (item.settleAccountType == 1 && item.settleNoCipher == settleNoCipher) {
                  item.settlebankPhone = settlebankPhone;
                  item.settlebankPhoneCipher = settlebankPhoneCipher;
                  item.auditStatus = auditStatus;
                }
              })
          }
          let params = { lists: cardList || [] };
          params.currentBank = currentBank ? currentBank : cardList[0] || {};
          this.onSelectBank(params);
        }
      });
    },

    // 获取选中主营行业
    getSelectRunType(value) {
      const tempRunType = [];
      this.professionInfo.map(item => {
        item.subProfessions.map(sp => {
          if (sp.id == parseInt(value)) {
            tempRunType.push({
              value: sp.id,
              label: sp.name,
              type: sp.mainBusiType
            });
          }
        });
      });

      return tempRunType;
    },

    // 获取选中的代理业务
    getSelectAgencyBusiness(value) {
      const tempValue = value.split(",");
      const { gather } = this.agencyBusiness;
      return gather.filter(item => tempValue.indexOf(item.value) >= 0);
    },

    // 获取选中的城乡区域
    getSelectUrbanAndRural(value) {
      const { gather } = this.urbanAndRural;
      return gather.filter(item => item.value == value);
    },

    getCardOwner(value) {
      const { gather } = this.cardOwner;
      return gather.filter(item => item.value == value) || [];
    },

    setDefaultInfo() {
      findShopkeeperInfo().then(result => {
        const { returnCode, data } = result;
        if (returnCode == "0000") {
          let { bankInfo, checkStatus, imgInfo, userInfo } = data || {};

          // 用户必填信息
          let {
            agentBusiness,
            areaCode,
            certNo,
            cityCode,
            extractType,
            mainBusiness1,
            orgAreaName,
            orgCityName,
            orgProvinceName,
            placeRegional,
            postalCode,
            provinceCode,
            registerLicenseName,
            businessLicenseCode,
            businessLicenseExpired,
            stationAddress,
            stationName,
            usrName,
            legalIdExpire,
            mobile,
            villageCode,
            villageDecca,
            villageName,
            auditStatus,
            remark,
            unionCheckMsg,
            reserve1,
            licenseType,
            taxCode,
            taxExpired,
          } = userInfo;
          const {
            busLience = {},
            store = {},
            shopInside = {},
            cashierDesk = {},
            storeInner = {},
            certPos = {},
            certNeg = {},
            certHold = {},
            merchantAgreement = {},
            bankFront = {},
            openingLicenseAccountPhoto = {},
            authorizedCertFront = {},
            settleAuth = {},
            storeLocation = {},
            tax = {},
            
          } = imgInfo;
          let disabled = false;
          this.uleRremark = remark;
          this.unionPayRremark = unionCheckMsg;
          let subtypes = busLience.subtypes ? busLience.subtypes : '1'
          // checkStatus   0 未审核  1 待审核 2 复审通过 3 复审退回 4 初审通过 5 初审退回
          // checkStatus = 0;
          // extractType = "2"; // 1 提现到钱包 2 银联
          // auditStatus = "11"; // 默认是11 2--审核通过; 3--未审核通过;4--提交审核; 5--银联系统审核退回; 11--未提交审核;
          let auditstatus = auditStatus ? auditStatus : 11;
          this.setExamineStatus(checkStatus);
          this.setAuditStatus(auditstatus);
          this.updatetagRadioStatus(subtypes) //营业执照类型
          const reserveData = reserve1 ? JSON.parse(reserve1) : {}
          const { busdetail } = reserveData
          if (extractType == "2") {
            this.$store.dispatch(
              "setPageLoca",
              "/store/choose/bankcard/speed1"
            );
          } else {
            this.$store.dispatch("setPageLoca", "/store/choose/wallet");
          }
          this.updateCashWithdrawalTarget(extractType);
          if (
            // (checkStatus == 2 && extractType == 2) ||
            checkStatus == 1 ||
            checkStatus == 4 ||
            // auditStatus == "2" ||
            // auditStatus == "3" ||
            auditStatus == "4"
          ) {
            disabled = true;
          } else {
            disabled = false;
          }
          this.setCheckStatus(disabled);

          this.updates({
            key: "name",
            infos: {
              value: usrName,
              disabled
            }
          });
          this.updates({
            key: "storeName",
            infos: {
              value: stationName,
              disabled
            }
          });
          this.updates({
            key: "storeSignName",
            infos: { value: villageDecca, disabled }
          });
          this.updates({
            key: "licenseName",
            infos: { value: registerLicenseName, disabled }
          });

          this.setProfessionInfo(() => {
            const mainBusiness = this.getSelectRunType(mainBusiness1);
            this.updates({
              key: "mainBusiness",
              infos: { value: mainBusiness, disabled: !!mainBusiness1 }
            });
          });

          if (agentBusiness !== undefined && agentBusiness !== null) {
            if (agentBusiness == "") agentBusiness = "999";
            const agencyBusiness = this.getSelectAgencyBusiness(agentBusiness);
            this.updates({
              key: "agencyBusiness",
              infos: { value: agencyBusiness, disabled }
            });
          }

          const urbanAndRural = this.getSelectUrbanAndRural(placeRegional);
          this.updates({
            key: "urbanAndRural",
            infos: { value: urbanAndRural, disabled }
          });

          let regionParams = {};
          if (!orgProvinceName && !orgCityName && !orgAreaName) {
          } else {
            regionParams = {
              value: [
                {
                  value: "1",
                  label: `${orgProvinceName} ${orgCityName} ${orgAreaName}`
                }
              ],
              provinceCode,
              cityCode,
              areaCode,
              disabled: true
            };
          }
          this.updates({
            key: "region",
            infos: regionParams
          });

          const street = villageCode
            ? [{ value: villageCode, label: villageName }]
            : [];

          this.updates({
            key: "street",
            infos: { value: street, disabled }
          });
          this.updates({
            key: "detailedAddress",
            infos: { value: stationAddress, disabled }
          });
          this.updates({
            key: "postalNumber",
            infos: { value: postalCode, disabled }
          });
          this.updates({
            key: "businessLicense",
            infos: { images: busLience.photoUrl, disabled }
          });
          this.updates({
            key: "facade",
            infos: { images: store.photoUrl, disabled }
          });
          this.updates({
            key: "internalEnvironment",
            infos: { images: shopInside.photoUrl, disabled }
          });
          this.updates({
            key: "cashier",
            infos: { images: cashierDesk.photoUrl, disabled }
          });
          this.updates({
            key: "goodsShelves",
            infos: { images: storeInner.photoUrl, disabled }
          });

          // 非必填项
          // 提现到钱包
          this.updates({
            key: "IDCard",
            // infos: { value: certNo, disabled } // 提现到钱包时不获取身份证号2020-05-25，
            infos: { disabled }
          });
          this.updates({
            key: "frontIDCard",
            infos: { images: certPos.photoUrl, disabled }
          });
          this.updates({
            key: "versoIDCard",
            infos: { images: certNeg.photoUrl, disabled }
          });
          this.updates({
            key: "holdIDCard",
            infos: { images: certHold.photoUrl, disabled }
          });

          const {
            settleAccountType,
            cardNo,
            cardName,
            openSubBank,
            openBankCode,
            bankReservePhone,
            authPersonCertNo,
            authPersonCertNoCipher,
            cardNoCipher,
            cardNameCipher,
            // legalIdExpire,
            bankReservePhoneCipher,
          } = bankInfo || {};

          const cardOption = settleAccountType == 1 ? {
              settleAccountType: settleAccountType,
              settleNoCipher: cardNoCipher,
              settleNo: cardNo,
              settleName: cardName,
              settleNameCipher: cardNameCipher,
              settlebankPhone: bankReservePhone,
              settlebankPhoneCipher: bankReservePhoneCipher,
              auditStatus: auditStatus
          } : settleAccountType == 2 ? {
              auditStatus: auditStatus,
              ...bankInfo
          } : '';
          this.updates({
            key: "bankInfo",
            infos: {
              currentBank: cardOption
            }
          });

          // 提现到银行卡
          const cardOwnerStatus = settleAccountType && settleAccountType == 1 ? true : false;
          const cardOwner = this.getCardOwner(settleAccountType);
          const { value } = cardOwner.length ? cardOwner[0] : {}
          const cardOwnerTypes = value == 3 ? false : true;
          const checKdisbled = auditStatus == "2" || auditStatus == "4";
          const settleDisbled = checKdisbled && settleAccountType == 1 ? true : false;
          this.updates({
            key: "cardOwner",
            infos: {
              value: cardOwner,
              disabled: checKdisbled,
              gather: [
                { value: 1, label: "公司结算账户", disabled: !cardOwnerStatus, resetStatus: false },
                { value: 2, label: "营业执照注册人", disabled: cardOwnerStatus, resetStatus: false },
                // { value: 3, label: "其他", disabled: cardOwnerStatus, resetStatus: false }
              ]
            }
          });
          this.updates({
            key: "cardNumber",
            infos: {
              value: cardNo,
              hidden: (!cardNo || cardOwnerStatus),
              cipher: cardNoCipher
            }
          });
          this.updates({
            key: "cardOwnerName",
            infos: {
              value: cardName,
              hidden: (!cardName || cardOwnerStatus),
              cipher: cardNameCipher
            }
          });
          this.updates({
            key: "settleAccountNo",
            infos: { value: cardNo, cipher: cardNoCipher, hidden: (!cardNo || !cardOwnerStatus) }
          });

          this.updates({
            key: "settleAccount",
            infos: { value: cardName, cipher: cardNameCipher, hidden: (!cardName || !cardOwnerStatus) }
          });
          this.updates({
            key: "meetingBranch",
            infos: { value: openSubBank, disabled: settleDisbled || disabled }
          });
          this.updates({
            key: "linkNumber",
            infos: { value: openBankCode, disabled: settleDisbled || disabled }
          });
          this.updates({
            key: "reservePhone",
            infos: {
              value: bankReservePhone,
              hidden: !bankReservePhone,
              cipher: bankReservePhoneCipher,
              disabled: settleDisbled || !cardOwnerStatus
            }
          });
          this.updates({
            key: "coverEmpowerIDCard",
            infos: { value: authPersonCertNo, encryption: authPersonCertNoCipher, disabled, hidden: cardOwnerTypes }
          });
          this.updates({
            key: "merchantReceipt",
            infos: { images: merchantAgreement.photoUrl, disabled: settleDisbled || disabled }
          });
          this.updates({
            key: "frontBank",
            infos: { images: bankFront.photoUrl, disabled, hidden: cardOwnerStatus }
          });
          this.updates({
            key: "openingLicenseAccountPhoto",
            infos: { images: openingLicenseAccountPhoto.photoUrl, disabled: settleDisbled, hidden: !cardOwnerStatus }
          })
          this.updates({
            key: "coverEmpower",
            infos: { images: authorizedCertFront.photoUrl, disabled: checKdisbled, hidden: cardOwnerTypes }
          });
          this.updates({
            key: "settlement",
            infos: { images: settleAuth.photoUrl, disabled, hidden: cardOwnerTypes }
          });
          this.updates({
            key: "IDCardBank",
            infos: { value: certNo, disabled }
          });
          this.updates({
            key: "legalIdExpire",
            infos: { value: [{ value: "1", label: legalIdExpire }], disabled }
          });
          this.updates({
            key: "contactPhone",
            infos: { value: mobile, disabled }
          });
          this.updates({
            key: "frontIDCardBank",
            infos: { images: certPos.photoUrl, disabled }
          });
          this.updates({
            key: "versoIDCardBank",
            infos: { images: certNeg.photoUrl, disabled }
          });

          this.updates({
            key: "businessNumber",
            infos: { value: businessLicenseCode, disabled }
          });

          this.updates({
            key: "businessScope",
            infos: { value: busdetail || '', disabled }
          });

          this.updates({
            key: "businessTermValidity",
            infos: {
              value: [{ value: "1", label: businessLicenseExpired }],
              disabled
            }
          });
          this.updates({
            key: "outdoorScene",
            infos: { images: storeLocation.photoUrl, disabled }
          });

          this.updates({
            key: "isExisInfos",
            infos: {
              status: true
            }
          });

            // licenseType,
            // taxCode,
            // taxExpired,
            // tax,
          this.updates({
            key: "licenseType",
            infos: {value: licenseType || '0', disabled}
          })
          this.updates({
            key: "taxationCode",
            infos: {value: taxCode, disabled}
          })
          this.updates({
            key: "taxExpiredTermValidity",
            infos: {
              value: [{value: "1", label: taxExpired}],
              disabled
            }
          })
          this.updates({
            key: "taxationPic",
            infos: { images: tax.photoUrl, disabled }
          });

          !this.checkStatus && this.setBankList();
        }
      });
    },

    init() {
      this.setDefaultTab();
      this.getHrefData();
      if (!this.isExisInfos.status) {
        this.setAgencyBusiness();
        this.setUrbanAndRural();
        this.setStreetMsgByH5();
        this.setCardOwner();
        this.setDefaultInfo();
        this.setUser();
        this.setCameraPower();
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
@import "../../style/mixin";

div.store {
  .custom {
    display: flex;
    flex-direction: column;
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;

    i.icon {
      width: 20px;
      height: 16px;
      background: url("../../images/store/kefu.png") no-repeat;
      background-size: 20px 16px;
    }
    span.text {
      font-size: 12px;
      color: #fff;
    }
  }

  section.store-content {
    min-width: 100%;
    max-width: 100%;
    padding: 50px 0 0;
    background-color: #f5f5f5;

    .store-audit-status {
      color: #fff;
      height: 80px;
      display: flex;
      padding: 0 18px 50px 18px;
      flex-direction: column;
      background-color: $red;
      justify-content: center;
      h3 {
        // font-size: 0.36rem;
        font-size: 18px;
      }
      p {
        // font-size: 0.28rem;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        &.clearcss{
          white-space: initial;
          text-overflow: initial;
        }
      }
    }

    div.tabs {
      margin-top: -45px;
      display: flex;
      height: 50px;
      position: relative;
      .mask-line{
        position: absolute;
        left: 18px;
        top: 5px;
        width: calc(100% - 36px);
        height: 45px;
        background-color: #f5f5f5;
        border-radius: 8px;
        z-index: 0;
      }

      .tab-item {
        flex: 1;
        display: flex;
        text-align: center;
        align-items: center;
        .tab-item-content {
          flex: 1;
          height: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          background-color: #f5f5f5;
          z-index: 1;
          h3 {
            color: #333;
            font-size: 16px;
          }
          p {
            color: #999;
            font-size: 12px;
          }
        }
        .seat {
          height: 100%;
          width: 18px;
          background-color: $red;
        }
      }

      .tab-item-seat {
        width: 33px;
        background: url("../../assets/img/store/switch.png") no-repeat;
        background-size: 33px 50px;
      }

      .must-tab {
        .tab-item-content {
          border-top-left-radius: 8px;
        }
      }

      .choose-tab {
        .tab-item-content {
          border-top-right-radius: 8px;
        }
      }

      .tab-item-on {
        .tab-item-content {
          height: 50px;
          background-color: #fff;

          h3 {
            color: $red;
          }
        }
      }

      .must-tab.tab-item-on {
        .seat {
          border-bottom-right-radius: 8px;
        }
      }

      .choose-tab.tab-item-on {
        .seat {
          border-bottom-left-radius: 8px;
        }
      }

      .tab-item-seat-must {
        transform: scaleX(-1);
      }

      .tab-item-seat-choose {
        transform: scaleX(1);
      }
    }
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
