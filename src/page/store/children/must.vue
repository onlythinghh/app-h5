<template>
  <div class="must-box">
    <yzg-input
      :label="name.label"
      :hidden="name.hidden"
      :maxLength="name.maxlength"
      :disabled="name.disabled || checkStatus"
      :placeholder="name.placeholder"
      v-model="name.value"
    />

    <yzg-input
      :label="storeName.label"
      :hidden="storeName.hidden"
      :disabled="storeName.disabled || checkStatus"
      :placeholder="storeName.placeholder"
      v-model="storeName.value"
    />

    <yzg-input
      :label="storeSignName.label"
      :hidden="storeSignName.hidden"
      :disabled="storeSignName.disabled || checkStatus"
      :placeholder="storeSignName.placeholder"
      v-model="storeSignName.value"
    />

    <yzg-input
      :label="licenseName.label"
      :hidden="licenseName.hidden"
      :disabled="licenseName.disabled || checkStatus"
      :placeholder="licenseName.placeholder"
      v-model="licenseName.value"
    />

    <yzg-select
      :label="mainBusiness.label"
      :hidden="mainBusiness.hidden"
      :disabled="mainBusiness.disabled || checkStatus"
      :other="mainBusiness.other"
      :placeholder="mainBusiness.placeholder"
      :onClick="onSelectMainCamp"
      v-model="mainBusiness.value"
    />

    <yzg-select
      :label="agencyBusiness.label"
      :hidden="agencyBusiness.hidden"
      :disabled="agencyBusiness.disabled || checkStatus"
      :gather="agencyBusiness.gather"
      :placeholder="agencyBusiness.placeholder"
      v-model="agencyBusiness.value"
    />

    <yzg-select
      :label="urbanAndRural.label"
      :hidden="urbanAndRural.hidden"
      :disabled="urbanAndRural.disabled || checkStatus"
      :gather="urbanAndRural.gather"
      :single="urbanAndRural.single"
      :placeholder="urbanAndRural.placeholder"
      v-model="urbanAndRural.value"
    />

    <yzg-select
      :label="region.label"
      :hidden="region.hidden"
      :disabled="region.disabled || checkStatus"
      :tips="region.tips"
      :other="region.other"
      :placeholder="region.placeholder"
      :onClick="onSelectRegion"
      v-model="region.value"
    />

    <yzg-select
      :label="street.label"
      :hidden="street.hidden"
      :disabled="street.disabled || checkStatus"
      :placeholder="street.placeholder"
      :gather="street.gather"
      :single="street.single"
      v-model="street.value"
    />

    <yzg-input
      :label="detailedAddress.label"
      :maxLength="detailedAddress.maxlength"
      :hidden="detailedAddress.hidden"
      :disabled="detailedAddress.disabled || checkStatus"
      :placeholder="detailedAddress.placeholder"
      v-model="detailedAddress.value"
    />

    <yzg-input
      :label="postalNumber.label"
      :maxLength="postalNumber.maxlength"
      :hidden="postalNumber.hidden"
      :disabled="postalNumber.disabled || checkStatus"
      :placeholder="postalNumber.placeholder"
      v-model="postalNumber.value"
    />
    <!-- <yzg-radio :name="tagRadios" /> -->
    <div class="Radio-box">
      <ul class="tabs">
        <li class="title">营业证明照片性质</li>
        <li class="tab wallet" :class="{'tab-on': tagRadios == '1'}" @click="onRadioTab('1')">
          <i class="icon"></i>营业执照
        </li>
        <li class="tab bank-card" :class="{'tab-on': tagRadios == '2'}" @click="onRadioTab('2')">
          <i class="icon"></i>营业证明
        </li>
      </ul>
    </div>
    <card
      :vkey="businessLicense.key"
      :label="businessLicense.label"
      :example="businessLicense.example"
      :hidden="businessLicense.hidden"
      :disabled="businessLicense.disabled || checkStatus"
      v-model="businessLicense.images"
    />

    <card
      :vkey="facade.key"
      :label="facade.label"
      :example="facade.example"
      :hidden="facade.hidden"
      :disabled="facade.disabled || checkStatus"
      v-model="facade.images"
    />

    <!-- <card
      :vkey="internalEnvironment.key"
      :label="internalEnvironment.label"
      :example="internalEnvironment.example"
      :hidden="internalEnvironment.hidden"
      :disabled="internalEnvironment.disabled || checkStatus"
      v-model="internalEnvironment.images"
    />

    <card
      :vkey="cashier.key"
      :label="cashier.label"
      :example="cashier.example"
      :hidden="cashier.hidden"
      :disabled="cashier.disabled || checkStatus"
      v-model="cashier.images"
    />

    <card
      :vkey="goodsShelves.key"
      :label="goodsShelves.label"
      :example="goodsShelves.example"
      :hidden="goodsShelves.hidden"
      :disabled="goodsShelves.disabled || checkStatus"
      v-model="goodsShelves.images"
    /> -->

    <adds ref="adds" v-model="adds"/>
    <Button v-if="!checkStatus" :text="'提交审核'" :onEvent="onSubmit"></Button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../card";
import Button from "../button";
import Adds from "../adds";
import { submit } from "../submit";
import {
  getStreetMsgByH5,
} from "../../../service";

export default {
  name: "must",
  components: {
    Adds,
    Card,
    Button
  },
  data() {
    return {
      adds: {},
      tagRadios: "1",
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
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
      "address",
      "tagRadio",
      "examineStatus",
      "auditStatus",
    ])
  },
  methods: {
    ...mapActions(["updateAddress", "updatetagRadioStatus", "updates",]),

    onSelectMainCamp() {
      this.$router.push("/runtype");
    },
    onSelectRegion() {
      this.$refs.adds.open();
    },
    onRadioTab(val) {
      if (this.examineStatus == 1 || this.examineStatus == 4 || this.auditStatus == 4 || this.auditStatus == '2') {
        return false;
      } else {
        this.tagRadios = val;
        this.updatetagRadioStatus(val);
      }
    },
    onSubmit() {
      submit(this);
    },

    init() {
      const newradio = this.tagRadio || '1'
      this.tagRadios = newradio;
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    adds(newValue) {
      // console.log('更新', newValue)
      let {province, city, area } = newValue
      let provinceCode = province.code;
      let cityCode = city.code;
      let areaCode = area.code;
      this.updateAddress(newValue);
      let regionParams = {
        value: [
          {
            value: "1",
            label: `${province.name} ${city.name} ${area.name}`
          }
        ],
        provinceCode,
        cityCode,
        areaCode,
        // disabled: true
      };
      this.updates({
        key: "region",
        infos: regionParams
      });
      let data = {areaCode:areaCode}
      getStreetMsgByH5(data).then(result => {
        const { returnCode, data } = result;
        if (returnCode == "0000" && data) {
          const tempArray = data.map(item => {
            return { value: item.code, label: item.name };
          });
          this.$store.dispatch("updateStreet", { gather: tempArray });
        }
      });
    },
    tagRadio: {
      handler(newValue) {
        this.tagRadios = newValue
        if (newValue == '2') {
          this.onRadioTab(newValue)
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.must-box {
  background-color: #fff;
}

.label-wrong {
  color: #999;
  font-size: 12px;
}
.Radio-box {
  background-color: #fff;
  ul.tabs {
    display: flex;
    height: 46px;
    line-height: 46px;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    li.title {
      font-size: 14px;
      color: #333;
    }
    li.tab {
      flex: 1;
      font-size: 14px;
      padding: 0 20px 0 35px;
      list-style: none;
      position: relative;
    }

    li.tab .icon {
      position: absolute;
      width: 15px;
      height: 15px;
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
</style>