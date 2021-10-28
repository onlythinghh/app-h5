<template>
  <div class="validdity-box">
    <div class="label">{{businessTermValidity.label}}</div>
    <div class="v-tabs" v-if="!checkStatus">
      <div class="v-long-term" :class="{'checkbox-on':isLongTerm}" @click="onLongTermEvent">
        <i class="icon"></i>
        <span>长期有效</span>
      </div>
      <div class="v-date" :class="{'checkbox-on':!isLongTerm&&date}" @click="onDateEvent">
        <i class="icon"></i>
        <span>{{date || '选择具体日期'}}</span>
      </div>
    </div>
    <div v-else class="date-content">{{date || longString}}</div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      :startDate="startDate"
      :visibleItemCount="5"
      @confirm="onPickerEvent"
      @visible-change="onChangeEvent"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "validity",
  data() {
    return {
      isLongTerm: false,
      date: "",
      longString: "",
      pickerValue: new Date(),
      startDate: new Date()
    };
  },
  computed: {
    ...mapGetters(["businessTermValidity", "checkStatus"])
  },
  watch: {
    businessTermValidity: {
      handler(newValue) {
        this.updatePage(newValue);
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["updates"]),

    updatePage(params = {}) {
      const _btv = params.value[0] || {};
      if ((_btv.label || "").indexOf("长期") < 0) {
        this.isLongTerm = false;
        this.date = _btv.label;
        this.longString = "";
        let gdate = _btv.label ? _btv.label : new Date;
        this.pickerValue = new Date(gdate);
      } else {
        this.isLongTerm = true;
        this.date = "";
        this.longString = "长期有效";
      }
    },
    onLongTermEvent() {
      this.updates({
        key: "businessTermValidity",
        infos: {
          value: [{ value: "1", label: "长期有效" }]
        }
      });
    },
    onDateEvent() {
      this.onSelectDate();
    },
    onSelectDate() {
      this.closeTouch();
      this.$refs.picker.open();
    },
    onPickerEvent() {
      const tempDate = new Date(this.pickerValue);
      const month = this.replenish(tempDate.getMonth()+1);
      const day = this.replenish(tempDate.getDate());
      const dateString = `${tempDate.getFullYear()}-${month}-${day}`;
      this.updates({
        key: "businessTermValidity",
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
    }
  },
  mounted() {
    this.updatePage(this.businessTermValidity);
  }
};
</script>

<style lang="scss">
.validdity-box {
  height: 45px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 45px;
  border-bottom: 1px solid #eee;
  padding: 0 10px;
  div.label {
    width: 100px;
    height: 100%;
    color: #333;
  }

  div.v-tabs {
    flex: 1;
    display: flex;
    padding-left: 10px;
    .v-long-term {
      display: flex;
      align-items: center;
      flex: 1;
      //   padding-right: 20px;
    }
    .v-date {
      display: flex;
      align-items: center;
      flex: 1.2;
    }

    i.icon {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 16px;
      border: 1px solid #999;
      position: relative;
      margin-right: 2px;
    }
    .icon::after {
      transition: all 0.3s;
      content: " ";
      position: absolute;
      width: 3px;
      height: 6px;
      top: 3px;
      left: 6px;
      border: 2px solid #fff;
      border-left: 0px;
      border-top: 0px;
      transform: rotate(45deg) scale(0);
      transform-origin: center center;
    }
    .checkbox-on {
      .icon {
        border: 1px solid #f6001a;
        background-color: #f6001a;
      }

      .icon::after {
        transform: rotate(45deg) scale(1);
      }
    }

    span {
      color: #666;
      font-size: 12px;
    }
  }

  .date-content {
    flex: 1;
    color: #666;
    padding-left: 10px;
  }
}
</style>