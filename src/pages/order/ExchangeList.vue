<template>
  <div style="height:100%;">
    <Order-Header title="退货/退款"></Order-Header>
    <div  class="content"
          ref="orderWrapper"
         :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :bottom-method="loadBottom"
                :bottom-all-loaded="allLoaded"
                :autoFill=false
                @bottom-status-change="handleBottomChange"
                ref="loadmore">
      <div class="list" v-for="(returnItem,index) in list" :key="index">
        <div class="list-item" v-for="(item,count) in returnItem.orderItemList" :key="count">
          <el-row class="second">
            <el-col :span="8">
              <img :src="item.productPic" />
            </el-col>
            <el-col :span="12">
              <p class="productName">{{item.productName}}</p>
              <p class="sp">
                <span>{{item.sp1}}</span>
                <span>{{item.sp2}}</span>
              </p>
            </el-col>
            <el-col :span="4">
              <p class="price">￥{{item.productPrice}}</p>
              <p class="num">x{{item.productQuantity}}</p>
            </el-col>
          </el-row>
        </div>
        <el-row class="third" v-if="returnItem.status===0">
          <el-col :span="2">
            <img src="static/img/refund0.png" />
          </el-col>
          <el-col :span="15">
            <span>待处理</span>
          </el-col>
          <el-col :span="7">
            <!-- <p class="detail">查看详情</p> -->
          </el-col>
        </el-row>
        <el-row class="third" v-if="returnItem.status===1">
          <el-col :span="2">
            <img src="static/img/refund1.png" />
          </el-col>
          <el-col :span="15">
            <span>退货中</span>
          </el-col>
          <el-col :span="7">
            <!-- <p class="detail">查看详情</p> -->
          </el-col>
        </el-row>
        <el-row class="third" v-if="returnItem.status===2">
          <el-col :span="2">
            <img src="static/img/refund2.png" />
          </el-col>
          <el-col :span="15">
            <span>退款成功</span>
          </el-col>
          <el-col :span="7">
            <!-- <p class="detail">查看详情</p> -->
          </el-col>
        </el-row>
        <el-row class="third" v-if="returnItem.status===3">
          <el-col :span="2">
            <img src="static/img/refund3.png" />
          </el-col>
          <el-col :span="15">
            <span>已拒绝</span>
          </el-col>
          <el-col :span="7">
            <!-- <p class="detail">查看详情</p> -->
          </el-col>
        </el-row>
        <el-row class="fourth">
            <el-col :offset="13" :span="11">
                <p>合计：￥{{returnItem.returnAmount}}</p>
            </el-col>
        </el-row>
      </div>
    </mt-loadmore>
    </div>
  </div>
</template>
<script>
import OrderHeader from "@/common/header-four";
import { returnList } from "@/api/mallApi";
import { mapState } from "vuex";
export default {
  name: "ExchangeList",
  components: {
    OrderHeader
  },
  data() {
    return {
      wrapperHeight: 0,
      allLoaded: false,
      list: [],
      params: {
        pageNum: 1
    },
    };
  },
  computed: {
    ...mapState({
      mallUser: state => state.mallUser
    })
  },
  created() {
    this.getData();
  },
  mounted () {
    this.$nextTick(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.orderWrapper.getBoundingClientRect().top;
    })
  },
  methods: {
    getData() {
      let username=this.mallUser.username;
      this.params = {
        pageNum: 1
      }
      returnList(username,this.params).then(res => {
        let data = res.data;
        this.list=data.list;
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
      });
    },
    showRefund() {
      this.$router.push({ path: "/order/ReturnDetail" });
    },
    loadBottom () { // 上拉加载
      let username=this.mallUser.username;
      var params = {
        pageNum: this.params.pageNum+1,
      }
      returnList(username,params).then(res => {
        let data = res.data
        this.list = this.list.concat(data.list)
        this.params.pageNum = data.pageNum
        if (data.totalPage === 0 || data.pageNum === data.totalPage) {
          this.allLoaded = true;
        }
        this.$refs.loadmore.onBottomLoaded()
      })
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    }
  }
};
</script>
<style lang="stylus" scoped>
.content{
  overflow:auto;
}
.list {
  margin: 0 20px;
  background-color: #fff;
  border-radius: 20px;
  font-size:0.35rem;
  .list-item {
    margin-top: 0.2rem;
    color: #333333;
    .second {
      padding: 20px;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }
      
      .sp,.num{
        color: #A0A0A0;
        font-size: 0.35rem;
        padding: 0.2rem 0;
      }
      .productName, .price{
        color: #444444;
        font-size:0.45rem;
      }

      .num, .price {
        text-align: right;
      }

      .sku {
        span {
          color: #A0A0A0;
          font-size: 28px;
          margin-left: 5px;
        }
      }
    }
  }

  .third {
    padding:0 20px;
    height:1.2rem;
    line-height: 1.2rem;
    background-color: #fff;
    color: #444444;
    font-size: 0.4rem;

    .detail {
      color: #FA8551;
      text-align: right;
    }

    img {
      width: 0.5rem;
      height: 0.5rem;
    }
  }

  .fourth {
      padding:15px 20px 40px;
      font-size:0.35rem;
      text-align:right;
  }
}
</style>