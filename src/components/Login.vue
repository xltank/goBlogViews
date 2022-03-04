<template>
    <div class="login flex_box flex-column flex-justify-center flex-align-center">
        <p class="lang" @click="changeLang">中/EN</p>
        <div class="logo-fff-big"></div>
        <div class="login-box flex_box flex-justify-center">
            <div class="flex-justify-center">
                <p class="title adi_b">{{ $t('login.title') }}</p>
                <el-form ref="form" :model="form" label-width="5rem" class="adi_r" label-position="top">
                    <span class="err-msg">{{ errMsg }}</span>
                    <el-form-item>
                        <p class="text-20">{{$t('login.email')}}</p>
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <p class="text-20">{{$t('login.password')}}</p>
                        <el-input v-model="form.pass"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox-group v-model="form.rememberMe">
                            <el-checkbox :label="$t('login.rememberMe')" name="rememberMe"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onLogin">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import moment from "moment"

export default {
    name: 'Login',
    props: {
        name: String
    },
    data() {
        return {
            form: {
                email: "",
                pass: "",
                rememberMe: false,
            },
            errMsg: ''
        }
    },
    methods: {
        onLogin() {
            console.log(this.form)
        },
        changeLang(){
            this.$i18n.locale = this.$i18n.locale === 'zh' ? 'en' : 'zh';
            localStorage.setItem('lang', this.$i18n.locale);
            document.cookie = `lang=${ this.$i18n.locale }; Path=/; expires=${moment().add(1, 'y').utc()}`;
        }
    }
}

</script>

<style scoped lang="scss">

@import '../assets/css/common';

div.login {
    width: 100vw;
    height: 100vh;
    min-height: 570px;
    margin: 0 auto;
    padding: 0 0;
    color: rgba(255, 255, 255, 0.9);
    background: url("~@images/loginBg.jpg") no-repeat center;
    background-size: cover;

    p.lang {
        position: fixed;
        right: 1.5rem;
        top: 1rem;
        cursor: pointer;
    }
}

.login-box {
    background-color: rgba(255, 255, 255, 0.9);
    width: 47rem;
    height: 28rem;
    color: rgba(0, 0, 0, 1);
    padding-top: -10rem;

    .title {
        margin-top: 2rem;
        font-size: 1.6rem;
        text-align: center;
    }

    .el-form {
        margin: 5rem 0;
        width: 18rem;
        color: rgba(0, 0, 0, 1);
    }

    .el-input {
        border-bottom: 1px solid #c0c0c0;
    }

    ::v-deep {
        .el-input__inner {
            border: none;
            border-radius: 0;
            padding: 0;
        }

        .el-form-item__content { line-height: 20px; }
    }

}

@media all and (max-width: 1440px) {
    * {font-size: 14px;}
}

@media all and (max-width: 1280px) {
    * {font-size: 12px}
}

.err-msg {

}

</style>
