<template lang="pug">
.content
  | left nav
</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"


onMounted(()=> {
})

</script>

<style lang="less" scoped>

.content {
  background: white;
}

.ant-row {
  margin-top: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .download {
    margin-left: 20px;
    cursor: pointer;
  }
}

</style>