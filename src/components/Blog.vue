<template lang="pug">
a-layout.main
  a-layout-content
    .title

</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import {useBlogStore} from "../store/blogStore.js";
import {useRoute, useRouter} from "vue-router";
import blogApi from "../api/blogApi"
import {message} from "ant-design-vue";

const router = useRouter()
const route = useRoute()

const blogStore = useBlogStore()

const getBlog = async () => {
  let {id} = route.query
  console.log("blogEdit", id)

  if(!id) {
    return message.error("id not found")
  }
  let r = blogApi.getById(id)
  blogStore._blog = r.data
}

onMounted(()=> {
  getBlog()
})

</script>

<style lang="less" scoped>

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
</style>