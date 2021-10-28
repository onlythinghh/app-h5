<template>
    <div class="title">{{title}}</div>
</template>

<script>
export default {
  name: "titles",
  props: {
    title: String
  }
};
</script>

<style scoped lang="scss">
div.title {
  position: relative;
  padding: 18px 10px 10px 20px;
  font-weight: bold;
  font-size: 16px;
  color: #333;
}
div.title::before {
  position: absolute;
  content: "";
  top: 50%;
  left: 10px;
  width: 6px;
  height: 15px;
  margin-top: -3px;
  background-color: #ef3b3a;
}
</style>
