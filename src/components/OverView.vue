<template lang="pug">
a-layout.main
  a-layout-content
    .content
</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import moment from "moment"

const onSearch = async () => {

}

onMounted(()=> {
  onSearch()
})

</script>

<style lang="less" scoped>

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