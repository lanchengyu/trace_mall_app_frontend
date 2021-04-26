<template>
  <div style="height:100%;">
    <Top-Header title="填写订单"></Top-Header>
    <div class="container-main">
      <router-link :to="{name:'address',query:{select:true}}" class="pay-address">
        <p class="address-box">
          <span class="name">收货人：{{currentAddress.name}}</span>
          <span class="phone">{{currentAddress.phoneNumber}}</span>
          <i class="iconfont icon-youjiantou"></i>
        </p>
        <p
          class="address-details"
        >收货地址：{{currentAddress.province}}{{currentAddress.city}}{{currentAddress.region}}{{currentAddress.detailAddress}}</p>
      </router-link>
      <div class="pay-shop">
        <div class="pay-shop-head">商品清单</div>
        <div class="pay-shop-list" v-for="(item,index) in cartPromotionItemList" :key="index">
          <img :src="item.productPic" />
          <span class="pay-shop-box">
            <p class="name">
              {{item.productName}}
              <span>× {{item.quantity}}</span>
            </p>
            <p class="attr">{{item.sp1}} {{item.sp2}} {{item.sp3}}</p>
            <p class="price">¥ {{item.price}}</p>
          </span>
        </div>

        <!-- <div class="pay-cell-container">
          <div class="pay-cell">
            <span>积分抵扣</span>
            <span class="sub-text">可用积分 {{memberIntegration}}</span>
            <el-input-number class="right"
                             v-model="useIntegration"
                             :min="0"
                             :max="memberIntegration"
                             size="mini"></el-input-number>
          </div>
        </div>-->

        <div class="pay-shop-liuyan">
          <p class="pay-liuyan-1">订单留言</p>
          <div class="pay-liuyan-2">
            <textarea rows="5" v-model="note" placeholder="限300字（若有特殊需求，请联系商城在线客服)" maxlength="300"></textarea>
            <p>商品总金额：¥{{calcAmount.totalAmount}}</p>
            <p>运费：{{calcAmount.freightAmount}}</p>
            <p>优惠：¥{{calcAmount.promotionAmount}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-shop-footer">
      <p class="price">
        金额：
        <span>¥{{calcAmount.payAmount}}</span>
      </p>
      <el-button
        @click="submitOrder()"
        v-if="cartPromotionItemList.length>0"
        class="order"
        type="danger"
        :loading="loading"
        size="small"
        round
      >提交订单</el-button>
    </div>
  </div>
</template>


<script>
import { Toast, MessageBox } from "mint-ui";
import { mapState, mapActions } from "vuex";
import TopHeader from "../../common/Header";
import { generateConfirmOrder, generateOrder,submitOrderFromDetail,submitOrderFromCart} from "@/api/mallApi";
export default {
  name: "SubmitOrder",
  components: {
    TopHeader
  },
  data() {
    return {
      loading: false,
      cartItems:[],
      cartPromotionItemList: [],
      memberReceiveAddressList: [],
      couponHistoryDetailList:[],
      integrationConsumeSetting: [],
      calcAmount: [],
      memberIntegration: 0,
      payType: "1",
      useIntegration: 0,
      note: "",
      path:''
    };
  },
  computed: {
    ...mapState({
      currentAddress: state => state.currentAddress,
      order:state=>state.order
    })
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
    // 通过 `vm` 访问组件实例
      vm.path=from.name;
  })
  },
  created() {
    let data = this.$route.query.data;;
    if(data.calcAmount==undefined){
      data=this.order;
    }else{
      data = this.$route.query.data;
      this.$store.dispatch("setOrder", data);
    }
    this.cartPromotionItemList = data.cartPromotionItemList;
    this.memberReceiveAddressList = data.memberReceiveAddressList;
    this.integrationConsumeSetting = data.integrationConsumeSetting;
    this.couponHistoryDetailList=data.couponHistoryDetailList;
    this.calcAmount = data.calcAmount;
    this.memberIntegration = data.memberIntegration
      ? data.memberIntegration
      : 0;
    if (!this.currentAddress || !this.currentAddress.id) {
      for (let i = 0; i < this.memberReceiveAddressList.length; i++) {
        if (this.memberReceiveAddressList[i].defaultStatus === 1) {
          this.setCurrentAddress(this.memberReceiveAddressList[i]);
          break;
        }
      }
    }
    // generateConfirmOrder().then(res => {
    //   let data = res.data;
    //   this.cartPromotionItemList = data.cartPromotionItemList;
    //   this.memberReceiveAddressList = data.memberReceiveAddressList;
    //   this.integrationConsumeSetting = data.integrationConsumeSetting;
    //   this.calcAmount = data.calcAmount;
    //   this.memberIntegration = data.memberIntegration
    //     ? data.memberIntegration
    //     : 0;
    //   if (!this.currentAddress || !this.currentAddress.id) {
    //     for (let i = 0; i < this.memberReceiveAddressList.length; i++) {
    //       if (this.memberReceiveAddressList[i].defaultStatus === 1) {
    //         this.setCurrentAddress(this.memberReceiveAddressList[i]);
    //         break;
    //       }
    //     }
    //   }
    // });
  },
  methods: {
    ...mapActions(["setCurrentAddress"]),
    submitOrder() {
      if (!this.currentAddress || !this.currentAddress.id) {
        Toast({
          message: "请选择收货地址",
          duration: 950
        });
      } else {
        let orderParam = {
          memberReceiveAddressId: this.currentAddress.id,
          couponId:"",
          payType: parseInt(this.payType),
          note: this.note,
          cartItems:this.cartPromotionItemList
        };
        if (this.useIntegration > 0)
          orderParam.useIntegration = this.useIntegration;
        
        this.loading = true;
        // if(this.path=='goodDetail'){
        //   submitOrderFromDetail(orderParam).then(res=>{
        //     this.loading=false;
        //      let order = res.data.order;
        //       this.$router.push({
        //         name: "OrderDetails",
        //         query: { id: order.id }
        //       });
        //   }).catch(() => {
        //       this.loading = false;
        //   });
        // }else if(this.path=='cart'){
          submitOrderFromCart(orderParam)
            .then(res => {
              this.loading = false;
              let order = res.data.order;
              this.$router.push({
                name: "OrderDetails",
                query: { id: order.id }
              });
            })
            .catch(() => {
              this.loading = false;
            });
        // }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.container-main {
  height: calc(100% - 2.95rem);
  overflow: auto;
}

.active {
  border: 1px solid #444;
  color: red;
}

.pay-address {
  width: 100%;
  padding: 0.3rem 0;
  background: url('https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png') #fff left bottom repeat-x; // shopstatic.vivo.com.cn/vivoshop/wap/dist/images/prod/bg-addr-box-line_d380baa.png) #fff left bottom repeat-x;
  background-size: 1.6rem;
  display: block;

  .address-box {
    width: 87%;
    margin: auto;
    font-size: 0.4rem;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;

    .phone {
      margin-left: 0.3rem;
    }

    i {
      float: right;
    }
  }

  .address-details {
    width: 87%;
    margin: auto;
    color: #666;
    font-size: 0.38rem;
  }
}

.pay-shop {
  width: 100%;

  .pay-shop-invoice {
    width: 100%;
    height: 4.3rem;
    background: #fff;
    margin-bottom: 10px;
    margin-top: 10px;

    .pay-invoice-1 {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      border-bottom: 1px solid #eaeaea;
      font-size: 0.4rem;
      padding-left: 0.7rem;
    }

    .pay-invoice-2 {
      width: 100%;
      height: 4rem;

      .pay-invoice-2-1 {
        width: 100%;
        height: 30%;

        div {
          display: block;
          width: 2.88rem;
          height: 0.9rem;
          line-height: 0.9rem;
          border: 1px solid #d1d1d1;
          border-radius: 3px;
          margin: 0.1rem 0.3rem;
          float: left;
          text-align: center;
        }
      }

      .pay-invoice-2-2 {
        width: 92%;
        height: 70%;
        margin: auto;
        font-size: 0.35rem;

        p {
          margin-top: 10px;
          margin-bottom: 10px;
        }

        input {
          width: 100%;
          height: 1.18rem;
          border: 1px solid #d1d1d1;
          border-radius: 3px;
          padding-left: 0.2rem;
        }
      }
    }
  }

  .pay-shop-head {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    border-bottom: 1px solid #eaeaea;
    font-size: 0.4rem;
    padding-left: 0.3rem;
    background: #fff;
    margin-top: 0.3rem;
  }

  .pay-shop-list {
    width: 100%;
    padding: 0.3rem;
    border-bottom: 1px solid #eaeaea;
    background: #fff;

    img {
      display: inline-block;
      vertical-align: top;
      width: 30%;
    }

    .pay-shop-box {
      display: inline-block;
      vertical-align: top;
      width: 65%;
      margin-left: 3%;

      .name {
        font-size: 0.4rem;

        span {
          float: right;
        }
      }

      .attr {
        font-size: 0.4rem;
      }

      .price {
        color: red;
        font-size: 0.35rem;
        font-weight: 500;
        height: 0.6rem;
      }
    }
  }

  .pay-shop-liuyan {
    width: 100%;
    height: 6.5rem;
    background: #fff;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;

    .pay-liuyan-1 {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      border-bottom: 1px solid #eaeaea;
      font-size: 0.4rem;
      padding-left: 0.3rem;
    }

    .pay-liuyan-2 {
      width: 90%;
      margin: auto;

      textarea {
        width: 100%;
        height: 2rem;
        border: 1px solid #d1d1d1;
        border-radius: 3px;
        padding: 0.15rem 0.2rem;
        margin: 0.3rem auto;
        display: block;
        font-family: 'SimSun';
      }

      p {
        color: #888;
        padding: 0.1rem 0;
        font-size: 0.34rem;
      }
    }
  }

  .pay-cell-container {
    width: 100%;
    background: #ffffff;
    margin-top: 0.3rem;

    .pay-cell {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      border-bottom: 1px solid #eaeaea;
      font-size: 0.4rem;
      padding-left: 0.3rem;

      .sub-text {
        margin-left: 0.3rem;
        color: gray;
      }

      .right {
        float: right;
        height: 0.9rem;
        margin-top: 0.4rem;
        margin-right: 0.5rem;
      }
    }
  }

  .pay-shop-fs {
    width: 100%;
    background: #ffffff;
    margin-top: 0.3rem;

    .pay-fs-1 {
      width: 100%;
      height: 1.5rem;
      line-height: 1.5rem;
      border-bottom: 1px solid #eaeaea;
      font-size: 0.4rem;
      padding-left: 0.3rem;
    }

    .pay-fs-2 {
      width: 100%;
      background: #ffffff;
      padding: 0.3rem;
    }
  }
}

.pay-shop-footer {
  width: 100%;
  height: 1.5rem;
  border-top: 1px solid #eaeaea;
  background: white;
  position: fixed;
  bottom: 0;

  .price {
    float: left;
    line-height: 1.5rem;
    font-size: 0.43rem;
    color: #666;
    padding-left: 0.3rem;

    span {
      color: red;
    }
  }

  .order {
    width: 3.3rem;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    color: white;
    float: right;
  }
}
</style>