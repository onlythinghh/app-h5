<template>
  <div :class="{'input-open':input}" class="store">
    <Header :title="title" :isBack="true">
      <div v-if="isYZG" class="custom" slot="right" @click="onCustomEvent">
        <i class="icon"></i>
        <span class="text">客服</span>
      </div>
    </Header>
    <section class="content">
      <ul class="tips">
        <li v-for="(item,index) in tips" :key="index" v-html="item"/>
      </ul>
      <!-- 掌柜信息 -->
      <div class="zg-info" v-if="!(!isModify&&!zgInfo.info.name)">
        <Title :title="zgInfo.title"/>
        <ul class="items">
          <li class="item name">
            <div class="label">
              <i class="star">*</i>姓名
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请输入姓名"
                maxlength="10"
                @focus="focus"
                @blur="blur"
                v-model="zgInfo.info.name"
                v-if="isModify"
              >
              <span v-else>{{ zgInfo.info.name }}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- 店铺信息 -->
      <div class="store-info">
        <Title :title="storeInfo.title"/>
        <ul class="items">
          <li class="item name" v-if="!(!isModify&&!storeInfo.info.name)">
            <div class="label">
              <i class="star">*</i>店铺名称
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请输入店铺名称"
                maxlength="20"
                @focus="focus"
                @blur="blur"
                v-model="storeInfo.info.name"
                v-if="isModify"
              >
              <span v-else>{{ storeInfo.info.name }}</span>
            </div>
          </li>
          <li class="item shop-sign" v-if="!(!isModify&&!storeInfo.info.shopSign)">
            <div class="label">
              <i class="star">*</i>店铺招牌名称
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写您的店铺招牌名称"
                maxlength="20"
                v-model="storeInfo.info.shopSign"
                v-if="isModify"
              >
              <span v-else>{{ storeInfo.info.shopSign }}</span>
            </div>
          </li>
          <li class="item shop-sign" v-if="!(!isModify&&!storeInfo.info.registerLicenseName)">
            <div class="label">
              <i class="star">*</i>执照注册姓名
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请填写您的执照注册姓名"
                maxlength="20"
                v-model="storeInfo.info.registerLicenseName"
                v-if="isModify"
              >
              <span v-else>{{ storeInfo.info.registerLicenseName }}</span>
            </div>
          </li>
          <li class="item name" v-if="!(!isModify&&!runtype.name)">
            <div class="label">
              <i class="star">*</i>主营行业
            </div>
            <div
              class="content"
              :class="{'placeholder' : !runtype.name}"
              @click="selectedRunType"
            >{{runtype.name||"请选择主营行业"}}</div>
          </li>
          <li class="item agent">
            <div class="label">
              <i class="star">*</i>代理业务
            </div>
            <div
              class="content"
              :class="{'placeholder' : !agent.value}"
              @click="selectAgentBusiness"
            >{{agent.value||"请选择代理业务"}}</div>
            <popBottom
              @sendValue="getAgent"
              @cancelChoose="hidePop"
              :title="agent.title"
              :isMultipleSelect="agent.isMultipleSelect"
              :lists="agent.lists"
              :popupVisible="agent.showPop"
              :initValue="agent.initValue"
            ></popBottom>
          </li>
          <li class="item street" v-if="!(!isModify&&!storeInfo.info.placeRegionalName)">
            <div class="label">
              <i class="star">*</i>所在城乡区域
            </div>
            <div class="content">
              <select
                @focus="focus"
                @blur="blur"
                v-model="storeInfo.info.placeRegional"
                v-if="isModify"
              >
                <option v-for="(value,key) in placeRegionalObject" :key="key" :value="key">{{value}}</option>
              </select>
              <span v-else>{{ storeInfo.info.placeRegionalName }}</span>
            </div>
          </li>
          <li class="item adds">
            <div class="tip">注:所在地区,将用于批销进货(有误请联系客服)</div>
            <div style="height: 50px; display: flex;">
              <div class="label">
                <i class="star">*</i>所在地区
              </div>
              <div class="content">
                <div class="setaddrs" @click="setAddrs">{{storeInfo.info.adds || '请选择地址'}}</div>
              </div>
              <!-- <div :class="{'content':true,'isRed':storeInfo.info.adds === ''}" v-if="storeInfo.info.addsshow == 0">
                {{storeInfo.info.adds || '地址库已升级，请联系邮助手修改'}}
              </div>
              <div class="content" v-else>
                <div class="setaddrs" @click="setAddrs">{{storeInfo.info.adds || '请选择地址'}}</div>
              </div> -->
            </div>
          </li>
          <!-- <li  class="item street">
            <div class="label">测试地址</div>
            <div class="content">
              <div class="setaddrs" @click="setAddrs">{{areaValue}}</div>
            </div>
          </li> -->
          <li class="item street" v-if="!(!isModify&&!storeInfo.info.streetName||!streetMap)">
            <div class="label">街道</div>
            <div class="content">
              <select
                id="sendSybol"
                @focus="focus"
                @blur="blur"
                v-model="storeInfo.info.street"
                @change="getVendorId"
                v-if="isModify"
              >
                <option
                  v-for="(item,index) in streetMap"
                  :key="index"
                  ref="newText"
                  :value="item.code"
                >{{item.name}}</option>
              </select>
              <span v-else>{{ storeInfo.info.streetName }}</span>
            </div>
          </li>
          <li class="item detailed-adds" v-if="!(!isModify&&!storeInfo.info.detailedAdds)">
            <div class="label">
              <i class="star">*</i>详细地址
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请输入详细地址"
                maxlength="40"
                @focus="focus"
                @blur="blur"
                v-model="storeInfo.info.detailedAdds"
                v-if="isModify"
              >
              <span v-else>{{ storeInfo.info.detailedAdds }}</span>
            </div>
          </li>
          <li class="item zip-code" v-if="!(!isModify&&!storeInfo.info.zipCode)">
            <div class="label">
              <i class="star">*</i>邮政编号
            </div>
            <div class="content">
              <input
                type="text"
                placeholder="请输入邮政编号"
                maxlength="6"
                @focus="focus"
                @blur="blur"
                v-model="storeInfo.info.zipCode"
                v-if="isModify"
              >
              <span v-else>{{ storeInfo.info.zipCode }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- 证件信息 -->
      <div class="card-info">
        <Title :title="cardInfo.title"/>
        <Card
          :info="cardInfo.info.businessLicense"
          :usrOnlyId="usrOnlyId"
          :isPower="isPower"
          :status="cardStatus"
          :error="error"
          :modify="isModify"
          v-if="!(!isModify&&!cardInfo.info.businessLicense.cardImage)"
        />
        <Card
          :info="cardInfo.info.facade"
          :usrOnlyId="usrOnlyId"
          :isPower="isPower"
          :status="cardStatus"
          :error="error"
          :modify="isModify"
          v-if="!(!isModify&&!cardInfo.info.facade.cardImage)"
        />
        <Card
          :info="cardInfo.info.environment"
          :usrOnlyId="usrOnlyId"
          :isPower="isPower"
          :status="cardStatus"
          :error="error"
          :modify="isModify"
          v-if="!(!isModify&&!cardInfo.info.environment.cardImage)"
        />
        <Card
          :info="cardInfo.info.cashier"
          :usrOnlyId="usrOnlyId"
          :isPower="isPower"
          :status="cardStatus"
          :error="error"
          :modify="isModify"
          v-if="!(!isModify&&!cardInfo.info.cashier.cardImage)"
        />
        <Card
          :info="cardInfo.info.shelves"
          :usrOnlyId="usrOnlyId"
          :isPower="isPower"
          :status="cardStatus"
          :error="error"
          :modify="isModify"
          class="last-one"
          v-if="!(!isModify&&!cardInfo.info.shelves.cardImage)"
        />
      </div>

      <!-- 展开内容 -->
      <div :class="[{spread:isSpread}, 'spread-content']">
        <!-- 掌柜信息 -->
        <div class="zg-info" v-if="!(!isModify&&!zgInfo.info.id)">
          <Title :title="zgInfo.title"/>
          <div class="tip">上传身份照片需完善身份证号码，否则影响审核通过</div>
          <ul class="items">
            <li class="item id">
              <div class="label">身份证号</div>
              <div class="content">
                <input
                  type="text"
                  placeholder="请填写身份证号"
                  maxlength="18"
                  v-model="zgInfo.info.id"
                  v-if="isModify"
                >
                <span v-else>{{ zgInfo.info.id }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- 证件信息 -->
        <div
          class="card-info"
          v-if="!(!isModify&&!cardInfo.info.fullFace.cardImage&&!cardInfo.info.otherSide.cardImage&&!cardInfo.info.hold.cardImage)"
        >
          <Title :title="cardInfo.title"/>
          <Card
            :info="cardInfo.info.fullFace"
            :usrOnlyId="usrOnlyId"
            :isPower="isPower"
            :error="error"
            :modify="isModify"
            v-if="!(!isModify&&!cardInfo.info.fullFace.cardImage)"
          />
          <Card
            :info="cardInfo.info.otherSide"
            :usrOnlyId="usrOnlyId"
            :isPower="isPower"
            :error="error"
            :modify="isModify"
            v-if="!(!isModify&&!cardInfo.info.otherSide.cardImage)"
          />
          <Card
            :info="cardInfo.info.hold"
            :usrOnlyId="usrOnlyId"
            :isPower="isPower"
            :error="error"
            :modify="isModify"
            v-if="!(!isModify&&!cardInfo.info.hold.cardImage)"
          />
        </div>
      </div>

      <div
        class="control-spread"
        @click="isSpread=!isSpread"
        v-if="!(!isModify&&!cardInfo.info.fullFace.cardImage&&!cardInfo.info.otherSide.cardImage&&!cardInfo.info.hold.cardImage&&!storeInfo.info.shopSign&&!zgInfo.info.id)"
      >
        <div v-if="!isSpread" class="spread-text non-exist-spread-main">
          <span>展开选填信息</span>
          <span class="icon"></span>
        </div>

        <div v-if="isSpread" class="spread-text exist-spread-main">
          <span>收起选填信息</span>
          <span class="icon"></span>
        </div>
      </div>

      <div class="submit" v-if="isModify" @click="submit">提交审核</div>

      <!-- 兼容iPhone X -->
      <div class="seize"></div>
    </section>
    <RunType
      ref="_runType"
      v-on:onRunTypeCall="onRunTypeCall"
      :lists="originalRunType"
      :select="runtype"
      v-if="false"
    />
    <mt-popup v-model="popupVisible" position="bottom" :closeOnClickModal="false">
      <mt-picker :slots="slots" value-key="name" :showToolbar="true" @change="onValuesChange">
        <Slot>
           <div class="confirmKey">
              <div class="conf conf_close" @click="closePopup">取消</div>
              <div class="conf conf_sureArea" @click="sureArea">确定</div>
          </div>
        </Slot>
      </mt-picker> 
    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Toast } from "mint-ui"
import "mint-ui/lib/style.css"
import Header from "../../components/header/header.vue"
import Title from "./groups/title.vue"
import Card from "./groups/card.vue"
import RunType from "../runtype/runtype.vue"
import popBottom from "../../components/popBottom.vue"
import {
  getUsrOnlyId,
  findVpsImgByH5,
  getStreetMsgByH5,
  updateNewVpsYzgStoreMessageByH5,
  submitVpsImgByH5,
  listProfessionInfo,
  getNewRegionInfo
} from "../../service/api";
import {
  getJSON,
  isYZG,
  isAndroid,
  closeYZG,
  getSearchString,
  getAxiosPostJSON,
  getClokie,
  jsonp
} from "../../tools";
import Validator from "../../tools/validator";
import config from "../../config";
import store from "../../store";

// 获取店铺信息
var getStoreInfo = function () {
  return new Promise((resolve, reject) => {
    getJSON(findVpsImgByH5, {
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
};

// 获取街道
var getStreet = function () {
  return new Promise((resolve, reject) => {
    getJSON(getStreetMsgByH5, {
      success: result => {
        console.log('街道',result)
        const { returnCode, data } = result;
        resolve(data);
      },
      error: result => {
        reject(result);
      }
    });
  });
};

// 获取getUsrOnlyId
var getUsrID = function () {
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
};

// 获取主营行业
const getRunType = function () {
  return new Promise((resolve, reject) => {
    getJSON(
      listProfessionInfo,
      { jsonp: "jsonpCallback" },
      {
        success: data => {
          if (data.returnCode == "0000") {
            data = data.returnMessage;
            let fast = {
              name: "快速选择",
              id: 0,
              subProfessions: []
            };
            let dict = [
              { id: 2, name: "便利店超市" },
              { id: 12, name: "母婴用品店" },
              { id: 11, name: "服装鞋帽店" },
              { id: 3, name: "生鲜果蔬店" },
              { id: 9, name: "零食店" },
              { id: 31, name: "餐馆" },
              // {id: 54, name: '通讯店'},
              { id: 22, name: "网吧" },
              // {id: 13, name: '花鸟店铺'},
              { id: 36, name: "面包糕点店" }
            ];
            dict.map(d => {
              data.map(v => {
                let subProfessions = v.subProfessions;
                subProfessions.map(s => {
                  if (s.id == d.id || s.name == d.name) {
                    fast.subProfessions.push(s);
                  }
                });
              });
            });
            data = [...[fast], ...data];
            resolve(data);
          } else {
            reject(result);
          }
        },
        error: result => {
          reject(result);
        }
      }
    );
  });
};

export default {
  name: "store",
  data() {
    return {
      handler(e){e.preventDefault();}, //阻止body滑动
      popupVisible: false, // 选择地区显示
      flag:false, //初始时禁止picker自动加载
      areaValue: "",  // 最终选择的地址
      areaName: "", // 页面显示的地址
      allCode: {
        provinceCode: "",
        cityCode: "",
        areaCode: ""
      }, // 所选地区的ciode
      slots: [
        {
          flex: 1,
          values: ["请选择"],
          defaultIndex:3,
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: ["请选择"],
          defaultIndex:0,
          className: 'slot3',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot4'
        }, {
          flex: 1,
          values: ["请选择"],
          defaultIndex:0,
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      title: "店铺证件",
      isYZG: isYZG,
      usrOnlyId: "",
      isSpread: false,
      isPower: true, // 相机权限
      input: false,
      tip: "当前您的状态为",
      tips: [
        '带<span class="star">*</span>的必须上传证件',
        "进入审核后不可修改；如有信息错误，请联系客服沟通解决",
        "若要开通掌柜码功能，须补全选填信息"
      ],
      error: false,
      cardStatus: 100, // 图片状态  0 未审核  1 待审核 2 复审通过 3复审退回 4 初审通过 5 初审退回
      isModify: false,
      isFirstSubmit: true,
      statusText: [
        "未审核",
        "待审核",
        "复审通过",
        "复审退回",
        "初审通过",
        "初审退回"
      ],
      placeRegionalObject: {
        "0": "请选择所在城乡区域",
        "111": "主城区",
        "112": "城乡结合区",
        "121": "镇中心区",
        "122": "镇乡结合区",
        "123": "特殊区域",
        "210": "乡中心区",
        "220": "村庄"
      },
      agent: {
        title: '请选择代理业务',
        isMultipleSelect: true,
        lists: [{ label: '无', value: '' }, { label: '手机充值', value: '1' }, { label: '生活缴费', value: '2' }, { label: '快递收寄', value: '3' }, { label: '文印', value: '4' }, { label: '报刊邮品', value: '5' }, { label: '彩票', value: '6' }, { label: '交通代订', value: '7' }, { label: '酒店代订', value: '8' }, { label: '旅游服务', value: '9' }, { label: '劳务中介', value: '10' }, { label: '金融服务', value: '11' }, { label: '三农产品服务', value: '12' }, { label: '积分兑换', value: '13' }],
        showPop: false,
        value: '',
        initValue: [],//初始化时选中的项
      },
      streetMap: [],
      zgInfo: {
        title: "掌柜信息",
        info: {
          name: "",
          id: ""
        }
      },
      storeInfo: {
        title: "店铺信息",
        info: {
          name: "",
          adds: "",
          street: "",
          streetName: "",
          placeRegional: "",
          placeRegionalName: "",
          detailedAdds: "",
          zipCode: "",
          shopSign: "",
          registerLicenseName: "",
          agent: "",
          addsshow: 0,
        }
      },
      originalRunType: [],
      runtype: {},
      isUseRunType: false,
      cardInfo: {
        title: "证件信息",
        info: {
          businessLicense: {
            key: "busLience",
            title: '<span class="star">*</span>营业执照照片',
            example: require("../../images/store/bus_lience.png"),
            cardImage: ""
          },
          facade: {
            key: "store",
            title: '<span class="star">*</span>门面照片',
            example: require("../../images/store/store.png"),
            cardImage: ""
          },
          cashier: {
            key: "cashierDesk",
            title: '<span class="star">*</span>收银台照片',
            example: require("../../images/store/cashier.png"),
            cardImage: ""
          },
          environment: {
            key: "shopInside",
            title: '<span class="star">*</span>店铺内环境照片',
            example: require("../../images/store/environment.png"),
            cardImage: ""
          },
          shelves: {
            key: "storeInner",
            title: '<span class="star">*</span>货架照片',
            example: require("../../images/store/store_inner.png"),
            cardImage: ""
          },
          fullFace: {
            key: "certPos",
            title: "身份证正面照片",
            example: require("../../images/store/full_face.png"),
            cardImage: ""
          },
          otherSide: {
            key: "certNeg",
            title: "身份证反面照片",
            example: require("../../images/store/other_side.png"),
            cardImage: ""
          },
          hold: {
            key: "certHold",
            title: "手持身份证照片",
            example: require("../../images/store/hold.png"),
            cardImage: ""
          }
        }
      }
    };
  },
  components: {
    Header,
    Title,
    Card,
    RunType,
    popBottom,
  },
  methods: {
    focus() {
      this.input = true;
    },
    blur() {
      this.input = false;
    },
    selectedRunType() {
      if (!this.isModify || this.isUseRunType) return null;
      if (this.originalRunType.length) {
        store.dispatch("setCurrParams", this.runtype);
        this.$refs._runType.show();
      } else {
        Toast({
          message: "正在加载主营行业",
          position: "bottom",
          duration: 3000
        });
      }
    },
    selectAgentBusiness() {
      // console.log('1');
      if (!this.isModify) return null;
      this.agent.showPop = true
    },
    hidePop() {
      this.agent.showPop = false
    },
    getAgent(val) {
      console.log(val);
      if (val.length === 0) {
        this.storeInfo.info.agent = ''
        this.agent.value = ''
        return
      }
      if (val && val[0].value === '') {
        console.log(this.storeInfo.info.agent);
        this.storeInfo.info.agent = ''
        this.agent.value = '无'
        return
      }
      let agent = ''
      val.forEach(v => {
        this.agent.lists.forEach(item => {
          // console.log(item.value, v, item.label);
          if (item.value === v) {
            agent += item.label + ','
          }
        })
      })
      agent = agent.substring(0, agent.length - 1)
      console.log(agent);
      this.agent.value = agent
      this.storeInfo.info.agent = val.join(',')
      console.log(this.storeInfo.info.agent);
    },
    onRunTypeCall(result) {
      this.runtype = result;
    },
    submit() {
      // 防重提交
      if (!this.isFirstSubmit) return false;
      this.isFirstSubmit = false;
      const zgInfo = this.zgInfo.info;
      const storeInfo = this.storeInfo.info;
      const cardInfo = this.cardInfo.info;
      const name = zgInfo.name;
      const idCard = zgInfo.id;

      const storeName = storeInfo.name;
      const villageDecca = storeInfo.shopSign;
      const registerLicenseName = storeInfo.registerLicenseName;
      const addrDetail = storeInfo.detailedAdds;
      const postalCode = storeInfo.zipCode;
      const streetCode = storeInfo.street;
      const streetName = storeInfo.streetName;
      const placeRegional = storeInfo.placeRegional;
      const agentBusiness = storeInfo.agent;
      const adds = storeInfo.adds

      const mainBusiness1 = this.runtype.id;
      const mainBusiType = this.runtype.mainBusiType;
      const agent = this.agent.value
      console.log('agent.length', agent.length);
      const {
        businessLicense,
        facade,
        environment,
        cashier,
        shelves
      } = cardInfo;

      const { provinceCode, cityCode, areaCode} = this.allCode;
      const validator = new Validator();
      validator.add(name, [
        { strategy: "isNonEmpty", errorMsg: "姓名不能为空" },
        { strategy: "maxLength:10", errorMsg: "姓名不能大于10位" }
      ]);
      validator.add(storeName, [
        { strategy: "isNonEmpty", errorMsg: "店铺名称不能为空" },
        { strategy: "maxLength:20", errorMsg: "店铺名称不能大于20位" }
      ]);
      validator.add(villageDecca, [
        { strategy: "isNonEmpty", errorMsg: "店铺招牌不能为空" },
        { strategy: "maxLength:20", errorMsg: "店铺招牌不能大于20位" }
      ]);
      validator.add(registerLicenseName, [
        { strategy: "isNonEmpty", errorMsg: "执照注册姓名不能为空" },
        { strategy: "maxLength:20", errorMsg: "执照注册姓名不能大于20位" }
      ]);
      validator.add(mainBusiness1, [
        { strategy: "isNonEmpty", errorMsg: "请选择主营行业" }
      ]);
      validator.add(agent, [
        { strategy: "isNonEmpty", errorMsg: "请选择代理业务" }
      ]);
      validator.add(placeRegional, [
        { strategy: "isNonEmpty", errorMsg: "请选择所在城乡区域" },
        { strategy: "isReally", errorMsg: "请选择所在城乡区域" }
      ]);
      validator.add(adds, [
        { strategy: "isNonEmpty", errorMsg: "请选择所在地区" }
      ])
      validator.add(addrDetail, [
        { strategy: "isNonEmpty", errorMsg: "详细地址不能为空" },
        { strategy: "maxLength:40", errorMsg: "详细地址不能大于40位" }
      ]);
      validator.add(postalCode, [
        { strategy: "isNonEmpty", errorMsg: "邮政编号不能为空" },
        { strategy: "isPostal", errorMsg: "请输入正确的邮政编号" }
      ]);
      validator.add(businessLicense.cardImage, [
        { strategy: "isNonEmpty", errorMsg: "请选择营业执照照片" }
      ]);
      validator.add(facade.cardImage, [
        { strategy: "isNonEmpty", errorMsg: "请选择门面照片" }
      ]);
      validator.add(environment.cardImage, [
        { strategy: "isNonEmpty", errorMsg: "请选择店铺内环境照片" }
      ]);
      validator.add(cashier.cardImage, [
        { strategy: "isNonEmpty", errorMsg: "请选择收银台照片" }
      ]);
      validator.add(shelves.cardImage, [
        { strategy: "isNonEmpty", errorMsg: "请选择货架照片" }
      ]);

      idCard &&
        validator.add(idCard, [
          { strategy: "ID", errorMsg: "请输入正确的身份证" }
        ]);

      const errorMsg = validator.start();
      if (errorMsg) {
        this.isFirstSubmit = true;
        Toast({ message: errorMsg, position: "bottom", duration: 3000 });
        return false;
      } else {

        const params = {
          name,
          idCard,
          storeName,
          villageDecca,
          registerLicenseName,
          addrDetail,
          postalCode,
          streetCode,
          streetName,
          mainBusiness1,
          mainBusiType,
          placeRegional,
          agentBusiness,
          provinceCode,
          cityCode,
          areaCode
        };
        console.log(params);
        const submitInfo = callback => {
          getJSON(updateNewVpsYzgStoreMessageByH5, params, {
            success: result => {
              console.log(result);
              const { returnCode, data, returnMessage } = result;
              if (returnCode == "0000") {
                callback && callback();
              } else {
                this.isFirstSubmit = true;
                Toast({
                  message: returnMessage,
                  position: "bottom",
                  duration: 3000
                });
              }
            },
            error: result => {
              const { returnMessage } = result;
              this.isFirstSubmit = true;
              Toast({
                message: returnMessage,
                position: "bottom",
                duration: 3000
              });
            }
          });
        };

        const submitImage = callback => {
          getJSON(submitVpsImgByH5, {
            success: result => {
              const { returnCode, data, returnMessage } = result;
              if (returnCode == "0000") {
                callback && callback();
              } else {
                this.isFirstSubmit = true;
                Toast({
                  message: returnMessage,
                  position: "bottom",
                  duration: 3000
                });
              }
            },
            error: result => {
              const { returnMessage } = result;
              this.isFirstSubmit = true;
              Toast({
                message: returnMessage,
                position: "bottom",
                duration: 3000
              });
            }
          });
        };

        submitInfo(() => {
          submitImage(() => {
            this.isModify = false;
            this.tips[3] = this.tip + this.statusText[1];
            if (this.isYZG) {
              const content = '{"key":"getStepData"}';
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
            } else {
              window.history.go(-1);
            }
          });
        });
      }
    },
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

    // 设置相机权限
    setCameraPower() {
      const self = this;
      const appVersionNo = parseInt(getClokie("appVersionNo") || 0);
      if (appVersionNo >= 340) {
        if (isAndroid) {
          dsBridge &&
            dsBridge.call("ulePermission", "android.permission.CAMERA", val => {
              self.isPower = !!+val;
            });
        } else {
          bridge &&
            bridge.call("ulePermission", { msg: "camera" }, val => {
              self.isPower = !!+val;
            });
        }
      }
    },
    /////////
    // 打开选择地址弹窗
    setAddrs() {
      this.popupVisible = true;
      this.flag=true;
    },
    // 选择地区
    onValuesChange(picker, values) {
      let that = this;
      let timer;
      // values[0]
      if(values[0]){
        that.locationAddr(values[0]["code"]).then(function(data){ //通过一级 省的id 获取市的列表
        picker.setSlotValues(1,data);//将市的地区列表放入 areaList的二级列表中
        });
          that.locationAddr(values[1]["code"]).then(function(data){//通过 二级 市的id  获取区域的列表
          picker.setSlotValues(2,data);//将区的地区列表放入 areaList的三级列表中
        });
        let arr = picker.getValues();
        // console.log('arr',arr)
        let province = arr[0].name ? arr[0].name : '请选择';
        let city = arr[1] ? arr[1].name : '';
        let area = arr[2] ? arr[2].name : '';
        that.areaName = province + " " + city + " " + area;
          that.allCode.provinceCode = arr[0] ? arr[0].code : '',
          that.allCode.cityCode = arr[1] ? arr[1].code : '',
          that.allCode.areaCode = arr[2] ? arr[2].code : ''
        if(this.storeInfo.info.addsshow) {
          that.areaName = province + " " + city + " " + area;
          that.allCode.provinceCode = arr[0] ? arr[0].code : '',
          that.allCode.cityCode = arr[1] ? arr[1].code : '',
          that.allCode.areaCode = arr[2] ? arr[2].code : ''
        }
        
        
      }
    },
    sureArea () { // 选择地址确认
    console.log(this.areaName);
      this.storeInfo.info.adds = this.areaName;
      this.popupVisible = false;
      this.loadStreet()
    },
    closePopup (){ // 选择地址取消
      this.popupVisible = false;
    },
    // 加载四级地址
    loadStreet() {
      // console.log('isModify',this.isModify)
      const { areaCode } = this.allCode;
      getJSON(getStreetMsgByH5, {areaCode: areaCode}, {
        success: result => {
          console.log('四级地址',result)
          const { returnCode, data } = result;
          if(returnCode == '0000') {
            this.streetMap = data
          }
        },
        error: result => {

        }
      });
    },
    // 获取选中的四级地址
    getVendorId (val) {
      // var myselect=document.getElementById("sendSybol");
      // var index=myselect.selectedIndex;
      // var name = myselect.options[index].text;
      this.storeInfo.info.streetName = val.target.selectedOptions[0].label

    },
    locationAddr (id) {
      let that = this;
      return new Promise((resolve, reject) => {
        let o = {
          code: id
        }
        jsonp(getNewRegionInfo, o,{
          success: data => {
            if (data.returnCode == '0000') {
              resolve(data.regionInfos)
            } else {
              Toast({
                message: data.returnMessage,
                position: "bottom",
                duration: 3000
              });
            }
          },
          error: res =>{
            Toast({
              message: '访问的小伙伴太多,请稍后重试',
              position: "bottom",
              duration: 3000
            });
            reject(res)
          }
        })
      });
    },
    closeTouch () {
      document.getElementsByTagName("body")[0].addEventListener('touchmove',
      this.handler,{passive:false});//阻止默认事件
    },
    openTouch () {
      document.getElementsByTagName("body")[0].removeEventListener('touchmove',
      this.handler,{passive:false});//打开默认事件
    },
    initLoctionAddr() {
      let that = this;
      let country = {
          rank: 1,
          code: '0086'
        }
      jsonp(getNewRegionInfo, country, {
        success: data => {
          if (data.returnCode == '0000') {
            that.slots[0].values=data.regionInfos;
          } else {
            Toast({
              message: data.returnMessage,
              position: "bottom",
              duration: 3000
            });
          }
        },
        error: () => {
          Toast({
            message: '访问的小伙伴太多,请稍后重试',
            position: "bottom",
            duration: 3000
          });
        }
      });
    }
  },
  beforeMount() {
    
  },
  watch:{
    popupVisible (newvs,oldvs) {  //判断选择地区弹窗的状态
      if(newvs){ //如果areaVisible的值为true,说明弹窗出现
        this.closeTouch(); //阻止body滑动
      }else{ //如果areaVisible的值为false，说明弹窗隐藏
        this.openTouch();//恢复body滑动
      }
    },
  },
  /////
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "double-bounce"
    });
    const _mate = (items, id) => {
      items.map(item => {
        item.subProfessions.map(sp => {
          if (sp.id == parseInt(id)) {
            this.runtype = sp;
          }
        });
      });
    };
    this.setCameraPower();
    Promise.all([getStoreInfo(), getStreet(), getUsrID(), getRunType()])
      .then(result => {
        const [storeInfo, street, usrInfo, runType] = result;
        const {
          checkStatus,
          userInfo = {},
          busLience = {},
          store = {},
          certPos = {},
          shopInside = {},
          cashierDesk = {},
          storeInner = {},
          storePropertyType = {},
          certNeg = {},
          certHold = {}
        } = storeInfo;
        const {
          usrName,
          stationName,
          orgProvinceName,
          placeRegional,
          orgCityName,
          orgAreaName,
          stationAddress,
          villageDecca,
          villageCode,
          certNo,
          postalCode,
          villageName,
          registerLicenseName,
          agentBusiness,
          provinceCode,
          cityCode,
          areaCode
        } = userInfo || {};
        const { usrOnlyId } = usrInfo || {};

        switch (checkStatus) {
          case 1:
          case 4:
            this.isModify = false;
            break;
          default:
            this.isModify = true;
        }
        // 代理业务
        if (agentBusiness !== undefined && agentBusiness !== null) {
          // console.log('agentBusiness', agentBusiness);
          var agentArr = agentBusiness.split(',')
          console.log('agentArr', agentArr);
          if (agentArr[0] === '') {
            agentArr.forEach(v => {
              var temp = this.agent.lists.filter(item => item.value === v)
              this.agent.initValue.push(temp[0])
              this.storeInfo.info.agent = ''
            })
          } else {
            this.agent.initValue = agentArr
            this.storeInfo.info.agent = agentBusiness
          }
          // console.log('this.agent.initValue', this.agent.initValue);
          // console.log(this.agent.initValue);
          if (agentBusiness === '') {
            this.agent.value = '无'
          } else {
            var agentTxt = ''
            this.agent.value = agentArr.forEach(v => {
              this.agent.lists.forEach(item => {
                if (item.value === v) {
                  agentTxt += item.label + ','
                }
              })
            })
            agentTxt = agentTxt.substr(0, agentTxt.length - 1)
            this.agent.value = agentTxt
          }
        }

        this.cardStatus = checkStatus;
        this.zgInfo.info.name = usrName;
        this.zgInfo.info.id = certNo;

        this.storeInfo.info.name = stationName;
        this.storeInfo.info.placeRegional = placeRegional || "0";
        this.storeInfo.info.placeRegionalName = this.placeRegionalObject[
          placeRegional || "0"
        ];
        if (orgProvinceName == '' && orgCityName == '' && orgAreaName == '') {
          this.storeInfo.info.adds = ''
          this.storeInfo.info.addsshow = 1
        } else {
          this.storeInfo.info.adds = orgProvinceName + " " + orgCityName + " " + orgAreaName;
          this.allCode.provinceCode = provinceCode;
          this.allCode.cityCode = cityCode;
          this.allCode.areaCode = areaCode;
        }


        const streetCode = street ? street[0].code : "";
        const streetName = street ? street[0].name : "";
        this.storeInfo.info.street = villageCode || streetCode;
        this.storeInfo.info.streetName =
          this.isModify && !villageName ? streetName : villageName;

        this.storeInfo.info.detailedAdds = stationAddress;
        this.storeInfo.info.zipCode = postalCode;
        this.storeInfo.info.shopSign = villageDecca;
        this.storeInfo.info.registerLicenseName = registerLicenseName;

        this.cardInfo.info.businessLicense.cardImage = busLience.photoUrl; // 营业执照照片
        this.cardInfo.info.facade.cardImage = store.photoUrl; // 门面照片
        this.cardInfo.info.environment.cardImage = shopInside.photoUrl; //店铺内环境照片
        this.cardInfo.info.cashier.cardImage = cashierDesk.photoUrl; // 收银台照片
        this.cardInfo.info.shelves.cardImage = storeInner.photoUrl; // 货架照片

        this.cardInfo.info.fullFace.cardImage = certPos.photoUrl; // 身份证正面
        this.cardInfo.info.otherSide.cardImage = certNeg.photoUrl; // 身份证反面
        this.cardInfo.info.hold.cardImage = certHold.photoUrl; // 手持身份证照片

        this.streetMap = street;
        this.usrOnlyId = usrOnlyId;

        this.tips[3] = this.tip + this.statusText[checkStatus];

        const runTypeID = userInfo.mainBusiness1 || "";
        this.isUseRunType = runTypeID;
        _mate(runType, runTypeID);
        this.originalRunType = runType;
        Indicator.close();
        this.initLoctionAddr();
      })
      .catch(result => {
        Indicator.close();
        const { returnMessage } = result;
        Toast({
          message: returnMessage,
          position: "bottom",
          duration: 3000
        });
        this.error = true;
        if(this.streetMap){
          this.isModify = true;  
        } else {
          console.log('0000000')
          this.isModify = false;
        }
        
      });
  }
};
</script>

<style scoped lang="scss">
.isRed {
  color: red;
  font-size: 12px;
}
.confirmKey{
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #dadada;
  .conf{
    width: 75px;
    height: 100%;
    line-height: 40px;
    text-align: center;
    display: inline-block;
    &.conf_close{
    color: #666;
    float: left;
  }
    &.conf_sureArea{
      color: #f13a3c;
      float: right;
    }
  }
  
}
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

  section.content {
    position: absolute;
    min-width: 100%;
    max-width: 100%;
    top: 0px;
    padding: 50px 0 0px 0;
    background-color: #f5f5f5;
  }
  ul.tips {
    padding: 10px 10px 0px 10px;
    font-size: 14px;

    li {
      position: relative;
      line-height: 24px;
      padding-left: 20px;
      color: #333;
      .star {
        font-size: 15px;
        line-height: 22px;
        color: #f13a3c;
      }
    }

    li::before {
      position: absolute;
      content: "";
      width: 16px;
      height: 16px;
      left: 0;
      top: 2px;
      background: url("../../images/store/store_icon.png") no-repeat;
      background-size: 16px;
    }
  }

  ul.items {
    li.item {
      position: relative;
      display: flex;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      font-size: 14px;
      color: #666;
      background-color: #fff;

      div.label {
        position: relative;
        height: 100%;
        width: 92px;
        // text-align: justify;
        display: inline;
        padding-left: 12px;
        font-weight: bold;
        .star {
          position: absolute;
          left: 0px;
          top: 0px;
          color: #f13a3c;
          font-size: 14px;
          height: 46px;
          line-height: 52px;
          font-style: normal;
        }
      }

      div.label:after {
        display: inline-block;
        content: "";
        padding-left: 100%;
      }
      div.content {
        flex: 1;
        position: relative;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        input {
          position: relative;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          color: #666;
          font-size: 14px;
          background-color: #fff;
        }
        select {
          position: relative;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          color: #666;
          font-size: 14px;
        }
        span {
          display: block;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .setaddrs{
          width: 100%;
          height: 100%;
         background-color: #fff;
        }
      }
      div.placeholder {
        color: #a2a2a2;
      }
    }

    li.adds {
      // padding-top: 30px;
      flex-direction: column;
      height: 80px;
      .tip {
        position: initial;
        height: 30px;
        line-height: 30px;
        padding: 0px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    div.tip {
      position: absolute;
      top: 4px;
      left: 10px;
      line-height: 18px;
      font-size: 12px;
      color: red;
    }
  }

  div.tip {
    line-height: 18px;
    font-size: 12px;
    color: red;
    padding: 4px 0px 0px 22px;
    background-color: #fff;
  }

  .store-info {
    li.item {
      border-bottom: 1px solid #e3e3e3;
    }
    li.zip-code {
      border-bottom: 0;
    }
  }

  .card-info {
    div.cards {
      border-bottom: 1px solid #e3e3e3;
    }
    div.last-one {
      border-bottom: 0;
    }
  }

  .spread-content {
    display: none;
  }
  .spread {
    display: block;
  }

  div.control-spread {
    margin: 10px;
    height: 48px;
    color: #666;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #e3e3e3;

    .spread-text {
      display: flex;
      flex: 1;
      height: 100%;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      span.icon {
        display: inline-block;
        width: 14px;
        height: 20px;
        margin-left: 5px;
      }
    }
    .non-exist-spread-main {
      span.icon {
        background: url("../../images/store/lower.png") no-repeat center;
        background-size: 100%;
      }
    }
    .exist-spread-main {
      span.icon {
        background: url("../../images/store/upper.png") no-repeat center;
        background-size: 100%;
      }
    }
  }
  div.submit {
    // position: fixed;
    width: 100%;
    height: 50px;
    line-height: 50px;
    bottom: 0px;
    left: 0px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background-color: #f13a3c;
  }
}

div.input-open {
  .header {
    position: absolute;
  }
}

@media screen and (device-width: 375px) and (device-height: 812px) {
  div.store div.seize {
    // position: fixed;
    width: 100%;
    height: 34px;
  }
}
</style>
