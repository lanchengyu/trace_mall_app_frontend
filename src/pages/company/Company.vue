<template>
  <div>
    <Company-Header :title="companys.length>0?companys[classifyIndex].companyName:'企业信息'"></Company-Header>
    <!-- <div v-if="loading"
         style="padding-top:70px;text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div> -->
    <div class="main-container">
      <el-row>
        <div class="search-in">
          <el-input placeholder="搜索"
                    prefix-icon="el-icon-search"
                    >
          </el-input>
        </div>
      </el-row>
      <div id="content">
        <div class="left">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo">
              <el-submenu :index="industry.industryName" v-for="(industry,index) in industries" :key="index" @click="changeIndustry(industry.industryId)">
                <template slot="title">
                  <span>{{industry.industryName}}</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" v-for="(company,index1) in industry.company" :key="index1" @click="changeCompany(index1,company.companyId)">{{company.companyName}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
        </div>
        <div class="right" v-show="flag">
        <div class="first margin">
          <div class="top">
            <div class="img"><img src="static/img/home7.png"/></div>
              <p class="text">生产企业</p>
          </div>
          <div class="bottom">
            <pre class="m-content overflow-line">{{company.introduce}}</pre>
            <p class="btn-more" v-if="isShowMore" @click="showmoreDesc($event)">查看更多</p>
          </div>
        </div>

        <div class="second margin">
          <div class="address">
            <div class="top">
              <div class="img"><img src="static/img/home8.png"/></div>
              <p class="text">生产地址</p>
            </div>
            <div class="bottom">
              <v-map class="map" :showMapComponent="showMapComponent"
                    mapHeight=300
                    @ready="handleVMapReady"
                    :initCompany="showMapComponent&&company?company:{}"></v-map>
            </div>
          </div>

          <div class="monitor">
            <div class="top">
              <div class="img"><img src="static/img/home9.png"/></div>
              <p class="text">生产视频</p>
            </div>
            <div class="bottom">
              <div id="playWind"
                    v-show="isMonitor"
                    ></div>
                <video id="myPlayer" class="player"
                      v-show="!isMonitor"                     
                      :src="src"
                      controls
                      playsInline
                      webkit-playsinline
                      autoplay>
                </video>
                <div class="nav">
                  <el-button v-for="(item, index) in videos"
                            :key="index"
                            @click="play(item)"
                            type="primary"
                            plain>{{item.title}}</el-button>
                </div>
            </div>
          </div>
        </div>
      </div>
       
    </div>   
      <!-- <el-row>
        <el-col :span="7">
          
        </el-col>
        <el-col :span="16" :offset="1">
          
        </el-col>
      </el-row> -->
      <!-- <div class="calssify-left"
           ref="wrapper">
        <ul class="calssify-left-ul">
          <li v-for="(company,index) in companys"
              :key="index"
              @click="changeCompany(index, company.companyId)"
              :class="{active:index===classifyIndex}">
            <img v-lazy="company.brand"
                 style="max-width: 2rem;max-height: 1rem;">
          </li>
        </ul>
      </div>
      <div class="calssify-right"
           ref="wrapper2">
        <div class="company-pic"><img v-lazy="companys.length>0?companys[classifyIndex].picture:''"
               :key="classifyIndex"></div>
        <label>企业介绍</label>
        <div class="item-card">
          <div class="company-introduce">
            <pre>{{companys.length>0?companys[classifyIndex].introduce:''}}</pre>
          </div>
        </div>

        <label>视频监控</label>
        <div>
          <router-link :to="{ name: 'monitor', query: { companyId: companyId }}">
            <el-button type="primary"
                       style="width:100%">点击查看</el-button>
          </router-link>
        </div>

        <label>产品配方</label>
        <div class="item-card">
          <ul class="calssify-left-ul">
            <li v-for="(product,index) in products"
                :key="index"
                @click="showPopup(product)">
              <img v-lazy="product.picture">
              <span>{{product.productName}}</span>
            </li>
          </ul>
        </div>
        <Copyright-Footer></Copyright-Footer>
      </div> -->
    </div>
    <!-- <mt-popup v-model="popupVisible"
              class="product-detail-popup"
              :modal="false"
              position="right">
      <mt-button @click="closePopup"
                 size="large"
                 type="primary">关闭</mt-button>
      <div class="recipe">
        <pre>{{decodeData}}</pre>
      </div>
    </mt-popup> -->
  </div>
</template>

<script>
import CompanyHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
import { Popup, MessageBox,Search} from "mint-ui";
import { Button } from "element-ui";
import { Decrypt } from '@/utils/aesUtil.js'
import { mapGetters } from "vuex";
import VMap from "@/components/map/VMap";

export default {
  name: "Company",
  data () {
    return {
      flag:false,
      industries:[],
      companys: [],
      company:{
        lng: 0,
        lat: 0
      },
      products: [],
      decodeData: '',
      classifyIndex: 0,
      isFirstEnter: false,
      loading: true,
      popupVisible: false,
      companyId: '',
      showMapComponent: false,
      videos: [],
      w: 499,
      h: 247,
      isMonitor: true,
      monitor: null,
      player: null,
      src: '',
      isShowMore: false,  //是否显示查看更多按钮
      isDescStatus: false
    };
  },
  props: {
    mes2: {
      type: String,
      default: ""
    }
  },
  watch: {
    mes2(val) {
      this.company.introduce = val;
      if (this.company.introduce.length > 200) {
        this.isShowMore = true;
      }
    }
  },
  components: {
    CompanyHeader,
    CopyrightFooter,
    VMap
  },
  mounted(){
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    this.w = screenWidth
    this.h = this.w * 2 / 3
    // this.scroll = new Bscroll(this.$refs.wrapper, {click: true, tap: true })
  },
  computed: {
    ...mapGetters(["this.$store.state.sindex"])
  },
  beforeRouteEnter (to, from, next) {
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    if (from.name == 'product' || from.name == 'monitor') {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是以上页面过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created () {
    this.isFirstEnter = true
    //获取所有行业
    this.$get('industry/tree/list').then((r) =>{
      this.industries=r.data;
    });
  },
  beforeDestroy () {
    this.stopMonitor()
    this.stopPlayer()
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.loading = true
      this.reset()
      this.$get('industry/tree/list').then((r) =>{
        this.industries=r.data;
      });
      // this.$get('company/list', {}).then((r) => {
      //   this.companys = r.data
      //   this.company=this.companys[0];
      //   this.loading = false
      //   if (this.companys) {
      //     this.companyId = this.companys[0].companyId
      //     this.$nextTick(() => {
      //       this.$get('product/recipes', { companyId: this.companyId }).then((r) => {
      //         this.products = r.data
      //       });
      //     })
      //     this.$get('company/monitor', { companyId: this.companyId }).then((r) => {
      //       this.videos = r.data
      //       if (this.videos && this.videos.length > 0)
      //         this.play(this.videos[0])
      //     });
      //   }
      // });
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
  },
  methods: {
    showmoreDesc(e) {
      let el = e.currentTarget;
      var i=document.createElement("i");
      el.previousElementSibling.classList[!this.isDescStatus ? 'add' : 'remove']('overflow-line');
      el.classList[this.isDescStatus ? 'add' : 'remove']('more-collapse');
      el.innerHTML = !this.isDescStatus ? '查看更多' : '收起';
      this.isDescStatus = !this.isDescStatus;
      this.isShowMore = true;
    },
    reset () {
      this.companys = []
      this.products = []
      this.classifyIndex = 0
      this.isFirstEnter = false
    },
    chooseIndustry(){
      $('.menu').hover(function(){
        $(this).find('ul').slideDown("1500");
      },
      function(){
        $(this).find('ul').slideUp("1500");
      })
    },
    changeCompany (index,companyId) { 
      this.classifyIndex = index
      this.products = []
      this.company={}
      //通过企业id查询企业信息
      this.$get('admin/company/'+companyId).then((r) =>{
        this.company=r.data;
        console.log(this.company.introduce.length)
        if(this.company.introduce.length>200){
          console.log("1111111")
          this.isShowMore=true;
        }
      })
      this.$get('product/recipes', { companyId: companyId }).then((r) => {
        this.companyId = companyId
        this.products = r.data
      });
      this.$get('company/monitor', { companyId:companyId }).then((r) => {
        this.videos = r.data
        if (this.videos && this.videos.length > 0)
          this.play(this.videos[0])
      });
      this.flag=!this.flag;
    },
    handleVMapReady () {
      this.showMapComponent = true
    },
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
    },
    showPopup (product) {
      this.decodeData = product.recipe
      this.stopBodyScroll(true)
      this.popupVisible = true
      MessageBox.prompt(' ', '请输入密码').then(({ value }) => {
        if (value) {
          this.decodeData = Decrypt(product.recipe, value, 'base64')
        }
      }).catch(r => {
        if (r === 'cancel') {
          this.closePopup()
        } else {
          MessageBox.alert('密码错误');
        }
      });
    },
    closePopup () {
      this.popupVisible = false
      this.stopBodyScroll(false)
    },
    stopBodyScroll (isFixed) {
      var bodyEl = document.body
      if (isFixed) {
        this.top1 = window.scrollY
        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -this.top1 + 'px'
      } else {
        bodyEl.style.position = ''
        bodyEl.style.top = ''
        window.scrollTo(0, this.top1) // 回到原先的top
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
body::-webkit-scrollbar {
    display: none;    
}
.m-content {
    &.overflow-line { //作用在同一标签上
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 6;
      overflow: hidden;
    }
  }
  .btn-more {
    float: right;
    color: #5b81ff !important;
    padding-top: 0.1rem !important;
    position: relative;
    margin-top: rc(5);
    padding-right: rc(33);

    &.more-collapse {

      &::after,
      &::before {
        top: 2px;
        transform: rotate(180deg);
      }

      &::before {
        top: 4px;
      }
    }

    &::after,
    &::before {
      width: 0;
      height: 0;
      content: '';
      position: absolute;
      right: 0;
      top: 7px;
      border: rc(12) solid transparent;
    }

    &::after {
      border-top-color: #5383E7;
      z-index: 1;
    }

    &::before {
      border-top-color: #1c2239;
      z-index: 2;
      top: 5px;
    }
  }
.margin{
  padding-bottom:25px;
  background-color:#ffffff;
  padding-top:16px;
  border-radius:10px;
  .top{
    overflow:hidden;
    .img{
      margin-left:30px;
      margin-bottom:15px;
      margin-right: 20px;
      float:left;
      img{
        width: 0.6rem;
        height: 0.6rem;
        border-radius:50%;
      }
    }
    .text{
        font-size:30px;
        font-family:STHeiti;
        color:rgba(51,51,51,1);
        line-height:40px;
      }
  }
  .bottom{
    margin:0 20px;
  }
}
.main-container{
  clear:both;
  height:100%;
  >>> .mint-search .mint-searchbar{
    background-color:#EFEFEF;
  }
  .search-in{
    width:85%;
    margin:18px auto;
     >>>.el-input {
      display: block;
    }
    >>>.el-input__inner {
      border-radius: 2rem;
    }
  }

  .left{
    width:30%
    float:left;
    position: relative;
    >>>.el-submenu .el-menu-item{
      min-width:150px;
    }
    >>>.el-submenu__title i {
        color: #303133;
    }
    >>>.el-submenu__icon-arrow {
        position: absolute;
        top: 50%;
        right: 20px;
        -webkit-transition: -webkit-transform .3s;
        transition: -webkit-transform .3s;
        transition: transform .3s;
        transition: transform .3s,-webkit-transform .3s;
        font-size: 34px;
    }
    >>>.el-menu-item {
        font-size: 12px;
        padding-left:16px;
    }
    >>>.el-menu-item-group ul li{
          padding-left: 28px !important;
          width: 100%;
          white-space: normal;
          line-height:35px;
    }
    >>>.el-menu-item {
        font-size: 14px;
        color: #303133;
        padding: 0 0;
        cursor: pointer;
        -webkit-transition: border-color .3s,background-color .3s,color .3s;
        transition: border-color .3s,background-color .3s,color .3s;
        box-sizing: border-box;
    }
    >>>.el-menu-item.is-active {
        color: #409EFF;
    }
    .arrow{
      padding: 10px;
      background-color: #fff;
      border-bottom: 1px solid #dde2ef;
      text-align:center;
      img{
        width:30px;
        height:30px;
      }
    }
  }
  .right{
    width:69%;
    float:left;
  }
  .companies{
    position: relative;
    background-color:#fff;
    .cpmpanyName{
      padding:32px 26px;
      font-size:28px;
      font-family:STHeiti;
      color:rgba(51,51,51,1);
    }
    .active{
      border-left:4px solid #5A80FF;
    }
  }
  .first{
    overflow: auto;
    .bottom{
      height:302px;
      margin: auto;
      padding:0 20px 20px 20px;
       pre {
        white-space: pre-wrap;
        font-size:24px;
        font-family:STHeiti;
        color:rgba(147,147,147,1);
      }
    }
   
  }
  .second{
    margin-top:20px;
    .address{
      padding-bottom:20px;
      border-bottom:1px solid #CDCDCD;
      .bottom{
        .map{
          display:block;
        }
      }
    }
    .monitor{
      padding-top:20px;
      .bottom{
        padding-right:20px;
        .playWind{
          height:247px;
        }
        .player{
          height:247px;
        }
        .nav{
          margin-top:25px;
        }
      }
    }
  }
}
//一级菜单

.nav-ul{
  position:relative;
  .menu{
    border-bottom: 1px solid #dde2ef;
    a{
      display:block;
      padding:30px;
    }
  }
}
.nav-ul li ul{
  display:none;
  position:absolute;
  top:0;
  left:0;
  background-color:#fff;
  li{
    padding:30px;
    border-bottom: 1px solid #dde2ef;
  }
}
</style>