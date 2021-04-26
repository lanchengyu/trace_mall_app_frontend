<template>
  <div class="header">
    <div class="header-left"
         @click="$router.go(-1)">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <div class="header-in">{{title}}</div>
    <div class="header-rigth">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: [
    "title"
  ]
}
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background: -moz-linear-gradient((top), #43E894 0%, #1AC46C 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43E894), color-stop(100%,#1AC46C));
  background: -webkit-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: -o-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: -ms-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: linear-gradient(to bottom,#43E894 0%,#1AC46C 100%);
  background-size: 100% 100%;
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
      color:#fff;
    }
  }

  .header-in {
    width: 80%;
    float: left;
    text-align: center;
    font-size: 36px;
    line-height: 1.45rem;
    color:#fff;
  }

  .header-rigth {
    width: 10%;
    text-align: center;
    font-size: 0.45rem;
    line-height: 1.45rem;
    float: left;
  }
}
</style>
