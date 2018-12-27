<template>
    <section class="blog-wrap">
       <div class="banner">
           <div class="img animated pulse slow">
           </div>
           <h3>{{blogDetail.blogTitle}}</h3>
       </div>
       <main class="detail-main">
           <header class="blog-des">
               <h3>
                   <span class="first-des">{{blogDetail.blogDes?blogDetail.blogDes.substring(0,1): ''}}</span>
                   <span class="des">{{blogDetail.blogDes?blogDetail.blogDes.substring(1, blogDetail.blogDes.length): ''}}</span>
                </h3>
           </header>
           <div class="main-content" v-html="blogDetail.blogContent"></div>
           <div class="main-footer">
                <div class="left">
                    <img src="~/assets/img/min-banner/header-logo.jpg" alt="logo">
                </div>
                <div class="tips">
                    <p>~~~ 小主人,  别忘记 戳下小心心哦!</p> 
                </div>
                <div class="right">
                        <p class="date">
                        <span class="date-icon"><i class="iconfont icon-shijian"></i></span>
                        <span class="date-title">发布时间{{blogDetail.updated_time?blogDetail.updated_time.substring(0, 10): ''}}</span> 
                        </p>
                        <p class="dis" v-if="!isAddLikes"> 
                            <i  class="iconfont icon-aixin_fuzhi"></i>
                        </p>
                        <p class="no-dis">
                            <i v-if="isAddLikes" @click="addLikes" class="iconfont icon-aixin"></i>
                        </p>
                </div>
           </div>
           <div class="blog-comment-wrap" >
                <div class="content-basic">
                            <el-form :inline="true" ref="comment" :model="form.userData" :rules="rules" class="demo-form-inline">
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
                                    <el-form :inline="true" :ref="'commentReplay'+index" :model="item.addData" :rules="rules" class="demo-form-inline">
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
                                                <el-form :inline="true" :ref="'replay'+_index+_item.replayId" :model="_item.addData" :rules="rules" class="demo-form-inline">
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
            </div>
       </main>
    </section>
</template>

<script>
import { 
    ApiGetBlogDetail,
    ApiAddBlogHot, 
    ApiAddBlogLikes,
    ApiGetCommentList,
    ApiAddComment,
    ApiAddReplay,
    ApiAddReplayPraise,
    ApiAddCommentPraise
} from '~/plugins/server/blogDetail'
import DefaultHead from '~/assets/img/comment/default-head.png'

export default {
    asyncData(context) {
        return {
            bid: context.query.bid,
            pagetitle: context.params.title
        }
    },
    validate({ params, query }) {
      if(!params.title || !query.bid){
          return false
      }else{
          return true
      }
    },
    layout: 'hasHeader',
    scrollToTop: true,
    head() {
        return {
            title: 'Blog Detail Page || ~~Jay的小栈',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'description', name: 'description', content: 'Jay的小栈的Blog Detail Page' },
                { property: 'og:title', content: `${this.pagetitle} Jay的小栈`},
                { property: 'og:type', content: `${this.pagetitle} Jay的小栈`},
                { property: 'og:description', content: `${this.pagetitle} Jay的小栈`}
            ]
        }
    },
    data() {
        return{
            blogDetail: {},
            isAddLikes: true,
            total: 0,
            DefaultHead: DefaultHead,
            isReplay: false,
            pageForm: {
              pageSize: 15,
              pageNumber: 1  
            },
            form: {
                commentContent:'',
                commentType: '1',
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
                     { required: true, type: 'email', message: '小主格式邮箱不正确哦', trigger: 'blur' },
                ]
                 
            }
        }
    },
    mounted() {
        this.getBlogDetail({blogId: this.bid})
        this.addBlogHot({blogId: this.bid})
        this.fireWorks()
        this.getCommentList(this.pageForm)
    },
    methods: {
        getBlogDetail(params) {
            ApiGetBlogDetail(params).then(res => {
                if(res.code == 200) {
                    this.blogDetail = res.data
                }
            })
        },
        addBlogHot(params) {
            ApiAddBlogHot(params).then(res => {})
        },
        addLikes() {
            this.addBlogLikes({blogId: this.bid})
        },
        addBlogLikes(params) {
            ApiAddBlogLikes(params).then(res => {
                if(res.code == 200) {
                    this.isAddLikes = false
                }
            })
        },
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
            let _params = Object.assign(params, {commentType: '1', blogId: this.bid})
            ApiGetCommentList(_params).then(res => {
                if(res.code == 200) {
                    this.total = res.data.count
                    let _rows = res.data.rows
                    _rows.forEach(item => {
                        item.addData = {
                            isShowDialog: false,
                            commentContent: ''
                        }
                        item.replayList.forEach(_item => {
                            _item.addData = {
                                isShowDialog: false,
                                commentContent: ''
                            }
                        })
                        
                    })
                    this.commentList = res.data.rows
                }
            })
        },
        addComment(params, formName){
            params.blogId = this.bid
            ApiAddComment(params).then(res => {
                if(res.code == 200) {
                    this.pageForm.pageNumber = 1
                    this.$refs[formName].resetFields();
                    this.form = {
                        commentContent:'',
                        commentType: '1',
                        userData: {
                            commentUserEmail: '',
                            commentUserName: '',
                            commentUserImg: ''
                        },
                    },
                    this.getCommentList(this.pageForm)
                }
            })
        },
        addReplay(params){
            params.blogId = this.bid
            ApiAddReplay(params).then(res => {
                if(res.code == 200) {
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
        }
    }

}
</script>



<style lang="scss" scoped>
    @import '~/assets/css/blogDetail.scss';
</style>
<style>
    .avatar-uploader-icon {
        font-size: 38px;
        color: #8c939d;
        line-height: 60px;
        text-align: center;
    }
    .blog-wrap .el-form--inline .el-form-item{
        vertical-align: middle;
        margin-right: 30px; 
    }
    .main-content >h2 {
        /* height: 50px; */
        border-bottom: 1px dashed #ddd;
        margin: 20px 0;
        position: relative;
        font-size: 16px;
        color: #666;
        padding-left: 30px;
        line-height: 50px;
        font-size: 22px; 
        font-weight: 500;
    } 
    .main-content p {
        color: #404040;
        margin: 10px 0 0 15px;
    }
    .main-content >h2::after {
        content: '#';
        position: absolute;
        height: 50px;
        width: 30px;
        color: #ff6d6d;
        left: 0;
        text-align: center;
        line-height: 50px;
    }
</style>
