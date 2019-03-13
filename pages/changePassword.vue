<template>
    <main class="login-wrap">
        <div class="register-form-wrap">
            <el-form :model="form" label-position="right" status-icon :rules="rules" ref="loginForm" label-width="100px" class="registerForm" id = 'registerForm'>
                <el-form-item label="邮箱" prop="commentUserEmail">
                    <el-input  v-model="form.commentUserEmail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="commentUserPassword">
                    <el-input type="password" v-model="form.commentUserPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newCommentUserPassword">
                    <el-input type="password" v-model="form.newCommentUserPassword"></el-input>
                </el-form-item>
                <el-form-item style="margin: 0;" label="确认密码" prop="commentUserPassword2">
                    <el-input type="password" v-model="form.commentUserPassword2"></el-input>
                </el-form-item>
                 <el-form-item style="margin: 0;text-align: right;">
                    <el-button type="text" @click="goUserDetail('/login')">用户登录</el-button>
                </el-form-item>
                <el-form-item>
                    <p v-if="showErrMsg" style="color: #f56c6c">{{errMsg}}</p>
                    <el-button type="primary" @click="registerBtn()" :loading="registerLoading">修改密码</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
import { ApiUserChangePwd } from '~/plugins/server/user'
export default {
    layout: 'noFooter',
    head: {
        title: '~~Jay的小栈 || Register Page',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈注册页面' },
            { property: 'og:title', content: 'Register Page'},
            { property: 'og:type', content: 'Register Page'},
            { property: 'og:description', content: 'Register Page'}
        ]
    },
    data() {
        var  validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newCommentUserPassword) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerLoading: false,
            errMsg: '用户已存在',
            showErrMsg: false,
            form: {
                commentUserPassword: '',
                commentUserPassword2: '',
                newCommentUserPassword: '',
                commentUserEmail: ''
            },
            rules: {
                commentUserPassword: [
                    { required: true, message: '密码可是不能少的哦', trigger: 'blur' },
                ],
                newCommentUserPassword: [
                    {required: true, validator: validatePass, trigger: 'blur' }

                ],
                commentUserPassword2: [
                    {required: true, validator: validatePass2, trigger: 'blur' }
                ],
                commentUserEmail: [
                     { required: true, type: 'email', message: '小主邮箱格式不正确哦', trigger: 'blur' },
                ]
            }  
        }
    },
    mounted() {
        let width = document.documentElement.clientWidth
        if(width > 600) {
            $('#registerForm').css({left: '50px'})
        }else {
            $('#registerForm').css({left: '-10px'})
        }
    },
    methods: {
        goUserDetail(url) {
            let {redirect='/homePage'} = this.$route.query
            this.$router.push({path:url,query: {redirect}})
        },
        registerBtn(formName) {
            this.showErrMsg = false
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    this.registerLoading = true
                    this.registerApi()
                } 
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        registerApi() {
            ApiUserChangePwd(this.form).then(res => {
                this.registerLoading = false
                if(res.code == 200) {
                    this.showErrMsg = false
                    let timeStamp = new Date().valueOf()
                    res.data.timeStamp = timeStamp
                    let userData = JSON.stringify(res.data)
                    localStorage.setItem('userData',escape(userData))
                    let { redirect='/homePage'} = this.$route.query
                    this.$router.push(redirect)
                }else if(res.code == 100){
                    this.showErrMsg = true
                }
            }).catch(err => {
                this.registerLoading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped >
    .login-wrap{
        width: 100%;
        height: 100vh;
        background: url('~/assets/img/banner/login.jpg') center no-repeat;
        position: relative;
        .registerForm{
            width: 320px;
            position: absolute;
            top: 50%;
            left: -400px;
            transform: translate(0, -50%);
            transition: all 1.5s ease;
            .avatar-uploader{
                border: 1px dashed #666;
                cursor: pointer;
                height: 60px;
                width: 60px;
                padding: 10px;
                border-radius:100%; 
                margin: 0 auto;
            
                &:hover{
                    border-color: orange;
                }
                .avatar-uploader-icon {
                    font-size: 22px;
                    color: #8c939d;
                    display: block;
                    line-height: 60px;
                    text-align: center;
                    width: 60px;
                }
                .avatar{
                    width: 100%;
                    height: 100%;
                    border-radius: 100%; 
                }
            }
        }
    }
</style>