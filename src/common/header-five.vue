<template>
  <div class="header">
    <div class="header-left"
         @click="$router.go(-1)">
      <i class="iconfont icon-zuojiantou"></i>
    </div>
    <div class="header-in">{{title}}</div>
    <div class="header-rigth" @click="emitfn">
      <a>{{btnText}}</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderFour",
  props: [
    "title",
    "btnText"
  ],
  methods:{
      emitfn(){
          this.$emit("publish");
      }
  }

}
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background-color:#F9F9F9;
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
      color:#000;
    }
  }

  .header-in {
    width: 75%;
    float: left;
    text-align: left ;
    font-size: 36px;
    line-height: 1.45rem;
    color:#000;
    font-weight:500;
  }

  .header-rigth {
    width: 15%;
    text-align: center;
    font-size: 0.48rem;
    line-height: 1.45rem;
    float: left;
    a{
        color:#FE5002;
    }
  }
}
</style>
