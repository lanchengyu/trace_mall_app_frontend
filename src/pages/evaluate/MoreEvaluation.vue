<!--  -->
<template>
  <div class="more">
    <Detail-Header title="商品评论"></Detail-Header>
    <div class="container" ref="orderWrapper" :style="{ height: wrapperHeight + 'px' }">
      <div class="btns">
        <div class="btn active" @click="getProductEva()">
          <span>全部</span>
        </div>
        <div
          class="btn"
          v-for="(item,index) in evaluateStatus"
          :key="index"
          :class="{active:i==index}"
          @click="getEvalist(item.status)"
        >
          <span>{{item.lable}}</span>
        </div>
      </div>
      <div class="items">
        <mt-loadmore
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :autoFill="false"
          @bottom-status-change="handleBottomChange"
          ref="loadmore"
        >
          <div class="item" v-for="(item,index) in evalists" :key="index">
            <div class="user">
              <img v-if="item.orderEvaluate[0].icon" :src="item.orderEvaluate[0].icon"/>
              <img v-else src="static/img/tou.jpg" />
              <span>{{item.evaluationMan}}</span>
            </div>
            <div class="time">
              <p>{{item.evaluationTime}}</p>
            </div>
            <div class="value">
              <p>{{item.evaluationDescription}}</p>
              <ImgsShow class="imgShow" :imgs="item.evaluatingPictures"></ImgsShow>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
    <div class="goodDetailFooter">
      <div class="left">
        <div class="cart" @click="goToCart">
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <div class="collection">
          <div class="collection-box" @click="addCollection()" v-show="!isCollection">
            <i class="iconfont icon-collection"></i>
            <span>收藏</span>
          </div>
          <div class="collection-box" @click="addCollection()" v-show="isCollection">
            <i class="iconfont icon-shoucangxuanzhong1" style="color:#e3211e"></i>
            <span style="color:#e3211e">取消</span>
          </div>
        </div>
        <div class="shop" @click="shareProduct()">
          <i class="iconfont icon-fenxiang"></i>
          <span>分享</span>
        </div>
      </div>
      <div class="right">
        <div class="add">
          <a href="javascript:void(0);" @click="dialogVisible = true">加入购物车</a>
        </div>
        <div class="purchase">
          <a href="javascript:void(0);" @click="goToCart()">立即购买</a>
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addToCart">加入购物车</el-button>
      </div>
    </el-dialog>
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
                  <li @click="toweixin">
                    <i class="iconfont icon-weixindenglu"></i>
                    <div>微信</div>
                  </li>
                  <li @click="topengyouquan">
                    <i class="iconfont icon-pengyouquan"></i>
                    <div>朋友圈</div>
                  </li>
                  <li @click="tozhifubao">
                    <i class="iconfont icon-zhifubao"></i>
                    <div>支付宝</div>
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

<script>
import ImgsShow from "@/components/showImgs/ImgsShow";
import DetailHeader from "@/common/header-four";
import {
  getProductDetail,
  getProductEvaluation,
  deleteProductCollection,
  getProductIdCollection,
  getProductAttrList,
  addProductCollection,
  addProductToCart,
  getMyCart,
  getEvalByCondition
} from "@/api/mallApi";
import { formatDateTime } from "../../utils/formatTime";
import { Toast } from "mint-ui";
import { mapState } from "vuex";
export default {
  name: "MoreEvaluation",
  data() {
    return {
      wrapperHeight: 0,
      footerHeight:30,
      allLoaded: false,
      goodDetail: {},
      selectProductParam: [],
      dialogVisible: false,
      id: "",
      params: {
        pageNum: 1
      },
      // pageNum: 1,
      evalists: {},
      date: "",
      show: false,
      selectProductAttr: [],
      num: 1,
      imgs: [],
      evaluateStatus: [
        {
          status: 0,
          lable: "差评"
        },
        {
          status: 1,
          lable: "中评"
        },

        {
          status: 2,
          lable: "好评"
        },
      ],
      i:2
    };
  },

  components: {
    ImgsShow,
    DetailHeader
  },
  created() {
    var productId = this.$route.query.id;
    this.id = productId;
    getProductDetail(productId).then(res => {
      this.goodDetail = res.data;
      if (this.goodDetail.productAttributeCategoryId) {
        //  获取商品规格列表
        this.getProductAttr(0, this.goodDetail.productAttributeCategoryId);
        //  获取商品参数列表
        this.getProductAttr(1, this.goodDetail.productAttributeCategoryId);
      }
    });
    this.getProductEva();
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.orderWrapper.getBoundingClientRect().top+this.footerHeight;
    });
  },
  computed: {
    ...mapState({
      collections: state => state.collections
    }),
    isCollection() {
      if (this.collections) {
        if (this.collections.indexOf(this.goodDetail.id) !== -1) return true;
      }
      return false;
    }
  },

  methods: {
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
          // console.log("sku0",sku);
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
    getProductEva() {
      //给全部的那个按钮加上active
      
      let params = { pageNum: this.params.pageNum, id: this.id };
      getProductEvaluation(params).then(res => {
        let data = res.data;
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluationTime = formatDateTime(
            data.list[i].evaluationTime
          );
        }
        //将图片转换为数组 赋值给imgs
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluatingPictures = data.list[
            i
          ].evaluatingPictures.split(",");
        }
        this.evalists = data.list;
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
      });
    },
    loadBottom() {
      // 上拉加载
      var params = {
        pageNum: this.params.pageNum + 1,
        id: this.id
      };
      getProductEvaluation(params).then(res => {
        let data = res.data;
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluationTime = formatDateTime(
            data.list[i].evaluationTime
          );
        }
        //将图片转换为数组 赋值给imgs
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluatingPictures = data.list[
            i
          ].evaluatingPictures.split(",");
        }
        this.evalists = this.evalists.concat(data.list);
        this.params.pageNum = data.pageNum;
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
    getEvalist(status) {
      this.i=status;
      let params = { pageNum: this.pageNum, id: this.id, status: status };
      getEvalByCondition(params).then(res => {
        let data = res.data;
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluationTime = formatDateTime(
            data.list[i].evaluationTime
          );
        }
        //将图片转换为数组 赋值给imgs
        for (var i = 0; i < data.list.length; i++) {
          data.list[i].evaluatingPictures = data.list[
            i
          ].evaluatingPictures.split(",");
        }
        this.evalists = data.list;
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
      });
    },
    //返回上一级
    fanhui: function() {
      this.$router.go(-1);
    },
    goToCart() {
      this.$router.push({ path: "/cart" });
    },
    shareProduct() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    toweixin() {
      Toast("该功能还在开发中");
    },
    topengyouquan() {
      Toast("该功能还在开发中");
    },
    tozhifubao() {
      Toast("该功能还在开发中");
    }
  }
};
</script>
<style lang="stylus" scoped>
.more {
  color: #555;
  height: 100%;

  .container {
    padding: 0.5rem;
    overflow: auto;
    height: calc(100% - 3rem);
    background-color: #FFF;

    .btns {
      font-size: 0.3rem;

      .btn {
        border: 2px solid #e6e6e6;
        display: inline-block;
        padding: 0.1rem 0.2rem;
        border-radius: 25px;
        margin-right: 0.2rem;
        color: #939393;
      }

      .btn.active {
        color: #FE5A00;
        border: 2px solid #FE5A00;
      }
    }

    .items {
      .item {
        font-size: 0.4rem;
        margin-top: 1rem;
        margin-bottom: 0.2rem;

        .user {
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 20px;
          }

          span {
            color: #555555;
          }
        }

        .time {
          color: #999;
          font-size: 0.35rem;
          margin-left: 60px;
        }

        .value {
          padding-top: 23px;

          p {
            font-size: 0.35rem;
          }

          .imgShow {
            margin-top: 23px;
          }
        }
      }
    }
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
}

.boxbox {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  bottom: 0;
  z-index: 9999;
}

.layer {
  width: 100%;
  height: 12rem;
  background: white;
  position: fixed;
  bottom: 0;
  z-index: 2;
  border-radius: 20px 20px 0 0;

  .layer-box {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;

    .layer-box-left {
      width: 10%;
      height: 100%;
      float: left;
    }

    .layer-box-in {
      width: 80%;
      height: 100%;
      font-size: 0.42rem;
      float: left;
      text-align: center;
    }

    .layer-box-right {
      width: 10%;
      height: 100%;
      float: left;

      i {
        font-size: 0.4rem;
      }
    }
  }

  .layer-box-1 {
    height: 9rem;
    overflow: scroll;
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
    width: 100%;
    height: 1.5rem;
    border-top: 1px solid #eee;
    position: absolute;
    bottom: 0;

    div {
      width: 95%;
      height: 0.89rem;
      line-height: 0.89rem;
      display: block;
      text-align: center;
      margin: 0.25rem auto;
      background: #20C972;
      border-radius: 30px;
      color: white;
      font-size: 0.35rem;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter, .fade-leave-active {
  transform: translateY(100%);
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