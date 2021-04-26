<template>
  <div class="goodDetail" id="transitionName" style="background-color:#999">
    <Detail-Header title="商品详情"></Detail-Header>
    <div class="mainContainer" v-if="goodDetail">    
      <div class="goodDetaiSwipe">
        <mt-swipe :auto="0" :show-indicators="false">
            <!-- <mt-swipe-item v-if="goodDetail.url!=''">
              <my-player @ready="handleMyPlayerReady" :source="goodDetail.url"></my-player>
            </mt-swipe-item> -->
            <mt-swipe-item v-for="(item, index) in homeSwipe" :key="index">
              <img :src="item" alt="图片" />
              <div class="btn-swip">{{index+1}}/{{homeSwipe.length}}</div>
            </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="goodDetailMain">
        <div class="goodDetailPaid">￥{{goodDetail.price}}</div>
        <div class="goodTitle">
          <div class="brandName" v-show="goodDetail.brandName">{{goodDetail.brandName}}</div>
          <div class="subTitle">{{goodDetail.subTitle}}</div>
        </div>
        <div class="goodDetailColor">{{goodDetail.color}}</div>
      </div>
      <div class="delivery-place">
        <!-- <div class="my-cell">
          <span>发货</span>
          <i class="iconfont icon-weibiaoti-"></i>
          <span>{{selectProductParam[4].value}}</span>
        </div> -->
        <div class="my-cell">
          <span>供货</span>
          <span>供应商直发</span>
        </div>
      </div>
      <Detail-Layer></Detail-Layer>
      <div class="params" @click="showParams=!showParams">
        <div class="params-con">
          <span>参数</span>
          <span>生产日期 产地</span>
        </div>
        <div class="params-rigth">
          <i class="iconfont icon-youjiantou"></i>
        </div>
      </div>
      <div class="evaluation" v-if="evalists&&evalists.total>0">
        <div class="head">
          <div class="left">用户评价(<span>{{evalists.total}}</span>)</div>
          <div class="right"><router-link :to="{path:'/evaluate-more', query:{id:productId}}" style="color:#FE5A00;">查看全部<i class="iconfont icon-youjiantou"></i></router-link></div>
        </div>
        <div class="item">
          <div class="user">
            <img v-if="evalists.list[0].orderEvaluate[0].icon" :src="evalists.list[0].orderEvaluate[0].icon"/>
            <img v-else src="static/img/tou.jpg" />
            <span>{{evalists.list[0].evaluationMan}}</span>
          </div>
          <div class="value">
            <p>{{evalists.list[0].evaluationDescription}}</p>
          </div>
        </div>
      </div>
      <div class="evaluation" v-else>
        <div class="head">
          <div class="left">用户评价(<span>0</span>)</div>
          <div class="right"><router-link to="" style="color:#FE5A00;">查看全部<i class="iconfont icon-youjiantou"></i></router-link></div>
        </div>
        <div class="item">
          <div class="value">
            <p>还没有用户对该宝贝进行评价哦</p>
          </div>
        </div>
      </div>
      <div class="goodDetailBox">
        <mt-navbar v-model="selected">
          <mt-tab-item id="tab-container1">溯源详情</mt-tab-item>
          <mt-tab-item id="tab-container3">商品介绍</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="tab-container1">
            <div class="peizhi" v-html="goodDetail.detailMobileHtml"></div>
          </mt-tab-container-item>

          <mt-tab-container-item id="tab-container3">
            <div class="peizhi description" v-html="goodDetail.description"></div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <div class="goodDetailFooter">
      <div class="left">
        <div class="cart" @click="goToCart">
          <!-- <div class="cartlength">{{cartlength}}</div> -->
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <div class="collection">
          <div class="collection-box" @click="addCollection()" v-show="!isCollection">
            <i class="iconfont icon-shoucang"></i>
            <span>收藏</span>
          </div>
          <div class="collection-box" @click="addCollection()" v-show="isCollection">
            <i class="iconfont icon-shoucangxuanzhong1" style="color:#e3211e;"></i>
            <span style="color:#e3211e;">取消</span>
          </div>
        </div>
        <div class="shop" @click="shareProduct()">
          <i class="iconfont icon-shouye-weixuanzhong"></i>
          <span>首页</span>
        </div>
      </div>
      <div class="right">
        <div class="add">
          <a href="javascript:void(0);" @click="dialogVisible = true">加入购物车</a>
        </div>
        <div class="purchase">
          <a href="javascript:void(0);" @click="dialogVisible = true">立即购买</a>
        </div>
      </div>
    </div>
    <el-dialog class="select-dialog" :visible.sync="dialogVisible" width="80%">
      <div v-if="selectProductAttr.length>0">
        <div class="top-info" v-if="sku">
          <img :src="sku.pic" alt="图片" />
          <p class="name">{{goodDetail.name}}</p>
          <p class="sku-price">￥{{sku.price}}</p>
        </div>
        <div class="nosku" v-else>所选商品暂时无货，请重选</div>
        <div class="dialog-attr" v-for="(item, index) in selectProductAttr" :key="index">
          <p>{{item.name}}</p>
          <el-radio-group @change="handleRadioChange" v-model="item.value" size="mini">
            <el-radio-button border v-for="(value, x) in item.values" :key="x" :label="value"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div v-else>
        <div class="top-info">
          <img :src="goodDetail.pic" alt="图片" />
          <p class="name">{{goodDetail.name}}</p>
          <p class="sku-price">￥{{goodDetail.price}}</p>
        </div>
      </div>
      <div class="num">
        <span class="text">数量：</span>
        <el-input-number v-model="num" class="number" :min="1" :max="10000" size="small"></el-input-number>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="addToCart">加入购物车</el-button>
        <el-button type="primary" @click="buyProducts">立即购买</el-button>
      </div>
    </el-dialog>
    <div>
      <transition name="fade">
        <div class="boxbox" v-show="showParams" @click="closeParams">
          <div class="layer">
            <div class="layer-box">
              <div class="layer-box-left"></div>
              <div class="layer-box-in">产品参数</div>
            </div>
            <div class="layer-box-1">
              <div class="item" v-for="(item, index) in selectProductParam" :key="index">
                <span>{{item.name}}</span>
                <span>{{item.value}}</span>
              </div>
            </div>
            <div class="layer-box-button">
              <div>完成</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div>
      <transition name="fade">
        <div class="boxbox" v-show="show" @click="close">
          <div class="layer">
            <div class="layer-box">
              <div class="layer-box-left"></div>
              <div class="layer-box-in"></div>
            </div>
            <div class="layer-box-1">
              <div class="layer-box-1-1">
                <ul>
                  <li @click="toWeixin">
                    <i class="iconfont icon-weixindenglu"></i>
                    <div>微信</div>
                  </li>
                  <li @click="toMoments">
                    <i class="iconfont icon-pengyouquan"></i>
                    <div>朋友圈</div>
                  </li>
                  <li @click="tozhifubao">
                    <i class="iconfont icon-zhifubao"></i>
                    <div>选择照片</div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="layer-box-button" @click="close">
              <div class="cancel">取消</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script >
import {
  Toast,
  MessageBox,
  Navbar,
  TabItem,
  TabContainer,
  TabContainerItem
} from "mint-ui";
import { mapState, mapMutations } from "vuex";
import DetailHeader from "@/common/header-four";
import DetailLayer from "./component/DetailLayer";
import ShareLayer from "./component/ShareLayer";
import ImgsShow from "@/components/showImgs/ImgsShow";
import wxApi from "@/utils/wxApi"
import {
  getProductDetail,
  getProductAttrList,
  addProductToCart,
  getMyCart,
  addProductCollection,
  deleteProductCollection,
  getProductIdCollection,
  getProductEvaluation,
  generateOrderByProduct
} from "@/api/mallApi";
export default {
  name: "GoodDetail",
  data() {
    return {
      productId:'',
      active: "1",
      goodDetailHeader: "商品详情",
      selected: "tab-container1",
      goodDetail: {},
      dialogVisible: false,
      selectProductParam: [],
      selectProductAttr: [],
      num: 1,
      sku: null,
      show: false,
      showParams:false,
      params: {
        pageNum: 1
      },
      pageNum:1,
      evalists:[],
      isMyPlayerReady:false
    };
  },
  components: {
    DetailHeader,
    DetailLayer,
    ShareLayer,
    ImgsShow,
    MyPlayer: resolve => require(['@/components/video/MyPlayer'], resolve)
  },
  computed: {
    ...mapState({
      carts: state => state.carts,
      collections: state => state.collections,
      user:state=>state.MALL_USER
    }),
    isCollection() {
      if (this.collections) {
        if (this.collections.indexOf(this.goodDetail.id) !== -1) return true;
      }
      return false;
    },
    cartlength() {
      if (this.carts) return this.carts.length;
      return 0;
    },
    homeSwipe() {
      if (this.goodDetail) {
        if (this.goodDetail.albumPics) {
          return this.goodDetail.albumPics.split(",");
        }
      }
      return [];
    }
  },
  mounted(){
    wxApi.wxRegister(this.wxRegCallback);
  },
  created() {
    var id = this.$route.query.id;
    this.productId=id;
    this.$nextTick(function(){
      getProductDetail(id).then(res => {
        this.goodDetail = res.data;
        if (this.goodDetail.productAttributeCategoryId) {
          //  获取商品规格列表
          this.getProductAttr(0, this.goodDetail.productAttributeCategoryId);
          //  获取商品参数列表
          this.getProductAttr(1, this.goodDetail.productAttributeCategoryId);
        }
      });
      let params={pageNum:this.pageNum,id:id};
        getProductEvaluation(params).then(res=>{
          this.evalists=res.data;
      });
    })
  },
  methods: {
    wxRegCallback(){
      this.wxShareAppMessage();
      this.wxShareTimeline();
    },
    wxShareTimeline () {
      // 微信自定义分享到朋友圈
      let option = {
        title: '九农仓溯源商城', // 分享标题, 请自行替换
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'http://hnst888.com/mp/logo4.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
        },
        error: () => {
        }
      }
      // 将配置注入通用方法
      wxApi.ShareTimeline(option)
    },
    wxShareAppMessage () {
      // 微信自定义分享给朋友
      let option = {
        title: '九农仓溯源商城', // 分享标题, 请自行替换
        desc: '我给你分享了【九农仓溯源商城】中的商品，每一个产品进行深度溯源，让您吃的安心，吃的放心', // 分享描述, 请自行替换
        link: window.location.href, // 分享链接，根据自身项目决定是否需要split
        imgUrl: 'http://hnst888.com/mp/logo4.png', // 分享图标, 请自行替换，需要绝对路径
        success: () => {
        },
        error: () => {
        }
      }
      // 将配置注入通用方法
      wxApi.ShareAppMessage(option)
    },
    wxChooseImage(){
      let option={
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success:(res)=>{
          alert(res)
          alert(res.localIds)
        }
      }
      wxApi.ChooseImage(option);
    },
    handleMyPlayerReady () {
      this.isMyPlayerReady = true
    },
    getProductEva(id){
      let params={pageNum:this.pageNum,id:id};
        getProductEvaluation(params).then(res=>{
          this.evalists=res.data;
        });
    },
    getProductAttr(type, cid) {
      let param = { pageNum: 1, pageSize: 100, type: type };
      getProductAttrList(cid, param).then(response => {
        let list = response.data.list;
        if (type === 0) {
          this.selectProductAttr = [];
          for (let i = 0; i < list.length; i++) {
            let values = this.getAttrValues(i);
            this.selectProductAttr.push({
              id: list[i].id,
              name: list[i].name,
              values: values,
              value: values[0]
            });
          }
          this.handleRadioChange();
        } else {
          this.selectProductParam = [];
          for (let i = 0; i < list.length; i++) {
            let value = null;
            value = this.getParamValue(list[i].id);
            this.selectProductParam.push({
              id: list[i].id,
              name: list[i].name,
              value: value
            });
          }
        }
      });
    },
    //获取属性值
    getAttrValues(index) {
      let values = [];
      if (index === 0) {
        for (let i = 0; i < this.goodDetail.skuStockList.length; i++) {
          let sku = this.goodDetail.skuStockList[i];
          if (sku.sp1 != null && values.indexOf(sku.sp1) === -1) {
            values.push(sku.sp1);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < this.goodDetail.skuStockList.length; i++) {
          let sku = this.goodDetail.skuStockList[i];
          // console.log("sku1",sku);
          if (sku.sp2 != null && values.indexOf(sku.sp2) === -1) {
            values.push(sku.sp2);
          }
        }
      } else {
        for (let i = 0; i < this.goodDetail.skuStockList.length; i++) {
          let sku = this.goodDetail.skuStockList[i];
          // console.log("sku2",sku);
          if (sku.sp3 != null && values.indexOf(sku.sp3) === -1) {
            values.push(sku.sp3);
          }
        }
      }
      return values;
    },
    //获取参数的值
    getParamValue(id) {
      for (
        let i = 0;
        i < this.goodDetail.productAttributeValueList.length;
        i++
      ) {
        if (
          id === this.goodDetail.productAttributeValueList[i].productAttributeId
        ) {
          return this.goodDetail.productAttributeValueList[i].value;
        }
      }
    },
    handleRadioChange() {
      let selectSku = null;
      for (let i = 0; i < this.goodDetail.skuStockList.length; i++) {
        let sku = this.goodDetail.skuStockList[i];
        let flag = true;
        for (let j = 0; j < this.selectProductAttr.length; j++) {
          if (!this.selectProductAttr[j].value) {
            this.$message("请选择" + this.selectProductAttr[j].name);
            return;
          }
          if (sku["sp" + (j + 1)] !== this.selectProductAttr[j].value) {
            flag = false;
            break;
          }
        }
        if (flag) {
          selectSku = sku;
          break;
        }
      }
      this.sku = selectSku;
    },
    buyProducts() {
      let item={
        cartItem:''
      }
      let arr=[];
      let productItem;
      if(this.selectProductAttr.length > 0){
        if (!this.sku || this.sku.stock < this.num) {
          Toast("库存不足,加入购物车失败");
          return;
        }
        productItem={
          productId:this.goodDetail.id,
          productSkuId:this.sku.id,
          quantity:this.num,
          price:this.sku.price,
          sp1:this.sku.sp1,
          sp2:this.sku.sp2,
          sp3: this.sku.sp3,
          productPic:this.goodDetail.pic,
          productName:this.goodDetail.name,
          productSubTitle:this.goodDetail.subTitle,
          productSkuCode:this.sku.skuCode,
          productCategoryId: this.goodDetail.productCategoryId,
          productBrand:this.goodDetail.brandName,
          productSn:this.goodDetail.productSn,
          productAttr:""
        }
      }else{
        productItem={
          productId:this.goodDetail.id,
          quantity:this.num,
          price:this.sku.price,
          productPic:this.goodDetail.pic,
          productName:this.goodDetail.name,
          productSubTitle:this.goodDetail.subTitle,
          productCategoryId: this.goodDetail.productCategoryId,
          productBrand:this.goodDetail.brandName,
          productSn:this.goodDetail.productSn,
          productAttr:""
        }
      }
      arr.push(productItem);
      item.cartItem=arr;
      generateOrderByProduct(item).then(res=>{
        let data=res.data;
        this.$router.push({path:'/order/submitOrder',query:{data:data}});
      })
    },
    addToCart() {
      let cartItem;
      if (this.selectProductAttr.length > 0) {
        if (!this.sku || this.sku.stock < this.num) {
          Toast("库存不足,加入购物车失败");
          return;
        }
        cartItem = {
          productId: this.goodDetail.id,
          productSkuId: this.sku.id,
          quantity: this.num,
          price: this.sku.price,
          sp1: this.sku.sp1,
          sp2: this.sku.sp2,
          sp3: this.sku.sp3,
          productPic: this.goodDetail.pic,
          productName: this.goodDetail.name,
          productSubTitle: this.goodDetail.subTitle,
          productSkuCode: this.sku.skuCode,
          productCategoryId: this.goodDetail.productCategoryId,
          productBrand: this.goodDetail.brandName
        };
      } else {
        cartItem = {
          productId: this.goodDetail.id,
          quantity: this.num,
          price: this.goodDetail.price,
          productPic: this.goodDetail.pic,
          productName: this.goodDetail.name,
          productSubTitle: this.goodDetail.subTitle,
          productCategoryId: this.goodDetail.productCategoryId,
          productBrand: this.goodDetail.brandName
        };
      }
      addProductToCart(cartItem).then(res => {
        Toast("加入购物车成功");
        this.dialogVisible = false;
        getMyCart().then(res => {
          this.$store.dispatch("setCart", res.data);
        });
      });
    },
    addCollection() {
      if (this.isCollection) {
        deleteProductCollection(this.goodDetail.id).then(res => {
          Toast("取消收藏成功");
          getProductIdCollection().then(res => {
            this.$store.dispatch("setGoods", res.data);
          });
        });
      } else {
        var data = {
          productId: this.goodDetail.id,
          productName: this.goodDetail.name,
          productPic: this.goodDetail.pic,
          productSubTitle: this.goodDetail.subTitle,
          productPrice: this.goodDetail.price
        };
        addProductCollection(data).then(res => {
          Toast("收藏成功");
          getProductIdCollection().then(res => {
            this.$store.dispatch("setGoods", res.data);
          });
        });
      }
    },
    //返回上一级
    fanhui: function() {
      this.$router.go(-1);
    },
    goToCart(){
       this.$router.push({ path: "/cart" });
    },
    shareProduct() {
      this.$router.push({path:"/home"});
      // this.show = true;
      // Toast("该功能还在开发中");
    },
    close() {
      this.show = false;
    },
    closeParams(){
      this.showParams=false;
    },
    toWeixin() {
      //分享到微信好友
      wxApi.wxRegister(this.wxAppMessageCallback);
    },
    toMoments() {
      //分享到朋友圈
      wxApi.wxRegister(this.wxTimelineCallback);
    },
    tozhifubao() {
      wxApi.wxRegister(this.wxChooseImage);
      // Toast("该功能还在开发中");
    }
  }
};
</script>

<style lang="stylus" scoped>
.goodDetail {
  height: 100%;
  background-color: #888;
  font-family: 'Helvetica';
}

.mainContainer {
  height: calc(100% - 2.65rem);
  background: white;
  overflow: auto;
}

.peizhi >>> img {
  width: 100%;
}

.description {
  text-indent: 2em;
  color: #888;
}

.peizhi {
  margin: 0.5rem 0.25rem;
  font-size: 0.35rem;

  div {
    margin-bottom: 0.2rem;
  }

  .name {
    font-size: 0.38rem;
    color: #888;
  }

  .value {
    font-size: 0.38rem;
    color: #888;
  }
}

.delivery-place {
  border-bottom: 0.3rem solid #f4f4f4;

  .my-cell {
    font-size: 30px;
    line-height: 1.3rem;
    height: 1.3rem;
    border: none;
    color: #555555;

    i {
      margin-left: 10px;
      color: #555555;
      font-size: 40px;
      text-align: center;
      display: inline-block;
    }

    span {
      display: inline-block;
      padding-left: 23px;
    }

    span:nth-child(1) {
      color: #969696;
    }
  }
}

  .params{
    width: 100%;
    height: 1.58rem;
    line-height:1.58rem;
    border-bottom: 0.3rem solid #f4f4f4;
     .params-con {
      float: left;
      line-height: 1.28rem;
      height: 1.28rem;
      span{
        display: inline-block;
        padding-left: 23px;
        font-size:30px;
      }
      span:nth-child(1) {
        color: #969696;
      }
    }
    .params-rigth {
      float: right;
      margin-right: 0.5rem;
      line-height: 1.28rem;
      height: 1.28rem;
      font-size: 0.34rem;
    }
  }
  .evaluation{
    padding:36px 23px;
    color:#555;
    .head{
      font-size:0.4rem;
      overflow: hidden;
      .left{
        float: left;
      }
      .right{
        text-align:right;
        color:#FE5A00;
      }
    }
    .item{
      font-size:0.4rem;
      padding-top:23px;
      .user{
        img{
          width:40px;
          height:40px;
          border-radius:50%;
          margin-right:20px;
        }
        span{
          color:#969696;
        }
      }
      .value{
        padding-top:23px;
        p{
          font-size:0.35rem;
        }
        .imgShow{
          margin-top:23px;
        }
      }
    }
  }

.select-dialog {
  .num {
    margin: 0 0.2rem;
  }

  .nosku {
    text-align: center;
    color: #FFC107;
    height: 100px;
    line-height: 100px;
  }

  .top-info {
    text-align: center;

    img {
      max-width: 80%;
      height: 100px;
    }

    .name {
      margin-top: 0.2rem;
    }

    .sku-price {
      font-size: 0.5rem;
      color: red;
    }
  }

  >>> .el-dialog__body {
    padding: 0;
  }

  .dialog-attr {
    p {
      margin-left: 0.2rem;
      color: gray;
    }

    label {
      margin: 0.2rem;

      >>> .el-radio-button__inner {
        border-left: 1px solid #DCDFE6;
        border-radius: 4px;
      }
    }
  }

  .number {
    margin: 0.2rem;
  }

  .dialog-footer {
    text-align: center;
  }
}

.cartlength {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 1px;
  left: 30px;
  background: #f81301;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  color: white;
  font-size: 20px;
}

.goodDetailHeader {
  width: 100%;
  z-index: 1;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 12px;
  background: white;
  position: fixed;
  box-shadow: 0 0 10px #cecece;
  text-align: center;
  font-size: 0.41rem;
}

.goodDetailHeader i {
  display: block;
  float: left;
  height: 50px;
  padding-left: 0.3rem;
  font-size: 0.71rem;
  color: black;
}

.goodDetaiSwipe {
  height: 8rem;
  background: white;
  position:relative;
  .btn-swip{  
    padding:0.1rem 0.25rem;
    border-radius:0.25rem;
    background-color:#333;
    opacity: 0.6;
    -moz-opacity:0.6;   
    -khtml-opacity: 0.6;  
    color:#fff;
    z-index:999;
    position:absolute;
    bottom:0.5rem;
    right:0.5rem;
  }
}

.goodDetaiSwipe img {
  width: 100%;
  height:100%;
  display: block;
  margin: auto;
}

.goodDetailMain {
  background: white;
  border-bottom: 0.3rem solid #f4f4f4;
  padding: 0.4rem;
  margin-top: -15px;
}

.goodDetailName {
  color: black;
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1rem;
}

.goodTitle {
  overflow: hidden;
  font-family: 'Helvetica';
  .brandName {
    background: -moz-linear-gradient((left), #F41E10 0%, #FE612E 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#F41E10), color-stop(100%,#FE612E));
    background: -webkit-linear-gradient(left, #F41E10 0%,#FE612E 100%);
    background: -o-linear-gradient(left, #F41E10 0%,#FE612E 100%);
    background: -ms-linear-gradient(left, #F41E10 0%,#FE612E 100%);
    background: linear-gradient(to right,#F41E10 0%,#FE612E 100%);
    color:#fff;
    font-size: 0.30rem;
    padding:0 4px;
    height:33px;
    line-height:33px;
    border-radius: 4px;
    color: #fff;
    float: left;
    margin-right: 15px;;
    margin-top:9px;
  }

  .subTitle {
    font-size: 35px;
    color: #333;
    font-weight: 600;
    width: 90%;
  }
}

.goodDetailPaid {
  color: #FD6501;
  font-size: 0.82rem;
  margin-top: 0.1rem;
  font-family: 'Helvetica';
}

.goodDetailFooter {
  position: fixed;
  width: 100%;
  bottom: 0rem;
  height: 1.3rem;
  background: #F6F4F7;
  border-top: 1px solid #efefef;

  .left {
    width: 40%;
    float: left;
    position: relative;
    font-size: 0.35rem;

    .cart {
      .icon-gouwuche {
        font-size: 0.7rem;
      }
    }

    .cart, .shop, .collection {
      width: 33%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      float: right;
      position: relative;

      i {
        font-size: 0.5rem;
        line-height: 0.5rem;
        display: block;
        text-align: center;
        margin-top: 0.12rem;
        margin-bottom: 0.08rem;
        color: #767676;
      }

      span {
        text-align: center;
        font-size: 0.3rem;
        line-height: 0.5rem;
        color: #767676;
        margin-bottom: 0.1rem;
      }
    }

    .collection-box {
      text-align: center;
    }
  }

  .right {
    width: 60%;
    float: right;

    .add {
      a {
        display: block;
        width: 50%;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        background: #FF9800;
        color: white;
        float: left;
        font-size: 0.4rem;
        font-weight: 700;
        letter-spacing: 2px;
      }
    }

    .purchase {
      a {
        float: left;
        display: block;
        width: 50%;
        height: 1.3rem;
        line-height: 1.3rem;
        text-align: center;
        color: white;
        background: #E3211E;
        font-size: 0.4rem;
        font-weight: 700;
        letter-spacing: 2px;
      }
    }
  }
}

.gooDetailNumber {
  display: none;
}

.add a {
}

.goodDetailImg {
  margin-top: 4px;
  margin-bottom: 6px;
}

.goodDetailImg img {
  width: 100%;
  height: auto;
  display: block;
}

.goodDetailColor {
  display: none;
}

.layer {
  .layer-box-1 {
    height:9rem;
    overflow:scroll;
    padding-bottom: 0.7rem;
    .layer-box-1-1 {
      ul {
        padding: 0.2rem;
        overflow: hidden;

        li {
          list-style: none;
          float: left;
          width: 1.5rem;
          text-align: center;

          i {
            font-size: 1rem;
            display: block;
          }

          div {
            color: #999;
            padding: 0.1rem 0;
          }
        }

        li:nth-child(1) {
          i {
            color: #0fdc1c;
          }
        }

        li:nth-child(2) {
          i {
            color: #00d463;
          }
        }

        li:nth-child(3) {
          i {
            color: #14b6f6;
          }
        }
      }
    }
  }

  .layer-box-button {
    border-top: 1px solid #f4f2f3;

    .cancel {
      width: 100%;
      height: 0.89rem;
      line-height: 0.89rem;
      display: block;
      text-align: center;
      margin: 0.25rem auto;
      background: #fff;
      color: #4c4c4c;
      font-size: 0.35rem;
    }
  }
}

.boxbox{
  .layer-box-1{
    .item{
      border-bottom:1px solid #D8D8D8;
      span{
        display:inline-block;
        padding:0.5rem 0;
        font-size:0.4rem;
      }
      span:nth-child(1){
          width:30%;
          margin-left:4%;
          color:#555555;
      }
      span:nth-child(2){
        width:65%;
        color:#969696;
      }
    }
  }
}

>>>.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #17C169;
  color: #17C169;
}

>>>.mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
  font-size: 0.42rem;
}

.goodDetailBox {
  >>>.mint-tab-item-label {
    font-size: 0.38rem;
  }
}

>>>.el-radio-button__orig-radio:checked+.el-radio-button__inner {
  color: #ffffff;
  background-color: #20C972;
  border-color: #20C972;
  -webkit-box-shadow: -1px 0 0 0 #20C972;
  box-shadow: -1px 0 0 0 #20C972;
}

>>>.el-button--primary {
  color: #FFF;
  background-color: #20C972;
  border-color: #20C972;
}

>>>..el-input-number__decrease:hover, .el-input-number__increase:hover {
  color: #20C972 !important;
}

>>>.el-radio-button__inner {
  white-space: nowrap;
  background: #f7f7f7;
  border: 1px solid #f7f7f7;
}
</style>