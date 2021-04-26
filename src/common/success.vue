<template>
  <div style="height:100%;background:white;">
    <div class="header">
      <div class="header-left"
           @click="back">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="header-in">支付结果</div>
    </div>
    <div class="success">
      <i class="iconfont icon-chenggong1"></i>
      <h2>购买成功</h2>
      <p>已收到您的货款,请留意
        <router-link to="/order">订单状态</router-link>
      </p>
      <p>祝您生活愉快 感谢您的支持与厚爱</p>
      <p style="margin-top:2rem;">
        <router-link to="/home">
          <el-button type="primary">返回主页</el-button>
        </router-link>
      </p>
    </div>
  </div>

</template>

<script>
import SuccessHeader from '../common/Header'
export default {
  data () {
    return {
    }
  },
  components: {
    SuccessHeader
  },
  methods: {
    back () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>



<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background: white;
  border-bottom: 1px solid #eaeaea;
  z-index: 1;

  .header-left {
    width: 10%;
    height: 100%;
    float: left;

    i {
      font-size: 0.6rem;
      line-height: 1.45rem;
      text-align: center;
      display: block;
    }
  }

  .header-in {
    width: 80%;
    float: left;
    text-align: center;
    font-size: 0.45rem;
    line-height: 1.45rem;
  }
}

.success {
  width: 90%;
  margin: auto;
  text-align: center;

  h2 {
    font-size: 0.8rem;
    margin-top: 0.6rem;
    margin-bottom: 0.1rem;
  }

  i {
    display: block;
    padding-top: 30%;
    font-size: 2.8rem;
    color: #52b838;
  }

  p {
    width: 92%;
    font-size: 0.35rem;
    margin: auto;

    a {
      color: #1574e3;
    }
  }
}
</style>
