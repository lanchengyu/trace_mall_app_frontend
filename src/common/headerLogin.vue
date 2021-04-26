<template>
  <div class="header">
    <div class="header-in">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "HeaderLogin",
  props: [
    "title"
  ]
}
</script>

<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background-color:#fff;
  z-index: 1;
  background: -moz-linear-gradient((top), #43E894 0%, #1AC46C 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43E894), color-stop(100%,#1AC46C));
  background: -webkit-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: -o-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: -ms-linear-gradient(top, #43E894 0%,#1AC46C 100%);
  background: linear-gradient(to bottom,#43E894 0%,#1AC46C 100%);

  .header-in {
    width: 100%;
    text-align: center ;
    color:#fff;
    font-size: 36px;
    line-height: 1.45rem;
    font-weight:500;
  }
}
</style>
