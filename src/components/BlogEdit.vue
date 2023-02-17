<template lang="pug">
a-layout.main
  a-layout-content
    a-form(:model="blogStore._blog" :label-col="{span: 2}" :wrapper-col="{span: 22}" @keyup.enter="null")
      a-form-item(label="Title")
        a-input(v-model:value="blogStore._blog.title")
      a-form-item(label="Content")
        a-textarea(v-model:value="blogStore._blog.content" :auto-size="{minRows: 20, maxRows: 50}")
      a-form-item(label="Tags")
        .tags
          a-tag(v-for="t in tags" :closable="true" @close="onTagClose(t)") {{t}}
        a-input(@keyup.enter="addTag" v-model:value="tag")
      a-form-item(:wrapper-col="{offset: 12, span: 12}")
        a-button(type="primary" @click="onSubmit") Submit

</template>

<script setup>

import { onMounted, ref, computed, watch } from "vue";
import _ from "lodash"
import {useBlogStore} from "../store/blogStore.js";
import {useRoute, useRouter} from "vue-router";
import blogApi from "../api/blogApi"

const router = useRouter()
const route = useRoute()

const blogStore = useBlogStore()

const getBlog = async () => {
  let {id} = route.query
  console.log("blogEdit", id)
  if(id) {
    let r = await blogApi.getById(id)
    blogStore._blog = r.data
  } else {
    blogStore._blog = blogStore.newBlog()
  }
  tags.value = _.map(blogStore.blog.tags, 'content') || []
}

onMounted(()=> {
  getBlog()
})

const tag = ref("")
const tags = ref([])

const addTag = () =>{
  tags.value.push(tag.value)
  tags.value = _.uniq(tags.value)
  tag.value = ""
}

const onTagClose = (t) => {
  tags.value = _.reject(tags.value, tag => tag === t)
}

const onSubmit = async () =>{
  blogStore._blog.tags = tags.value.map(t => {
    return {content: t}
  })
  let r = await blogStore.save()
  await router.push({name: "blog", query: {id: r.data.id}})
}

</script>

<style lang="less" scoped>

.main {
  margin-top: 20px;
}

</style>