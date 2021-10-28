<template>
  <div class="vips">
    <VipsHeader :title="title"/>
    <section class="vips-content" id="vipsMain" :class="client">
      <!-- 会员信息 -->
      <div class="vip-info">
        <div class="vip-info-box" :class="manager.type">
          <div class="user-info">
            <div class="name">{{usrName}}</div>
            <div class="vip-type">{{manager.text}}</div>
            <div class="vip-score">
              <div class="vip-speed">
                <span :style="{width:manager.progress+'%'}"></span>
              </div>
              <div class="vip-score-value" v-if="fraction<80000">{{fraction}}/{{manager.value}}</div>
              <div class="vip-score-value" v-else>>80000</div>
            </div>
          </div>
          <div class="integral-info">
            <div class="label">当前积分</div>
            <div class="integral">{{fraction}}</div>
            <div class="promote" @click="onHowPromote" title="如何提升">如何提升</div>
          </div>
        </div>
      </div>

      <!-- 会员权益 -->
      <div class="vip-profit">
        <div class="title">
          <span>会员权益</span>
        </div>
        <ul class="menu">
          <li class="luck-draw" title="幸运刮刮卡">
            <i class="icon"></i>
            <span>幸运刮刮卡</span>
          </li>
          <li class="birthday">
            <i class="icon"></i>
            <span>生日特权</span>
          </li>
          <li class="relegation">
            <i class="icon"></i>
            <span>保级加分</span>
          </li>
        </ul>

        <ul class="introduce">
          <li class="luck-draw" @click="onLuckDraw" title="幸运刮刮卡">
            <img src="../../images/vips/luck_draw.png">
          </li>
          <li class="birthday">
            <img src="../../images/vips/birthday.png">
          </li>
          <li class="relegation">
            <img src="../../images/vips/relegation.png">
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { domain, getSearchString, getJSON } from "../../tools";
import { VillageNo, getUsrOnlyId, jifen } from "../../service/api.js";
import VipsHeader from "./vipsHeader.vue";

var jf = parseInt(getSearchString("gradeJiFen"));
var negative = jf >= 0 ? 0 : jf;
var checkIntegral = parseInt(getSearchString("checkIntegral")); // 是否调接口查询积分

var gradeInfo = {
  v1: { text: "铁牌掌柜", min: negative, max: 500, index: 0 },
  v2: { text: "铜牌掌柜", min: 500, max: 3000, index: 1 },
  v3: { text: "银牌掌柜", min: 3000, max: 20000, index: 2 },
  v4: { text: "金牌掌柜", min: 20000, max: 80000, index: 3 },
  v5: { text: "钻石掌柜", min: 80000, max: 200000, index: 4 }
};

export default {
  name: "vips",
  data() {
    return {
      usrName: "----",
      title: "会员",
      fraction: jf || 0,
      client: getSearchString("platform") || ""
    };
  },
  computed: {
    manager: function() {
      var fraction = parseInt(this.fraction);
      var numArray = [500, 3000, 20000, 80000];
      var manager = { text: "----", progress: 0, value: 0 };

      for (var gi in gradeInfo) {
        var iTem = gradeInfo[gi];
        var min = iTem.min;
        var max = iTem.max;
        var index = iTem.index;
        var text = iTem.text;
        var progress = (fraction / max) * 100;
        progress = progress > 100 ? 100 : progress;
        if (fraction > max || (fraction <= max && fraction >= min)) {
          manager = { type: gi, text: text, progress: progress, value: max };
        }
        // 超出20W
        if (index == 4 && fraction > max) {
          manager = { type: gi, text: text, progress: progress, value: max };
        }
      }
      return manager;
    }
  },
  components: {
    VipsHeader
  },
  methods: {
    // 如何提升
    onHowPromote() {
      this.$router.push("/grade");
    },

    // 抽奖
    onLuckDraw() {
      // this.$dialog.alert("幸运刮刮卡");

      this.$router.push("/scratchCard");
    },

    timer() {
      var self = this;
      self._interval = window.setInterval(function() {
        var top = document.getElementById("vipsMain").scrollTop;
        var ratio = ((100 / 100) * top) / 100;
        self.titleStyle = { opacity: ratio };
      }, 200);
    },

    getRelegationInfo(usrOnlyId) {
      return new Promise((resolve, reject) => {
        const params = Object.assign({}, usrOnlyId ? { usrOnlyId } : {}, {
          jsonp: "callback"
        });
        getJSON(VillageNo, params, { success: resolve, error: reject });
      });
    },

    checkRelegation(usrOnlyId) {
      this.getRelegationInfo(usrOnlyId)
        .then(result => {
          const { resultCode, ifLevelChange } = result;
          if (resultCode == "0000") {
            switch (ifLevelChange) {
              case "1":
                this.$dialog.alert({
                  title: "恭喜您",
                  text: "上月保级成功，本月获得500积分奖励!",
                  cancel: "知道了"
                });
                break;
              case "0":
                this.$dialog.alert({
                  title: "很遗憾",
                  text: "上月等级下降，保级失败，本月还需继续努力呀!",
                  cancel: "知道了"
                });
                break;
            }
          }
        })
        .catch(() => {});
    },

    // 查询积分
    checkIntegral(usrOnlyId) {
      const params = Object.assign({}, usrOnlyId ? { usrOnlyId } : {}, {
        jsonp: "callback"
      });
      getJSON(jifen, params, {
        success: result => {
          const { jifen = 0 } = result || {};
          this.fraction = jifen;
        },
        error: () => {}
      });
    },

    // 获取掌柜信息
    getUsrInfo() {
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
    },

    init() {
      switch (this.client) {
        case "pc":
          const userInfo = window.YZG_GetUserInfo && YZG_GetUserInfo();
          const { USRNAME } = userInfo || {};
          this.usrName = USRNAME;
          this.checkRelegation();
          break;
        default:
          this.getUsrInfo()
            .then(result => {
              const { usrOnlyId, usrName } = result || {};
              this.usrName = usrName;
              this.checkRelegation(encodeURIComponent(usrOnlyId));
              if (this.client == "app" && checkIntegral) {
                this.checkIntegral(encodeURIComponent(usrOnlyId));
              }
            })
            .catch(result => {});
          break;
      }
    }
  },

  mounted() {
    this.init();
  }
};
</script>

<style scoped lang="scss">
.vips {
  position: relative;
  width: 100%;
  height: 100%;
  color: #333;
  img {
    display: block;
  }

  section.vips-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    div.vip-info {
      position: relative;
      width: 100%;
      height: 3.82rem;
      background: url("../../images/vips/vips_info_bg.png") no-repeat;
      background-size: 100%;
      background-color: #29292a;

      div.vip-info-box {
        position: absolute;
        width: 6.5rem;
        height: 2.16rem;
        margin: 0 auto;
        left: 50%;
        bottom: 0;
        margin-left: -3.25rem;
        display: flex;
        padding: 0.4rem 0.4rem 0 0.4rem;
        box-sizing: border-box;
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        background-color: #ccd3d6;

        div.user-info {
          flex: 1;
          overflow: hidden;
          div.name {
            font-size: 0.32rem;
            font-weight: bold;
          }
          div.vip-type {
            position: relative;
            width: 1.2rem;
            height: 0.44rem;
            line-height: 0.44rem;
            font-size: 0.24rem;
            background-color: rgba(0, 0, 0, 0.15);
            border-radius: 0.22rem;
            margin-top: 0.14rem;
            padding-left: 0.44rem;
          }

          @media screen and (max-width: 320px) {
            div.vip-type {
              width: 1.28rem;
            }
          }

          div.vip-type::after {
            content: "";
            position: absolute;
            width: 0.36rem;
            height: 0.36rem;
            left: 0.04rem;
            top: 50%;
            margin-top: -0.18rem;
          }

          div.vip-score {
            height: 0.4rem;
            div.vip-speed {
              width: 1.6rem;
              height: 0.04rem;
              border-radius: 0.02rem;
              background-color: #adcedc;
              margin-top: 0.16rem;
              span {
                display: block;
                width: 0%;
                height: 100%;
                background-color: #88b0c1;
                border-radius: 0.02rem;
              }
            }

            div.vip-score-value {
              font-size: 0.24rem;
              color: #88b0c1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        div.integral-info {
          flex: 1;
          text-align: right;
          color: #333;
          overflow: hidden;
          div.label {
            font-size: 0.24rem;
          }

          div.integral {
            font-size: 0.6rem;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          div.promote {
            position: relative;
            float: right;
            width: 1.12rem;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.24rem;
            text-align: left;
            padding: 0 0.16rem;
            cursor: pointer;
            background-color: #fff;
            border-radius: 0.2rem;
            box-shadow: 0.02rem 0.04rem 0.08rem rgba(0, 0, 0, 0.2);
          }

          @media screen and (max-width: 320px) {
            div.promote {
              width: 1.26rem;
            }
          }

          div.promote::after {
            content: "";
            position: absolute;
            width: 0.07rem;
            height: 0.12rem;
            right: 0.16rem;
            top: 50%;
            margin-top: -0.06rem;
            background: url("../../images/vips/rhts_jt.png") center no-repeat;
            background-size: 100%;
          }
        }
      }

      div.v1 {
        background: url("../../images/vips/vt_bg/v1.png") no-repeat;
        background-size: 100%;
        background-color: #ccd3d6;
        div.vip-type::after {
          background: url("../../images/vips/vt/g1@2x.png") center no-repeat;
          background-size: 100%;
        }
        div.user-info {
          div.vip-score {
            div.vip-speed {
              background-color: #bac8ce;
              span {
                background-color: #7d888d;
              }
            }
            div.vip-score-value {
              color: #7d888d;
            }
          }
        }
      }
      div.v2 {
        background: url("../../images/vips/vt_bg/v2.png") no-repeat;
        background-size: 100%;
        background-color: #d7c092;
        div.vip-type::after {
          background: url("../../images/vips/vt/g2@2x.png") center no-repeat;
          background-size: 100%;
        }
        div.user-info {
          div.vip-score {
            div.vip-speed {
              background-color: #c4aa78;
              span {
                background-color: #907948;
              }
            }
            div.vip-score-value {
              color: #907948;
            }
          }
        }
      }
      div.v3 {
        background: url("../../images/vips/vt_bg/v3.png") no-repeat;
        background-size: 100%;
        background-color: #ddf0f8;
        div.vip-type::after {
          background: url("../../images/vips/vt/g3@2x.png") center no-repeat;
          background-size: 100%;
        }
        div.user-info {
          div.vip-score {
            div.vip-speed {
              background-color: #adcedc;
              span {
                background-color: #7da4b3;
              }
            }
            div.vip-score-value {
              color: #7da4b3;
            }
          }
        }
      }
      div.v4 {
        background: url("../../images/vips/vt_bg/v4.png") no-repeat;
        background-size: 100%;
        background-color: #fcec9a;
        div.vip-type::after {
          background: url("../../images/vips/vt/g4@2x.png") center no-repeat;
          background-size: 100%;
        }
        div.user-info {
          div.vip-score {
            div.vip-speed {
              background-color: #ecd45d;
              span {
                background-color: #beaa46;
              }
            }
            div.vip-score-value {
              color: #beaa46;
            }
          }
        }
      }
      div.v5 {
        background: url("../../images/vips/vt_bg/v5.png") no-repeat;
        background-size: 100%;
        background-color: #b8f0f9;
        div.vip-type::after {
          background: url("../../images/vips/vt/g5@2x.png") center no-repeat;
          background-size: 100%;
        }
        div.user-info {
          div.vip-score {
            div.vip-speed {
              background-color: #87def1;
              span {
                background-color: #4ca4f3;
              }
            }
            div.vip-score-value {
              color: #4ca4f3;
            }
          }
        }
      }
    }

    div.vip-profit {
      div.title {
        position: relative;
        color: #fff;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        background-color: #a19887;
        span {
          font-size: 0.32rem;
        }

        span::before {
          content: "";
          position: absolute;
          width: 0.5rem;
          height: 0.8rem;
          margin-left: -0.6rem;
          top: 50%;
          margin-top: -0.4rem;
          background: url("../../images/vips/vip_profit_title_icon.png") left
            center no-repeat;
          background-size: 1rem 0.14rem;
        }

        span::after {
          content: "";
          position: absolute;
          width: 0.5rem;
          height: 0.8rem;
          margin-left: 0.1rem;
          top: 50%;
          margin-top: -0.4rem;
          background: url("../../images/vips/vip_profit_title_icon.png") right
            center no-repeat;
          background-size: 1rem 0.14rem;
        }
      }

      ul.menu {
        display: flex;
        li {
          flex: 1;
          height: 1.6rem;
          list-style: none;
          text-align: center;
          padding-top: 10px;

          i {
            display: block;
            width: 1.04rem;
            height: 1.04rem;
            margin: 0.08rem auto;
          }
          span {
            font-size: 0.28rem;
            color: #d5c2a3;
          }
        }

        li.luck-draw {
          i {
            background: url("../../images/vips/icon/luck_draw.png") no-repeat;
            background-size: 100%;
          }
        }

        li.birthday {
          i {
            background: url("../../images/vips/icon/birthday.png") no-repeat;
            background-size: 100%;
          }
        }

        li.relegation {
          i {
            background: url("../../images/vips/icon/relegation.png") no-repeat;
            background-size: 100%;
          }
        }
      }

      ul.introduce {
        padding: 0.12rem 0.3rem;
        li {
          list-style: none;
          height: 2rem;
          margin-top: 0.2rem;
          img {
            width: 100%;
          }
        }
        li.luck-draw {
          cursor: pointer;
        }
      }
    }
  }
}

.vips {
  section.pad {
    div.vip-info {
      height: 3rem;
      div.vip-info-box {
        width: 5.4rem;
        height: 1.8rem;
        margin-left: -2.7rem;
        padding: 0.2rem 0.2rem 0 0.2rem;
      }
    }
  }
}
</style>

