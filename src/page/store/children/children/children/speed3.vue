<template>
  <div class="speed3">
    <yzg-radios
      :title="'执照类型'"
      :list="radiosData"
      :dftcur="licenseType.value"
      @setRadio="onRadioTab"
    />
    <yzg-input
      :label="businessNumber.label"
      :hidden="businessNumber.hidden"
      :disabled="businessNumber.disabled || checkStatus"
      :placeholder="businessNumber.placeholder"
      v-model="businessNumber.value"
    />

    <validity />
    <div v-show="licenseType.value == '1'">
      <yzg-input
        :label="taxationCode.label"
        :hidden="taxationCode.hidden"
        :disabled="taxationCode.disabled || checkStatus"
        :placeholder="taxationCode.placeholder"
        v-model="taxationCode.value"
      />
      <term-validity
        :dateObj="taxExpiredTermValidity"
        @setLongTermEvent="setLongTermEvent"
        @setDateEvent="setDateEvent"
      ></term-validity>
    </div>

    <yzg-input
      type="textarea"
      :label="businessScope.label"
      :hidden="businessScope.hidden"
      :disabled="businessScope.disabled || checkStatus"
      :placeholder="businessScope.placeholder"
      v-model="businessScope.value"
      :maxLength="50"
    />

    <card
      v-show="licenseType.value == '1'"
      :vkey="taxationPic.key"
      :label="taxationPic.label"
      :example="taxationPic.example"
      :hidden="taxationPic.hidden"
      :disabled="taxationPic.disabled || checkStatus"
      v-model="taxationPic.images"
    />

    <card
      :vkey="outdoorScene.key"
      :label="outdoorScene.label"
      :example="outdoorScene.example"
      :hidden="outdoorScene.hidden"
      :disabled="outdoorScene.disabled || checkStatus"
      v-model="outdoorScene.images"
    />
    
    <card
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
    />
    <div class="authorize-yzs" v-if="!checkStatus">
      <div
        class="checkbox"
        :class="{ on: authorize }"
        @click="authorize = !authorize"
      >
        <i class="icon"></i>
      </div>
      <span>我授权给邮助手填写的功能</span>
    </div>

    <div class="treaty-box" v-if="!checkStatus">
      <div class="checkbox" :class="{ on: treaty }" @click="treaty = !treaty">
        <i class="icon"></i>
      </div>
      <span>
        我接受
        <span class="treaty" @click="onScanCode"
          >《扫码付功能相关服务协议》</span
        >
        并提交资料
      </span>
    </div>

    <Button v-if="!checkStatus" :text="'提交审核'" :onEvent="onSubmit" />
    <div class="back-prev" @click="onBackPrev">返回上一步</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../../../card";
import Button from "../../../button";
import Validity from "./validity";
import TermValidity from "@/components/termValidity"
import YzgRadios from "@/components/yzgRadios"
import { submit } from "../../../submit";

export default {
  name: "speed3",
  components: {
    Card,
    Button,
    Validity,
    TermValidity,
    YzgRadios
  },
  data() {
    return {
      treaty: false,
      authorize: 0,
      radiosData: [
        {name: '三证合一', value: 0},
        {name: '非三证合一', value: 1},
      ]
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
      "businessNumber",
      "businessScope",
      "businessTermValidity",
      "outdoorScene",
      "yzsAgree",
      "codeAgree",
      "internalEnvironment",
      "cashier",
      "goodsShelves",
      "licenseType",
      "taxationCode",
      "taxExpiredTermValidity",
      "taxationPic",
    ]),
  },
  methods: {
    ...mapActions(["updates"]),

    onSubmit() {
      submit(this);
    },
    setLongTermEvent(){
      this.updates({
        key: "taxExpiredTermValidity",
        infos: {
          value: [{ value: "1", label: "长期有效" }]
        }
      });
    },
    setDateEvent(val) {
      this.updates({
        key: "taxExpiredTermValidity",
        infos: {
          value: [{ value: "1", label: val }]
        }
      });
    },
    onRadioTab(item) {
      this.updates({
        key: "licenseType",
        infos: {
          value: item.value
        }
      })
      console.log('val', this.licenseType)
    },
    scrollTop() {
      window.scrollTo(0, 0);
    },
    onBackPrev() {
      this.scrollTop();
      this.$router.replace("speed2");
    },
    onScanCode() {
      this.scrollTop();
      this.$router.push("/scancodetreaty");
    },
    setPageLoca() {
      const { current } = this.$router.history;
      const { path } = current;
      this.$store.dispatch("setPageLoca", path);
      this.$store.dispatch("setSpeedLoca", path);
    },

    updateCodeAgree() {
      this.updates({
        key: "codeAgree",
        infos: {
          value: this.treaty,
        },
      });
    },

    updateYzsAgree() {
      this.updates({
        key: "yzsAgree",
        infos: {
          value: this.authorize,
        },
      });
    },

    init() {
      this.setPageLoca();
      this.treaty = this.codeAgree.value;
      this.authorize = this.yzsAgree.value;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    treaty() {
      this.updateCodeAgree();
    },
    authorize() {
      this.updateYzsAgree();
    },
  },
};
</script>

<style lang="scss">
.back-prev {
  height: 40px;
  font-size: 14px;
  color: #f03b3b;
  line-height: 40px;
  text-align: center;
  padding-bottom: 10px;
}

.empower-yzs {
  padding: 10px;
}

.authorize-yzs {
  display: flex;
  padding: 20px 10px 10px 10px;
}

.treaty-box {
  display: flex;
  padding: 10px 10px 20px 10px;
  position: relative;

  .treaty {
    color: #f03b3b;
  }
}

.speed3 {
  .mint-datetime {
    z-index: 10001 !important;
  }
  .v-modal {
    z-index: 10000 !important;
  }

  .checkbox {
    width: 22px;
    height: 22px;
    padding-right: 6px;
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
}
</style>
