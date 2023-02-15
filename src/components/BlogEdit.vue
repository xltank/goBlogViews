<template lang="pug">
a-layout.main
  a-layout-content
    a-form(:model="blogStore._blog" :label-col="{span: 2}" :wrapper-col="{span: 22}")
      a-form-item(label="Title")
        a-input(v-model:value="blogStore._blog.title")
      a-form-item(label="Content")
        a-textarea(v-model:value="blogStore._blog.content" :auto-size="{minRows: 20, maxRows: 50}")
      a-form-item(:wrapper-col="{offset: 12, span: 12}")
        a-button(type="primary" html-type="submit" @click="onSubmit") Submit

</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import {useBlogStore} from "../store/blogStore.js";

const blogStore = useBlogStore()

const getBlogs = async () => {
  let list = await blogStore.getList()
}

onMounted(()=> {
  getBlogs()
})


const onSubmit = async () =>{
  let r = await blogStore.save()
}

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