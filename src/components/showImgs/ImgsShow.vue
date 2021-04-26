<!-- 图片显示组件 -->
<template>
  <div class="con">
    <div class="imgs-1" v-if="imgs.length>=3">
        <div class="item" v-for="(item,index) in imgs" :key="index"><img :src="item"/></div>
    </div>
    <div class="imgs-2" v-else-if="imgs.length===2">
        <div class="item" v-for="(item,index) in imgs" :key="index"><img :src="item"/></div>
    </div>
    <div class="imgs-3" v-else-if="imgs.length===1">
        <div class="item" v-for="(item,index) in imgs" :key="index"><img :src="item"/></div>
    </div>
  </div>
</template>

<script>
export default {
  name:"ImgsShow",
  props:['imgs'],

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang="stylus" scoped>
.con{
  width:100%;
 .imgs-1{
    .item{
        width:32%;
        display:inline-block;
        padding-right:1%;
        padding-top:1%;
        img{
            width:100%;
            border-radius:0.1rem;
        }
    }
  }
  .imgs-2{
      .item{
        width:49%;
        display:inline-block;
        padding-right:1%;
        img{
            width:100%;
            border-radius:0.1rem;
        }
    }
  }
  .imgs-3{
      .item{
        width:70%;
        display:inline-block;
        padding-right:1%;
        height:6rem;
        img{
            width:100%;
            border-radius:0.1rem;
        }
    }
  }
}

</style>