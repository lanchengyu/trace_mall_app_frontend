<template>
  <div class="home-swiper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in advertiseList"
                     :key="index">
        <img :src="item.pic">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwipe",
  props: {
    advertiseList: Array
  },
  data () {
    return {
    }
  }
}
</script>


<style lang="stylus" scoped>
.home-swiper {
  height: 5.5rem;
  margin-top: 100px;

  img {
    width: 100%;
    height: 6.5rem;
  }
}
</style>