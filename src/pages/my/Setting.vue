<template>
  <div style="height:100%; background:#f0f0f0;">
    <Top-Header title="设置"></Top-Header>
    <div class="SettingMain">
      <div class="my-cell border-top" @click="modifyPwd">
        <span class="left">修改密码</span>
        <span class="right"><i class="iconfont icon-youjiantou"></i></span>
      </div>
      <div class="my-cell" @click="modifyTel">
        <span class="left">修改手机号</span>
        <span class="right"><i class="iconfont icon-youjiantou"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/common/Header"
export default {
  name: "Setting",
  components: {
    TopHeader
  },
  methods:{
    modifyPwd(){
      this.$router.push({path:"/ModifyPwd"});
    },
    modifyTel(){
      this.$router.push({path:"/ModifyTel"});
    }
  }
}
</script>

<style scoped>
.SettingMain {
  margin-top: 0.5rem;
  font-size: 0.4rem;
  text-align: center;
}
</style>
