<template lang="pug">
a-layout.main
  a-layout-content
    a-list(item-layout="vertical" size="large" :pagination="pagination" :data-source="blogStore._list")
      template(#renderItem="{ item }")
        a-list-item(key="item.title")
          template(#actions)
            span(v-for="{ type, text } in actions" :key="type")
              component(:is="type" style="margin-right: 8px")
              | {{ text }}
          a-list-item-meta(:description="item.content")
            template(#title)
              a(@click="router.push({name: 'blog', query: {id: item.id}})") {{ item.title }}
          div {{ item.content }}
</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import {useBlogStore} from "../store/blogStore.js";
import {StarOutlined, LikeOutlined, MessageOutlined} from "@ant-design/icons-vue"
import {useRouter} from "vue-router";

const router = useRouter()

const actions = [
  { type: StarOutlined, text: '123' },
  { type: LikeOutlined, text: '34' },
  { type: MessageOutlined, text: '5' },
];

const pageSize = 2

const pagination = ref({
  onChange: (page) => {
    console.log("pagination", page);
    blogStore.getList((page -1) * pageSize, pageSize)
  },
  pageSize: pageSize,
  current: 0,
  total: 0
});

const blogStore = useBlogStore()

onMounted(async ()=> {
  await blogStore.getList(0, pageSize)
  pagination.value.total = blogStore.total
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