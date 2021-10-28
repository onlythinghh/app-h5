<template>
  <div class="speed1">
    <bank-info/>

    <yzg-select
      :labelWidth="labelWidth"
      :label="cardOwner.label"
      :hidden="cardOwner.hidden"
      :disabled="cardOwner.disabled || checkStatus"
      :single="cardOwner.single"
      :placeholder="cardOwner.placeholder"
      :gather="cardOwner.gather"
      v-model="cardOwner.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="cardNumber.label"
      :hidden="cardNumber.hidden"
      :disabled="cardNumber.disabled || checkStatus"
      :value="cardNumber.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="cardOwnerName.label"
      :hidden="cardOwnerName.hidden"
      :disabled="cardOwnerName.disabled || checkStatus"
      :value="cardOwnerName.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="settleAccountNo.label"
      :hidden="settleAccountNo.hidden"
      :disabled="settleAccountNo.disabled || checkStatus"
      :value="settleAccountNo.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="settleAccount.label"
      :hidden="settleAccount.hidden"
      :disabled="settleAccount.disabled || checkStatus"
      :value="settleAccount.value"
    />

    <!-- 开卡银行 -->
    <open-bank :hidden="openCardBank.hidden" :labelWidth="labelWidth"/>

    <yzg-input
      :labelWidth="labelWidth"
      :label="meetingBranch.label"
      :hidden="meetingBranch.hidden"
      :disabled="meetingBranch.disabled || checkStatus"
      :placeholder="meetingBranch.placeholder"
      v-model="meetingBranch.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="linkNumber.label"
      :hidden="linkNumber.hidden"
      :disabled="linkNumber.disabled || checkStatus"
      :placeholder="linkNumber.placeholder"
      v-model="linkNumber.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="reservePhone.label"
      :hidden="reservePhone.hidden"
      :disabled="reservePhone.disabled || checkStatus"
      :placeholder="reservePhone.placeholder"
      v-model="reservePhone.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="coverEmpowerIDCard.label"
      :hidden="coverEmpowerIDCard.hidden"
      :disabled="coverEmpowerIDCard.disabled || checkStatus"
      :placeholder="coverEmpowerIDCard.placeholder"
      v-model="coverEmpowerIDCard.value"
    />

    <card
      :vkey="merchantReceipt.key"
      :label="merchantReceipt.label"
      :example="merchantReceipt.example"
      :hidden="merchantReceipt.hidden"
      :disabled="merchantReceipt.disabled || checkStatus"
      v-model="merchantReceipt.images"
    />

    <card
      :vkey="frontBank.key"
      :label="frontBank.label"
      :example="frontBank.example"
      :hidden="frontBank.hidden"
      :disabled="frontBank.disabled || checkStatus"
      v-model="frontBank.images"
    />

    <card
      :vkey="openingLicenseAccountPhoto.key"
      :label="openingLicenseAccountPhoto.label"
      :example="openingLicenseAccountPhoto.example"
      :hidden="openingLicenseAccountPhoto.hidden"
      :disabled="openingLicenseAccountPhoto.disabled || checkStatus"
      v-model="openingLicenseAccountPhoto.images"
    />

    <card
      :vkey="coverEmpower.key"
      :label="coverEmpower.label"
      :example="coverEmpower.example"
      :hidden="coverEmpower.hidden"
      :disabled="coverEmpower.disabled || checkStatus"
      v-model="coverEmpower.images"
    />

    <card
      :vkey="settlement.key"
      :label="settlement.label"
      :example="settlement.example"
      :hidden="settlement.hidden"
      :disabled="settlement.disabled || checkStatus"
      v-model="settlement.images"
    />

    <Button :text="'下一步'" :onEvent="onNext"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../../../card";
import Button from "../../../button";
import BankInfo from "../../../bankinfo";
import OpenBank from "../../../bankinfo/openbank";

export default {
  name: "speed1",
  components: {
    Card,
    Button,
    BankInfo,
    OpenBank
  },
  data() {
    return {
      labelWidth: 120
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
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
      "settlement"
    ])
  },
  methods: {
    ...mapActions(["updates"]),

    scrollTop() {
      window.scrollTo(0, 0);
    },
    onNext() {
      this.scrollTop();
      this.$router.replace("speed2");
    },
    setPageLoca() {
      const { current } = this.$router.history;
      const { path } = current;
      this.$store.dispatch("setPageLoca", path);
      this.$store.dispatch("setSpeedLoca", path);
    },
    init() {
      this.setPageLoca();
    }
  },
  mounted() {
    this.init();
  },
  watch: {
    cardOwner: {
      handler(newValue) {
        const { value } = newValue;
        let hidden = !((value[0] || {}).value == 3);
        this.updates({ key: "coverEmpowerIDCard", infos: { hidden } });
        this.updates({ key: "coverEmpower", infos: { hidden } });
        this.updates({ key: "settlement", infos: { hidden } });
      },
      deep: true
    }
  }
};
</script>