<template>
  <div class="container">
    <div class="head">
      <img class="logo"
           src="static/img/logo3.png">
      <span class="title">道业区块链溯源商城</span>
      <el-tag class="right-text"
              type="info">进入商城</el-tag>
    </div>
    <div>
      <img src="static/img/mall_logo.jpg"
           style="width:100%">
    </div>
  </div>
</template>

<script>
import { Button, Tag } from "element-ui";
export default {
  name: "MallContainer",
  data () {
    return {
      show: false
    };
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>
.container {
  border-top: 0.3rem solid #f4f4f4;
  padding: 0 0.5rem;
}

.head {
  line-height: 1.2rem;
  height: 1.2rem;
  position: relative;

  .logo {
    width: 0.5rem;
    height: 0.5rem;
    vertical-align: middle;
    display: inline-block;
  }

  .title {
    font-size: 0.5rem;
    vertical-align: middle;
  }

  .right-text {
    height: 0.6rem;
    line-height: 0.6rem;
    top: 50%;
    margin-top: -0.3rem;
    position: absolute;
    right: 0;
    border-radius: 0.5rem;
  }
}
</style>