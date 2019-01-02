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
                    <el-input disabled  v-model="form.commentUserEmail" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="commentUserPassword">
                    <el-input type="password" v-model="form.commentUserPassword"></el-input>
                </el-form-item>
                <el-form-item>
                    <p v-if="showErrMsg" style="color: #f56c6c">{{errMsg}}</p>
                    <el-button type="primary" @click="registerBtn()" :loading="registerLoading">修改用户信息</el-button>
                    <el-button @click="loginOut('loginForm')">退出登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
import { ApiUserBasicChange } from '~/plugins/server/user'
import{ mapState, mapMutations} from 'vuex'

export default {
    layout: 'noFooter',
    head: {
        title: '~~Jay的小栈 || userDetail Page',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈用户详情' },
            { property: 'og:title', content: 'userDetail Page'},
            { property: 'og:type', content: 'userDetail Page'},
            { property: 'og:description', content: 'userDetail Page'}
        ]
    },
    data() {
        return {
            registerLoading: false,
            errMsg: '用户已存在',
            showErrMsg: false,
            form: {
                commentUserPassword: '',
                commentUserName: '',
                commentUserEmail: '',
                commentUserImg: ''
            },
            rules: {
                commentUserPassword: [
                    {required: true,message: '请填写小主密码', trigger: 'blur' }
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
        $('#registerForm').css({left: '50px'})
        let userData = localStorage.getItem('userData')
        if(!userData) return this.$router.push('/homePage')
        let _userData = userData?JSON.parse(unescape(userData)): {}
        this.form = {
                commentUserPassword: '',
                commentUserName: _userData.commentUserName,
                commentUserEmail: _userData.commentUserEmail,
                commentUserImg:  _userData.commentUserImg
        }
    },
    methods: {
        ...mapMutations(['SET_USER_BASIC', 'CLEAR_USER_BASIC']),
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
        loginOut(formName) {
            localStorage.removeItem('userData')
            let { redirect='/homePage'} = this.$route.query
            this.CLEAR_USER_BASIC()
            this.$router.push(redirect)
        },
        registerApi() {
            ApiUserBasicChange(this.form).then(res => {
                this.registerLoading = false
                if(res.code == 200) {
                    this.showErrMsg = false
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
                    width: 60px;
                    height: 60px;
                    border-radius: 100%; 
                }
            }
        }
    }
</style>