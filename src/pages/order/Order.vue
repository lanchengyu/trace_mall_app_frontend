<template>
  <div style="height:100%">
    <Order-Header title="我的订单"></Order-Header>
    <div class="order-bar">
      <span v-for="(c,index) in t" :key="index" @click="getData(c.status)">
        <a :class="{active:c.status===params.status}">{{c.label}}</a>
      </span>
    </div>
    <div class="list" ref="orderWrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :autoFill="false"
        @bottom-status-change="handleBottomChange"
        ref="loadmore"
      >
        <div v-for="(item,index) in list" :key="index" class="list-item">
          <router-link :to="{name:'OrderDetails',query:{id: item.id}}">
            <div class="order-1">
              <p class="left">订单编号：{{item.orderSn}}</p>
              <p class="right">{{item.status | formatStatus}}</p>
            </div>
            <div class="order-2" v-for="(orderItem,index) in item.orderItemList" :key="index">
              <el-row>
                <el-col :span="6">
                  <img :src="orderItem.productPic" />
                </el-col>
                <el-col :span="15">
                  <p class="name">{{orderItem.productName}}</p>
                  <p class="attr">{{orderItem.sp1}} {{orderItem.sp2}} {{orderItem.sp3}}</p>
                  <p class="price">¥ {{orderItem.productPrice}}</p>
                </el-col>
                <el-col :span="2">
                  <p>× {{orderItem.productQuantity}}</p>
                  <a
                    v-show="item.status===3&&orderItem.evaluateStatus===0"
                    @click.prevent="evaluate(orderItem.productId)"
                    class="btn evaluate"
                    style="border-color:#FE5A00;color:#FE5A00;"
                  >评价</a>
                  <a
                    v-show="item.status===3&&orderItem.evaluateStatus===1"
                    class="btn evaluate"
                    style="border-color:#FE5A00;color:#FE5A00;"
                  >已评价</a>
                </el-col>
              </el-row>
            </div>
          </router-link>
          <div class="order-1">
            <p class="left">
              付款金额：
              <span>￥{{item.payAmount}}</span>
            </p>
          </div>
          <div class="order-1">
            <p class="right">
              <a v-show="item.status===0" @click.stop="cancelOrder(item.id)">取消订单</a>
              <a v-show="item.status===0" @click.stop="payOrder(item)">立即付款</a>
              <!-- <a
                v-show="item.status===3"
                @click.stop="evaluate(item.id)"
                style="border-color:#FE5A00;color:#FE5A00;"
              >评价</a>-->
              <a
                v-show="item.status===2||item.status===3"
                @click.stop="orderTrace(item.deliveryCompany, item.deliverySn)"
              >查看物流</a>
              <a v-show="item.status===2" @click.stop="confirmReceive(item.id)">确认收货</a>
              <a v-show="item.status===2||item.status===1" @click.stop="exchangeMoney(item)">退货</a>
              <a v-show="item.status===3||item.status===4" @click.stop="deleteOrder(item.id)">删除订单</a>
            </p>
          </div>
        </div>
      </mt-loadmore>
      <!-- <div class="bar-bottom">
        <p>我也是有底线的</p>
      </div> -->
    </div>
  </div>
</template>

<script>
import OrderHeader from "@/common/Header";
import { MessageBox, Toast } from "mint-ui";
import {
  getOrderList,
  cancelOrder,
  deleteOrder,
  confirmReceive
} from "@/api/mallApi";
export default {
  name: "Order",
  components: {
    OrderHeader
  },
  data() {
    return {
      wrapperHeight: 0,
      params: {
        pageNum: 1,
        status: ""
      },
      list: [],
      allLoaded: false,
      t: [
        {
          label: "全部",
          status: -1
        },
        {
          label: "待付款",
          status: 0
        },
        {
          label: "待发货",
          status: 1
        },
        {
          label: "待收货",
          status: 2
        },
        {
          label: "待评价",
          status: 3
        },
        {
          label: "已取消",
          status: 4
        }
      ]
    };
  },
  created() {
    var status = this.$route.query.status;
    this.params.status = parseInt(status);
    this.getData(this.params.status);
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapperHeight =
        document.documentElement.clientHeight -
        this.$refs.orderWrapper.getBoundingClientRect().top;
    });
  },
  filters: {
    formatStatus(value) {
      if (value === 1) {
        return "等待发货";
      } else if (value === 2) {
        return "等待收货";
      } else if (value === 3) {
        return "交易完成";
      } else if (value === 4) {
        return "交易关闭";
      } else if (value === 5) {
        return "无效订单";
      } else {
        return "待付款";
      }
    }
  },
  methods: {
    getData(status) {
      this.params = {
        status: status,
        pageNum: 1
      };
      getOrderList(this.params).then(res => {
        let data = res.data;
        console.log("data", data);
        this.list = data.list;
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
      });
    },
    loadBottom() {
      // console.log("111111111")
      // 上拉加载
      var params = {
        pageNum: this.params.pageNum + 1,
        status: this.params.status
      };
      getOrderList(params).then(res => {
        let data = res.data;
        this.list = this.list.concat(data.list);
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
    cancelOrder(id) {
      cancelOrder(id).then(res => {
        this.getData();
      });
    },
    deleteOrder(id) {
      MessageBox.confirm("确定删除?", "提示")
        .then(action => {
          let ids = [id];
          let params = new URLSearchParams();
          params.append("ids", ids);
          deleteOrder(params).then(res => {
            this.getData();
          });
        })
        .catch(action => {});
    },
    payOrder(item) {
      this.$router.push({
        name: "PayOrder",
        query: { orderId: item.id, payAmount: item.payAmount }
      });
    },
    orderTrace(deliveryCompany, deliverySn) {
      this.$router.push({
        name: "OrderTrace",
        query: { deliveryCompany: deliveryCompany, deliverySn: deliverySn }
      });
    },
    confirmReceive(id) {
      MessageBox.confirm("确定收货?", "提示")
        .then(action => {
          let ids = [id];
          let params = new URLSearchParams();
          params.append("ids", ids);
          confirmReceive(params).then(res => {
            this.getData();
          });
        })
        .catch(action => {});
    },
    exchangeMoney(item) {
      this.$router.push({ name: "ExchangeMoney", query: { orderId: item.id } });
    },
    evaluate(productId) {
      console.log(productId)
      this.$router.push({ name: "Evaluate", query: { productId: productId } });
    }
  }
};
</script>


<style lang="stylus" scoped>
.order-bar {
  line-height: 0.8rem;
  background: white;
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .active {
    color: #17C169;
    border-bottom: 2px solid #17C169;
  }

  span {
    width: 2rem;
    display: inline-block;
    text-align: center;

    a {
      width: 50%;
      font-size: 0.36rem;
      display: block;
      margin: auto;
    }
  }
}

.list {
  overflow: auto;

  .list-item {
    margin-top: 0.2rem;

    .order-1 {
      width: 100%;
      height: 1.3rem;
      line-height: 1.3rem;
      background: #ffffff;
      border-bottom: 1px solid #eaeaea;

      .left {
        float: left;
        color: #666;
        margin-left: 0.5rem;
        font-size: 0.35rem;

        i {
          font-size: 0.4rem;
          color: #666;
        }
      }

      .right {
        float: right;
        color: #17C169;
        margin-right: 0.3rem;
        font-size: 0.35rem;

        a {
          width: 2.3rem;
          height: 0.9rem;
          color: #666;
          line-height: 0.9rem;
          border: 2px solid #e2e2e2;
          border-radius: 0.5rem;
          text-align: center;
          display: block;
          float: right;
          margin-left: 0.3rem;
          margin-top: 0.2rem;
          font-size: 0.3rem;
        }
      }
    }
  }

  .order-2 {
    width: 100%;
    padding: 0.3rem;
    border-bottom: 1px solid #eaeaea;
    background: #fff;

    img {
      display: inline-block;
      vertical-align: top;
      width: 2rem;
    }

    .name {
      font-size: 0.4rem;
    }

    .attr {
      font-size: 0.35rem;
      color: #999;
    }

    .price {
      color: #666;
      font-size: 0.35rem;
      font-weight: 500;
      height: 0.6rem;
    }

    .evaluate {
      margin-top: 0.5rem;
    }
  }
}

.btn {
  width: 1.8rem;
  height: 0.7rem;
  color: #666;
  line-height: 0.7rem;
  border: 2px solid #e2e2e2;
  border-radius: 0.5rem;
  text-align: center;
  display: block;
  float: right;
  margin-left: 0.3rem;
  margin-top: 0.2rem;
  font-size: 0.3rem;
  cursor: pointer;
}

.bar-bottom {
  width: 100%;
  height: 1.5rem;
  background-color: #fff;
  color: #919191;
  text-align: center;
  line-height: 1.5rem;
}
</style>

