<!--  -->
<template>
  <div class="video_list">
    <div class="video_ls clear"  ref="videoLs">
      <div class="video_shows" v-for="(item,index) in srclist" :key="index">
        <div v-if="item.imsrc" class="div_videos" >
          <img :src="'../../../static/img/'+item.imsrc+'.png'" :ref="index"/>
        </div>
        <div v-if="item.videosrc"  class="div_videos" >
          <video-player class="video-player vjs-custom-skin"
                        id="myVedio"
                        :ref="index"
                        :options="playerOptions"
                        :playsinline="true"
                        @play="onPlayerPlay($event)"
                        @pause="onPlayerPause($event)"
                        @ended="onPlayerEnded($event)"
                        @loadeddata="onPlayerLoadeddata($event)"
                        @waiting="onPlayerWaiting($event)"
                        @playing="onPlayerPlaying($event)"
                        @timeupdate="onPlayerTimeupdate($event)"
                        @canplay="onPlayerCanplay($event)"
                        @canplaythrough="onPlayerCanplaythrough($event)"
                        @ready="playerReadied"
                        @statechanged="playerStateChanged($event)"
          >
          </video-player>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 export default {
    data() {
      return {
        // videojs options
        playerOptions: {
            height: '360',
            muted: true,//开启声音
              autoplay: true,
            language: 'en',
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            sources: [{
            type: "video/mp4",
            src: "",
          }],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg",
          },
        refslist:[],//对象列表
        srclist:[//视频图片列表
          {imsrc:'3'},
          {videosrc:"https://v-cdn.zjol.com.cn/280443.mp4"} ,
          {imsrc:'1'},
          {videosrc:"https://v-cdn.zjol.com.cn/276984.mp4"},
          {imsrc:'2'},
        ],
        num:0,
        time:''
      }
    },
    mounted() {
      if(this.srclist[0].videosrc){//第一个是视频
        this.playerOptions.sources[0].src=this.srclist[this.num].videosrc
      }else{//第一个是图片
        this.startPlay()
      }
    },
    methods: {
      initVedio(){
          //页面dom元素渲染完毕，执行回调里面的方法
          this.$nextTick(()=>{
              
          })
      },
      startPlay(){//图片
        this.time=setInterval(()=>{
          this.countPlay();
          if(this.srclist[this.num].videosrc){
            clearInterval(this.time);
            this.playerOptions.sources[0].src=''
            this.playerOptions.sources[0].src=this.srclist[this.num].videosrc
          }
        },3000)
      },
      countPlay(){
        this.num++;
        this.$refs.videoLs.style.left=-600*(this.num)+"px";
        this.$refs.videoLs.style.transition="2s"
        if(this.num>=this.srclist.length){
          this.num=0;
          this.$refs.videoLs.style.left="0px"
          this.$refs.videoLs.style.transition="0s"
        }
      },
      onPlayerPlay(player) {
      },
      onPlayerPause(player) {
      },
      onPlayerEnded(player) {//播放完毕之后 src被替换
        this.countPlay()
        this.playerOptions.sources[0].src=''
        this.playerOptions.sources[0].src=this.srclist[this.num].videosrc
        if(this.srclist[this.num].imsrc){
          this.startPlay()
        }
      },
      onPlayerLoadeddata(player) {
      },
      onPlayerWaiting(player) {
      },
      onPlayerPlaying(player) {
      },
      onPlayerTimeupdate(player) {
      },
      onPlayerCanplay(player) {
      },
      onPlayerCanplaythrough(player) {
      },
      // or listen state event
      playerStateChanged(playerCurrentState) { //播放的进程中就是一直在播放
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready 从第几秒开始播放
      playerReadied(player) {
        // seek to 10s
        // console.log('example player 1 readied', player)
        // player.currentTime(10)
        // console.log('example 01: the player is readied', player)
      }
    }
  }

</script>
<style lang="stylus" scoped>
*{
    padding: 0;
    margin: 0;
  }
  .clear{
    *zoom:1;
  }
  .clear:after{
    visibility:hidden;
    content:"";
    display:block;
    clear:both;
    height:0;
  }
  .video_list{
    width: 600px;
    height: 270px;
    overflow: hidden;
    position: relative;
    margin: 0 auto;
  }
  .video_ls{
    width: 500%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    /*transition: 2s;*/
  }
  .video_shows{
    width: 20%;
    height: 100%;
    float: left;
    /*transform: translate3d(-600px,0,0);*/
  }
  .div_videos{
    width: 100%;
    height: 100%;
  }
  .div_videos img{
    width: 100%;
    height: 100%;
  }

</style>