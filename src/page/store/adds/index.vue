<template>
  <div class="adds" @touchmove.prevent v-show="visible">
    <mt-picker :slots="slots" value-key="name" :showToolbar="true" @change="onChange">
      <Slot>
        <div class="adds-header">
          <div class="close" @click="onClose">取消</div>
          <div class="confirm" @click="onConfirm">确定</div>
        </div>
      </Slot>
    </mt-picker>
  </div>
</template>
<script>
import { getNewRegionInfo } from "../../../service";

export default {
  name: "adds",
  data() {
    return {
      visible: false,
      adds: { province: {}, city: {}, area: {} },

      slots: [
        {
          flex: 1,
          values: [{ name: "请选择" }],
          defaultIndex: 0,
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [{ name: "请选择" }],
          defaultIndex: 0,
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [{ name: "请选择" }],
          defaultIndex: 0,
          className: "slot5",
          textAlign: "center"
        }
      ]
    };
  },
  methods: {
    open() {
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    onChange(picker, values) {
      const province = picker.getSlotValue(0) || {};
      const city = picker.getSlotValue(1) || {};
      const area = picker.getSlotValue(2) || {};
      const addsProvince = this.adds.province;
      const addsCity = this.adds.city;
      const addsArea = this.adds.area;
      if (province.code != addsProvince.code) {
        this.getCity(province.code);
      } else if (city.code != addsCity.code) {
        this.getArea(city.code);
      }

      this.adds = {
        province,
        city,
        area
      };
    },
    onConfirm() {
      this.$emit("input", this.adds);
      this.close();
    },
    onClose() {
      this.close();
    },

    getArea(code) {
      if (!code) {
        this.slots[4].values = [{ name: "请选择" }];
        return;
      }
      getNewRegionInfo({ code }).then(result => {
        const { returnCode, regionInfos } = result;
        let tempArray = [];
        if (returnCode === "0000" && regionInfos.length) {
          tempArray = regionInfos;
        } else {
          tempArray = [{ name: "请选择" }];
        }
        this.slots[4].values = tempArray;
      });
    },

    getCity(code) {
      getNewRegionInfo({ code }).then(result => {
        const { returnCode, regionInfos } = result;
        let tempArray = [];
        if (returnCode === "0000" && regionInfos.length) {
          tempArray = regionInfos;
        } else {
          tempArray = [{ name: "请选择" }];
        }
        this.slots[2].values = tempArray;
      });
    },

    getProvince(code) {
      getNewRegionInfo({ code }).then(result => {
        const { returnCode, regionInfos } = result;
        if (returnCode === "0000") {
          this.slots[0].values = regionInfos;
        }
      });
    }
  },
  mounted() {
    this.getProvince("0086");
  }
};
</script>

<style lang="scss">
.adds {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10000;

  .picker {
    left: 0px;
    width: 100%;
    bottom: 0px;
    position: absolute;
    background-color: #fff;
  }

  .adds-header {
    height: 45px;
    display: flex;
    padding: 0 15px;
    font-size: 16px;
    line-height: 45px;
    border-bottom: 1px solid #eee;

    .close {
      flex: 1;
    }

    .confirm {
      flex: 1;
      color: #f03b3b;
      text-align: right;
    }
  }
}
</style>