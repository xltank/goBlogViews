<template lang="pug">
a-layout.main
  a-layout-content
    .title {{blogStore.blog.title}}
    .meta
      span.time {{dayjs(blogStore.blog.createdAt).format("YYYY-MM-DD HH:mm:ss")}}
      span.tags
        a-tag(v-for="t in blogStore.blog.tags") {{t.content}}
    pre.content {{blogStore.blog.content}}

</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import {useBlogStore} from "../store/blogStore.js";
import {useRoute, useRouter} from "vue-router";
import blogApi from "../api/blogApi"
import {message} from "ant-design-vue";
import dayjs from "dayjs";

const router = useRouter()
const route = useRoute()

const blogStore = useBlogStore()

const getBlog = async () => {
  let {id} = route.query
  console.log("blogEdit", id)

  if(!id) {
    return message.error("id not found")
  }
  let r = await blogApi.getById(id)
  blogStore._blog = r.data
}

onMounted(()=> {
  getBlog()
})

</script>

<style lang="less" scoped>

.title {
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.time {
  padding-right: 20px;
}

.meta {
  border-top: #adb4c9 0.5px solid;
  border-bottom: #adb4c9 0.5px solid;
  padding: 20px 10px;
}

.ant-tag {
  font-size: 16px;
}

.content {
  //font-size: 14px;
  margin-top: 20px;
}

</style>