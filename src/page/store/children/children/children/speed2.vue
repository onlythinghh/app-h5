<template>
  <div class="speed2">
    <yzg-input
      :labelWidth="labelWidth"
      :label="IDCardBank.label"
      :maxLength="IDCardBank.maxlength"
      :hidden="IDCardBank.hidden"
      :disabled="IDCardBank.disabled || checkStatus"
      :placeholder="IDCardBank.placeholder"
      v-model="IDCardBank.value"
    />

    <yzg-select
      :labelWidth="labelWidth"
      :label="legalIdExpire.label"
      :hidden="legalIdExpire.hidden"
      :disabled="legalIdExpire.disabled || checkStatus"
      :placeholder="legalIdExpire.placeholder"
      :other="legalIdExpire.other"
      :onClick="onSelectIDDate"
      v-model="legalIdExpire.value"
    />

    <yzg-input
      :labelWidth="labelWidth"
      :label="contactPhone.label"
      :maxLength="contactPhone.maxlength"
      :hidden="contactPhone.hidden"
      :disabled="contactPhone.disabled || checkStatus"
      :placeholder="contactPhone.placeholder"
      v-model="contactPhone.value"
    />

    <card
      :vkey="frontIDCardBank.key"
      :label="frontIDCardBank.label"
      :example="frontIDCardBank.example"
      :hidden="frontIDCardBank.hidden"
      :disabled="frontIDCardBank.disabled || checkStatus"
      v-model="frontIDCardBank.images"
    />

    <card
      :vkey="versoIDCardBank.key"
      :label="versoIDCardBank.label"
      :example="versoIDCardBank.example"
      :hidden="versoIDCardBank.hidden"
      :disabled="versoIDCardBank.disabled || checkStatus"
      v-model="versoIDCardBank.images"
    />
    <div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        v-model="pickerValue"
        :startDate="startDate"
        :endDate="endDate"
        :visibleItemCount="5"
        @confirm="onPickerEvent"
        @visible-change="onChangeEvent"
      ></mt-datetime-picker>
    </div>
    <Button :text="'下一步'" :onEvent="onNext"/>

    <div class="back-prev" @click="onBackPrev">返回上一步</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Card from "../../../card";
import Button from "../../../button";
import { GetendDate } from "../../../../../tools/index"

export default {
  name: "speed2",
  components: {
    Card,
    Button
  },
  data() {
    return {
      labelWidth: 90,
      pickerValue: new Date(),
      startDate: new Date(),
      endDate: GetendDate(90), // 身份证最大年限（90年）
    };
  },
  computed: {
    ...mapGetters([
      "checkStatus",
      "IDCardBank",
      "legalIdExpire",
      "contactPhone",
      "frontIDCardBank",
      "versoIDCardBank"
    ])
  },
  methods: {
    ...mapActions(["updates"]),

    scrollTop() {
      window.scrollTo(0, 0);
    },
    onNext() {
      this.scrollTop();
      this.$router.replace("speed3");
    },
    onBackPrev() {
      this.scrollTop();
      this.$router.replace("speed1");
    },
    setPageLoca() {
      const { current } = this.$router.history;
      const { path } = current;
      this.$store.dispatch("setPageLoca", path);
      this.$store.dispatch("setSpeedLoca", path);
    },
    onSelectIDDate() {
      this.closeTouch();
      this.$refs.picker.open();
    },
    onPickerEvent() {
      const tempDate = new Date(this.pickerValue);
      const month = this.replenish(tempDate.getMonth()+1);
      const day = this.replenish(tempDate.getDate());
      const dateString = `${tempDate.getFullYear()}-${month}-${day}`;
      this.updates({
        key: "legalIdExpire",
        infos: {
          value: [{ value: "1", label: dateString }]
        }
      });
    },
    replenish(value){
      return value >= 10 ? value : '0'+value
    },
    onChangeEvent(value) {
      if (!value) {
        this.openTouch();
      }
    },

    preventDefault(e) {
      e.preventDefault();
    },

    closeTouch() {
      document
        .getElementsByTagName("body")[0]
        .addEventListener("touchmove", this.preventDefault, { passive: false });
    },
    openTouch() {
      document
        .getElementsByTagName("body")[0]
        .removeEventListener("touchmove", this.preventDefault, {
          passive: false
        }); //打开默认事件
    },
    init() {
      const dte = this.legalIdExpire.length ? this.legalIdExpire.value[0].label : new Date;
      this.pickerValue = new Date(dte)
      this.setPageLoca();
    }
  },
  mounted() {
    this.init();
  }
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
</style>