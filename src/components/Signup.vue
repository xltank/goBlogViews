<template>
    <div class="login flex_box flex-column flex-justify-center flex-align-center">
        <p class="lang" @click="changeLang">中/EN</p>
        <div class="logo-fff-big"></div>
        <div class="login-box flex_box flex-justify-center">
            <div class="flex-justify-center">
                <p class="title adi_b">{{ $t('signup.title') }}</p>
                <p class="errorHint co_red">{{ errorHint }}</p>
                <el-form ref="form" :model="form" label-width="5rem" class="adi_r" label-position="top" :rules="rules">
                    <span class="err-msg">{{ errMsg }}</span>
                    <el-form-item>
                        <p class="text-20">{{$t('signup.email')}}</p>
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item prop="password1">
                        <p class="text-20">{{$t('signup.password')}}</p>
                        <el-input v-model="form.pass"></el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <p class="text-20">{{$t('signup.password2')}}</p>
                        <el-input v-model="form.pass2"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onLogin">{{ $t('signup.title') }}</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

import moment from "moment"
import { JSEncrypt } from "jsencrypt";
// import utils from "@lib/utils"

var publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs+dvjIjxd5b5ZeDFXBJ+
Qs/YMKt6HGTF9DjNnNgyhTaSNGhZOwl22rpQwU/uXecniisi6LME8FBqTN4nBGqF
n7jm5sqkF5Uq5xmfbKbJ7enZvrEiSIs3fdlENZ4SapGUYPeN8r0cSLJDm+F5f2pJ
M4VjKSRCesG5vTJiiJ/PlQO9Us+tQNqm9OLNzK3BYFLXnoYxCJcmTod3Hbsz3ent
iZkszwrv78pE5g/wRZ8cNPZUOQ9lIs9izyOds1OGKVfbV45F98NXQ7oXzhJw/syW
UnvSZRXZmgDeW9SmQINMM9iHipizmLe2wDUx71Id1fNh0NlwXMoPq4Y9O3Oa6JTZ
gwIDAQAB
-----END PUBLIC KEY-----`;

export default {
    name: 'Login',
    props: {
        name: String
    },
    data() {
        let validatePass1 = (rule, value, callback) => {
            return callback();
/*
            let regex = new RegExp("^.*(?=.{6,12})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:\";'<>?,.\\\\/]).*$");
            this.errorHint = '';
            if (value === '') {
                callback(new Error(this.$t('login.noPass')));
            } else if(!regex.test(value) || value.length > 12) {
                this.errorHint = this.$t("login.errorPassHint")
                callback(new Error(this.$t("login.errorPass")));
            }else if(this.setPass.password2 && value !== this.setPass.password2) {
                this.errorHint = this.$t("login.noSamePass")
                callback(new Error(' '));
            } else {
                callback();
            }*/
        };
        let validatePass2 = (rule, value, callback) => {
            return callback();

            /*let regex = new RegExp("^.*(?=.{6,12})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[~!@#$%^&*()_+`\\-={}:\";'<>?,.\\\\/]).*$");
            this.errorHint = '';
            if (value === '') {
                callback(new Error(this.$t('login.noRePass')));
            }
            else if(!regex.test(value) || value.length > 12) {
                this.errorHint = this.$t("login.errorPassHint")
                callback(new Error(this.$t("login.errorPass")));
            }
            else if(value !== this.setPass.password1) {
                this.errorHint = this.$t("login.noSamePass")
                callback(new Error(' '));
            }
            else {
                callback();
            }*/
        };

        return {
            form: {
                email: "test@test.com",
                pass: "test@123",
                pass2: "test@123",
                rememberMe: false,
            },
            errMsg: '',
            errorHint: "",
            rules: {
                password1: [
                    { validator: validatePass1, trigger: 'blur' }
                ],
                password2: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                // email: [
                //     { required: true, message: this.$t('login.noEmail'), trigger: 'blur' },
                //     { type: 'email', message: this.$t('login.errorEmail'), trigger: ['blur', 'change'] }
                // ],
            },
        }
    },
    methods: {
        async onLogin() {
            console.log(this.form)
            // if(!utils.validateEmail(this.form.email))
            //     return alert("Invalid Email Pattern!")

            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(publicKey);
            var encrypted = encrypt.encrypt(this.form.pass);
            console.log(encrypted)

            let r = await this.api.signup({email: this.form.email, pass: encrypted})
            console.log(r);
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
