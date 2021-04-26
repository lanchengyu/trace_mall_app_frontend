<template>
  <div style="height:100%; background:white;">
    <Top-Header title="关于"></Top-Header>
    <div class="AboutMain">
      <img src="static/img/logo6.png">
      <p>九农仓溯源商城</p>
      <p>QQ：2097815623</p>
      <p>联系电话：18673928916</p>
      <p>客服邮箱：2097815623@qq.com</p>
      <router-link class="toHome-btn" to="/home">前往首页</router-link>
    </div>
    <copyright-footer class="about-footer"></copyright-footer>
  </div>
</template>

<script>
import TopHeader from "@/common/Header"
import CopyrightFooter from "@/common/CopyrightFooter"
export default {
  name: "About",
  components: {
    TopHeader,
    CopyrightFooter
  }
}
</script>

<style scoped>
.AboutMain {
  margin-top: 1.6rem;
  font-size: 0.4rem;
  text-align: center;
  color: #666;
}
.AboutMain img {
  width: 35%;
}
.AboutMain p {
  margin-top: 0.3rem;
}
.AboutMain a {
    display: block;
    text-align: center;
    margin: 0.8rem auto;
    width: 150px;
    height: 60px;
    line-height: 60px;
    border-radius: 4px;
    text-align: center;
    background: #ee480c;
    color: white;
    font-weight: 800;
    font-size: 0.32rem;
}
.about-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
