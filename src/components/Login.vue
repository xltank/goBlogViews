<template lang="pug">
a-layout
  a-layout-content.content
    .box
      a-row.header
        .logo-part
        .title A Site
      a-row.header
        a-form.form(:model="userStore.form" :label-col="{span: 5}" :wrapper-col="{span: 18}")
          a-form-item(label="邮箱")
            a-input.input(v-model:value="userStore._form.email")
          a-form-item(label="密码")
            a-input.input(v-model:value="userStore._form.password" type="password" @keyup.enter="login")
          a-form-item
            .submit-box
              a.sign-up(@click="toSignUp") 注册
              a-button.submit(@click="login") 登录
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {cloneDeep} from "lodash";
import {useUserStore} from "/src/store/userStore";
import SvgIcon from "/src/components/SvgIcon.vue";
import {message} from "ant-design-vue";
import consts from "../utils/consts"
import HeaderBar from "./HeaderBar.vue";

const router = useRouter();
const route = useRoute();

const userStore = useUserStore();

// const labelCol = ref({style: {width: '50px'}})

const login = async function () {
  try {
    let r = await userStore.login();
    localStorage.setItem("user", JSON.stringify(r.data))
    userStore._user = r.data
    await router.push({name: 'main'})
  } catch (e) {
    console.log(e);
  }
}

const toSignUp = async function () {
  await router.push({name: 'signUp'})
}

const valid = computed(() => {
  userStore.form.name = (userStore.form.name || '').trim()
  return userStore.form.name && userStore.form.password;
})

</script>

<style lang="less" scoped>

@import "../assets/style/variables";

.content {
  min-width: 1240px;
  background-color: @color-white;
  //height: calc(100vh - 120px);
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 600px;

    .header {
      display: flex;
      justify-content: center;
    }

    .logo-part {
      width: 32px;
      height: 32px;
      background: url("../assets/svg/vite.svg") no-repeat center;
      margin-bottom: 50px;
    }

    .title {
      margin-left: 10px;
      font-size: 28px;
      font-weight: bold;
      color: @color-main-dark;
      font-style: italic;
    }

    .form {
      width: 300px;
    }
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

:deep(.ant-input) {
  font-size: 12px;
  width: 230px;
  height: 40px;
  background-color: @color-grey;
  border: none;
  border-radius: 8px;
}

.ant-input:hover {
  border-color: @color-main;
  border-right-width: 1px !important;
}

.ant-input:focus {
  border-color: @color-main;
  border-right-width: 1px !important;
}

.submit-box {
  display: flex;
  justify-content: right;
  .sign-up {
    line-height: 40px;
    color: @color-main;
    text-decoration: underline;
    font-weight: bold;
  }
  .submit {
    margin-left: 40px;
  }
}

</style>