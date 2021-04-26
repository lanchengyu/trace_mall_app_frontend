<template>
  <div class="container">
    <div class="container-bj">
      <div class="content">
        <div class="setting-box">
          <router-link to="/my/info">
            <img class="setting" src="static/img/setting.png" />
          </router-link>
        </div>
      </div>
      <div class="list-box">
        <div class="usernameImg">
          <img v-if="mallUser.icon" :src="mallUser.icon" />
          <img v-else src="static/img/tou.jpg" />
        </div>
      </div>
      <div class="username">
        <p>{{mallUser.username}}</p>
      </div>
      <div class="navlist">
        <div class="first" @click="toIntegration">
          <img src="static/img/gift.png" />
          <p>可用积分</p>
        </div>
        <div class="second" @click="toCoupon">
          <img src="static/img/money1.png" />
          <p>优惠券</p>
        </div>
        <div class="third" @click="toFootMark">
          <img src="static/img/foot.png" />
          <p>足迹</p>
        </div>
      </div>
    </div>

    <div class="container-order">
      <el-row class="first-row">
        <router-link :to="{name:'order',query:{status:-1}}">
          <el-col :span="18" :offset="1">
            <p>我的订单</p>
          </el-col>
          <el-col :span="5">
            <span>全部订单</span>
            <i class="iconfont icon-youjiantou"></i>
          </el-col>
        </router-link>
      </el-row>
      <div class="container-order-2">
        <p v-for="(list,index) in container" :key="index">
          <router-link
            class="link"
            v-if="index!=container.length-1"
            :to="{name:'order',query:{status:index}}"
          >
            <img :src="list.img" />
            <span>{{list.name}}</span>
            <div class="num2" :v-show="display"  v-if="container[index].Total&&container[index].Total>99">99+</div>
            <div class="num1" :v-show="display"  v-else>{{container[index].Total}}</div>
          </router-link>
          <router-link class="link" v-else to="/exchangeList">
            <img :src="list.img" />
            <span>{{list.name}}</span>
            <!-- <div class="num1" :v-show="display" v-if="container[index].Total<=99">{{container[index].Total}}</div>
            <div class="num2" :v-show="display" v-else>99+</div> -->
          </router-link>
        </p>
      </div>
    </div>

    <div style="margin-top: 0.15rem"></div>
    <div class="container-con" id="transition">
      <el-row class="con">
        <router-link to="/myCollection" class="link">
          <el-col :span="3" :offset="1" class="icon-box">
            <span class="icon collection">
              <i class="iconfont icon-collection"></i>
            </span>
          </el-col>
          <el-col :span="17">
            <span>我的收藏</span>
          </el-col>
          <el-col :span="3">
            <i class="iconfont icon-youjiantou"></i>
          </el-col>
        </router-link>
      </el-row>
      <el-row class="con">
        <router-link to="/address" class="link">
          <el-col :span="3" :offset="1" class="icon-box">
            <span class="icon location">
              <i class="iconfont icon-location"></i>
            </span>
          </el-col>
          <el-col :span="17">
            <span>收货地址</span>
          </el-col>
          <el-col :span="3">
            <i class="iconfont icon-youjiantou"></i>
          </el-col>
        </router-link>
      </el-row>
      <el-row class="con">
        <router-link to class="link">
          <el-col :span="3" :offset="1" class="icon-box">
            <span class="icon share">
              <i class="iconfont icon-share_icon"></i>
            </span>
          </el-col>
          <el-col :span="17">
            <span>分享</span>
          </el-col>
          <el-col :span="3">
            <i class="iconfont icon-youjiantou"></i>
          </el-col>
        </router-link>
      </el-row>
      <el-row class="con">
        <router-link to="/my/about" class="link">
          <el-col :span="3" :offset="1" class="icon-box">
            <span class="icon about">
              <i class="iconfont icon-bangzhuguanyuwomen"></i>
            </span>
          </el-col>
          <el-col :span="17">
            <span>关于我们</span>
          </el-col>
          <el-col :span="3">
            <i class="iconfont icon-youjiantou"></i>
          </el-col>
        </router-link>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Toast } from "mint-ui";
import { getCurrentUser, mallLogout, getOrderNum } from "@/api/mallApi";
export default {
  name: "Mycontainer",
  data() {
    return {
      container: [
        {
          img: "static/img/order-1.png",
          name: "待付款"
        },
        {
          img: "static/img/order-2.png",
          name: "待发货"
        },
        {
          img: "static/img/order-3.png",
          name: "待收货"
        },
        {
          img: "static/img/order-4.png",
          name: "已完成"
        },
        {
          img: "static/img/order-5.png",
          name: "退货/退款"
        }
      ],
      display:false
    };
  },
  created() {
    getCurrentUser().then(res => {
      this.$store.dispatch("setMallUser", res.data);
    });
    getOrderNum().then(res => {
      let data = res.data;
      // console.log("data",data);
      for (var i = 0; i < data.length; i++) {
        data[i].Total = parseInt(data[i].Total);
        this.container[i].Total=data[i].Total;
        this.container[i].status=data[i].status;
      }
      this.display=!this.display;
    });
  },
  computed: {
    ...mapState({
      mallUser: state => state.mallUser
    })
  },
  methods: {
    logout() {
      mallLogout().then(res => {
        this.$store.dispatch("setMallUser", {});
        this.$store.dispatch("setGoods", []);
        Toast({
          message: "退出成功",
          position: "bottom",
          duration: 5000
        });
      });
    },
    toCoupon() {
      Toast("该功能还在开发中");
      // this.$router.push({path:"/Coupon"})
    },
    toServiceList() {
      this.$router.push({ path: "/ServiceList" });
    },
    toIntegration() {
      Toast("该功能还在开发中");
      // this.$router.push({path:'/test'})
    },
    test() {
      this.$router.push({ path: "/my/test" });
    },
    toFootMark() {
      Toast("该功能还在开发中");
      // this.$router.push({path:"/batch/batchDetail",query:{id:'1572FD7201DE47A88F6627C6DC97DD0F'}})
    }
  }
};
</script>


<style lang="stylus" scoped>
.container-order {
  width: 100%;
  background: white;
  display: block;
  margin-bottom: 0.15rem;
  margin-top: 0.15rem;
  font-size: 0.35rem;

  .first-row {
    padding: 0.3rem 0;
    line-height: 0.6rem;
    border-bottom: 1px solid #F6F6F6;

    img {
      width: 18px;
      height: 18px;
    }

    p {
      font-size: 0.45rem;
      font-weight: bold;
      color: #333333;
    }

    span {
      font-size: 0.3rem;
      font-weight: bold;
      color: #999999;
    }
  }

  .container-order-1 {
    width: 100%;
    height: 1.5rem;

    .left {
      float: left;
      display: block;
      line-height: 1.5rem;
      margin-left: 0.5rem;
      font-size: 0.4rem;
    }

    .right {
      float: right;
      line-height: 1.5rem;
      margin-right: 0.6rem;
      font-size: 0.4rem;
    }
  }

  .container-order-2 {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 6px 30px 6px;

    p {
      width: 20%;
      display: flex;
      flex-direction: column;

      .link {
        position: relative;

        img {
          margin-left: 0.6rem;
          text-align: center;
          width: 58px;
          height: 46px;
        }

        .num1 {
          width: 34px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          border-radius: 50%;
          background-color: #FFFFFF;
          border: 3px solid #1DC76F;
          color: #1DC76F;
          font-size: 0.35rem;
          font-weight: 500;
          position: absolute;
          top: -13px;
          left: 82px;
          letter-spacing:-2px;
        }

        .num2 {
          width: 60px;
          height: 34px;
          text-align: center;
          line-height: 34px;
          border-radius: 20px;
          background-color: #FFFFFF;
          border: 3px solid #1DC76F;
          color: #1DC76F;
          font-size: 0.35rem;
          font-weight: 500;
          position: absolute;
          top: -13px;
          left: 78px;
          letter-spacing:-2px;
        }

        span {
          display: block;
          text-align: center;
          padding-top: 0.3rem;
          color: #999999;
          font-size: 0.3rem;
          font-weight: 700;
        }
      }
    }
  }
}

.container {
  width: 100%;
  position: absolute;
  overflow: hidden;

  .container-bj {
    width: 100%;
    height: 100%;
    display: flex;
    color: #333333;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    background: #fff;

    .content {
      width: 100%;
      height: 300px;
      background: #20C972;
    }

    .list-box {
      width: 100%;
      height: 200px;
      position: relative;

      .usernameImg {
        width: 100%;
        height: 120px;
        position: absolute;
        z-index: 99;
        top: -100%;
        left: 0;

        img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin-left: calc(50% - 60px);
        }
      }
    }

    .username {
      width: 100%;
      position: absolute;
      top: 45%;
      left: 0;

      p {
        font-size: 36px;
        text-align: center;
        color: #000;
      }
    }

    .navlist {
      width: 100%;
      position: absolute;
      top: 68%;
      left: 0;
      overflow: hidden;

      .first, .second, .third {
        width: 33%;
        height:100%;
        float: left;
        text-align: center;

        img {
          width: auto;
          height: 50px;
        }
        .second>img{
          width:68px;
          
        }
        p {
          font-size: 26px;
          margin-top: 12px;
        }
      }
    }

    .list-box:after {
      content: '';
      width: 140%;
      height: 290px;
      position: absolute;
      top: -67%;
      left: -19%;
      background: #fff;
      border-radius: 50% 50% 0 0;
      overflow: hidden;
    }

    .setting {
      width: 52px;
      height: 52px;
      margin-top: 41px;
      margin-left: 33px;
    }

    .login {
      color: white;
      font-size: 0.45rem;
      margin-top: 0.2rem;
    }

    .box {
      text-align: center;

      .first {
        font-size: 48px;
        font-family: 'Helvetica Bold';
        font-weight: bold;
      }

      .second {
        font-size: 26px;
      }
    }

    .item div:not(:last-child) {
      border-right: 0.5px solid #D9D9D9;
    }
  }

  .container-integral {
    width: 100%;
    height: 2rem;
    background: #ffffff;
    display: flex;
    justify-content: center;

    p {
      width: 33%;
      height: 100%;
      font-size: 0.36rem;
      line-height: 0.6rem;
      font-weight: 500;
      float: left;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
    }
  }

  .container-con {
    margin-bottom: 1.45rem;
    font-weight: 700;

    .con {
      width: 100%;
      height: 1.42rem;
      line-height: 1.42rem;
      background: #ffffff;
      border-bottom: 1px solid #F6F6F6;
      display: block;

      .link {
        width: 100%;
        height: 1.42rem;
        display: block;

        .icon {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-radius: 50%;
          display: inline-block;
        }

        .collection {
          background-color: #73D0F6;
        }

        .location {
          background-color: #FB8596;
        }

        .share {
          background-color: #FEB26A;
        }

        .about {
          background-color: #C89CF6;
        }

        span {
          font-size: 0.35rem;
          color: #999999;
        }
      }
    }
  }
}

.iconfont {
  color: #ffffff;
}

.icon-youjiantou {
  font-size: 28px;
  color: #999;
}

>>>.ant-badge-count {
  background: #fff;
  color: #1CC66E;
  border: 1px solid #1CC66E;
  position: absolute;
  top: -100px;
  right: 35px;
}
</style>