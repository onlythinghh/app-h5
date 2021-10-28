<template>
  <input ref="upload" type="file" name="file" accept="image/*">
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "upload",
  methods: {
    ...mapActions(["setUploadElement"]),

    init() {
      this.setUploadElement(this.$refs.upload);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scope>
input[type="file"] {
  position: absolute;
  top: -9999px;
}
</style>