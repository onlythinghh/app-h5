<template>
  <div class="card-box" v-if="!hidden">
    <div class="card-header">
      <div class="label">{{label}}</div>
      <div class="example" @click="checkExample">查看示例照片</div>
    </div>

    <div class="card-content-box">
      <div class="card-content">
        <div class="card-image" v-if="value" @click="onUploadImage">
          <img :src="value" width="100%">
          <!-- <input
            v-if="!disabled"
            ref="pathClear"
            type="file"
            name="file"
            accept="image/*"
            @change="fileCard"
          >-->
        </div>
        <div class="card-update" v-else @click="onUploadImage">
          <i class="card-update-icon"></i>
          <span class="card-update-text">上传图片</span>
        </div>
      </div>
    </div>

    <div class="example-box" v-if="isExample" @touchmove.prevent>
      <div class="example-image-box">
        <i class="close" @click="closeExample"></i>
        <div class="example-image">
          <img :src="example" width="100%">
        </div>
        <div class="example-tip">
          <p>完整的整个页面</p>
          <p>文字清晰可辨认</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { uploadVpsImgByH5 } from "../../../service";

export default {
  name: "card",
  props: {
    hidden: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    vkey: {
      type: String,
      default: ""
    },
    value: {
      type: String,
      default: ""
    },
    example: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isExample: false
    };
  },
  computed: {
    ...mapGetters(["isPower", "upload", "userInfo", "tagRadio"])
  },
  methods: {
    checkExample() {
      this.isExample = true;
    },
    closeExample() {
      this.isExample = false;
    },

    onUploadImage() {
      if (this.disabled) return;
      this.checkPower();
    },

    // 检查相机权限
    checkPower() {
      if (!this.isPower) {
        this.$dialog.alert({
          title: "请至系统设置打开相机权限或重试"
        });
      } else {
        this.upload.click();
        this.upload.onchange = this.fileCard;
      }
    },

    fileCard(event) {
      let file = event.target.files[0];
      const { usrOnlyId } = this.userInfo;
      const sutype = this.vkey == 'busLience' ? this.tagRadio : "";
      // 上传图片
      const updateCard = (fromData, callback) => {
        uploadVpsImgByH5(fromData)
          .then(response => {
            callback & callback(response.data);
          })
          .catch(result => {});
      };

      // 创建fromDdata
      const createFromData = () => {
        // 创建form对象
        let param = new FormData();
        // 通过append向form对象添加数据
        param.append("usrOnlyId", usrOnlyId);
        param.append("file", file);
        param.append("imageType", this.vkey);
        param.append("subtypes", sutype)
        return param;
      };

      const fromData = createFromData();
      this.$loading();
      updateCard(fromData, result => {
        this.$closeLoading()
        const { returnCode, data, returnMessage } = result;
        const { picUrl } = data || {};
        if (returnCode == "0000") {
          this.$emit("input", picUrl);
        }
        this.upload.value = "";
      });
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
div.card-box {
  color: #333;
  font-size: 14px;
  padding: 0 10px 15px;
  background-color: #fff;
  border-bottom: 1px solid #e3e3e3;

  .card-header {
    height: 46px;
    line-height: 46px;
    display: flex;

    .label {
      flex: 1;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .example {
      color: #999;
    }
  }

  .card-content-box {
    padding: 5px 40px 0;

    .card-content {
      min-height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f5;
      border-radius: 5px;
      overflow: hidden;

      .card-image {
        position: relative;
        width: 100%;
        min-height: 150px;
      }

      .card-update {
        position: relative;
        display: flex;
        width: 100%;
        min-height: 150px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .card-update-icon {
          display: block;
          width: 40px;
          height: 40px;
          margin: 0 auto;
          background: url("../../../images/store/card_update.png") no-repeat;
          background-size: 40px;
        }
        .card-update-text {
          display: block;
          color: #666;
          font-size: 14px;
          padding-top: 6px;
        }
      }

      input[type="file"] {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
      }
    }
  }

  .example-box {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 10000;

    .example-image-box {
      position: relative;
      min-width: 280px;
      padding: 0 20px;
      i.close {
        position: absolute;
        width: 30px;
        height: 30px;
        top: -40px;
        right: 20px;
        background: url("../../../images/store/card_close.png") no-repeat;
        background-size: 30px;
      }

      div.example-image {
        min-height: 150px;
        background: url("../../../images/loading.gif") no-repeat center;
        background-size: 60px;
      }
      div.example-tip {
        color: #fff;
        font-size: 12px;
        text-align: center;
      }
    }
  }
}
</style>