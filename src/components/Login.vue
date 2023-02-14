<template lang="pug">
a-layout
  a-layout-header
    a-row(type="flex" justify="start" align="top")
      .logo-part
        .logo
      .title XXXX
  a-layout-content.content
    a-form.form(:model="userStore.form" :label-col="labelCol")
      a-form-item(label="邮箱")
        a-input.input(v-model:value="userStore._form.email")
      a-form-item(label="密码")
        a-input.input(v-model:value="userStore._form.password" type="password" @keyup.enter="onSubmit")
      a-form-item(:wrapper-col="{ span: 14, offset: 4 }")
        a-button.submit(@click="onSubmit") 登录
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {cloneDeep} from "lodash";
import {useUserStore} from "/src/store/users";
import SvgIcon from "/src/components/SvgIcon.vue";
import {message} from "ant-design-vue";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

const labelCol = ref({ style: { width: '50px' } })

const onSubmit = async function() {
  try {
    let r = await userStore.login();
    localStorage.setItem("user", JSON.stringify(r.data))
    userStore._user = r.data
    await router.push({name: 'overview'})
  } catch (e) {
    console.log(e);
  }
}

const valid = computed(()=>{
  userStore.form.name = (userStore.form.name || '').trim()
  return userStore.form.name && userStore.form.password;
})

</script>

<style lang="less" scoped>

@import "../assets/style/variables";

.ant-layout {
  min-width: 1240px;
  background-color: @color-white;

  .ant-layout-header {
    height: @header-height;
    background-color: @color-grey;
    border-radius: 8px;
    padding: 0;

    .logo-part {
      width: 32px;
      height: @header-height;
      //background: url("../assets/svg/vite.svg") no-repeat center;

      .logo {
        width: 32px;
        height: @header-height;
        line-height: @header-height;
        float: left;
        background: url("../assets/svg/vite.svg") no-repeat center;
      }
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      color: @color-green-dark;
      font-style: italic;
    }
  }
}

.content {
  height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  .form {

  }
}

:deep(.ant-form-item-label) {
  display: flex;
  justify-content: center;
  align-items: center;
  label:after {
    content: "";
  }
}

.icon {
  margin-right: 6px;
}

.label {
  color: @color-green-dark;
  line-height: 40px;
}

:deep(.ant-input) {
  font-size: 12px;
  width: 260px;
  height: 40px;
  background-color: @color-grey;
  border: none;
  border-radius: 8px;
}

.ant-input:hover {
  border-color: @color-green;
  border-right-width: 1px !important;
}

.ant-input:focus {
  border-color: @color-green;
  border-right-width: 1px !important;
}

.submit {
  margin-left: 63px;
}

.ant-btn {
  width: 160px;
  height: 40px;
  background-color: @color-green;
  color: @color-white;
  border-radius: 8px;
  border:none;
  font-size: 14px;
  font-weight: bold;
}

.ant-btn:disabled {
    background-color: @color-green-disabled;
  }
</style>