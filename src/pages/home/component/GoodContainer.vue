<template>
  <div class="main">
    <ul>
      <li v-for="(product, index) in productList"
          :key="index" style="position:relative;" class="li">
        <div class="list">
          <div class="image"  @click="open(product.id)">
            <img :src="product.pic"
                 alt="图片">
          </div> 
          <el-row class="row"><p class="name">{{product.name}}</p></el-row>
          <el-row class="row">
            <el-col :span="20">
              <span class="price">¥{{product.price}}</span>
            </el-col>
            <el-col :span="4" class="cart-el">
              <img class="cart" src="static/img/cart1.png"/>
              <!-- <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
                <img class="add_img_js" v-if="addShow1" src="static/img/cart1.png" alt="">
              </transition> -->
            </el-col>
          </el-row>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast} from "mint-ui";
import {addProductToCart,getProductDetail,getMyCart} from '@/api/mallApi'
export default {
  name: "GoodContainer",
  props: {
    productList: Array
  },
  data () {
    return {
      goodDetail: {},
      num: 1,
      sku: null,
      addShow1: false
    };
  },
  methods: {
    open: function (id) {
      this.$router.push({ path: "/goodDetail", query: { id: id } });
    },
    addToCart(id,index){
      this.addShow1 = true
      getProductDetail(id).then(res => {
        this.goodDetail = res.data
              let cartItem = {
              productId: this.goodDetail.id,
              quantity: this.num,
              price: this.goodDetail.price,
              productPic: this.goodDetail.pic,
              productName: this.goodDetail.name,
              productSubTitle: this.goodDetail.subTitle,
              productCategoryId: this.goodDetail.productCategoryId,
              productBrand: this.goodDetail.brandName,
            }
          addProductToCart(cartItem).then(res => {
            Toast('加入购物车成功');
            this.dialogVisible = false;
            getMyCart().then(res => {
              this.$store.dispatch('setCart', res.data);
            })
          }).catch(res=>{
            Toast('加入购物车失败');
          });
      })
    },
      // 动画钩子函数
      // 进入前状态
      // beforeEnter (el) {
      //   el.style.left = '0'
      //   el.style.top = '0'
      //   el.style.transform = 'scale(1)'
      // },
      // 进入中
      // enter (el, done) {
      //   // 需要调用元素的offset操作,才有过渡的效果,否则会马上实现过渡
      //   el.offsetWidth
      //   el.style.left = '100px'
      //   el.style.top = '190px'
      //   el.style.transform = 'scale(.5)'
      //   done()
      // },
      // 进入后
      // afterEnter () {
      //   this.addShow1 = false
      // }
  }
};
</script>

<style lang="stylus" scoped>
.list {
  .row{
    margin:10px;
  }
 
}

ul {
  overflow: hidden;
  li {
    list-style: none;
    background: white;
    float: left;
    width: 48%;
    margin:1%;
    border-radius: 30px;
  }
}

.price {
  font-size: 28px;
  color: #FE3301;
  padding-left:12px;
}

.cart{
  width:56px;
  height:56px;
}
.name {
  height: 0.5rem;
  line-height: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  font-weight: 800;
  padding-left:12px;
  color:#666666;
}

.image {
  overflow: hidden;
  height: 3.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    height: 3.3rem;
  }
}
.cart-el{
  .add_img_js {
    width: 100px;
    position: absolute;
    left: 0;
    top: 0;
    transition: all 1s;
  }
}

</style>