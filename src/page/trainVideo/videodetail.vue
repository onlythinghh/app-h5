<template>
    <div class="videodetail">
        <Header :title="videotitle" :isBack="true" :banFixed="false"></Header>
        <div class="videobox">
            <video id="videoPlay"
                controls="controls"
                x5-video-player-type="h5"
                :src="videoSrc"
                :poster="videoimg"
                class="video">您的浏览器不支持 video 视屏播放。 
            </video>
        </div>
        <!-- x5-playsinline="x5-playsinline"
        playsinline="playsinline"
        webkit-playsinline="webkit-playsinline" -->
        <!-- <video width="100%" controls="controls" name="media"><source :src="videoSrc" type="video/mp4"></video> -->
    </div>
</template>
<script>
import Header from "../../components/header/header"
export default {
    data(){
        return{
            videoSrc: '',
            videoimg:'',
            videotitle:''
        }
    },
    components: {
        Header
    },
    mounted(){
        this.videoSrc = this.$route.query.videourl
        this.videoimg = this.$route.query.videoimg
        this.videotitle = this.$route.query.videotitle || '视频教程'
        console.log(this.$route.query.videourl)
    },
    created() {
        console.log("链接",this.$route.query)
    },
    methods:{
        playVideo(){
            var vdo = document.getElementById("videoPlay");
            vdo.play();
        }
    }
}
</script>
<style lang="scss" scoped>
.videodetail {
    width: 100%;
    height: 100%;
    font-size: 14px;
    overflow: hidden;
    .videobox{
        margin: 80px 10px 0;
        .video{
            width: 100%;
        }
    }
    
    video::-webkit-media-controls-fullscreen-button {
        display: none;
    }
    video::-webkit-media-controls-mute-button {
        display: none;
    }
}
</style>