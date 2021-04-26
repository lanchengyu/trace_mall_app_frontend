<!--  -->
<template>
  <div class="box">
      <el-row>
          <el-col :span="2" :offset="1">
              <img class="location" src="static/img/location.png"/>
          </el-col>
          <el-col :span="17">
              <router-link to="/goodList">
                <el-input class="header-in"
                placeholder="请输入商品名称"
                prefix-icon="el-icon-search"
                disabled>
                </el-input>
              </router-link>
          </el-col>
          <el-col :span="4">
              <p class="text">搜索</p>
          </el-col>
      </el-row>
      <!-- <div class="left">
          <img src="static/img/location.png"/>
      </div>
      <div class="center"></div>
      <div class="right"></div> -->
  </div>
</template>

<script>
export default {
  name:"SearchTwo"
}

</script>
<style lang="stylus" scoped>
.box{
    background-color:#17C169;
    padding:15px 0;
    position:fixed;
    top:0px;
    width: 100%;
    z-index: 999;
    .location{
        width:48px;
        height: 48px;
        margin:10px 0;
    }
    .text{
        color:#fff;
        font-size:36px;
        padding-left:15px;
        margin:10px 0;
    }
     >>>.el-input__inner {
      border-radius: 2rem;
      height: 0.95rem;
      font-size: 28px;
    }
    >>>.el-input__prefix{
        top:-7px;
    }
}

</style>