<template>
  <div class="yzg-form-box">
    <ul>
      <li v-for="(item, index) in lists" :key="index">
        <yzg-input
          v-if="item.type=='input'"
          :label="item.label"
          :hidden="item.hidden"
          :disabled="item.disabled"
          :placeholder="item.placeholder"
          :value="item.value"
        ></yzg-input>
      </li>
    </ul>
  </div>
</template>

<script>
import YzgInput from "../../input";

export default {
  name: "yzg-form",
  props: {
    lists: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  components: {
    YzgInput
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>