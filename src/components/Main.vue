<template lang="pug">
a-layout.main
  a-layout-content
    .content | Main Content
</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import blogApi from "../api/blogApi.js"

const getBlogs = async () => {
  let list = await blogApi.list()
}

onMounted(()=> {
  getBlogs()
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