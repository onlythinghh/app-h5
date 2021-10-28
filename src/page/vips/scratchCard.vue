<template>
  <div class="card" :class="client">
    <Header :title="title" :isBack="true" :isWhite="true">
      <div class="rules" slot="right" @click="onRules" title="游戏规则">游戏规则</div>
    </Header>
    <section class="content" ref="content" @scroll="onContentScroll">
      <div class="main">
        <div class="activity-time">会员日 每周四9:00~24:00</div>

        <div class="luck-draw">
          <div class="luck-draw-content" ref="luck">
            <!-- 活动尚未开始 -->
            <div class="activity-no-start" v-if="activityStatus==1">
              <h3>活动尚未开始</h3>
              <p>开始时间：周四9:00-24:00</p>
            </div>

            <!-- 中奖信息 -->
            <div
              class="prize-info"
              :class="{'no-prize' : !prizeInfo.isWinningPrize }"
              v-if="activityStatus==3||activityStatus==4"
            >
              <div class="prosit">{{prizeInfo.prosit}}</div>
              <div class="face-value">{{prizeInfo.faceValue}}</div>
              <div class="prompt-use" v-if="prizeInfo.isWinningPrize">赶快到邮掌柜系统或APP使用吧</div>
              <div class="buttons">
                <div
                  class="once-again"
                  @click="onStartLuckDraw"
                  v-if="userActivityInfo.frequency"
                >{{prizeInfo.buttons.onceAgain}}</div>
                <div
                  class="confirm"
                  @click="onConfirm(prizeInfo.buttons.confirm)"
                >{{prizeInfo.buttons.confirm}}</div>
              </div>
            </div>

            <!-- 抽奖遮罩层 -->
            <div class="luck-draw-main" v-if="activityStatus==3&&scrapeStatus">
              <Scratch
                :scrollTop="scrollTop"
                :luckWindow="luckWindow"
                :onScratchEnd="onScratchEnd"
                :client="client"
              ></Scratch>
            </div>

            <div class="start-scratch" v-if="activityStatus==2">
              <div class="start-scratch-button" @click="onStartLuckDraw"></div>
            </div>

            <div class="loading" v-if="activityStatus==0">加载中...</div>
          </div>
          <!-- <div class="scratch"></div> -->
        </div>

        <div class="chance" v-if="userActivityInfo.frequency">
          今日还有
          <span>{{userActivityInfo.frequency}}</span>
          次机会
        </div>
        <div class="chance" v-else>暂无机会</div>

        <div class="record" v-if="this.client!='pad'">
          <span @click="onRecord">我的优惠券</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { domain, getSearchString, getJSON } from "../../tools";
import {
  getActivityInfoByCode,
  getMultLotteryTimes,
  play,
  getUsrOnlyId,
  searchCouponWall
} from "../../service/api.js";
import Header from "../../components/header/header.vue";
import Scratch from "./scratch.vue";

const platform = getSearchString("platform");

export default {
  name: "card",
  data() {
    return {
      title: "幸运刮刮卡",
      client: platform || "",
      channel: platform == "app" ? "400001" : "100000",
      scrapeStatus: true,
      prizeInfo: null,
      activityStatus: 0, // 0:加载中 1:活动未开始 2:活动已开始 3:开始刮奖 4:刮奖结束
      activityInfo: {},
      userActivityInfo: {
        usrOnlyId: "",
        frequency: 0,
        deviceId: "xxxx"
      },
      luckWindow: { w: 0, h: 0 },
      scrollTop: 0
    };
  },
  components: {
    Header,
    Scratch
  },
  methods: {
    onRules() {
      this.$dialog.alert({
        title: "游戏规则",
        custom: "scratchCardRules",
        cancel: "知道了"
      });
    },
    onRecord() {
      switch (this.client) {
        case "pc":
          window.top.openUrl(
            "https://my" +
              domain +
              ".ule.com/mywallet/coupon/queryCouponDetail.do"
          );
          break;
        case "app":
          window.location.href =
            "https://www" +
            domain +
            ".ule.com/yzg/app/wangdian/coupon/index.html";
          break;
      }
    },

    onContentScroll(e) {
      const top = this.$refs.content.scrollTop;
      this.scrollTop = top;
    },

    onScratchEnd() {
      this.activityStatus = 4;
    },

    dealWithToUse(couponInfo) {
      const { couponType, storeId, batchId } = couponInfo;
      const storeIds = storeId.split(",");
      const cStoreID = storeIds[parseInt(Math.random() * storeIds.length)];
      switch (this.client) {
        case "app":
          switch (couponType) {
            // 店铺券
            case "1":
              window.location.href =
                "//m" + domain + ".ule.com/store/index/" + cStoreID;
              break;
            // 商品券
            case "2":
              window.location.href =
                "//www" +
                domain +
                ".ule.com/ulewap/store/useCouponItemList.html?batchId=" +
                batchId;
              break;
            default:
              this.prizeInfo.buttons.confirm = "确定";
              break;
          }
          break;
        case "pc":
          switch (couponType) {
            // 店铺券
            case "1":
              window.top.openUrl(
                "https://store" +
                  domain +
                  ".ule.com/store/" +
                  cStoreID +
                  ".html"
              );
              break;
            // 商品券
            case "2":
              window.top.openUrl(
                "https://search" +
                  domain +
                  ".ule.com/" +
                  batchId +
                  "------------1.html"
              );
              break;
            default:
              this.prizeInfo.buttons.confirm = "确定";
              break;
          }
          break;
      }
    },

    toUse() {
      const { isWinningPrize, pcBatchId } = this.prizeInfo;
      if (!isWinningPrize) return null;
      const { usrOnlyId } = this.userActivityInfo;
      const params = { batchId: pcBatchId, jsonp: "callback" };
      if (usrOnlyId) params.usrOnlyId = usrOnlyId;

      getJSON(searchCouponWall, params, {
        success: result => {
          const { code, returnMsg } = result;
          if (code == "0000") {
            this.dealWithToUse(returnMsg);
          }
        },
        error: result => {
          const { msg } = result;
          this.$dialog.toast(msg);
        }
      });
    },

    onConfirm(val) {
      switch (val) {
        case "去使用":
          this.toUse();
          break;
        case "确定":
          this.activityStatus = 2;
          break;
      }
    },

    // 进行抽奖
    luckDraw() {
      const { activityCode, fieldCode } = this.activityInfo;
      const { deviceId, usrOnlyId } = this.userActivityInfo;
      const channel = this.channel;

      return new Promise((resolve, reject) => {
        const params = {
          activityCode,
          fieldCode,
          channel,
          // deviceId,
          jsonp: "callback"
        };
        if (usrOnlyId) params.usrOnlyId = usrOnlyId;
        getJSON(play, params, { success: resolve, error: reject });
      });
    },

    // 抽奖之前检查活动是否有效
    luckDrawCheckIsValid() {
      const { startTime, endTime } = this.activityInfo;
      const currTime = new Date().getTime();
      if (startTime > currTime || endTime < currTime) {
        this.$dialog.alert({
          title: "活动尚未开始",
          text: "开始时间，每周四9:00-24:00",
          cancel: "知道了"
        });
        return false;
      }
      if (!this.userActivityInfo.frequency) {
        this.$dialog.alert({
          title: "今日次数已用完",
          text: "提高掌柜等级可以参与更多次哦",
          cancel: "了解如何提高等级>",
          isClose: true,
          cancelCallback: () => {
            this.$router.push("/grade");
          }
        });
        return false;
      }
      return true;
    },

    onStartLuckDraw() {
      const isValid = this.luckDrawCheckIsValid();
      if (!isValid) return false;
      this.scrapeStatus = true;
      this.$dialog.loading("正在加载");
      this.luckDraw()
        .then(result => {
          this.$dialog.hideLoading();
          const { code, content } = result;
          if (code == "0000" && content) {
            const { prizeInfos } = content || {};
            const [prize] = prizeInfos || [];

            if (prize) {
              const {
                prizeMoney,
                prizeType,
                pcBatchId,
                collectionId,
                fullcutAmountLimit
              } = prize;
              const prizeTypeObject = {
                "10101": "代表手机充值券",
                "10102": "店铺优惠券",
                "10103": "现金优惠券",
                "10104": "运费优惠劵",
                "10105": "现金券",
                "10106": "省管券",
                "20201": "文本券",
                "40200": "红包雨现金",
                "40300": "奖励金分享",
                "40400": "奖励金成单",
                "40500": "奖励金排行"
              };

              this.prizeInfo = {
                pcBatchId,
                collectionId,
                fullcutAmountLimit,
                prosit: "恭喜您，获得",
                faceValue: prizeMoney + "元" + prizeTypeObject[prizeType] || "",
                isWinningPrize: true,
                buttons: {
                  onceAgain: "再刮一次",
                  confirm: this.client == "pad" ? "确定" : "去使用"
                }
              };
            }

            this.activityStatus = this.isSupportCanvas ? 3 : 4;
          } else if (code == "1003") {
            this.$dialog.alert({
              title: "今日次数已用完",
              text: "提高掌柜等级可以参与更多次哦",
              cancel: "了解如何提高等级>",
              isClose: true,
              cancelCallback: () => {
                this.$router.push("/grade");
              }
            });
          } else {
            this.prizeInfo = {
              prosit: "很遗憾，没有中奖",
              faceValue: "继续努力哦",
              isWinningPrize: false,
              buttons: {
                onceAgain: "再刮一次",
                confirm: "确定"
              }
            };
            this.activityStatus = this.isSupportCanvas ? 3 : 4;
          }
          this.loadTodayFrequency();
        })
        .catch(result => {
          const { returnMessage } = result;
          this.$dialog.toast(returnMessage);
        });
    },

    // 获取场次信息
    getActivityInfo(themeCode) {
      return new Promise((resolve, reject) => {
        getJSON(
          getActivityInfoByCode,
          { themeCode, jsonp: "callback" },
          { success: resolve, error: reject }
        );
      });
    },

    // 加载未开始
    renderNoStart() {
      this.activityStatus = 1;
    },

    // 活动已开始
    renderActivityStart() {
      this.activityStatus = 2;
    },

    activityIsStatus(fieldInfos) {
      const { fieldCode, startTime, endTime } = fieldInfos || {};
      const cTime = new Date().getTime();
      const sTime = new Date(startTime.replace(/-/gi, "/")).getTime();
      const eTime = new Date(endTime.replace(/-/gi, "/")).getTime();
      if (sTime < cTime && eTime > cTime) {
        return {
          fieldCode,
          startTime: sTime,
          endTime: eTime
        };
      } else {
        return false;
      }
    },

    // 加载场次信息
    loadActivityInfo() {
      const themeCode = domain ? "155056977987777" : "155141356731409";
      return new Promise((resolve, reject) => {
        this.getActivityInfo(themeCode)
          .then(result => {
            const { code, content = {}, message } = result;
            const { activityCode, fieldInfos = [] } = content || {};
            const [fieldInfo] = fieldInfos;
            if (code == "0000" && fieldInfo) {
              const AI = this.activityIsStatus(fieldInfo);
              if (AI) {
                this.renderActivityStart();
                this.activityInfo = Object.assign({ activityCode }, AI);
                resolve();
              } else {
                this.renderNoStart();
              }
            } else {
              this.renderNoStart();
              // this.$dialog.toast(message);
            }
          })
          .catch(result => {
            const { returnMessage } = result;
            this.$dialog.toast(returnMessage);
            this.renderNoStart();
          });
      });
    },

    // 加载今日抽奖次数
    loadTodayFrequency() {
      const { activityCode, fieldCode } = this.activityInfo;
      const { usrOnlyId } = this.userActivityInfo;
      const params = { activityCode, fieldCode, jsonp: "callback" };
      if (usrOnlyId) params.usrOnlyId = usrOnlyId;
      getJSON(getMultLotteryTimes, params, {
        success: result => {
          const { code, content } = result;
          if (code == "0000") {
            const { times } = content || {};
            this.userActivityInfo.frequency = times;
          } else {
            this.userActivityInfo.frequency = 0;
          }
        },
        error: result => {
          this.userActivityInfo.frequency = 0;
        }
      });
    },

    // 获取抽奖宽高
    getLuckWH() {
      const luckComputed = window.getComputedStyle(this.$refs.luck);
      this.luckWindow = {
        w: parseFloat(luckComputed.width.replace("px", "")),
        h: parseFloat(luckComputed.height.replace("px", ""))
      };
    },

    // 设置是否支持Canvas
    setIsSupportCanvas() {
      try {
        const context = document.createElement("canvas").getContext("2d");
        this.isSupportCanvas = context;
      } catch (ex) {
        this.isSupportCanvas = false;
      }
    },

    // 获取usrOnlyId
    getUsrOnlyId() {
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

    // 更新界面
    renderLuckPage() {
      const loadActivity = this.loadActivityInfo();
      loadActivity.then(this.loadTodayFrequency);
    },

    // 第一次加载
    firstLoading() {
      switch (this.client) {
        case "pc":
          this.renderLuckPage();
          break;
        default:
          this.getUsrOnlyId()
            .then(result => {
              const { usrOnlyId } = result || {};
              this.userActivityInfo.usrOnlyId = encodeURIComponent(usrOnlyId);
              this.renderLuckPage();
            })
            .catch(() => {});
          break;
      }
    }
  },
  mounted() {
    this.firstLoading();

    this.getLuckWH();

    this.setIsSupportCanvas();
  }
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f33f0c;

  .rules {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    padding: 0 10px;
    cursor: pointer;
  }

  section {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    .main {
      position: relative;
      min-height: 100%;
      background: url("../../images/vips/scratchcard/bg.png") no-repeat;
      background-size: 100%;
      overflow: hidden;
    }
    .activity-time {
      margin: 1.6rem auto 0 auto;
      width: 4.2rem;
      height: 0.48rem;
      line-height: 0.48rem;
      border-radius: 0.24rem;
      font-size: 0.28rem;
      text-align: center;
      color: #e24e29;
      background-color: #fff;
    }

    .luck-draw {
      position: relative;
      width: 6.2rem;
      height: 3.8rem;
      margin: 4.3rem auto 0 auto;
      overflow: hidden;
      .luck-draw-content {
        position: relative;
        width: 5.6rem;
        height: 2.96rem;
        margin-top: 0.12rem;
        background-size: 100%;
        background-color: #fff;
        padding: 0.3rem;

        .activity-no-start {
          position: absolute;
          width: 5.6rem;
          height: 2.96rem;
          color: #fff;
          background: url("../../images/vips/luck_draw/bg.png") no-repeat;
          background-size: 100%;
          text-align: center;

          h3 {
            font-size: 0.56rem;
            font-weight: 100;
            margin-top: 0.68rem;
          }
          p {
            font-size: 0.28rem;
            font-weight: bold;
            margin-top: 0.08rem;
          }
        }

        .prize-info {
          position: absolute;
          width: 5.6rem;
          height: 2.96rem;
          text-align: center;
          font-weight: bold;
          color: #f33f0c;
          background-color: #fff4db;

          div.prosit {
            font-size: 0.32rem;
            padding-top: 0.32rem;
          }
          div.face-value {
            font-size: 0.52rem;
          }
          div.prompt-use {
            font-size: 0.26rem;
          }

          div.buttons {
            padding: 0 0.4rem;
            display: flex;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            margin-top: 0.2rem;
            div {
              flex: 1;
              margin: 0 0.32rem;
              border: 1px solid #f33f0c;
              border-radius: 0.6rem;
              font-size: 0.28rem;
              cursor: pointer;
            }
            div.confirm {
              color: #fff;
              background-color: #f33f0c;
            }
          }
        }

        div.no-prize {
          div.prosit {
            padding-top: 0.48rem;
          }
          div.buttons {
            margin-top: 0.38rem;
          }
        }

        .luck-draw-main {
          position: absolute;
          width: 5.6rem;
          height: 2.96rem;
          line-height: 2.96rem;
          text-align: center;
          font-size: 0.72rem;
          color: #c9c9c9;
          // background: url("../../images/vips/luck_draw/bg.png") no-repeat;
          // background-size: 100%;
        }

        .start-scratch {
          position: absolute;
          width: 5.6rem;
          height: 2.96rem;
          background: url("../../images/vips/luck_draw/bg.png") no-repeat;
          background-size: 100%;

          .start-scratch-button {
            position: absolute;
            width: 2.84rem;
            height: 0.9rem;
            top: 50%;
            left: 50%;
            margin-top: -0.45rem;
            margin-left: -1.42rem;
            cursor: pointer;
            background: url("../../images/vips/scratch.png") no-repeat;
            background-size: 100%;
          }
        }

        .loading {
          position: absolute;
          width: 5.6rem;
          height: 2.96rem;
          line-height: 2.96rem;
          text-align: center;
          font-size: 0.72rem;
          color: #c9c9c9;
          background: url("../../images/vips/luck_draw/bg.png") no-repeat;
          background-size: 100%;
        }
      }
    }

    .luck-draw::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 0.24rem;
      bottom: 0;
      left: 0;
      background: url("../../images/vips/luck_draw/icon01.png") repeat-x;
      background-size: 0.28rem 0.24rem;
    }

    .luck-draw::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 0.24rem;
      top: 0;
      left: 0;
      background-color: #ddd;
      background: url("../../images/vips/luck_draw/icon01.png") repeat-x;
      background-size: 0.28rem 0.24rem;
    }

    .chance {
      font-size: 0.32rem;
      color: #fff;
      padding: 0.3rem;
      text-align: center;
      span {
        color: #ffcf2c;
        font-size: 0.32rem;
      }
    }

    .record {
      text-align: center;
      padding: 0.2rem 0;
      span {
        display: inline-block;
        height: 0.56rem;
        line-height: 0.56rem;
        padding: 0 0.3rem;
        font-size: 0.32rem;
        color: #fff;
        border: 1px solid #fff;
        border-radius: 0.56rem;
        cursor: pointer;
      }
    }
  }
}

.pad {
  section {
    .activity-time {
      margin: 1.2rem auto 0 auto;
    }
    .luck-draw {
      width: 5.6rem;
      height: 3.44rem;
      .luck-draw-content {
        width: 5rem;
        height: 2.6rem;
        .start-scratch {
          width: 5rem;
          height: 2.6rem;
        }
        .loading {
          width: 5rem;
          height: 2.6rem;
        }
        .activity-no-start {
          width: 5rem;
          height: 2.6rem;
        }
        .luck-draw-main {
          width: 5rem;
          height: 2.6rem;
        }
        .prize-info {
          width: 5rem;
          height: 2.6rem;
          div.prosit {
            font-size: 0.32rem;
            padding-top: 0.16rem;
          }
          div.face-value {
            font-size: 0.42rem;
          }
          div.buttons {
            margin-top: 0.1rem;
          }
        }
        div.no-prize {
          div.prosit {
            padding-top: 0.24rem;
          }
        }
      }
    }
  }
}
</style>