<!--  -->
<template>
  <div>
     <div class="goodDetaiSwipe">
        <mt-swipe :auto="4000" :show-indicators="false">
          <mt-swipe-item v-for="(item, index) in homeSwipe" :key="index">
            <img :src="item" alt="图片" />
            <div class="btn-swip">{{index+1}}/{{homeSwipe.length}}</div>
          </mt-swipe-item>
          <mt-swip-item>
            <my-player @ready="handleMyPlayerReady"
                         :source="isMyPlayerReady&&videos.length>0?videos[selectedId]:''"></my-player>
          </mt-swip-item>
        </mt-swipe>
      </div>
  </div>
</template>

<script>
import VedioAndImg from "@/components/vedioAndImg/VedioAndImg"
import {getProductDetail} from "@/api/mallApi";
export default {
  name:"test",
  data () {
    return {
      goodDetail:{},
      isMyPlayerReady: false,
      videos: [],
    };
  },

  components: {
    VedioAndImg,
    MyPlayer: resolve => require(['@/components/video/MyPlayer'], resolve)
  },

  computed: {
        homeSwipe() {
      if (this.goodDetail) {
        if (this.goodDetail.albumPics) {
          return this.goodDetail.albumPics.split(",");
        }
      }
      return [];
    }
  },
  created(){
    var id=55;
    getProductDetail(id).then(res=>{
      this.goodDetail=res.data;
    })
  },
  methods: {
        handleMyPlayerReady () {
      this.isMyPlayerReady = true
    },
  }
}

</script>
<style lang="stylus" scoped>
.goodDetaiSwipe {
  height: 8rem;
  background: white;
  position:relative;
  .btn-swip{
    padding:0.1rem 0.25rem;
    border-radius:0.25rem;
    background-color:#BABABA;
    color:#fff;
    z-index:999;
    position:absolute;
    bottom:0.5rem;
    right:0.5rem;
  }
}

.goodDetaiSwipe img {
  width: 100%;
  height: 7rem;
  display: block;
  margin: auto;
}
</style>