<template>
  <div id="bottom">
    <ul class="bottom-ul">
      <router-link to="/home"
                   tag="li">
        <div class="index">
          <i class="iconfont icon-shouye"
             style="color:#17C169"
             v-if="active ==='home'"></i>
          <i class="iconfont icon-shouye-weixuanzhong"
             v-else></i>
        </div>
        <span>首页</span>
      </router-link>

      <router-link to="/category"
                   tag="li">
        <div class="index">
          <i class="iconfont icon-fenlei"
             style="color:#17C169"
             v-if="active ==='category'"></i>
          <i class="iconfont icon-fenleishouye"
             v-else></i>
        </div>
        <span>分类</span>
      </router-link>

      <router-link to="/cart"
                   tag="li">
        <div class="footer-cart">
          <!-- <div class="cartlength">{{carts.length}}</div> -->
          <i class="iconfont icon-gouwuche1"
             style="color:#17C169"
             v-if="active ==='cart'"></i>
          <i class="iconfont icon-gouwuche"
             v-else></i>
        </div>
        <span>购物车</span>
      </router-link>

      <router-link to="/my"
                   tag="li">
        <div class="index">
          <i class="iconfont icon-wode1"
             style="color:#17C169"
             v-if="active ==='my'"></i>
          <i class="iconfont icon-wode"
             v-else></i>
        </div>
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data () {
    return {
      active: 'home',
    }
  },
  mounted () {
    this.active = this.$route.path.slice(1);
  },
  computed: {
    ...mapState({
      carts: state => state.carts,
    })
  }
}
</script>

<style lang="stylus" scoped>
#bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  color: #666;
  background: white;

  .footer-cart {
    position: relative;

    .cartlength {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      top: 20%;
      font-size: 0.25rem;
      left: 55%;
      background: #f81301;
      border-radius: 50%;
      text-align: center;
      line-height: 0.4rem;
      color: #fff;
    }
  }

  .bottom-ul {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.45rem;

    li {
      width: 25%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;

      span {
        font-size: 0.3rem;
        line-height: 0.5rem;
      }

      i {
        font-size: 0.55rem;
        line-height: 0.3rem;
      }
    }

    .router-link:hover,.router-link-active {
      color: #17C169;
    }
  }
}
</style>
