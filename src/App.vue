<template>
  <div id="app"
       style="height:100%;">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import rem from './rem/rem.js'
export default {
  name: 'app',
  data () {
    return {
      transitionName: ''
    }
  }
}
</script>

<style  lang="stylus">
@import 'styles/style.css';
@import './fon/iconfont.css';
@import './font/iconfont.css';
@import './icon/iconfont.css';
body {
  /* padding-bottom:1.56rem; */
  background: #f4f4f4;
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
}
div::-webkit-scrollbar {
    display: none;    
}
.mint-swipe-indicator {
  background: #000;
  border: 1px solid black;
}

.mint-swipe-indicator.is-active {
  background: #ddd;
}

.mint-cell-wrapper {
  padding: 0;
}

.mint-toast {
  z-index: 9999;
}

.el-message {
  min-width: 0;
}

.mint-loadmore-bottom {
  font-size: 0.5rem;

  span {
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;

    @when rotate {
      transform: rotate(180deg);
    }
  }
}

.border-top {
  border-top: 1px solid #ddd;
}

.border-bottom {
  border-bottom: 1px solid #ddd;
}

.my-cell {
  width: 100%;
  height: 1.41rem;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
  display: block;

  .left {
    float: left;
    line-height: 1.3rem;
    height: 1.3rem;
    padding-left: 0.47rem;

    i {
      font-size: 0.5rem;
    }

    span {
      font-size: 0.37rem;
      padding-left: 0.1rem;
    }
  }

  .right {
    float: right;
    height: 1.3rem;
    line-height: 1.3rem;
    padding-right: 0.4rem;
  }
}
</style>
