<template>
  <div class="wallet-box">
    <yzg-input
      :label="IDCard.label"
      :labelWidth="70"
      :hidden="IDCard.hidden"
      :maxLength="IDCard.maxlength"
      :disabled="IDCard.disabled || checkStatus"
      :tips="IDCard.tips"
      :placeholder="IDCard.placeholder"
      v-model="IDCard.value"
    />

    <card
      :vkey="frontIDCard.key"
      :label="frontIDCard.label"
      :example="frontIDCard.example"
      :hidden="frontIDCard.hidden"
      :disabled="frontIDCard.disabled || checkStatus"
      v-model="frontIDCard.images"
    />

    <card
      :vkey="versoIDCard.key"
      :label="versoIDCard.label"
      :example="versoIDCard.example"
      :hidden="versoIDCard.hidden"
      :disabled="versoIDCard.disabled || checkStatus"
      v-model="versoIDCard.images"
    />

    <card
      :vkey="holdIDCard.key"
      :label="holdIDCard.label"
      :example="holdIDCard.example"
      :hidden="holdIDCard.hidden"
      :disabled="holdIDCard.disabled || checkStatus"
      v-model="holdIDCard.images"
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
    <Button v-if="!checkStatus" :text="'提交审核'" :onEvent="onSubmit"></Button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../../card";
import Button from "../../button";
import { submit } from "../../submit";

export default {
  name: "wallet",
  components: {
    Card,
    Button
  },
  data() {
    return {
      id: ""
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
      "IDCard",
      "frontIDCard",
      "versoIDCard",
      "holdIDCard",
      "internalEnvironment",
      "cashier",
      "goodsShelves"
    ])
  },
  methods: {
    ...mapActions(["updateCashWithdrawalTarget"]),

    onSubmit() {
      submit(this);
    },
    setPageLoca() {
      const { current } = this.$router.history;
      const { path } = current;
      this.$store.dispatch("setPageLoca", path);
    },
    init() {
      this.setPageLoca();
      this.updateCashWithdrawalTarget(1);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss">
// .wallet-box {
// }
</style>