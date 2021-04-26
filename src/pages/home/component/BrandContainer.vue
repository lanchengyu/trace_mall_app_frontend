<template>
  <div class="main">
    <ul>
      <li v-for="(brand, index) in brandList"
          :key="index"
          @click="open(brand.id)">
        <div class="box-card">
          <!-- <div class="card-head">
            <div class="left">
              <img :src="brand.logo"
                   alt="logo">
            </div>
            <div class="center">
              <p class="name">{{brand.name}}</p>
              <span v-show="brand.factoryStatus"
                    class="tag">自营</span>
            </div>
          </div> -->
          <el-row class="pad">
            <el-col  class="logo" :span="6" :offset="1">
              <img :src="brand.logo" alt="logo"/>
            </el-col>
            <el-col :span="17">
              <p class="name">{{brand.name}}</p>
              <span v-show="brand.factoryStatus"
                    class="tag">自营</span>
              <div v-show="!brand.factoryStatus" style="width:60px;height:0.6rem;display:none;"></div>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="brandPic" :span="24">
              <img :src="brand.bigPic"
                 alt="图片"/>
            </el-col>
          </el-row>
          <!-- <div class="card-content">
            <img :src="brand.bigPic"
                 alt="图片">
          </div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BrandContainer",
  props: {
    brandList: Array
  },
  methods: {
    open: function (id) {
      this.$router.push({ path: "/goodList", query: { brandId: id } });
    }
  }
};
</script>

<style lang="stylus" scoped>
.logo{
  img{
    width:60px;
    height:60px;
  }
}
.name{
  font-size:30px;
  color:#333;
}
.tag{
  background-color:#E03838;
  border-radius:2px;
  color:#fff;
  display:block;
  width:70px;
  text-align:center;
  font-size:24px;
  border-radius:15px;
  margin-top:12px;
}
.brandPic{
  img{
    max-width:100%;
    height:3.3rem;
  }
}

.box-card {
  background: white;
  border-radius: 30px;
  .pad{
    padding:0.2rem 0;
  }
}

ul {
  overflow: hidden;

  li {
    list-style: none;
    width: 50%;
    float: left;
    padding: 0.1rem;
  }
}
</style>