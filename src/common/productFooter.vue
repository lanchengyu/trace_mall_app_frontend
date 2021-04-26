<!--  -->
<template>
  <div class="container">
    <div class="goodDetailFooter">
      <div class="left">
        <div class="cart" @click="goToCart">
          <!-- <div class="cartlength">{{cartlength}}</div> -->
          <i class="iconfont icon-gouwuche"></i>
          <span>购物车</span>
        </div>
        <div class="collection">
          <div class="collection-box" @click="addCollection()" v-show="!isCollection">
            <i class="iconfont icon-collection"></i>
            <span>收藏</span>
          </div>
          <div class="collection-box" @click="addCollection()" v-show="isCollection">
            <i class="iconfont icon-shoucangxuanzhong1" style="color:red"></i>
            <span style="color:red">取消</span>
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
  </div>
</template>

<script>
import {getProductDetail} from "@/api/mallApi"
export default {
  data() {
    return {
      dialogVisible: false,
      sku: null,
      selectProductAttr: [],
      goodDetail: {},
    };
  },

  components: {},

  computed: {
    ...mapState({
      carts: state => state.carts,
      collections: state => state.collections
    })
  },
    created(){
        //获取商品id
            getProductDetail(id).then(res => {
      this.goodDetail = res.data;
      if (this.goodDetail.productAttributeCategoryId) {
        //  获取商品规格列表
        this.getProductAttr(0, this.goodDetail.productAttributeCategoryId);
        //  获取商品参数列表
        this.getProductAttr(1, this.goodDetail.productAttributeCategoryId);
      }
    });
    },
  methods: {
    isCollection() {
      if (this.collections) {
        if (this.collections.indexOf(this.goodDetail.id) !== -1) return true;
      }
      return false;
    },
    goToCart() {
      this.$router.push({ path: "/cart" });
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
        // console.log(cartItem.price)
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
    shareProduct() {
      this.show = true;
      // Toast("该功能还在开发中");
    }
  }
};
</script>
<style lang="stylus" scoped>
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
</style>