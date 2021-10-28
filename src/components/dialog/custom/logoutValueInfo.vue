<template>
  <div class="logout-value">
    <h3>您的账户余额尚未清空
      <br>需消费完毕才能注销账户哦。
    </h3>
    <div class="content">
      <ul>
        <li>
          <span>钱包余额：</span>
          <span class="value">￥{{customData.abValue}}</span>
        </li>
        <li>
          <span>邮金币：</span>
          <span class="value">{{customData.pgcValue}}个</span>
        </li>
        <li>
          <span>邮乐卡余额：</span>
          <span class="value">￥{{customData.ubValue}}</span>
        </li>
        <!-- <li>
          <span>邮乐积分：</span>
          <span class="value">{{customData.upValue}}</span>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "logoutValueInfo",
  props: ["customData"]
};
</script>

<style scoped lang="scss">
div.logout-value {
  h3 {
    font-size: 16px;
    color: #333;
    padding: 10px 10px 26px 10px;
    margin-top: 0;
    border-bottom: 1px dashed #999;
  }
  div.content {
    padding: 20px 10px 4px 10px;
    ul {
      li {
        list-style: none;
        text-align: center;
        height: 22px;
        line-height: 22px;
        display: flex;
        span {
          flex: 1;
          color: #999;
          text-align: right;
        }
        span.value {
          color: #ff192e;
          text-align: left;
        }
      }
    }
  }
}
</style>