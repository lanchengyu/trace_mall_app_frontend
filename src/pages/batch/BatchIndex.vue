<template>
  <div style="height:100%;">
    <div v-if="loading"
         style="padding-top:70px;text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div v-else
         class="batchDetail">
      <!-- <ul> -->
        <!-- <el-row v-if="product"> -->
          <div class="goodDetaiSwipe">
            <mt-swipe :auto="4000">
              <mt-swipe-item v-for="(img, index) in homeSwipe"
                             :key="index">
                <img :src="img"
                     :key="img" />
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <!-- <div class="buy" @click="tobuy(product.buyLink)"><span>点击购买</span></div> -->
          <div class="pad">
            <!-- <div class="title-line">
              <span>您扫码{{visitNum}}次，谨防假冒</span>
              <span v-if="user && user.username"
                    class="login"
                    @click="logout">退出登录</span>
              <router-link v-else
                          to="/login"
                          class="login">登录</router-link>
            </div>
            
              <span class="productName">{{product.productName}}</span>
              <span class="username"
                    v-if="user && user.username"><i class="iconfont icon-user" />{{user.username}}</span> -->
            <div class="HomeList">
              <el-row>
                <router-link :to="{ name: 'company', query: { companyId: company.companyId}}">
                  <el-col :span="6">
                    <div class="item first">
                      <img src="static/img/home1.png"/>
                    </div>
                    <div class="text">政府监管</div>
                  </el-col>
                </router-link>
                <router-link :to="{ name: 'quality', query: { id: company.companyId}}">
                  <el-col :span="6">
                    <div class="item second">
                      <div><img src="static/img/home2.png"/></div>
                    </div>
                    <div class="text">质量体系</div>
                  </el-col>
                </router-link>
                <router-link :to="{name:'report'}">
                  <el-col :span="6">
                    <div class="item third">
                      <div><img src="static/img/home3.png"/></div>
                    </div>
                    <div class="text">检验报告</div>
                  </el-col>
                </router-link>
                <router-link :to="{ name: 'blockchain', query: {hash: batch.hash}}">
                  <el-col :span="6">
                    <div class="item fourth">
                      <div><img src="static/img/home4.png"/></div>
                    </div>
                    <div class="text">区块链验证</div>
                  </el-col>
                </router-link>
              </el-row>
              <!-- <ul>
                <li @click="toCompany"
                    style="border-right: 1px solid #eee;">
                  <router-link v-hasPermission="'admin:company:view'"
                               :to="{ name: 'company', query: { companyId: company.companyId}}">
                    <img src="static/img/icon3.png">
                    <div>政府监管</div>
                  </router-link>
                  <div>
                    <img src="static/img/icon3.png">
                    <div>政府监管</div>
                  </div>
                </li>
                <li style="border-right: 1px solid #eee;">
                  <router-link :to="{ name: 'quality', query: { id: company.companyId}}">
                    <img src="static/img/icon5.png">
                    <div>质量体系</div>
                  </router-link>
                </li>
                <li style="border-right: 1px solid #eee;">
                  <router-link :to="{ name: 'position', query: { productId: product.productId, batchId: batch.batchId}}">
                    <img src="static/img/icon2.png">
                    <div>扫码统计</div>
                  </router-link>
                </li>
                <li>
                  <router-link :to="{ name: 'blockchain', query: {hash: batch.hash}}">
                    <img src="static/img/icon6.png">
                    <div>区块链验证</div>
                  </router-link>
                </li>
              </!--> 
              <!-- <div v-show="company.government"
                   class="ant-popover">
                <div class="ant-popover-content">
                  <div class="ant-popover-arrow"></div>
                  <div class="ant-popover-inner">
                    {{company.government}}
                  </div>
                </div>
              </div> -->
            </div>
            <div class="introduce margin">
              <div class="top">
                <div class="img"><img src="static/img/home5.png"/></div>
                <p class="text">产品信息</p>
              </div>
              <div class="bottom">
                <el-row>
                  <el-col :span="15">
                    <p><span>品牌名称：</span><span>{{product.productName}}</span></p>
                    <p><span>生产企业：</span><span>{{company.companyName}}</span></p>
                    <p><span>产地：</span><span>{{product.address}}</span></p>
                    <p><span>生产批号：</span><span>{{batch.batchId}}</span></p>
                    <p><span>保质期：</span><span>{{product.expiration}}</span></p>
                    <p><span>生产日期：</span><span>{{batch.produceDate}}</span></p>
                  </el-col>
                  <el-col :span="6"  :offset="1">
                    <img :src="homeSwipe[0]"/>
                  </el-col>
                </el-row>
              </div> 
            </div>
            <div class="production margin">
              <div class="top">
                <div class="img"><img src="static/img/home6.png"/></div>
                <p class="text">产品介绍</p>
              </div>
              <div class="bottom">
                <p class="m-content overflow-line">{{product.introduce}}</p>
                <p class="btn-more" v-if="isShowMore" @click="showmoreDesc($event)">查看更多</p>
              </div>
            </div>
            <div class="line margin">
              <div class="top">
                <div class="img"><img src="static/img/home7.png"/></div>
                <p class="text">生产流程</p>
              </div>
              <div class="bottom">
                <el-row>
                  <el-col :span="6">
                    <img :src="batch.recordItems[0].picture"/>
                  </el-col>
                  <el-col :span="12">
                    <p><span>时间：</span><span>{{batch.recordItems[0].operationTime| dateformat()}}</span></p>
                    <p><span>操作员：</span><span>{{batch.recordItems[0].operator}}</span></p>
                    <p><span>操作：</span><span>{{batch.recordItems[0].operation}}</span></p>
                  </el-col>
                  <el-col :span="6">
                    <div class="showMore" @click="toRecord"><span class="text">查看更多</span></div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="vedio margin">
              <div class="title">
                <el-row>
                  <el-col :span="6" :offset="4">
                    <img src="static/img/left.png"/>
                  </el-col>
                  <el-col :span="6" :offet="3"><span class="text">生产视频</span></el-col>
                  <el-col :span="5">
                    <img src="static/img/right.png"/>
                  </el-col>
                </el-row>
              </div>
              <div class="content">
                <my-player @ready="handleMyPlayerReady"
                         :source="isMyPlayerReady&&videos.length>0?videos[selectedId]:''"></my-player>
                <div class="buy" @click="tobuy(product.buyLink)">
                  <img class="bg" src="static/img/buy-bg.png"/>
                  <a class="go" @click="tobuy(product.buyLink)"><img src="static/img/buy-go.png"/></a>
                </div>
                <div class="shop"  @click="toHome">
                  <el-row>
                    <el-col :span="10" :offset="2">
                      <img src="static/img/shop1.png"/>
                    </el-col>
                    <el-col :span="10">
                      <div class="top">
                        <img class="logo" src="static/img/logo6.png"/>
                        <p>溯源商城</p>
                      </div>
                      <div class="bottom">
                        <div class="btn">点击进入</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          <!-- <div class="row">
            <div class="ant-divider">
              <span class="ant-divider-inner-text">产品身份信息</span>
            </div>
            <table class="batch-table"
                   style="border-bottom: 1px solid #eee;">
              <tr>
                <td class="label">品牌名称</td>
                <td class="text">{{product.productName}}</td>
              </tr>
              <tr>
                <td class="label">生产企业</td>
                <td class="text">{{company.companyName}}</td>
              </tr>
              <tr>
                <td class="label">产地</td>
                <td class="text">{{product.address}}</td>
              </tr>
              <tr>
                <td class="label">生产批号</td>
                <td class="text">{{batch.batchId}}</td>
              </tr>
              <tr>
                <td class="label">批次负责人</td>
                <td class="text">{{batch.producer}}</td>
              </tr>
              <tr>
                <td class="label">保质期</td>
                <td class="text">{{product.expiration}}</td>
              </tr>
              <tr>
                <td class="label">生产日期</td>
                <td class="text">{{batch.produceDate}}</td>
              </tr>
              <tr>
                <td class="label">校验哈希</td>
                <td class="text">{{batch.hash}}</td>
              </tr>
            </table>
            <div class="introduceBox">
              <mt-navbar v-model="selected">
                <mt-tab-item id="tab-container1">企业介绍</mt-tab-item>
                <mt-tab-item id="tab-container2">产品介绍</mt-tab-item>
              </mt-navbar>
              <mt-tab-container v-model="selected">
                <mt-tab-container-item id="tab-container1">
                  <div class="peizhi">
                    <span>{{company.introduce}}</span>
                  </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="tab-container2">
                  <div class="peizhi">
                    <span>{{product.introduce}}</span>
                  </div>
                </mt-tab-container-item>
              </mt-tab-container>
            </div>
            <div style="margin-bottom:10px">
              <mt-cell title="产品详情">
                <i slot="icon"
                   class="iconfont icon-eye" />
                <span @click="showPopup"
                      style="color: green;width: 3rem;padding: 0.3rem;text-align: right;">查看</span>
              </mt-cell>
              <mt-cell title="生产流程"
                       to="batch/record?"
                       is-link>
                <i slot="icon"
                   class="iconfont icon-Loading" />
              </mt-cell>
              <mt-cell title="检验报告"
                       to="batch/report"
                       is-link>
                <i slot="icon"
                   class="iconfont icon-file-text" />
              </mt-cell>
            </div>
            <div class="row-title">生产基地</div>
            <div style="padding:15px;">
              <v-map :showMapComponent="showMapComponent"
                     mapHeight=300
                     @ready="handleVMapReady"
                     :initCompany="showMapComponent&&company?company:{}"></v-map>
            </div>
            <div class="row-title">生产视频监测</div>
            <div class="videoBox">
              <mt-navbar v-model="selectedId">
                <mt-tab-item v-for="(item, index) in videos"
                             :key="index"
                             :id="index">
                  {{item.title}}
                </mt-tab-item>
              </mt-navbar>
            </div>
            <div style="padding:10px;">
              <my-player @ready="handleMyPlayerReady"
                         :source="isMyPlayerReady&&videos.length>0?videos[selectedId]:''"></my-player>
            </div>
          </div> 
          <router-link to="/home">
            <mall-container></mall-container>
          </router-link>
          <div class=row>
            <div class="ant-divider">
              <span class="ant-divider-inner-text">购买链接</span>
            </div>
            <a :href="product.buyLink">
              <div v-show="product.buyLink"
                   class="buy-cell">
                <img slot="icon"
                     v-lazy="product.picture"
                     width="48"
                     height="48">
                <span class="title">{{product.productName}}</span>
                <span class="right-text">点我购买<i class="el-icon-arrow-right"></i></span>
              </div>
            </a> 
            <div class="ant-divider">
              <span class="ant-divider-inner-text">产品推荐</span>
            </div>
            <div class="product-list">
              <ul>
                <li v-for="(item,index) in otherProducts"
                    :key="index">
                  <a :href="item.buyLink">
                    <img v-lazy="item.picture">
                  </a>
                  <span>{{item.productName}}</span>
                </li>
              </ul>
            </div>
          </div> -->
          </div>
        <!-- </li> -->
      <!-- </el-row> -->
      <!-- <Copyright-Footer></Copyright-Footer> -->
      <!-- <mt-popup v-model="popupVisible"
                class="product-detail-popup"
                :modal="false"
                position="right">
        <mt-button @click="closePopup"
                  size="large"
                  type="primary">关闭</mt-button>
        <div class="picture">
          <div class="picture-item"
              v-for="(img, index) in productDetail"
              :key="index">
            <img v-lazy="img"
                style="max-width: 100%;"
                alt="详情图片">
          </div>
        </div>
      </mt-popup> -->
  </div>
  </div>
</template>

<script >
import { MessageBox, Navbar, TabItem, TabContainer, TabContainerItem, Toast, Popup, Button } from "mint-ui";
import { mapState, mapActions } from "vuex";
import BatchLayer from "./component/BatchLayer";
import MallContainer from "./component/MallContainer";
// import VMap from "@/components/map/VMap";
// import MyPlayer from "@/components/video/MyPlayer";
import CopyrightFooter from "@/common/CopyrightFooter";

export default {
  name: "BatchIndex",
  components: {
    CopyrightFooter,
    // VMap,
    BatchLayer,
    MallContainer,
    MyPlayer: resolve => require(['@/components/video/MyPlayer'], resolve)
  },
  props: {
    mes2: {
      type: String,
      default: ""
    }
  },
  watch: {
    mes2(val) {
      this.product.introduce = val;
      if (this.product.introduce.length > 110) {
        this.isShowMore = true;
      }
    }
  },
  data () {
    return {
      selected: "tab-container1",
      batch: {},
      product: {},
      products: [],
      homeSwipe: [],
      productDetail: [],
      visitNum: 0,
      company: {
        lng: 0,
        lat: 0
      },
      selectedId: 0,
      videos: [],
      isFirstEnter: false,
      showMapComponent: false,
      isMyPlayerReady: false,
      loading: true,
      popupVisible: false,
      top1: 0,
      isShowMore: false,  //是否显示查看更多按钮
      isDescStatus: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user,
      permissions: state => state.permissions,
      data:state=>state.batch
    }),
    otherProducts: function () {
      let id = this.product.productId
      return this.products.filter(function (item) {
        return item.productId !== id && item.buyLink
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    if (from.name == 'position' || from.name == 'record' || from.name == 'report' || from.name == 'company' || from.name == 'quality' || from.name == 'blockchain') {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是以上页面过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created () {
    this.isFirstEnter = true;
    var storage=window.localStorage;
    var data=JSON.parse(storage.getItem("BATCH"));
    this.batch=data.batch;
    this.visitNum = data.visitNum
    this.product = data.product
    if (this.product.swipeImages) { this.homeSwipe = this.product.swipeImages.split(',') }
    if (this.product.detailImages) { this.productDetail = this.product.detailImages.split(',') }
    this.company = data.company
    this.videos = data.productVideos
    this.loading = false
    let companyId = this.company.companyId
    this.$nextTick(() => {
      this.$get('anon/product/part/list', {companyId:companyId }).then((r) => {
        this.products = r.data
      });
    })
    if (this.product.introduce.length > 110) {
        this.isShowMore = true;
    }
  },
  // activated () {
  //   if (!this.$route.meta.isBack || this.isFirstEnter) {
  //     // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
  //     // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
  //     console.log("back=",this.$route.meta.isBack);
  //     this.loading = true
  //     this.reset()
  //     var id = this.$route.query.id
  //     this.$get('anon/batch/details', { id: id }).then((r) => {
  //       let data = r.data
  //       if (data) {
  //         this.visitNum = data.visitNum
  //         if (data.batch.recordItems) { data.batch.recordItems = JSON.parse(data.batch.recordItems) }
  //         if (data.batch.reportItems) { data.batch.reportItems = JSON.parse(data.batch.reportItems) }
  //         this.batch = data.batch
  //         this.setBatch(data.batch)
  //         this.product = data.product
  //         if (this.product.swipeImages) { this.homeSwipe = this.product.swipeImages.split(',') }
  //         if (this.product.detailImages) { this.productDetail = this.product.detailImages.split(',') }
  //         this.company = data.company
  //         this.videos = data.productVideos
  //         this.loading = false
  //         let companyId = this.company.companyId
  //         this.$nextTick(() => {
  //           this.$get('anon/product/part/list', { companyId: companyId }).then((r) => {
  //             this.products = r.data
  //           });
  //         })
  //       }
  //     });
  //   }
  //   // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
  //   this.$route.meta.isBack = false
  //   console.log(this.$route.meta.isBack)
  //   // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
  //   this.isFirstEnter = false;
  // },

  methods: {
    // ...mapActions([
    //   'setBatch'
    // ]),
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
      this.batch = {}
      this.product = {}
      this.product = []
      this.homeSwipe = []
      this.showMapComponent = false
      this.company = { lng: 0, lat: 0 }
      this.selectedId = 0
      this.videos = []
      this.isMyPlayerReady = false
    },
    toHome(){
      this.$router.push({path:"/home"})
    },
    toRecord(){
      this.$router.push({path:"/batch/record"})
    },
    tobuy(buyLink){
      window.location.href=buyLink;
    },
    // showPopup () {
    //   this.stopBodyScroll(true)
    //   this.popupVisible = true
    // },
    // closePopup () {
    //   this.popupVisible = false
    //   this.stopBodyScroll(false)
    // },
    // showMap () {
    //   this.showMapComponent = true
    // },
    handleMyPlayerReady () {
      this.isMyPlayerReady = true
    },
    handleVMapReady () {
      this.showMapComponent = true
    },
    toCompany () {
      if (this.permissions.length && this.permissions.indexOf('admin:company:view') > -1) {
        this.$router.push({ path: '/company' })
      } else {
        Toast({
          message: '权限不足',
          position: 'bottom',
          duration: 5000
        });
      }
    },
    logout () {
      this.$get(`logout/${this.user.id}`).then(() => {
        return new Promise((resolve, reject) => {
          this.$db.clear()
          location.reload()
        })
      }).catch((e) => {
        console.error(e)
        Toast({
          message: '退出系统失败',
          position: 'bottom',
          duration: 5000
        });
      })
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
.m-content {
    &.overflow-line { //作用在同一标签上
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
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
.batchDetail {
  font-size:24px;
  height: 100%;
  overflow: auto;
  position:relative;
  .pad{
    margin-left:0.2rem;
    margin-right:0.2rem;
    margin-top:20px;
  }
}

.inform {
  background: #fdf6ec;
  color: #E6A23C;
  padding: 0.3rem;
  font-size: 0.3rem;
  display: flex;

  .inform-body {
    display: table-cell;
    padding: 0 8px;

    .inform-title {
      font-weight: 700;
    }

    .inform-content {
      margin-top: 0.2rem;
    }
  }
}

.login {
  float: right;
  color:#5A80FF;
}


.icon-eye {
  color: green;
  margin: 0 10px;
}

.icon-Loading {
  color: blue;
  margin: 0 10px;
}

.icon-file-text {
  color: red;
  margin: 0 10px;
}

.icon-report {
  color: green;
  margin: 0 10px;
}

.peizhi {
  width: 90%;
  margin: auto;
  height: 200px;
  overflow: auto;

  div {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }

  h3 {
    height: 2rem;
    line-height: 2.3rem;
    font-size: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  span {
    font-size: 0.38rem;
    color: #888;
    margin-top: 0.3rem;
    display: block;
  }

  p {
    height: 0.55rem;
    color: #888;
  }
}

.goodDetaiSwipe {
  height: 6.5rem;
  img {
    width: 100%;
    height: 6.5rem;
  }
}


.title-line {
  height: 1.2rem;
  line-height: 1.2rem;
  position: relative;
  color:#FF715A;
}
.margin{
  margin-top:20px;
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
    margin-left:30px;
  }
}
.HomeList {
  background-color:#ffffff;
  padding-top:16px;
  border-radius:10px;
  .item{
    width:88px;
    height:88px;
    line-height:88px;
    text-align:center;
    border-radius:50%;
    margin:0 auto;
    img{
      width 60px;
      height:56px;
    }
  }
  .first{
      background: -moz-linear-gradient(top,  #B3CBFF 0%, #5279FF 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#B3CBFF), color-stop(100%,#5279FF));
      background: -webkit-linear-gradient(top,  #B3CBFF 0%,#5279FF 100%);
      background: -o-linear-gradient(top, #B3CBFF 0%,#5279FF 100%);
      background: -ms-linear-gradient(top,  #B3CBFF 0%,#5279FF 100%);
      background: linear-gradient(to bottom, #B3CBFF 0%,#5279FF 100%);
    }
    .second{
      background: -moz-linear-gradient(top,  #9FFFC4 0%, #52D065 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#9FFFC4), color-stop(100%,#52D065));
      background: -webkit-linear-gradient(top,  #9FFFC4 0%,#52D065 100%);
      background: -o-linear-gradient(top, #9FFFC4 0%,#52D065 100%);
      background: -ms-linear-gradient(top,  #9FFFC4 0%,#52D065 100%);
      background: linear-gradient(to bottom, #9FFFC4 0%,#52D065 100%);
    }
    .third{
      background: -moz-linear-gradient(top,  #F3BCFF 0%, #A943C2 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#F3BCFF), color-stop(100%,#A943C2));
      background: -webkit-linear-gradient(top,  #F3BCFF 0%,#A943C2 100%);
      background: -o-linear-gradient(top, #F3BCFF 0%,#A943C2 100%);
      background: -ms-linear-gradient(top,  #F3BCFF 0%,#A943C2 100%);
      background: linear-gradient(to bottom, #F3BCFF 0%,#A943C2 100%);
    }
    .fourth{
      background: -moz-linear-gradient(top,  #FFEFA9 0%, #FCA727 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#FFEFA9), color-stop(100%,#FCA727));
      background: -webkit-linear-gradient(top,  #FFEFA9 0%,#FCA727 100%);
      background: -o-linear-gradient(top, #FFEFA9 0%,#FCA727 100%);
      background: -ms-linear-gradient(top,  #FFEFA9 0%,#FCA727 100%);
      background: linear-gradient(to bottom, #FFEFA9 0%,#FCA727 100%);
    }
    .text{
      text-align:center;
      padding-top:16px;
      padding-bottom:27px;
    }
}
.introduce{
  .bottom{
    img{
      width:200px;
      height:190px;
      border-radius:10px;
    }
    p{
      padding: 14px 0;
      font-family:STHeiti;
      color:rgba(102,102,102,1);
      border-bottom: 1px solid #DBDBDB;
    }
  }
}
.production{
  .bottom{
    margin-right:30px;
    overflow:hidden;
    p{
      color:rgba(153,153,153,1);
    }
  }
}
.line{
  .bottom{
    position:relative;
    p{
      color:#333333;
      padding:5px;
    }
    img{
      width:156px;
      height:156px;
    }
    .showMore{
      width:180px;
      height:60px;
      background:rgba(91,129,255,1);
      border-radius:30px;
      position:absolute;
      bottom:0;
      right:30px;
      text-align: center;
      line-height: 60px;
      .text{
        font-family:STHeiti;
        color:rgba(255,255,255,1);
      }
    }
  }
}
.vedio{
  .title{
    img{
      width:100px;
    }
    .text{
      font-size:30px;
      font-family:STHeiti;
      color:rgba(91,129,255,1);
    }
  }
  .content{
    padding:20px;
    .shop{
      height:160px;
      background:linear-gradient(180deg,rgba(185,227,251,1) 0%,rgba(80,179,235,1) 100%);
      border-radius:70px;
      margin-top:32px;
      .top,.bottom{
        margin-top:0.1rem;
      }

      .logo{
        width:150px;
        height:auto;
        margin-top:0.12rem;
        float: left;
      }
      img{
        width:200px;
      }
      p{
        font-size:30px;
        font-family:STHeiti;
        color:rgba(255,255,255,1);
        margin-top:0.18rem;
        margin-bottom:0.15rem;
        text-align:center;
        color:#8FC31F;
      }
      .btn{
        width:160px;
        height:58px;
        line-height:58px;
        background:rgba(43,103,158,1);
        border-radius:29px;
        color:#fff;
        text-align:center;
        margin-left:0.6rem !important;
      }
    }
    .buy{
      height:150px;
      position:relative;
      .bg{
        height:150px;
        width: 100%;
        margin-top: 0.2rem;
      }
      .go{
        display:block;
        width:100px;
        height:100px;
        position:absolute;
        top: 40px;
        right: 55px;
        img{
          width:100px;
          height:100px;
        } 
      }
    }
  }
}
</style>
