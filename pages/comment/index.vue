<template>
    <section class="comment-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>想陪你聊天 昼夜潮汐都是线</h3>
       </div>
       <main class="main-wrap">
           <div class="content-basic">
                <no-ssr>
                    <el-form :inline="true" :model="userData" :rules="rules" class="demo-form-inline">
                        <el-form-item>
                            <el-upload
                                class="avatar-uploader"
                                :action="$uploadUrl"
                                name="file"
                                :show-file-list="false"
                                :on-error="handleAvatarError"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="userData.commentUserImg" :src="userData.commentUserImg" class="avatar">
                                <i v-else class="iconfont icon-wode avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="昵称" prop="commentUserName">
                            <el-input v-model="userData.commentUserName" placeholder="用户昵称">
                                <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="commentUserEmail">
                            <el-input v-model="userData.commentUserEmail" placeholder="邮箱">
                                <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                            </el-input>
                        </el-form-item> 
                    </el-form>
                </no-ssr>
                <div class="fireWorkForm">
                    <textarea type="text" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                </div>
                <div class="btn-wrap">
                    <no-ssr>
                        <el-button type="primary" >评论</el-button>
                    </no-ssr>
                </div>
           </div>
           <div class="comment-list">
               <h3 class="list-header">
                   <span class="tip">
                        留言总数&nbsp;&nbsp;|&nbsp;&nbsp;
                   </span>
                   <span class="acount">
                        {{total}} 条
                   </span>
               </h3>
               <div class="comment-item" v-for="(item, index) in commentList" :key="index">
                   <figure class="left">
                       <img :src="item.userData.commentUserImg?item.userData.commentUserImg: DefaultHead" alt="header-logo">
                   </figure>
                   <div class="right">
                        <h3 class="name">
                            <span>
                                {{item.user_id? item.userData.commentUserName: ''}}
                            </span>
                        </h3>
                        <h4 class="date">发布于 {{item.created_time | DateFormat('YYYY-MM-DD HH:mm:ss')}}</h4>
                        <p class="content">
                            {{item.commentContent}}
                        </p>
                        <div class="replay-wrap">
                            <span class="replay" @click="item.addData.isShowDialog = true">
                                回复
                            </span>
                            <span class="praise">
                                <i id='icon-zhankai' class="iconfont icon-dianzan"></i> {{item.commentPraise}}
                            </span>
                        </div>
                        <ul class="replay-list" v-if="item.replayList.length>0">
                            <li class="replay-item" v-for="(_item,index) in item.replayList" :key="index">
                                <figure class="left">
                                    <img :src="_item.userData.commentUserImg? _item.userData.commentUserImg: DefaultHead" alt="header-logo">
                                </figure>
                                <div class="right">
                                     <h3 class="name">
                                        <span>{{_item.userData.commentUserName}}</span> 回复 <span>{{_item.repalyUser.commentUserName}}</span>
                                    </h3>
                                    <h4 class="date">发布于 {{_item.created_time | DateFormat('YYYY-MM-DD HH:mm:ss')}}</h4>
                                    <p class="content">
                                        {{_item.replayContent}}
                                    </p>
                                    <div class="replay-wrap">
                                        <span class="replay" @click="_item.addData.isShowDialog = true">
                                            回复
                                        </span>
                                        <span class="praise">
                                            <i id='icon-zhankai' class="iconfont icon-dianzan"></i> {{_item.repalyPraise}}
                                        </span>
                                    </div>
                                    <div class="replay-dialog-wrap" v-if="_item.addData.isShowDialog">
                                        <div class="cancel-repaly">
                                            <no-ssr>
                                            <el-button type="primary" @click="_item.addData.isShowDialog = false">取消评论</el-button>
                                            </no-ssr>
                                        </div>
                                        <no-ssr>
                                            <el-form :inline="true" :model="userData" :rules="rules" class="demo-form-inline">
                                                <el-form-item>
                                                    <el-upload
                                                        class="avatar-uploader"
                                                        :action="$uploadUrl"
                                                        name="file"
                                                        :show-file-list="false"
                                                        :on-error="handleAvatarError"
                                                        :on-success="handleAvatarSuccess"
                                                        :before-upload="beforeAvatarUpload">
                                                        <img v-if="userData.commentUserImg" :src="userData.commentUserImg" class="avatar">
                                                        <i v-else class="iconfont icon-wode avatar-uploader-icon"></i>
                                                    </el-upload>
                                                </el-form-item>
                                                <el-form-item label="昵称" prop="commentUserName">
                                                    <el-input style="width: 175px;" v-model="userData.commentUserName" placeholder="用户昵称">
                                                        <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                                    </el-input>
                                                </el-form-item>
                                                <el-form-item label="邮箱" prop="commentUserEmail">
                                                    <el-input style="width: 175px;" v-model="userData.commentUserEmail" placeholder="邮箱">
                                                        <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                                    </el-input>
                                                </el-form-item> 
                                            </el-form>
                                        </no-ssr>
                                        <div class="fireWorkForm">
                                            <textarea type="text" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                                        </div>
                                        <div class="btn-wrap">
                                            <no-ssr>
                                                <el-button type="primary" >评论</el-button>
                                            </no-ssr>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div class="replay-dialog-wrap" v-if="item.addData.isShowDialog">
                            <div class="cancel-repaly">
                                <no-ssr>
                                <el-button type="primary" @click="item.addData.isShowDialog = false">取消评论</el-button>
                                </no-ssr>
                            </div>
                             <no-ssr>
                                <el-form :inline="true" :model="item.addData" :rules="rules" class="demo-form-inline">
                                    <el-form-item>
                                        <el-upload
                                            class="avatar-uploader"
                                            :action="$uploadUrl"
                                            name="file"
                                            :show-file-list="false"
                                            :on-error="handleAvatarError"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload">
                                            <img v-if="item.addData.commentUserImg" :src="item.addData.commentUserImg" class="avatar">
                                            <i v-else class="iconfont icon-wode avatar-uploader-icon"></i>
                                        </el-upload>
                                    </el-form-item>
                                    <el-form-item label="昵称" prop="commentUserName">
                                        <el-input v-model="item.addData.commentUserName" placeholder="用户昵称">
                                            <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="邮箱" prop="commentUserEmail">
                                        <el-input v-model="item.addData.commentUserEmail" placeholder="邮箱">
                                            <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                        </el-input>
                                    </el-form-item> 
                                </el-form>
                            </no-ssr>
                            <div class="fireWorkForm">
                                <textarea type="text" v-model="item.addData.commentContent" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                            </div>
                            <div class="btn-wrap">
                                <no-ssr>
                                    <el-button type="primary" >评论</el-button>
                                </no-ssr>
                            </div>
                        </div>
                   </div>
               </div>
           </div>
           <div class="pagenation-wrap">
               <no-ssr>
                    <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="pageForm.pageSize"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
               </no-ssr>
           </div>
       </main>
    </section>
</template>

<script>
import DefaultHead from '~/assets/img/comment/default-head.png'
import { 
    ApiGetCommentList,
    ApiAddBlogHot,
    ApiAddBlogLikes
} from '~/plugins/server/comment'

export default {
    layout: 'hasHeader',
    scrollToTop: true,
    head: {
        title: 'Comment Page || ~~Jay的小栈',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Jay的小栈的Comment Page' },
            { property: 'og:title', content: 'Comment Page'},
            { property: 'og:type', content: 'Comment Page'},
            { property: 'og:description', content: 'Comment Page'}
        ]
    },
    data() {
        return {
            total: 1000,
            DefaultHead: DefaultHead,
            isReplay: false,
            pageForm: {
              pageSize: 15,
              pageNumber: 1  
            },
            userData: {
                commentUserEmail: '',
                commentUserName: '',
                commentUserImg: ''
            },
            commentList: [],
            rules: {
                commentUserName: [
                    { required: true, message: '请填写小主的昵称', trigger: 'blur' },
                    { min: 3, max: 12, message: '昵称不能少于三个字符且不大于12个字符', trigger: 'blur' }
                ],
                commentUserEmail: [
                     { required: true, type: 'email', message: '小主格式邮箱不正确哦', trigger: 'blur' },
                ]
                 
            }
        }
    },
    mounted() {
        this.fireWorks()
        this.getCommentList(this.pageForm)
    },
    methods: {
        fireWorks() {
           function p() {
                window.requestAnimFrame(p), a = d(0, 360), s.globalCompositeOperation = "destination-out", s.fillStyle =
                    "rgba(0, 0, 0, 0.5)", s.fillRect(0, 0, e, t), s.globalCompositeOperation = "source-over";
                var n = u.length;
                while (n--) u[n].draw(), u[n].update(n)
            }

            function d(e, t) {
                return Math.random() * (t - e) + e
            }

            function v() {
                i = $('<canvas width="' + e + '" height="' + t + '" />').appendTo(n).css({
                    position: "absolute",
                    left: -20,
                    top: -44,
                    zIndex: 999,
                    pointerEvents: "none"
                }), s = i[0].getContext("2d"), r = $("<div />").appendTo(n).css({
                    fontSize: "16px",
                    fontFamily: "arial",
                    height: 1,
                    position: "absolute",
                    left: 15,
                    top: 50,
                    zIndex: 0,
                    visibility: "hidden",
                    whiteSpace: "nowrap"
                })
            }
            if (/msie/i.test(navigator.userAgent)) return;
            var e = 600,
                t = 100,
                n = $(".fireWorkForm"),
                r = null,
                i = null,
                s = null,
                o = !1,
                u = [],
                a = 120,
                f = 8,
                l = 0,
                c = 0,
                h = function (e, t, n) {
                    var r = this;
                    r.x = e, r.y = t, r.dir = n, r.coord = {}, r.angle = d(0, -Math.PI), r.speed = d(2, 8), r.friction =
                        .95, r.gravity = 1, r.hue = d(a - 10, a + 10), r.brightness = d(50, 80), r.alpha = 1, r.decay =
                        d(.03, .05), r.init()
                };
            h.prototype = {
                init: function () {
                    var e = this;
                    e.coord = {
                        x: e.x,
                        y: e.y
                    }
                },
                update: function (e) {
                    var t = this;
                    t.coord = {
                        x: t.x,
                        y: t.y
                    }, t.speed *= t.friction, t.x += Math.cos(t.angle) * t.speed + t.dir, t.y += Math.sin(
                        t.angle) * t.speed + t.gravity, t.alpha -= t.decay, t.alpha <= t.decay && u.splice(
                        e, 1)
                },
                draw: function () {
                    var e = this;
                    s.fillStyle = "hsla(" + e.hue + ", 100%, " + e.brightness + "%, " + e.alpha + ")", s.beginPath(),
                        s.arc(e.coord.x, e.coord.y, 2, 0, 2 * Math.PI, !0), s.closePath(), s.fill()
                }
            }, window.requestAnimFrame = function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame || function (e) {
                        window.setTimeout(e, 1e3 / 60)
                    }
            }(), $(".comment-content").on("focus", function () {
                o || (v(), o = !0, p());
                var e = $(this.form),
                    t = -20,
                    n = -44;
                i.appendTo(e), e.attr("name") == "f3" && ($("body").hasClass("layout1") ? t = 97 : t = -20),
                    i.css({
                        left: t,
                        top: n
                    })
            }).on("keydown", function (e) {
                var t = $(this.form);
                if (!(this.selectionStart >= 0 && r)) return;
                var n = this.selectionStart,
                    i = this.value.substring(0, n).replace(/ /g, "&nbsp;"),
                    s = r.html(i).width(),
                    o = 0;
                i.length > c ? o = -2 : o = 2, c = i.length, s >= 500 && (s = 500);
                var a = f;
                while (a--) u.push(new h(s + 50, 60, o));
                t.css({
                    "-webkit-transform": "translate(-1px, 1px)",
                    "-moz-transform": "translate(-1px, 1px)",
                    "-o-transform": "translate(-1px, 1px)",
                    transform: "translate(-1px, 1px)"
                }), setTimeout(function () {
                    t.css({
                        "-webkit-transform": "none",
                        "-moz-transform": "none",
                        "-o-transform": "none",
                        transform: "none"
                    })
                }, 10)
            }) 
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleAvatarError(err, file, fileList) {
            console.log('---> err', err)
        },
        handleAvatarSuccess(res, file) {
            if(res.code=== 200){
                this.userData.commentUserImg = res.data.url
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        getCommentList(params) {
            let _params = Object.assign(params, {commentType: '2'})
            ApiGetCommentList(_params).then(res => {
                console.log('---> res')
                if(res.code == 200) {
                    this.total = res.data.count
                    let _rows = res.data.rows
                    _rows.forEach(item => {
                        item.addData = {
                            isShowDialog: false
                        }
                        item.replayList.forEach(_item => {
                            _item.addData = {
                                isShowDialog: false
                            }
                        })
                        
                    })
                
                    this.commentList = res.data.rows
                    console.log('----> this.commentList', this.commentList)
                }
            })
        }
    }
}
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 100%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 60px;
        height: 60px;
    }
    .avatar-uploader .el-upload:hover {
        border-color:orange;
    }
    .avatar-uploader-icon {
        font-size: 38px;
        color: #8c939d;
        line-height: 60px;
        text-align: center;
    }
    .avatar {
        margin: 5px;
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 100%;
         
    }
    .comment-wrap .el-form--inline .el-form-item{
        vertical-align: middle;
        margin-right: 30px; 
    }
</style>

<style scoped lang="scss">
@import '~/assets/css/comment.scss';
</style>
