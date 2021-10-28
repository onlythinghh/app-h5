<template>
  <div class="cards">
    <div class="card-title">
      <div class="label" v-html="info.title"></div>
      <div class="example" @click="checkExample">查看示例照片</div>
    </div>
    <div class="card-image-box">
      <div class="card-content">
        <div class="card-error" v-if="error">加载失败</div>
        <div class="card-loading" v-else-if="status==100">正在加载...</div>
        <div class="card-image" v-else-if="info.cardImage" @click="checkPower">
          <img :src="info.cardImage" width="100%">
          <input
            v-if="modify&&isPower"
            ref="pathClear"
            type="file"
            name="file"
            accept="image/*"
            @change="fileCard"
          >
        </div>
        <div class="card-update" v-else @click="checkPower">
          <i class="card-update-icon"></i>
          <span class="card-update-text">上传图片</span>
          <input
            v-if="modify&&isPower"
            ref="pathClear"
            type="file"
            name="file"
            accept="image/*"
            @change="fileCard"
          >
        </div>
      </div>
    </div>

    <div class="example-box" v-if="isExample" @touchmove.prevent>
      <div class="example-image-box">
        <i class="close" @click="closeExample"></i>
        <div class="example-image">
          <img :src="info.example" width="100%">
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
import axios from "axios";
import { Indicator, Toast } from "mint-ui";
import { getClokie } from "../../../tools";
import { uploadVpsImgByH5 } from "../../../service/api";
export default {
  name: "card",
  data() {
    return {
      isExample: false
    };
  },
  props: {
    info: Object,
    status: Number,
    modify: Boolean,
    error: Boolean,
    usrOnlyId: String,
    isPower: Boolean
  },
  methods: {
    checkExample() {
      const { example } = this.info;
      this.isExample = true;
    },
    closeExample() {
      this.isExample = false;
    },

    // 检查相机权限
    checkPower() {
      if (!this.isPower && this.modify) {
        this.$dialog.alert({
          title: "请至系统设置打开相机权限或重试"
        });
      }
    },
    fileCard(event) {
      var self = this;
      var isCompress = false;
      let file = event.target.files[0];
      if (!/image\/\w+/.test(file.type)) {
        Toast({
          message: "请选择图片",
          position: "bottom",
          duration: 3000
        });
        return false;
      }

      // 上传图片
      var updateCard = function(fromData, callback) {
        //添加请求头
        let config = {
          headers: { "Content-Type": "multipart/form-data" },
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true
        };
        axios
          .post(uploadVpsImgByH5, fromData, config)
          .then(response => {
            callback & callback(response.data);
            Indicator.close();
          })
          .catch(result => {
            Indicator.close();
          });
      };

      // 创建fromDdata
      var createFromData = function(base64Img) {
        const { key } = self.info;
        // 创建form对象
        let param = new FormData();
        const mall_cookie = getClokie("mall_cookie");
        // 通过append向form对象添加数据
        param.append("usrOnlyId", self.usrOnlyId);
        param.append("file", file);
        param.append("imageType", key);
        return param;
      };

      Indicator.open({
        text: "上传中...",
        spinnerType: "double-bounce"
      });
      // 通过canvas压缩图片
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var img = new Image();
      reader.onload = function(e) {
        var width = 1080, //图像大小
          quality = 0.8, //图像质量
          canvas = document.createElement("canvas"),
          drawer = canvas.getContext("2d");
        img.src = this.result;
        img.onload = function() {
          if (isCompress) return false;
          isCompress = true;
          canvas.width = width;
          canvas.height = width * (img.height / img.width);
          drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
          var base64Img = canvas.toDataURL("image/png", quality);
          img.src = base64Img;
          var fromData = createFromData();
          self.$refs.pathClear.value = "";
          updateCard(fromData, result => {
            const { returnCode, data, returnMessage } = result;
            const { picUrl } = data || {};
            if (returnCode == "0000") {
              self.info.cardImage = picUrl;
            } else {
              Toast({
                message: returnMessage,
                position: "bottom",
                duration: 3000
              });
            }
          });
        };
        img.onerror = function() {
          Indicator.close();
        };
      };
    }
  }
};
</script>

<style scoped lang="scss">
div.cards {
  padding: 0 10px 15px;
  background-color: #fff;

  div.card-title {
    display: flex;
    height: 46px;
    line-height: 46px;
    font-size: 14px;
    color: #333;
    .label {
      position: relative;
      flex: 1;
      padding-left: 10px;
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
    .example {
      color: #999;
    }
  }
  div.card-image-box {
    padding: 5px 40px 0px 40px;
    .card-content {
      min-height: 150px;
      background-color: #f5f5f5;
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;

      .card-loading {
        height: 100%;
        color: #999;
        font-size: 18px;
      }

      .card-error {
        height: 100%;
        color: #999;
        font-size: 18px;
      }

      .card-image {
        position: relative;
        width: 100%;
        min-height: 150px;
      }

      .card-update {
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

      input {
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

<style lang="scss">
div.cards {
  div.card-title {
    .label {
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
  }
}
</style>