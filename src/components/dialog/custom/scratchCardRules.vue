<template>
  <div class="rules">
    <h3>活动时间：</h3>
    <p>每周四早9:00开始，持续至晚24:00。</p>
    <h3>活动奖品：</h3>
    <p>活动奖品为商家券，用户中奖后可在电脑端“掌柜中心”-“我的优惠券”或邮掌柜app“我的优惠券”查看。</p>
    <h3>参与次数：</h3>
    <p>掌柜等级每月1日更新，更新后当月等级不变，相应的当月每个活动日可参与游戏次数不变；</p>
    <p>当月不同等级掌柜每个活动日可参与的活动次数不等，详见下表。</p>
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <td>
            <div>等级</div>
          </td>
          <td>
            <div>铁牌掌柜</div>
          </td>
          <td>
            <div>铜牌掌柜</div>
          </td>
          <td>
            <div>银牌掌柜</div>
          </td>
          <td>
            <div>金牌掌柜</div>
          </td>
          <td>
            <div>钻石掌柜</div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <div>次数</div>
          </td>
          <td>
            <div>1</div>
          </td>
          <td>
            <div>5</div>
          </td>
          <td>
            <div>5</div>
          </td>
          <td>
            <div>5</div>
          </td>
          <td>
            <div>10</div>
          </td>
        </tr>
      </tbody>
    </table>
    <p>活动次数每周四24:00清零，不可累积至下个活动日。</p>
  </div>
</template>

<script>
export default {
  name: "scratchCardRules"
};
</script>

<style scoped lang="scss">
.rules {
  height: 220px;
  text-align: left;
  font-size: 14px;
  overflow: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  h3 {
    font-size: 14px;
    color: #333;
    margin-top: 6px;
    padding: 2px 0px;
  }

  table {
    border: 1px solid #ddd;
    border-left: 0;
    border-bottom: 0;
    margin: 6px 0;
    tr {
      height: 28px;
      td {
        border: 1px solid #ddd;
        border-top: 0;
        border-right: 0;
        font-size: 12px;
        text-align: center;
        div {
          font-size: 12px;
          transform: scale(0.9);
        }
      }
    }
  }
}
</style>