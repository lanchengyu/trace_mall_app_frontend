<template>
  <div style="height:100%;">
    <Order-Header title="订单详情" @back="toCart"></Order-Header>
    <div class="details-box"
         v-if="order">
      <div class="details-success">
        <span>
          <p>订单状态：{{order.status | formatStatus}}</p>
          <p v-show="order.status===0">剩余时间：{{remainTime}}</p>
        </span>
        <img src="https://shopstatic.vivo.com.cn/vivoshop/wap/dist/images/membercenter/order/no-pay_79c2dfe.png">
      </div>

      <div class="details-address">
        <p class="address-box">
          <span class="name">收货人：{{order.receiverName}}</span>
          <span class="phone">{{order.receiverPhone}}</span>
        </p>
        <p class="address-details">收货地址：{{order.receiverProvince}}{{order.receiverCity}}{{order.receiverRegion}}{{order.receiverDetailAddress}}</p>
      </div>
      <div class="details-list">
         <div class="details-list-1">
          <div class="details-list-1-1"
               v-for="(list,index) in order.orderItemList"
               :key="index">
            <img :src="list.productPic">
            <p>
              <span class="name">{{list.productName}}<p>× {{list.productQuantity}}</p></span>
              <span class="price">¥ {{list.productPrice}}</span>
            </p>
                  <!-- <p>
                <span class="exchange"><el-button  @click="exchangeMoney(list)"
                        v-if="order.status===1"
                        round>
                退款
                </el-button></span>
                <span class="exchange"><el-button  @click="exchangeProduct(list)"
                        v-if="order.status===2"
                        round>
                退换
                </el-button></span>
            </p> -->
          </div>
        </div>
        <div class="details-list-2">
          <div class="details-list-2-1">
            <p>
              <span class="span-1">订单优惠：</span>
              <span class="span-2">{{order.promotionInfo}}</span>
            </p>
            <p>
              <span class="span-1">可获得积分：</span>
              <span class="span-2">{{order.integration}}</span>
            </p>
            <p>
              <span class="span-1">订单备注：</span>
              <span class="span-2">{{order.note}}</span>
            </p>
          </div>
          
          <div class="details-list-2-2">
            <p>
              <span class="span-1">商品总金额：</span>
              <span class="span-2">{{order.totalAmount}}</span>
            </p>
            <p>
              <span class="span-1">运费：</span>
              <span class="span-2">¥ {{order.freightAmount}}</span>
            </p>
            <p>
              <span class="span-1">优惠：</span>
              <span class="span-2 red">-¥ {{order.promotionAmount}}</span>
            </p>
            <p>
              <span class="span-1">积分抵扣：</span>
              <span class="span-2 red">-¥ {{order.integrationAmount}}</span>
            </p>
          </div>
        </div>
        
      </div>
      
    </div>
    <div class="order-footer">
      应付：
      <span>¥{{order.payAmount}}</span>
      <el-button @click="payOrder()"
                 v-if="order.status===0"
                 type="danger"
                 class="pay"
                 size="small"
                 round>立即支付</el-button>
    </div>
  </div>
</template>

<script>
import OrderHeader from "@/common/header-six";
import { getOrderDetail } from '@/api/mallApi'
import moment from 'moment'
export default {
  name: "OrderDetails",
  components: {
    OrderHeader
  },
  data () {
    return {
      order: {},
      // status:null
    };
  },
  computed: {
    remainTime () {
      if (this.order.createTime) {
        var time1 = moment(this.order.createTime).add(1, 'days');
        var time2 = moment();
        var du = moment.duration(time1 - time2, 'ms'),
          hours = du.get('hours'),
          mins = du.get('minutes'),
          ss = du.get('seconds');
        return hours + '时' + mins + '分' + ss + '秒'
      }
      return null
    }
  },
  created () {
    var id = this.$route.query.id;
    console.log("orderDetails",id);
    getOrderDetail(id).then(res => {
      this.order = res.data;
    })
  },
  filters: {
    formatStatus (value) {
      if (value === 1) {
        // this.status=value;
        return '等待发货';
      } else if (value === 2) {
        // this.status=value;
        return '等待收货';
      } else if (value === 3) {
        // this.status=value;
        return '交易完成';
      } else if (value === 4) {
        // this.status=value;
        return '交易关闭';
      } else if (value === 5) {
        // this.status=value;
        return '无效订单';
      } else {
        return '等待付款';
      }
    }
  },
  methods: {
    moment,
    payOrder () {
      this.$router.push({ name: 'PayOrder', query: { orderId: this.order.id, payAmount: this.order.payAmount } })
    },
    toCart(){
      this.$router.push({ path: "/cart" });
    }
    // // 退款
    // exchangeMoney(list){
    //    this.$router.push({name:'ExchangeMoney',query:{ list: list,orderId:this.order.id}})
    // },
    // // 退换
    // exchangeProduct(list){
    //    this.$router.push({name:'ExchangeMoney',query:{list: list,orderId:this.order.id}});
    // }
  }
};
</script>

<style lang="stylus" scoped>
.details-box {
  height: calc(100% - 2.95rem);
  overflow: auto;
  width: 100%;
}

.details-success {
  width: 100%;
  height: 2.4rem;
  background:#6EEEAC;

  span {
    color: #fff;
    font-size: 0.46rem;
    margin-top: 0.7rem;
    float: left;
    padding-left: 0.4rem;
  }

  img {
    width: 2.7rem;
    margin: 0.5rem;
    float: right;
  }
}

.details-address {
  width: 100%;
  padding: 0.5rem;
  background: #fff;

  .address-box {
    margin: auto;
    font-size: 0.4rem;
    padding-bottom: 0.3rem;

    .phone {
      float: right;
    }
  }

  .address-details {
    margin: auto;
    color: #666;
    font-size: 0.38rem;
  }
}

.details-list {
  width: 100%;
  margin-bottom: 0.2rem;

  .details-list-1 {
    margin-top: 0.2rem;

    .details-list-1-1 {
      height: 3rem;
      background: #ffffff;
      border-bottom: 1px solid #e8e8e8;

      img {
        width: 2.5rem;
        margin: 0.25rem;
        float: left;
      }

      p {
        display: flex;
        flex-direction: column;

        .name {
          font-size: 0.4rem;
          margin-top: 0.3rem;
          height: 0.6rem;
        }

        .price {
          color: red;
          font-size: 0.35rem;
          font-weight: 500;
          height: 0.6rem;
        }
        .exchange{
          >>> .el-button{
            float:right;
            margin-right: 0.5rem;
          }
        }

        span {
          p {
            float: right;
            margin-right: 0.5rem;
          }
        }
      }
    }
  }

  .details-list-2 {
    width: 100%;
    margin-top: 0.2rem;
    background: #ffffff;

    div {
      width: 90%;
      margin: auto;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      font-size: 0.36rem;
      border-bottom: 1px solid #e8e8e8;

       span {
         color: #888;
       }
    }

    .details-list-2-1 {
      p {
        padding-top:0.1rem;
      }
    }

    .details-list-2-2 {
      p {
         padding-top:0.1rem;
      }

      .red {
        color: red;
      }
    }
  }
}

.order-footer {
  width: 100%;
  height: 1.5rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  line-height: 1.5rem;
  padding-left: 0.5rem;
  font-size: 0.38rem;
  border-top: 1px solid #eaeaea;

  span {
    color: red;
  }

  .pay {
    width: 3.3rem;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    color: white;
    float: right;
  }
}
</style>
