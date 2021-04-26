<template>
    <div style="height:100%;">
        <Order-Header title="积分"></Order-Header>
        <div class="box">
            <el-row><img src="static/img/integration.png"/></el-row>
            <el-row><p>当前积分</p></el-row>
            <el-row><p>1000</p></el-row>
        </div>
        <div class="container-integral">
            <p>
                <span>累计获得</span>
                <span>1000</span>
            </p>
            <p>
                <span>累计使用</span>
                <span>0</span>
            </p>
            <p>
                <span>累计节省</span>
                <span>￥100</span>
            </p>
        </div>
        <div class="con">
             <div class="con-left">
                <span>近30天记录</span>
            </div>
            <router-link to="/integration/integrationlist">
                <div class="con-right">
                    <span>更多</span>
                </div>
            </router-link>
        </div>
        <IntegrationContainer></IntegrationContainer>
    </div>
</template>
<script>
import OrderHeader from "@/common/header-four";
import IntegrationContainer from "./component/integrationContainer"
export default {
    name:'Integration',
    components: {
       OrderHeader,
       IntegrationContainer
    },
}
</script>
<style lang="stylus" scoped>
.box{
    width: 100%;
    text-align: center;
    // background-color: #17C169;
    background-image:url('../../../static/img/integration-bg.png');
}
.box >>> .el-row{
    padding: 0.3rem 0;
}
.box img{
    width: 1rem;
    height: 1rem;
    margin-top: 0.4rem;
}
.box p{
    color: #fff;
    font-size: 0.4rem;
    font-weight: bold;
}
 .container-integral {
    width: 100%;
    height: 2rem;
    background: #ffffff;
    display: flex;
    justify-content: center;

    p {
      width: 33%;
      height: 100%;
      font-size: 0.36rem;
      line-height: 0.6rem;
      font-weight: 500;
      float: left;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      color:#333333;
      border-right : 1px solid #8888;
      span:nth-child(2){
          color:#17C169;
          font-weight: bold;
      }
    }
  }
  .con {
      width: 100%;
      height: 1.41rem;

      border-bottom: 1px solid #f0f0f0;
      display: block;

      .con-left {
        float: left;
        line-height: 1.3rem;
        height: 1.3rem;
        padding-left: 0.47rem;

        span {
          font-size: 0.4rem;
          padding-left: 0.1rem;
        }
      }

      .con-right {
        float: right;
        height: 1.3rem;
        font-size:0.3rem;
        line-height: 1.3rem;
        padding-right: 0.5rem;
      }
    }
</style>