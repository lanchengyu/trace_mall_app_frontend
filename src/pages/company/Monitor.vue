<template>
  <div style="height:100%;">
    <div class="header">
      <div class="header-left"
           @click="back">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="header-in">视频监控</div>
      <div class="header-rigth">
      </div>
    </div>
    <div class="main-container">
      <div id="playWind"
           v-show="isMonitor"
           v-bind:style="{width: w+'px', height: h+'px'}"></div>
      <video id="myPlayer"
             v-show="!isMonitor"
             v-bind:style="{width: w+'px', height: h+'px'}"
             :src="src"
             controls
             playsInline
             webkit-playsinline
             autoplay>
        <!-- <source src="http://hls01open.ys7.com/openlive/f01018a141094b7fa138b9d0b856507b.m3u8"
                type="application/x-mpegURL" /> -->
      </video>
      <div class="nav">
        <el-button v-for="(item, index) in videos"
                   :key="index"
                   @click="play(item)"
                   type="primary"
                   plain>{{item.title}}</el-button>
      </div>
      <Copyright-Footer>
      </Copyright-Footer>
    </div>
  </div>

</template>

<script>
import CopyrightFooter from "@/common/CopyrightFooter";
import { Button } from "element-ui";
require('@/utils/ezuikit.js')

export default {
  name: "Monitor",
  data () {
    return {
      videos: [],
      w: 300,
      h: 200,
      isMonitor: true,
      monitor: null,
      player: null,
      src: ''
    };
  },
  components: {
    CopyrightFooter
  },
  mounted () {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.w = screenWidth
    this.h = this.w * 2 / 3
  },
  computed: {
  },
  created () {
    var companyId = this.$route.query.companyId
    this.$get('company/monitor', { companyId: companyId }).then((r) => {
      this.videos = r.data
      if (this.videos && this.videos.length > 0)
        this.play(this.videos[0])
    });
  },
  beforeDestroy () {
    this.stopMonitor()
    this.stopPlayer()
  },
  methods: {
    back () {
      this.stopMonitor()
      this.stopPlayer()
      this.$router.go(-1)
    },
    stopPlayer () {
      if (this.player) {
        this.player.stop()
        this.player = null
      }
    },
    stopMonitor () {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = null
      }
    },
    play (item) {
      this.stopMonitor()
      this.stopPlayer()
      if (item.token) {
        this.isMonitor = true
        this.monitor = new EZUIKit.EZUIPlayer({
          id: 'playWind',
          autoplay: true,
          url: item.url,
          accessToken: item.token,
          decoderPath: '../',
          width: this.w,
          height: this.h
        });
      } else {
        this.isMonitor = false
        this.src = item.url
        setTimeout(() => {
          this.player = new EZUIKit.EZUIPlayer('myPlayer')
        }, 500)
      }
    },
    stop () {
      this.player.stop()
    }
  }
};
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 60px;
  background: white;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  z-index: 1;

  .header-left {
    width: 10%;
    height: 100%;
    float: left;

    i {
      font-size: 0.6rem;
      line-height: 60px;
      text-align: center;
      display: block;
    }
  }

  .header-in {
    width: 80%;
    float: left;
    text-align: center;
    font-size: 0.45rem;
    line-height: 60px;
  }

  .header-rigth {
    width: 10%;
    text-align: center;
    font-size: 0.45rem;
    line-height: 60px;
    float: left;
  }
}

.nav {
  background: white;
  padding: 0.3rem;
  width: 100%;
}

.main-container {
  width: 100%;
  height: calc(100% - 1.45rem);
  overflow: auto;
}
</style>