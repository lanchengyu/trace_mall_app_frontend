<template>
  <div style="height:100%;">
    <div class="cartMain">
      <div class="cartImg" v-if="!carts.length">
        <el-row :gutter="24">
          <el-col :span="6" :offset="3">
            <div class="empty-img">
              <img src="static/img/cart.png" />
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <p class="empty-text">购物车是空的哦，快去购物吧</p>
              <router-link class="empty-btn" to="/home">逛一逛</router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="header" v-else>
        <div class="header-left"></div>
        <div class="header-in">购物车</div>
        <div class="header-rigth">
          <span @click="manageProduct">{{manageText}}</span>
        </div>
      </div>
      <ul class="cartLists">
        <li v-for="(item,index) in carts" :key="index" class="cartList" @click="toGoodDetail(item.productId)">
          <div class="left" @click="check">
            <input v-model="item.selected" type="checkbox" class="checkbox"/>
            <!-- <input v-model="item.selected"  class="checkbox" type="checkbox" name="color-input-red" value="#f0544d" />
            <label  for="color-input-red"></label > -->
          </div>
          <div class="in">
            <img :src="item.productPic" />
          </div>
          <div class="right">
            <p class="productName">{{item.productName}}</p>
            <p class="deleteBtn">
              <i
                @click="deleteCartProduct(item.id)"
                class="deleteProduct iconfont icon-huishouzhan7"
              ></i>
            </p>
            <p class="top">
              <span class="attr">{{item.sp1}} {{item.sp2}} {{item.sp3}}</span>
            </p>
            <div class="third top">
              <p class="cartPrice">￥{{item.price}}</p>
              <div class="cartNumber">
                <a href="javascript:;" @click="reduce(item)" class="add">-</a>
                <input type="text" v-model="item.quantity" readonly="readonly" />
                <a href="javascript:;" @click="add(item)" class="reduce">+</a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="cartFooter" v-if="carts.length">
      <div class="selectAll">
        <input type="checkbox" @click="checkAll" v-model="checkedAll"/>
        <span>全选</span>
      </div>
      <div class="right"  v-show="!manage">
        <div class="Total">
          总计：
          <span style="font-size: 0.54rem;color:#F95908;">￥{{sumValue}}</span>
        </div>
        <div class="payBtn" v-show="carts.length>0" @click="submitOrder">结算{{carts.length}}</div>
      </div>
      <div class="right"  v-show="manage">
        <div class="delete" @click="deleteCartProducts">删除</div>
      </div>
    </div>
    <Home-Footer></Home-Footer>
  </div>
</template>
<script>
import { Toast, MessageBox } from "mint-ui";
import { mapState, mapMutations } from "vuex";
import { deleteCartProduct, updateQuantity, getMyCart,generateOrderByProduct } from "@/api/mallApi";
import HomeFooter from "@/pages/footer";
import OrderHeader from "@/common/header-five";
export default {
  name: "cart",
  components: {
    HomeFooter,
    OrderHeader
  },
  data() {
    return {
      flag: false,
      checkedAll:false,
      selected: false,
      manage:false,
      manageText:''
    };
  },
  created() {
    this.updateCart();
    if(!this.manage){
      this.manageText='管理'
    }else{
      this.manageText='完成'
    }
  },
  computed: {
    ...mapState({
      carts: state => state.carts
    }),
    sumValue() {
      var sumValue = 0;
      this.carts.forEach(item => {
        if(item.selected){
          sumValue += item.price * item.quantity;
        }
      });
      return sumValue;
    }
  },
  mounted(){
    this.carts.forEach(item=>{
        this.$set(item, "checked", false)
    })
  },
  methods: {
    ...mapMutations(["updateCart"]),
    check(){
      event.stopPropagation();
    },
    deleteCartProduct(id) {
      event.stopPropagation();
      MessageBox.confirm("确定删除该商品么？")
        .then(action => {
          deleteCartProduct(id).then(res => {
            this.updateCart();
          });
        })
        .catch(action => {});
    },
    deleteCartProducts(){
      let deleteNum=0;
      let ids="";
      for(var i=0;i<this.carts.length;i++){
        if(this.carts[i].selected){
          deleteNum++;
          if(i!=this.carts.length-1){
              ids=ids.concat(this.carts[i].id+',');
          }else{
            ids=ids.concat(this.carts[i].id);
          }
        }
      }
      if(deleteNum===0){
        Toast("您还没有选择宝贝哦!");
        return;
      }
      MessageBox.confirm("确定要删除这"+deleteNum+"件商品吗?")
      .then(action=>{
        deleteCartProduct(ids).then(res => {
            this.updateCart();
        });
      })
    },
    add(item) {
      event.stopPropagation();
      let quantity = item.quantity + 1;
      updateQuantity(item.id, quantity).then(res => {
        this.updateCart();
      });
    },
    reduce(item) {
      //阻止click事件冒泡到父元素
      event.stopPropagation();
      if (item.quantity <= 1) {
        Toast("数量最小为1");
        return;
      }
      let quantity = item.quantity - 1;
      updateQuantity(item.id, quantity).then(res => {
        this.updateCart();
      });
    },
    toHome() {
      this.$router.push({ name: "/home/Home" });
    },
    toGoodDetail(id){
      this.$router.push({ path: "/goodDetail", query: { id: id } });
    },
    submitOrder() {
      let item={
        cartItem:''
      }
      let arr=[];
      var baks=$(".cartList .checkbox");
      for(var i=0;i<baks.length;i++){
        if(baks[i].checked){
          arr.push(this.carts[i]);
        }
      }
      item.cartItem=arr;
      if(item.cartItem.length==0){
        Toast("请选择要结算的商品");
        return;
      }
      generateOrderByProduct(item).then(res=>{
        let data=res.data;
        this.$router.push({path:'/order/submitOrder',query:{data:data}});
      })
      // this.$router.push({ name: "SubmitOrder" });
    },
    selectProduct() {
      this.selected = !this.selected;
    },
    checkAll(){
      this.checkedAll=!this.checkedAll;
      this.carts.forEach(item=>{
        item.selected=this.checkedAll;
      })
    },
    manageProduct(){
      if(!this.manage){
        this.manageText='完成';
        this.manage=!this.manage;
      }else{
        this.manageText='管理';
        this.manage=!this.manage;
      } 
    }
  }
};
</script>

<style lang="stylus">
.select {
  float: left;
  margin-top: 1.5rem;
  padding-left: 0.5rem;
}

.select i {
  font-size: 0.53rem;
}

.checkAll {
  width: 24%;
  line-height: 1.18rem;
  float: left;
}

.checkAll i {
  font-size: 0.53rem;
  padding-left: 0.5rem;
}

.cartheader {
  position: fixed;
  width: 100%;
  box-shadow: 0 0 10px #cecece;
  height: 1.3rem;
  line-height: 1.3rem;
  font-size: 0.35rem;
  padding-left: 0.3rem;
  background: white;
  top: 0;
  font-size: 0.41rem;
}

.cartheader i {
  display: block;
  float: left;
  height: 50px;
  font-size: 0.71rem;
  color: black;
  width: 0.9rem;
}

.cartLists {
  margin-top: 20px;
}

.cartList {
  width: 100%;
  background: #fff;
  margin-top: 20px;
  padding: 40px 0 30px 0;
  overflow: hidden;

  .left {
    width: 8%;
    height: 100%;
    float: left;
    margin-left: 2%;
    // input[type=checkbox]{
    //   visibility: hidden;
    // }
  }

  .in {
    width: 32%;
    height: 100%;
    float: left;
    // margin-left:8%;
    text-align: center;

    img {
      width: 164px;
      height: 164px;
    }
  }

  .right {
    width: 58%;
    height: 100%;
    float: left;

    .productName {
      color: #333333;
      font-size: 28px;
      display:inline-block;
    }
    .deleteBtn{
      float:right;
      margin-right: 50px;
      .deleteProduct {
        font-size: 40px;
        color: #F41E10;
      }
    }
  
    .attr {
      background-color: #F9F9F9;
      color: #B1B1B1;
      font-size: 20px;
      padding: 8px;
      margin-top: 33px;
    }

    .third {
      overflow: hidden;

      .cartPrice {
        display: inline-block;
        color: #F95908;
        font-size: 0.5rem;
      }

      .cartNumber {
        float: right;
        margin-right: 50px;
      }
    }
  }
}

.top {
  margin-top: 40px;
}

.cartMain {
  height: calc(100% - 2.68rem);
  overflow: auto;
}

// .cartMain .cart-background{
// width: 100%;
// height: 1.5rem;
// background-color: #F56C6C;
// }
// .cartMain .cart-background p{
// display: block;
// height: 1.5rem;
// line-height: 1.5rem;
// font-size: 0.4rem;
// color: #fff;
// padding-left: 0.3rem;
// }
// .cartMain ul li {
// list-style: none;
// }
// .cartImage img {
// width: 2.6rem;
// height: 2.8rem;
// }
// .cartImage {
// float: left;
// padding: 0.5rem 0.3rem;
// }
// .cartInformation {
// padding:0.2rem 0;
// input[type="checkbox"]{
// visibility:hidden;
// width: 5vw;
// height: 5vw;
// position: absolute;
// top: 18px;
// left: 19px;
// }
// input[type="checkbox"] + label::before {
// content: "\a0";
// display: inline-block;
// width: 5vw;
// height: 5vw;
// margin-right: 4vw;
// margin-left: -2vw;
// border-radius: 5vw;
// background-color: silver;
// text-indent: 0vw;
// line-height: 5.2vw;
// vertical-align: 0vw;
// border:1px solid #cdcdcd;
// background-color:#fff;
// margin-top: 0.1rem;
// }
// img{
// width: 2.0rem;
// height: 2.0rem;
// }
// .iconfont{
// font-size:0.6rem;
// }
// }
// .attr {
// color: gray;
// margin-top: 0.2rem;
// }

// .cartPrice {
// color: red;
// margin-top: 0.2rem;
// font-size: 0.4rem;
// }

// .cartNumber {
// float: left;
// margin-top: 0.3rem;
// }
.cartNumber .add, .cartNumber .reduce {
  display: block;
  width: 0.75rem;
  height: 0.75rem;
  line-height: 0.75rem;
  border: 1px solid #dedede;
  float: left;
  color: #b2b2b2;
  text-align: center;
  font-size: 0.5rem;
}

.cartNumber input {
  width: 0.96rem;
  height: 0.75rem;
  float: left;
  text-align: center;
  border: 1px solid #dedede;
}

.cartNumber .add {
  border-right: none;
}

.cartNumber .reduce {
  border-left: none;
}

.cartFooter {
  position: fixed;
  width: 100%;
  height: 1.45rem;
  line-height: 1.45rem;
  font-size: 0.4rem;
  background: white;
  bottom: 1.45rem;
  display: block;
  border-top: 1px solid #f4f4f4;
  border-bottom: 1px solid #f4f4f4;

  .selectAll {
    float: left;
    color: #CDCDCD;
    margin-left: 2%;

    i {
      font-size: 40px;
      color: #CDCDCD;
    }
  }

  .right {
    margin-right: 0;
    float: right;
    line-height:1.45rem;
    .Total {
      float: left;
      color: #919191;
      text-align: center;
      margin-right: 0.2rem;
    }

    .payBtn {
      float: left;
      background-color: #1DC76F;
      color: #fff;
      padding: 0 80px;
    }
    .delete{
      display:inline-block;
      width:1.9rem;
      height:0.8rem;
      border:2px solid #f41e10;
      text-align:center;
      line-height:0.8rem;
      margin-right:0.4rem;
      border-radius:0.4rem;
      color:#f41e10;
    }
  }
}

.cartImg {
  display: block;
  margin: auto;
  padding-top: 1rem;
}

.cartImg .empty-img img {
  width: 1.6rem;
  height: 1.6rem;
}

.cartImg .empty-text {
  font-size: 0.35rem;
  color: #888888;
}

.cartImg .empty-btn {
  margin-top: 0.5rem;
}

.cartImg a {
  display: block;
  text-align: center;
  width: 110px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  text-align: center;
  background: #e0524b;
  color: white;
  font-weight: 800;
  font-size: 0.25rem;
}

.cartName {
  width: 9.3rem;
  font-size: 0.36rem;
}

.cartName a {
  color: black;
  font-size: 0.57rem;
  float: right;
}

.cartImg h1 {
  margin-top: 0.5rem;
  text-align: center;
  color: #959595;
  font-size: 0.6rem;
}

._box {
  width: 63%;
  height: 100%;
  float: left;
}

.pay {
  width: 3.3rem;
  margin-top: 0.1rem;
  margin-right: 0.3rem;
  color: white;
  float: right;
}
// input[type="checkbox"]{
//   width:0.38rem;
//   height:0.38rem;
// }
input[type=checkbox] {
  cursor: pointer;
  font-size: 14px;
  width: 0.38rem;
  height: 0.38rem;
  position: relative;
}
 
input[type=checkbox]:after {
  position: absolute;
  width: 0.38rem;
  height: 0.38rem;
  top: 0;
  content: " ";
  color: #fff;
  display: inline-block;
  visibility: visible;
  padding: 0px 2px;
  border-radius: 5px;
  background:#FFFFFF;
  border:2px solid #cdcdcd;
}
 
input[type=checkbox]:checked:after {
   content: "✓";
   text-align:center;
  font-size: 12px;
  font-weight:600;
   background-color: #1dc76f;
   border:none;
}
      
  
.header {
  width: 100%;
  height: 1.45rem;
  background-color: #fff;
  z-index: 1;

  .header-left {
    width: 10%;
    height: 100%;
    float: left;
  }

  .header-in {
    width: 75%;
    float: left;
    text-align: center;
    font-size: 36px;
    line-height: 1.45rem;
    color: #333333;
    font-weight: 500;
  }

  .header-rigth {
    width: 15%;
    text-align: center;
    font-size: 32px;
    line-height: 1.45rem;
    float: left;

    a {
      color: #666666;
    }
  }
}
</style>
