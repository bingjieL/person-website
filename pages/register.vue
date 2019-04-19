<template>
    <main class="login-wrap">
        <div class="register-form-wrap">
            <el-form :model="form" label-position="right" status-icon :rules="rules" ref="loginForm" label-width="100px" class="registerForm" id = 'registerForm'>
                <el-form-item prop="commentUserImg">
                    <el-upload
                        class="avatar-uploader"
                        :action="$uploadUrl"
                        nam="file"
                        :show-file-list="false"
                        :on-error="handleAvatarError"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                            <img v-if="form.commentUserImg" :src="form.commentUserImg" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="昵称" prop="commentUserName">
                    <el-input v-model="form.commentUserName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="commentUserEmail">
                    <el-input  v-model="form.commentUserEmail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="commentUserPassword">
                    <el-input type="password" v-model="form.commentUserPassword"></el-input>
                </el-form-item>
                <el-form-item style="margin: 0;" label="确认密码" prop="commentUserPassword2">
                    <el-input type="password" v-model="form.commentUserPassword2"></el-input>
                </el-form-item>
                <el-form-item style="margin: 0;text-align: right;">
                    <el-button type="text" @click="goUserDetail('/login')">用户登录</el-button>
                </el-form-item>
                <el-form-item>
                    <p v-if="showErrMsg" style="color: #f56c6c">{{errMsg}}</p>
                    <el-button type="primary" @click="registerBtn()" :loading="registerLoading">注册</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
import { ApiUserLogin, ApiUserRegister } from '~/plugins/server/user'
import{ mapState, mapMutations} from 'vuex'

export default {
    layout: 'noFooter',
    head: {
        title: '~~Jay的小栈 注册页面 || Register Page',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'description', content: '注册页面' },
            { name: 'Keywords', content: 'Jay的小栈的注册页面'}
        ]
    },
    data() {
        var  validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.commentUserPassword) {
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
                commentUserName: '',
                commentUserEmail: '',
                commentUserImg: ''
            },
            rules: {
                commentUserPassword: [
                    {required: true, validator: validatePass, trigger: 'blur' }
                ],
                commentUserPassword2: [
                    {required: true, validator: validatePass2, trigger: 'blur' }
                ],
                commentUserName: [
                    { required: true, message: '请填写小主的昵称', trigger: 'blur' },
                    { min: 3, max: 12, message: '昵称不能少于三个字符且不大于12个字符', trigger: 'blur' }
                ],
                commentUserEmail: [
                     { required: true, type: 'email', message: '小主邮箱格式不正确哦', trigger: 'blur' },
                ],
                commentUserImg:  [
                     { required: true, message: '小主还要上传头像哦!', trigger: 'blur' },
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
        ...mapMutations(['SET_USER_BASIC']),
        goUserDetail(url) {
            let {redirect='/homePage'} = this.$route.query
            this.$router.push({path:url,query: {redirect}})
        },
        handleAvatarError(err, file, fileList) {
            console.log('---> err', err)
        },
        handleAvatarSuccess(res, file) {
            if(res.code=== 200){
                this.form.commentUserImg = res.data.url
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 1;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG || PGN 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 1MB!');
            }
            return isJPG && isLt2M;
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
            ApiUserRegister(this.form).then(res => {
                this.registerLoading = false
                if(res.code == 200) {
                    this.showErrMsg = false
                    let timeStamp = new Date().valueOf()
                    res.data.timeStamp = timeStamp
                    let userData = JSON.stringify(res.data)
                    localStorage.setItem('userData',escape(userData))
                    let { redirect='/homePage'} = this.$route.query
                    this.SET_USER_BASIC(res.data)
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