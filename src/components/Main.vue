<template lang="pug">
a-layout.main
  a-layout-content
    a-list(item-layout="vertical" size="large" :pagination="pagination" :data-source="blogStore._list")
      template(#renderItem="{ item }")
        a-list-item(key="item.title")
          a-list-item-meta // (:description="item.createdAtLabel")
            template(#title)
              a(@click="router.push({name: 'blog', query: {id: item.id}})") {{ item.title }}
            template(#description)
              .meta
                span.time {{item.createdAtLabel}}
                a-tag(v-for="t in item.tags") 222
          template(#actions)
            span(v-for="{ type, text } in actions" :key="type")
              component(:is="type" style="margin-right: 8px")
              | {{ text }}
          template(#extra)
            EditOutlined(@click="router.push({name: 'blogEdit', query: {id: item.id}})")
          div {{ item.content.substring(0, 30) }}
</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import {useBlogStore} from "../store/blogStore.js";
import {StarOutlined, LikeOutlined, MessageOutlined, EditOutlined} from "@ant-design/icons-vue"
import {useRouter} from "vue-router";

const router = useRouter()

const actions = [
  { type: StarOutlined, text: '123' },
  { type: LikeOutlined, text: '34' },
  { type: MessageOutlined, text: '5' },
];

const pageSize = 10

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

.tags {
  margin-left: 20px;
}

.time {
  margin-right: 20px;
}

</style>