<template>
  <div class="grade" :class="client">
    <GradeHeader :title="title"/>

    <!-- 分层分级信息 -->
    <section class="grade-content" id="gradeMain">
      <div class="grade-info">
        <div class="grade-manager">
          <span class="manager-type">{{title}}</span>
        </div>
        <div class="graction-progress-box">
          <div class="current-progress" :style="{left:progressInfo.total+'%'}">
            <div class="fraction">{{fraction}}</div>
            <div class="line"></div>
            <div class="circle"></div>
          </div>

          <ul class="graction-progress">
            <li>
              <div class="item-progress item-progress-01">
                <span class="item-current-progress" :style="{width:progressInfo.v1+'%'}"></span>
              </div>
            </li>
            <li>
              <div class="item-progress item-progress-02">
                <span class="item-current-progress" :style="{width:progressInfo.v2+'%'}"></span>
              </div>
            </li>
            <li>
              <div class="item-progress item-progress-03">
                <span class="item-current-progress" :style="{width:progressInfo.v3+'%'}"></span>
              </div>
            </li>
            <li>
              <div class="item-progress item-progress-04">
                <span class="item-current-progress" :style="{width:progressInfo.v4+'%'}"></span>
              </div>
            </li>
            <li>
              <div class="item-progress item-progress-05">
                <span class="item-current-progress" :style="{width:progressInfo.v5+'%'}"></span>
              </div>
            </li>
          </ul>
          <ul class="graction-label">
            <li class="g1">{{gradeInfo.v1.text}}</li>
            <li class="g2">{{gradeInfo.v2.text}}</li>
            <li class="g3">{{gradeInfo.v3.text}}</li>
            <li class="g4">{{gradeInfo.v4.text}}</li>
            <li class="g5">{{gradeInfo.v5.text}}</li>
          </ul>
          <ul class="graction-grade-section">
            <li class="g1"></li>
            <li class="g2">{{gradeInfo.v2.min}}</li>
            <li class="g3">{{gradeInfo.v3.min}}</li>
            <li class="g4">{{gradeInfo.v4.min}}</li>
            <li class="g5">{{gradeInfo.v5.min}}</li>
          </ul>
        </div>
      </div>

      <!-- 等级规则 -->
      <div class="grade-rule">
        <h3>等级规则</h3>
        <ul>
          <li v-for="(item,index) in rule" :key="index" v-html="item"/>
        </ul>
      </div>

      <!-- 加分规则 -->
      <div class="bonus-rule">
        <h3>加分规则</h3>
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td class="label">行为</td>
              <td class="norm-explain">
                规范
                <span class="explain">说明</span>
              </td>
              <td class="explain">说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in bonusRule" :key="index">
              <td class="label">{{item.label}}</td>
              <td class="norm-explain">
                {{item.norm}}
                <span
                  class="controll"
                  :data-val="item.explain"
                  @click="openDialog('加分规则',item.label,item.norm,item.explain)"
                >查看详情</span>
              </td>
              <td class="explain" v-html="item.explain"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 扣分规则 -->
      <div class="deduction-rule">
        <h3>扣分规则</h3>
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td class="label">行为</td>
              <td class="norm-explain">
                规范
                <span class="explain">说明</span>
              </td>
              <td class="explain">说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in deductionRule" :key="index">
              <td class="label">{{item.label}}</td>
              <td class="norm-explain">
                {{item.norm}}
                <span
                  class="controll"
                  @click="openDialog('扣分规则',item.label,item.norm,item.explain)"
                >查看详情</span>
              </td>
              <td class="explain" v-html="item.explain"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <div id="Dialog" v-if="dialogInfo" @touchmove="onDialogScroll">
      <section>
        <header>
          <span>{{dialogInfo.type}}/{{dialogInfo.label}}</span>
          <i class="close" @click="closeDialog"></i>
        </header>
        <div class="dialog-info">
          <p class="norm">
            基本规则:
            <span>{{dialogInfo.norm}}</span>
          </p>
          <p class="explain">
            补充说明:
            <span v-html="dialogInfo.explain"></span>
          </p>
        </div>
        <div class="button" @click="closeDialog">知道了</div>
      </section>
    </div>
  </div>
</template>

<script>
import { getSearchString } from "../../tools";
import GradeHeader from "./gradeHeader";

var gradeInfo = {
  v1: { text: "铁牌掌柜", min: 0, max: 500, index: 0 },
  v2: { text: "铜牌掌柜", min: 500, max: 3000, index: 1 },
  v3: { text: "银牌掌柜", min: 3000, max: 20000, index: 2 },
  v4: { text: "金牌掌柜", min: 20000, max: 80000, index: 3 },
  v5: { text: "钻石掌柜", min: 80000, max: 200000, index: 4 }
};

export default {
  name: "grade",
  data() {
    return {
      fraction: getSearchString("gradeJiFen") || 0,
      title: "暂无信息",
      client: getSearchString("platform") || "",
      rule: [
        "积分对应相应会员等级，积分每月清零",
        "等级每月按照上个月的积分总额重新划定",
        "每月显示上个月的等级"
      ],
      bonusRule: [
        {
          label: "批销签收",
          norm: "1分/1元",
          explain:
            "月购物频次≥5次或者月动销商品数≥6个，当月批销签收行为累计积分翻倍。两条件都满足，享受双重翻倍"
        },
        {
          label: "代购签收",
          norm: "1分/1元",
          explain: "本月内代购总额≥ 30元，当月代购签收行为累计积分翻倍"
        },
        {
          label: "进销存",
          norm: "1分/1元",
          explain:
            "-需满足日销售≥4H且≥300元，同时日订单≥20单，不满足不计分<p></p>-日POS收银≥6小时或者≥1700元，当月进销存行为累计积分翻版。两条件都满足，享受双重翻倍"
        },
        {
          label: "会员订单",
          norm: "100分/1单",
          explain: "短信验证过的会员下单"
        },
        { label: "掌柜码收款", norm: "2分/1元", explain: "使用掌柜码结算" },
        { label: "掌柜贷付款", norm: "1分/1元", explain: "批销使用掌柜贷付款" },
        {
          label: "每日登录",
          norm: "50分",
          explain: "登录app积分，每天封顶50分"
        }
      ],
      deductionRule: [
        {
          label: "属问题网点",
          norm: "积分双倍扣减",
          explain: "-一台电脑登录>1个掌柜号并发生销售<p></p>-短频刷单"
        },
        {
          label: "违反风控",
          norm: "次月降至最低等级",
          explain: "掌柜码违反风控规则，系统认定有套现行为"
        },
        {
          label: "掌柜贷逾期3天",
          norm: "当天不积分",
          explain: "掌柜贷逾期3天未还款"
        },
        {
          label: "掌柜贷逾期7天",
          norm: "积分双倍扣减",
          explain: "掌柜贷逾期7天未还款"
        },
        {
          label: "掌柜贷逾期30天",
          norm: "次月降至最低等级",
          explain: "掌柜贷逾期30天未还款"
        }
      ],
      gradeInfo,
      progressInfo: { v1: 0, v2: 0, v3: 0, v4: 0, v5: 0, total: 0 },
      dialogInfo: null
    };
  },
  components: {
    GradeHeader
  },
  methods: {
    openDialog(type, label, norm, explain) {
      this.dialogInfo = { type, label, norm, explain };
    },
    closeDialog() {
      this.dialogInfo = null;
    },

    onDialogScroll(e) {
      e.preventDefault();
    },

    renderProgress() {
      var fraction = this.fraction;

      // 计算每个进度条进度
      var _countProgress = function(obj) {
        var min = obj.min;
        var max = obj.max;
        return (100 / (max - min)) * (fraction - min);
      };

      // 计算总进度
      var _countTotalProgress = function(obj) {
        var min = obj.min;
        var max = obj.max;
        var index = obj.index;
        var n = (1 / (max - min)) * 0.2;
        var result = (fraction - min) * n + 0.2 * index;
        return result * 100;
      };

      var temp = {};
      for (var i in gradeInfo) {
        var iTem = gradeInfo[i];
        var min = iTem.min;
        var max = iTem.max;
        var index = iTem.index;
        if (fraction > max) {
          temp[i] = 100;
          this.progressInfo[i] = 100;
        } else if (fraction <= max && fraction > min) {
          var progress = _countProgress(iTem);
          var total = _countTotalProgress(iTem);
          temp[i] = progress;
          temp["total"] = total;
          this.title = iTem.text;
        } else {
          temp[i] = 0;
        }
        if (index == 0 && fraction <= min) {
          this.title = iTem.text;
        }
        // 超出20W
        if (index == 4 && fraction > max) {
          temp["total"] = 100;
          this.title = iTem.text;
        }
      }
      this.progressInfo = temp;
    }
  },
  mounted() {
    this.renderProgress();
  },
  beforeDestroy() {}
};
</script>


<style scoped lang="scss">
.grade {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  img {
    display: block;
  }

  section.grade-content {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    div.grade-info {
      width: 7.5rem;
      height: 4.6rem;
      background: url("../../images/vips/grade_info_bg.png") no-repeat;
      background-size: 100%;
      background-color: #25231d;
      div.grade-manager {
        width: 6.3rem;
        margin: 0 auto;
        text-align: center;
        padding-top: 1.4rem;
        span {
          display: block;
          color: #fff;
          font-size: 0.44rem;
          font-weight: bold;
        }
      }

      div.graction-progress-box {
        position: relative;
        width: 6.3rem;
        height: 1.32rem;
        margin: 0.2rem auto 0 auto;
        div.current-progress {
          position: absolute;
          width: 0.96rem;
          height: 0.96rem;
          left: 0%;
          top: 0px;
          margin-left: -0.48rem;
          z-index: 9998;
          .fraction {
            position: relative;
            width: 0.96rem;
            height: 0.32rem;
            line-height: 0.32rem;
            background: #c4a35b;
            border-radius: 0.04rem;
            text-align: center;
            color: #3f2800;
            font-size: 0.24rem;
            overflow: hidden;
            z-index: 1001;
          }
          .line {
            position: absolute;
            width: 0.04rem;
            height: 100%;
            background: #c4a35b;
            top: 0;
            left: 50%;
            margin-left: -0.02rem;
            z-index: 1000;
          }
          .circle {
            position: absolute;
            width: 0.16rem;
            height: 0.16rem;
            background: #c4a35b;
            border-radius: 0.08rem;
            bottom: 0;
            left: 50%;
            margin-left: -0.08rem;
            z-index: 1001;
          }
        }

        ul {
          height: 0.4rem;
          li {
            list-style: none;
            float: left;
            width: 20%;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.24rem;
            text-align: center;
            color: #fff;
          }
        }
        ul.graction-progress {
          height: 0.06rem;
          padding-top: 0.85rem;
          li {
            height: 0.06rem;
            div.item-progress {
              position: relative;
              height: 0.06rem;
              margin: 0 0.04rem;
              border-radius: 0.06rem;
              background: #fff;
              span.item-current-progress {
                position: relative;
                width: 0%;
                height: 0.06rem;
                display: block;
                border-radius: 0.06rem;
                background: #c4a35b;
              }
            }
          }
        }

        ul.graction-label {
          padding-top: 0.06rem;
        }
        ul.graction-grade-section {
          position: absolute;
          width: 100%;
          right: 0.64rem;
          bottom: 0.5rem;
        }
      }
    }

    h3 {
      font-size: 17px;
      padding: 10px 0;
      color: #333;
    }

    div.grade-rule {
      padding: 0px 10px;
      background: #fff;
      font-size: 14px;
      h3 {
        border-bottom: 1px solid #e5e5e5;
      }
      ul {
        padding: 10px 0px;
        li {
          position: relative;
          height: 26px;
          line-height: 26px;
          padding-left: 10px;
          font-size: 14px;
        }
        li::before {
          content: "";
          position: absolute;
          width: 4px;
          height: 4px;
          left: 0px;
          top: 50%;
          margin-top: -2px;
          background-color: #333;
        }
      }
    }

    div.bonus-rule {
      padding: 0px 10px 10px 10px;
      background: #fff;
      margin-top: 10px;
      font-size: 14px;
      h3 {
        font-size: 17px;
      }
    }

    div.deduction-rule {
      padding: 0px 10px 10px 10px;
      background: #fff;
      margin-top: 10px;
      font-size: 14px;
      h3 {
        font-size: 17px;
      }
    }

    table {
      width: 100%;
      border: 1px solid #e5e5e5;
      border-right: 0;
      border-bottom: 0;
      thead {
        tr {
          background-color: #f5f5f5;
        }
      }
      tr {
        td {
          position: relative;
          height: 20px;
          font-size: 14px;
          padding: 10px;
          border: 1px solid #e5e5e5;
          border-left: 0;
          border-top: 0;
          color: #333;
          span.controll {
            position: absolute;
            top: 50%;
            right: 10px;
            height: 40px;
            line-height: 40px;
            margin-top: -20px;
            color: #0072cf;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }
          span.explain {
            display: none;
          }
          span.controll {
            display: none;
          }
        }
        td.label {
          width: 28%;
        }
        td.norm-explain {
          width: 30%;
        }
      }
    }
  }
}
div.app {
  .grade-content {
    table {
      tr {
        td {
          span.explain {
            display: inline;
          }
        }
        td.label {
          width: 35%;
        }
        td.explain {
          display: none;
        }
        td.norm-explain {
          width: auto;
          span.controll {
            display: inline;
          }
        }
      }
    }
  }
}

#Dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 11000;

  section {
    position: absolute;
    width: 100%;
    height: 300px;
    background-color: #fff;
    bottom: 0;
    left: 0;

    header {
      position: relative;
      height: 44px;
      line-height: 44px;
      padding: 0px 10px;
      font-size: 16px;
      font-weight: bold;
      border-bottom: 1px solid #e5e5e5;

      i.close {
        position: absolute;
        width: 44px;
        height: 44px;
        right: 0;
        top: 0;
        background: url("../../images/vips/close.png") center center no-repeat;
        background-size: 12px 12px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
    }
    div.dialog-info {
      height: 185px;
      padding: 0px 10px;
      p {
        padding: 5px 0px;
        color: #999;
        font-size: 14px;
      }
    }
    .button {
      margin: 10px;
      height: 48px;
      line-height: 48px;
      border-radius: 3px;
      text-align: center;
      border: 1px solid #e5e5e5;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
  }
}

div.pad {
  section.grade-content {
    div.grade-info {
      width: 100%;
      height: 4rem;
      div.grade-manager {
        width: 100%;
        padding-top: 1rem;
      }

      div.graction-progress-box {
        width: 80%;
        ul {
          li {
            font-size: 0.18rem;
          }
        }
        ul.graction-grade-section {
          right: 0.5rem;
        }
      }
    }
  }
}
</style>
