<template>
  <div class="HomeList">
    <el-row class="row">
      <el-col :span="8">
        <img src="static/img/home-icon2.png"/>
        <span>迟到赔付</span>
      </el-col>
      <el-col :span="8">
        <img src="static/img/home-icon3.png"/>
        <span>无忧退换</span>
      </el-col>
      <el-col :span="8">
        <img class="three" src="static/img/home-icon1.png"/>
        <span>差重退差</span>
      </el-col>
    </el-row>
    <ul>
      <li @click="open(item.id)"
          v-for="(item, index) in category"
          :key="index">
        <img :src="item.icon">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "HomeList",
  props: {
    category: Array
  },
  methods: {
    open (id) {
      this.$router.push({ path: "/goodList", query: { categoryId: id } });
    }
  }
};
</script>
<style lang="stylus" scoped>
.HomeList {
  background: white;
  padding: 0.3rem;
  .row{
    padding:17px 0 30px 0;
    img{
      width:32px;
      height:32px;
    }
    span{
      color:#666666;
    }
    >>> .el-col{
      text-align:center;
    }
    .three{
      width:48px;
      height:32px;
    }
  }
  ul {
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      width: 20%;
      font-size: 0.34rem;
      float: left;
      padding: 0.2rem;

      img {
        width: 90%;
        display: block;
        margin: auto;
      }

      span {
        color: #666666;
        line-height: 0.6rem;
        font-size: 0.34rem;
        margin-top:16px;
      }
    }
  }
}
</style>

