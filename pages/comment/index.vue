<template>
    <section class="comment-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>想陪你聊天 昼夜潮汐都是线</h3>
       </div>
       <main class="main-wrap">
           <div class="content-basic">
                    <el-form v-show="!userData.commentUserEmail" :inline="true" ref="comment" :model="form.userData" :rules="rules" class="demo-form-inline">
                        <el-form-item>
                            <i class="iconfont icon-wode avatar-uploader-icon"></i>
                        </el-form-item>
                        <el-form-item label="昵称" prop="commentUserName">
                            <el-input v-model="form.userData.commentUserName" placeholder="用户昵称">
                                <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="commentUserEmail">
                            <el-input v-model="form.userData.commentUserEmail" placeholder="邮箱">
                                <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                            </el-input>
                        </el-form-item> 
                    </el-form>
                <div class="fireWorkForm">
                    <textarea type="text" v-model="form.commentContent" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                </div>
                <div class="btn-wrap">
                    <el-button type="primary" @click="addCommentBtn('comment')">评论</el-button>
                </div>
           </div>
           <div class="comment-list" v-show="total>0">
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
                       <img :src="item.userData?item.userData.commentUserImg: DefaultHead" alt="header-logo">
                   </figure>
                   <div class="right">
                        <h3 class="name">
                            <span>
                                {{item.userData? item.userData.commentUserName: ''}}
                            </span>
                        </h3>
                        <h4 class="date">发布于 {{item.created_time | DateFormat('YYYY-MM-DD HH:mm:ss')}}</h4>
                        <p class="content">
                            {{item.commentContent}}
                        </p>
                        <div class="replay-wrap">
                            <span class="delete" v-if="userData.commentUserEmail == 'admin@admin.com'" @click="deleteCommentBtn(item)">
                                删除
                            </span>
                            <span class="delete"
                                v-if="userData.commentUserEmail == item.userData.commentUserEmail && userData.commentUserEmail != 'admin@admin.com'" 
                                @click="deleteCommentBtn(item)">
                                删除
                            </span>
                            <span class="replay" @click="commentReplayBtn(item)">
                                回复
                            </span>
                            <span class="praise" @click="addCommentPraise(item)">
                                <i class="iconfont icon-dianzan"></i> {{item.commentPraise}}
                            </span>
                        </div>
                        <div class="replay-dialog-wrap"  v-show="item.addData.isShowDialog">
                            <div class="cancel-repaly">
                                <el-button type="primary" @click="item.addData.isShowDialog = false">取消评论</el-button>
                            </div>
                            <el-form v-show="!userData.commentUserEmail" :inline="true" :ref="'commentReplay'+index" :model="item.addData" :rules="rules" class="demo-form-inline">
                                <el-form-item>
                                    <i class="iconfont icon-wode avatar-uploader-icon"></i>
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
                            <div class="fireWorkForm">
                                <textarea type="text" v-model="item.addData.commentContent" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                            </div>
                            <div class="btn-wrap">
                                <el-button type="primary" @click="addReplayBtn('commentReplay'+index, item)">评论</el-button>
                            </div>
                        </div>
                        <ul class="replay-list" v-show="item.replayList.length>0">
                            <li class="replay-item" v-for="(_item,_index) in item.replayList" :key="_index">
                                <figure class="left">
                                    <img :src="_item.userData? _item.userData.commentUserImg: DefaultHead" alt="header-logo">
                                </figure>
                                <div class="right">
                                     <h3 class="name">
                                        <span>{{_item.userData?_item.userData.commentUserName:''}}</span> 回复 <span>{{_item.repalyUser?_item.repalyUser.commentUserName: ''}}</span>
                                    </h3>
                                    <h4 class="date">发布于 {{_item.created_time | DateFormat('YYYY-MM-DD HH:mm:ss')}}</h4>
                                    <p class="content">
                                        {{_item.replayContent}}
                                    </p>
                                    <div class="replay-wrap">
                                        <span class="delete" @click="deleteReplayBtn(_item)" v-if="userData.commentUserEmail == 'admin@admin.com'">
                                            删除
                                        </span>
                                        <span class="delete"
                                            v-if="userData.commentUserEmail == _item.userData.commentUserEmail && userData.commentUserEmail != 'admin@admin.com'" 
                                            @click="deleteReplayBtn(_item)">
                                            删除
                                        </span>
                                        <span class="replay" @click="replayBtn(_item)">
                                            回复
                                        </span>
                                        <span class="praise" @click="addReplayPraise(_item)">
                                            <i class="iconfont icon-dianzan"></i> {{_item.repalyPraise}}
                                        </span>
                                    </div>
                                    <div class="replay-dialog-wrap" v-show="_item.addData.isShowDialog">
                                        <div class="cancel-repaly">
                                            <el-button type="primary" @click="_item.addData.isShowDialog = false">取消评论</el-button>
                                        </div>
                                        <el-form :inline="true" v-show="!userData.commentUserEmail" :ref="'replay'+_index+_item.replayId" :model="_item.addData" :rules="rules" class="demo-form-inline">
                                            <el-form-item>
                                                <i class="iconfont icon-wode avatar-uploader-icon"></i>
                                            </el-form-item>
                                            <el-form-item label="昵称" prop="commentUserName">
                                                <el-input style="width: 175px;" v-model="_item.addData.commentUserName" placeholder="用户昵称">
                                                    <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="邮箱" prop="commentUserEmail">
                                                <el-input style="width: 175px;" v-model="_item.addData.commentUserEmail" placeholder="邮箱">
                                                    <i slot="suffix" class="el-input__icon el-icon-edit"></i>
                                                </el-input>
                                            </el-form-item> 
                                        </el-form>
                                        <div class="fireWorkForm">
                                            <textarea type="text" v-model="_item.addData.commentContent" maxlength="1000" class="comment-content" placeholder="~~ 好嗨哦, 感觉人生已经到达了高潮！"></textarea>
                                        </div>
                                        <div class="btn-wrap">
                                            <el-button type="primary" @click="addReplay2Btn('replay'+_index+_item.replayId, _item)">评论</el-button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                   </div>
               </div>
           </div>
           <div class="pagenation-wrap" v-show="total>0">
                <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="pageForm.pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
           </div>
       </main>
    </section>
</template>

<script>
import DefaultHead from '~/assets/img/comment/default-head.png'
import { 
    ApiGetCommentList,
    ApiAddComment,
    ApiAddReplay,
    ApiAddReplayPraise,
    ApiAddCommentPraise,
    ApiReplayDelete,
    ApiCommentDelete
} from '~/plugins/server/comment'
import{ mapState, mapMutations} from 'vuex'

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
            total: 0,
            DefaultHead: DefaultHead,
            isReplay: false,
            pageForm: {
              pageSize: 15,
              pageNumber: 1  
            },
            form: {
                commentContent:'',
                commentType: '2',
                userData: {
                    commentUserEmail: '',
                    commentUserName: '',
                    commentUserImg: ''
                },
            },
            commentList: [],
            rules: {
                commentUserName: [
                    { required: true, message: '请填写小主的昵称', trigger: 'blur' },
                    { min: 3, max: 12, message: '昵称不能少于三个字符且不大于12个字符', trigger: 'blur' }
                ],
                commentUserEmail: [
                     { required: true, type: 'email', message: '小主邮箱格式不正确哦', trigger: 'blur' },
                ]
                 
            }
        }
    },
    computed: {
        ...mapState({
            userData: state=> state.userBasic.userData
        })
    },
    mounted() {
        this.fireWorks()
        this.getCommentList(this.pageForm)
        let userData = localStorage.getItem('userData')
        let _userData =  userData?JSON.parse(unescape(userData)): {}
        if(_userData.commentUserEmail){
            this.SET_USER_BASIC(_userData)
            this.form.userData = _userData
        }
    },
    methods: {
         ...mapMutations(['SET_USER_BASIC', 'CLEAR_USER_BASIC']),
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
            this.pageForm.pageNumber = val
            this.getCommentList(this.pageForm)
        },
        handleAvatarError(err, file, fileList) {
            console.log('---> err', err)
        },
        addCommentPraise(commentDetail) {
            let id = commentDetail.id
            ApiAddCommentPraise({id}).then(res => {
                if(res.code == 200){
                    this.getCommentList(this.pageForm)
                }
            })
        },
        addReplayPraise(commentDetail) {
            let replayId = commentDetail.replayId
            ApiAddReplayPraise({replayId}).then(res => {
                if(res.code == 200){
                    this.getCommentList(this.pageForm)
                }
            })
        },
        commentReplayBtn(commentDetail){
            if(commentDetail.addData.isShowDialog) return
            commentDetail.addData.isShowDialog = true
            let _placeholder = `回复 @${commentDetail.userData.commentUserName}:`
            commentDetail.addData.commentContent = _placeholder
        },
        replayBtn(commentDetail){
            if(commentDetail.addData.isShowDialog) return
            commentDetail.addData.isShowDialog = true
            let _placeholder = `回复 @${commentDetail.userData.commentUserName}:`
            commentDetail.addData.commentContent = _placeholder
        },
        getCommentList(params) {
            let _params = Object.assign(params, {commentType: '2'})
            ApiGetCommentList(_params).then(res => {
                if(res.code == 200) {
                    this.total = res.data.count
                    let _rows = res.data.rows
                    _rows.forEach(item => {
                        item.addData = {
                            isShowDialog: false,
                            commentContent: '',
                            ...this.userData
                        }
                        item.replayList.forEach(_item => {
                            _item.addData = {
                                isShowDialog: false,
                                commentContent: '',
                                ...this.userData
                            }
                        })
                        
                    })
                    this.commentList = res.data.rows
                }
            })
        },
        addComment(params, formName){
            ApiAddComment(params).then(res => {
                if(res.code == 200) {
                    this.pageForm.pageNumber = 1
                    // this.$refs[formName].resetFields();
                    this.form = {
                        commentContent:'',
                        commentType: '2',
                        userData: {
                            ...this.userData
                        },
                    }
                    if(res.data.isSendEmail){
                        let timeStamp = new Date().valueOf()
                        res.data.userData.timeStamp = timeStamp
                        let userData = JSON.stringify(res.data.userData)
                        localStorage.setItem('userData',escape(userData))
                        this.SET_USER_BASIC(res.data.userData)
                        this.$notify({
                            title: '注册成功',
                            message: '账号为当前邮箱,密码已通过邮件形式发送到该邮箱',
                            type: 'success'
                        });
                    }
                    this.getCommentList(this.pageForm)
                }
            })
        },
        addReplay(params){
            ApiAddReplay(params).then(res => {
                if(res.code == 200) {
                    if(res.data.isSendEmail){
                        let timeStamp = new Date().valueOf()
                        res.data.userData.timeStamp = timeStamp
                        let userData = JSON.stringify(res.data.userData)
                        localStorage.setItem('userData',escape(userData))
                        this.SET_USER_BASIC(res.data.userData)
                        this.$notify({
                            title: '注册成功',
                            message: '账号为当前邮箱,密码已通过邮件形式发送到该邮箱',
                            type: 'success'
                        });
                    }
                    this.getCommentList(this.pageForm)
                }
            })
        },
        addReplayBtn(formName, detail) {
            let _detail = this.$deepCopy(detail)
            this.$refs[formName][0].validate((valid) => {
                if(valid) {
                    let _commentContent = _detail.addData.commentContent
                    if(_commentContent.indexOf('回复 @').indexOf !== -1){
                        let index = _commentContent.indexOf(':')
                        let length = _commentContent.length
                        _detail.addData.commentContent = _commentContent.substring(index+1, length)
                    }
                     if(!_detail.addData.commentContent){
                        this.$message({
                            message: '小主,不能说‘空’话啊！',
                            center: true
                        });
                     }else{
                        this.$refs[formName][0].resetFields();
                        let params = {
                                repalyUserId: _detail.userData.commentUserId,
                                replayContent:  _detail.addData.commentContent,
                                comment_id: _detail.id,
                                userData: {
                                    commentUserEmail: _detail.addData.commentUserEmail,
                                    commentUserName: _detail.addData.commentUserName,
                                    commentUserImg: this.$randdomHeader()
                                }
                        }
                        this.addReplay(params)
                     }
                 }
            })
        },
        addReplay2Btn(formName, detail) {
            let _detail = this.$deepCopy(detail)
            this.$refs[formName][0].validate((valid) => {
                if(valid) {
                    let _commentContent = _detail.addData.commentContent
                    if(_commentContent.indexOf('回复 @').indexOf !== -1){
                        let index = _commentContent.indexOf(':')
                        let length = _commentContent.length
                        _detail.addData.commentContent = _commentContent.substring(index+1, length)
                    }
                     if(!_detail.addData.commentContent){
                        this.$message({
                            message: '小主,不能说‘空’话啊！',
                            center: true
                        });
                     }else{
                        this.$refs[formName][0].resetFields();
                        let params = {
                                repalyUserId: _detail.userData.commentUserId,
                                replayContent:  _detail.addData.commentContent,
                                comment_id: _detail.comment_id,
                                userData: {
                                    commentUserEmail: _detail.addData.commentUserEmail,
                                    commentUserName: _detail.addData.commentUserName,
                                    commentUserImg: this.$randdomHeader()
                                }
                        }
                        this.addReplay(params)
                     }
                 }
            })
        },
        addCommentBtn(formName) {
             this.$refs[formName].validate((valid) => {
                 if(valid) {
                     if(!this.form.commentContent){
                        this.$message({
                            message: '小主,不能说‘空’话啊！',
                            center: true
                        });
                     }else{
                        this.form.userData.commentUserImg =  this.$randdomHeader()
                        this.addComment(this.form, formName)
                     }
                 }
             })
        },
        apiDeleteComment(params) {
            ApiCommentDelete(params).then(res => {
                if(res.code == 200) {
                    this.getCommentList(this.pageForm)
                }
            })
        },
         apiDeleteReplay(params) {
            ApiReplayDelete(params).then(res => {
                if(res.code == 200) {
                    this.getCommentList(this.pageForm)
                }
            })
        },
        deleteCommentBtn(commentDetail) {
            let id = commentDetail.id

            this.$confirm('点击确认,将删除本条记录').then(res => {
               this.apiDeleteComment({id})
            }).catch(cancel => {});
        },
        deleteReplayBtn(replay) {
            let replayId = replay.replayId
            this.$confirm('点击确认,将删除本条记录').then(res => {
                this.apiDeleteReplay({replayId})
            }).catch(cancel => {});
        }
    }
}
</script>
<style>
    .avatar-uploader-icon {
        font-size: 38px;
        color: #8c939d;
        line-height: 60px;
        text-align: center;
    }
    .comment-wrap .el-form--inline .el-form-item{
        vertical-align: middle;
        margin-right: 30px; 
    }
</style>

<style scoped lang="scss">
@import '~/assets/css/comment.scss';
</style>
