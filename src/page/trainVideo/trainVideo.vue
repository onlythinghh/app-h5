<template>
    <div class="trainvideo">
        <Header :title="title" :isBack="true" :banFixed="false" :isBanBack="true" @onBack="closemenu"></Header>
        <div class="video_contenr">
            <div class="load-more-wrapper">
                <ul class="video-list" ref="morewrapper">
                    <li class="video-item" v-for="(item, index) in videoList" :key="index" @click.stop="openVideo(item)">
                        <div class="img-box">
                            <img :src="item.videoPicUrl" v-if="item.videoPicUrl">
                            <img src="../../images/deft_img.png" v-else>
                        </div>
                        <div class="disc-box">
                            <p class="title">{{item.videoTitle | istitle}}</p>
                            <p class="subtitle" v-if="item.videoSubtitle">{{item.videoSubtitle}}</p>
                            <p class="times"><img src="./../../images/play.png" ><span>{{item.videoClick | filber(50)}}</span></p>
                        </div>
                    </li>
                </ul>
                <div class="notvideo" v-if="!videoList.length" >{{notvideo}}</div>
                <div class="notvideo" v-if="errmsg">{{errmsg}}</div>
                <template v-if="showLoading">
                    <div class="alldone">
                        <div class="loadmore-spinner" v-show="!isalldone">
                            <div class="spinner" v-for="index in 5" :key="index"></div>
                        </div>
                        <span class="loadmore-text">{{bottomText}}</span>
                    </div>  
                    <!-- <div class="alldone" v-show="isalldone">{{bottomText}}</div> -->
                </template>
            </div>
        </div>
        <transition name="fade">
            <div class="backtop" v-if="topFlag" @click="backTop"><img src="./../../images/go_top.png" ></div>
        </transition>
    </div>
</template>
<script>
import Header from "../../components/header/header";
import { getVideo, VideoTimes } from '../../service'
export default {
    data(){
        return {
            Vtotal: 1, // 总页数
            nowpages: 1, // 当前页数
            videoList: [], // 视频列表
            wrapperHeight:'0', // 屏幕高度
            showLoading: false, // 是否显示加载中模块
            isalldone: false, // 加载中 默认true不显示
            topFlag: false, // 是否显示返回顶部
            bottomText:'正在加载中...',
            errmsg: '',
            title:'掌柜学堂',
            notvideo: ""
        }
    },
    components:{
        Header
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight;
        this.getVideoList();
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed () {
        window.removeEventListener('scroll', this.scrollToTop)
        document.scrollingElement.scrollTop = 0
    },
    methods: {
        getVideoList(){
            const params = {
                pageStart: this.nowpages,
                pageSize: 10
            }
            getVideo(params).then( result => {
                console.log('视频列表1：', result)
                const {returnCode, returnMessage, total, row } = result.data;
                if( returnCode == '0000' ){
                    this.videoList = this.videoList.concat(row);
                    if (!this.videoList.length) {
                        this.notvideo = "暂无相关视频，尽请期待！"
                    }
                    // console.log('this.videoList',this.videoList)
                    this.Vtotal = total;
                    // this.topFlag = parseInt(this.nowpages) >= 2 ? true : false
                    if( this.Vtotal&&this.nowpages >= this.Vtotal){ // 是否最后一页
                        this.isalldone = true;
                        this.bottomText = '老板！视频已经到底啦！'
                    }
                } else {
                    this.errmsg = returnMessage
                    this.$toast(returnMessage);
                }
                this.$nextTick(() => {
                    const divH = this.$refs.morewrapper.offsetHeight;
                    if(divH > this.wrapperHeight){
                        this.showLoading = true;
                    }
                })
            })
        },

        // 跳转到视频
        openVideo(item) {
            let params = {
                id: item.id,
                videoClick: item.videoClick || 0,
            }
            VideoTimes(params).then(result => {
                console.log("点击统计",result)
                const {code, message} = result.data
                if(code == '0000'){
                    const {videoUrl, videoPicUrl, videoTitle} = item;
                    let param ={videourl: videoUrl, videoimg: videoPicUrl, videotitle: videoTitle}
                    this.$router.push({path:'/videodetail',query: param})
                    // window.location.href = item.videoUrl
                } else {
                    this.$toast(message);
                }
            })
        },
        // 返回顶部
        backTop() {
            const that = this
            let timer = setInterval(() => {
                let ispeed = Math.floor(-that.scrollTop / 5)
                document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
                if (that.scrollTop === 0) {
                clearInterval(timer)
                }
            }, 16)

        },
        // 监听滚动条的距离
        scrollToTop(){
            const that = this
            let scrolltop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            that.scrollTop = scrolltop
            if (scrolltop + clientHeight >= scrollHeight - 50) { // 如果滚动到接近底部，自动加载下一页
                //事件处理
                if(this.nowpages < this.Vtotal) {
                    this.nowpages = this.nowpages + 1;
                    this.getVideoList();
                }
            }
            if (that.scrollTop > this.wrapperHeight) {
            that.topFlag = true
            } else {
            that.topFlag = false
            }
        },
        // 关闭页面
        closemenu(){
            window.location.href = "ulemobile://ulePopView";
        }
    },
    filters: {
        filber(data, val) {
            let tmp = parseInt(data) >= 0 ? data : val;
            return tmp
        },
        istitle(data){
            let str = data ? data : '视频教程'
            return str
        }
    }
}
</script>
<style lang="scss" scoped>
.trainvideo{
    width: 100%;
    height: 100%;
    font-size: 14px;
    .video_contenr{
        height: 100%;
        padding-top: 50px;
        .load-more-wrapper{
            height: 100%;
            -webkit-overflow-scrolling: touch;
            // transition-duration: 300ms;
            ul{
                margin:0 10px;
                li{
                    display: flex;
                    padding: 15px 0;
                    border-bottom: 1px solid #dddddd;
                    .img-box{
                        width: 100px;
                        height: 100px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .disc-box{
                        flex: 1;
                        // height: 100px;
                        padding-left: 10px;
                        overflow: hidden;
                        
                        .title{
                            color: #333333;
                            margin-bottom: 8px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden; 
                            text-overflow: ellipsis;
                        }
                        .subtitle{
                            flex: 1;
                            font-size: 12px;
                            margin-bottom: 10px;
                            color: #cccccc;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .times{
                            display: flex;
                            align-items: center;
                            line-height: 15px;
                            img{
                                width: 16px;
                                height: 16px;
                                margin-right: 4px;
                                display: inline-block;
                            }
                        }
                    }
                }
            }
            .notvideo{
                height: 70px;
                text-align: center;
                line-height: 70px;
                padding-top: 50px;
                color: #b6b6b6;
            }
        }
    }
    .loadmore-spinner {
        display: inline-block;
        margin-right: 5px;
        vertical-align: middle;
        .spinner {
            width: 4px;
            height: 6px;
            background: #68b2ce;
            float: left;
            margin: 0 3px;
            animation: spinners linear 1s infinite;
            -webkit-animation: spinners linear 1s infinite;
            &:nth-child(1){
                animation-delay: 0s;
            }
            &:nth-child(2){
                animation-delay: 0.15s;
            }
            &:nth-child(3){
                animation-delay: 0.3s;
            }
            &:nth-child(4){
                animation-delay: 0.45s;
            }
            &:nth-child(5){
                animation-delay: 0.6s;
            }
        }
        @keyframes spinners 
        {
            0%,60%,100% {transform: scale(1);}
            30% {transform: scaleY(3);}
        }
        @-webkit-keyframes spinners 
        {
            0%,60%,100% {transform: scale(1);}
            30% {transform: scaleY(3);}
        }
    }
    .loadmore-text {
        vertical-align: middle;
    }
    .alldone{
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        color: #757575;
    }
    .backtop{
        width: 40px;
        height: 40px;
        position: fixed;
        right: 30px;
        bottom: 20%;
        border: 1px solid #757575;
        border-radius: 25px;
        background: #ffffff;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.25s ease-out;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
}
</style>