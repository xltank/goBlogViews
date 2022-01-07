<template>
    <div class="login">
        <section class="flex_box flex-justify-center flex-align-center">
            <p class="lang">中/EN</p>
            <div class="logo-fff-big"></div>
            <div class="login-box">
                <div class="flex-justify-center">
                    <span class="title">{{ $t('login.title') }}</span>
                </div>
                <div class="flex-justify-center">
                    <el-form ref="form" :model="form" label-width="5rem">
                        <span class="err-msg">{{errMsg}}</span>
                        <el-form-item :label="$t('login.email')">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('login.password')">
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-checkbox-group v-model="form.type">
                                <el-checkbox :label="$t('login.rememberMe')" name="rememberMe"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </section>
        <section class="flex-justify-center">
        </section>
    </div>
</template>

<script>
export default {
    name: 'Login',
    props: {
        name: String
    },
    data() {
        return {
            form: {},
            errMsg: ''
        }
    },
    methods: {
        onLogin() {

        }
    }
}

</script>

<style scoped lang="scss">

@import '../assets/css/common';

div.login {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    padding: 0 0;
    color: rgba(255, 255, 255, 0.9);
    background: url("~@images/loginBg.jpg") no-repeat center;
    background-size: cover;

    p.lang {
        position: fixed;
        right: 1.5rem;
        top: 0rem;
    }
}

.login-box {
    background-color: rgba(255, 255, 255, 0.9);
    width: 47rem;
    height: 28rem;
    color: rgba(0, 0, 0, 1);

    .title {
        margin-top: 2rem;
        font-size: 1.6rem;
    }

    .el-form {
        margin: 5rem 0;
        width: 25rem;
        color: rgba(0, 0, 0, 1)

    }
}

.err-msg {

}

</style>
