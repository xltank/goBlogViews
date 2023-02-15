<template lang="pug">
a-layout
  a-layout-content.content
    .box
      a-row.header
        .logo-part
        .title A Site
      a-row.header
        a-form.form(:model="userStore.form" :label-col="{span: 6}" :wrapper-col="{span: 18}")
          a-form-item(label="邮箱")
            a-input.input(v-model:value="userStore.form.email")
          a-form-item(label="密码")
            a-input.input(v-model:value="pass" type="password")
          a-form-item(label="确认密码")
            a-input.input(v-model:value="pass1" type="password" @keyup.enter="onSubmit")
          a-form-item(:wrapper-col="{ offset: 9 }")
            .submit-box
              a-button.submit(@click="onSubmit") 注册
</template>

<script setup>
import {computed, ref} from "vue";
import {useRouter, useRoute} from "vue-router";
import {cloneDeep} from "lodash";
import {useUserStore} from "/src/store/userStore";
import {message} from "ant-design-vue";

const pass = ref("test@123")
const pass1 = ref("test@123")

const router = useRouter();
const route = useRoute();

const labelCol = ref({ style: { width: '100px' } })

const userStore = useUserStore();

const onSubmit = async function() {
  if(pass.value !== pass1.value)
    return message.error("您两次输入的密码不一致")

  userStore._form.password = pass.value

  try {
    let r = await userStore.signUp();
    await router.push({name: 'main'})
  } catch (e) {
    console.log(e);
  }
}

const valid = computed(()=>{
  userStore._form.name = (userStore.form.name || '').trim()
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
  justify-content: space-between;
  .submit {
  }
}
</style>