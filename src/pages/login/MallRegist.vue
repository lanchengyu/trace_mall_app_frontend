<template>
  <!-- <div style="height:100%; background:white;">
    <Top-Header style="background:#3190e8;color:white"
                title="道业商城注册"></Top-Header>
    <div class="main-container">
      <div class="page-part">
        <div class="input-item border-bottom">
          <label>用户名</label>
          <input placeholder="请输入账号"
                 v-model="username" />
        </div>
        <div class="input-item border-bottom">
          <label>手机号</label>
          <input placeholder="请输入手机号"
                 v-model="telephone" />
        </div>
        <div class="input-item border-bottom">
          <label>密码</label>
          <input placeholder="请输入密码"
                 type="password"
                 v-model="password1" />
        </div>
        <div class="input-item border-bottom">
          <label>确认密码</label>
          <input placeholder="请再次输入密码"
                 type="password"
                 v-model="password2" />
        </div>
        <div class="input-item border-bottom">
          <label>验证码</label>
          <input placeholder="请输入验证码"
                 v-model="authCode" />
        </div>
        <div class="verify-item">
          <a @click="getAuthCode">获取验证码</a>
          <span v-show="identifyCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
          </span>
        </div>
      </div>

      <div class="regist_container">
        <mt-button :disabled="!username || !password1 || loading"
                   @click="regist"
                   type="primary">注册</mt-button>
      </div>
    </div>
  </div>-->
  <div style="height:100%; background:white;">
    <Top-Header title="注册"></Top-Header>
    <div class="main-container">
      <div class="top">
        <div class="logo">
          <img src="static/img/logo5.png" />
        </div>
      </div>
      <div class="login">
        <div class="form">
          <!-- <el-form :rules="rules">
          <el-form-item prop="username">-->
          <div class="input-item">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-user"
              v-model="username"
              prop="username"
            ></el-input>
          </div>
          <!-- </el-form-item> -->
          <div class="input-item">
            <el-input placeholder="请输入手机号" prefix-icon="el-icon-mobile" v-model="telephone"></el-input>
          </div>
          <div class="input-item">
            <el-input
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
              :type="pwdType"
              v-model="password1"
            ></el-input>           
            <i class="iconfont" @click="IsShowEye" :class="count1%2==0?'icon-yanjing':'icon-yanjing_bi'"></i>
          </div>
          <div class="input-item">
            <el-input
              placeholder="确认密码"
              prefix-icon="el-icon-unlock"
              :type="pwdType2"
              v-model="password2"
            ></el-input>
            <i class="iconfont" @click="IsShowEye2" :class="count2%2==0?'icon-yanjing':'icon-yanjing_bi'"></i>
          </div>
          <div class="input-item">
            <img class="certificate" src="static/img/certificate.png" />
            <el-input placeholder="验证码" v-model="authCode"></el-input>
            <el-button class="identify" @click="getAuthCode" :class="{'disable':select}" :disabled="data.status">{{data.status?(data.second+'s'):'获取验证码'}}</el-button>
          </div>
          <div class="btn" :disabled="!username || !password1 || loading" @click="regist">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import TopHeader from "@/common/Header";
import { mapMutations, mapActions } from "vuex";
import { Field, Toast, Button } from "mint-ui";
import SIdentify from "@/components/verify/SIdentify";
import { getSMS, mallRegister } from "@/api/mallApi";
export default {
  name: "MallRegist",
  components: {
    TopHeader,
    SIdentify
  },
  created() {
    // this.getAuthCode();
  },
  data() {
    return {
      select:false,
      username: "",
      telephone: "",
      authCode: "",
      password1: "",
      password2: "",
      loading: false,
      data: {
        second: 60,
        status: false
      },
      count1:0,
      count2:0,
      pwdType:"password",
      pwdType2:"password"
      // rules:{
      //    username: [
      //       { required: true, message: '请输入用户名', trigger: 'blur' },
      //     ],
      // }
    };
  },
  methods: {
    IsShowEye(){
      this.count1++;
      this.pwdType=this.pwdType==='password'?'text' : 'password';
    },
    IsShowEye2(){
      this.count2++;
      this.pwdType2=this.pwdType2==='password'?'text' : 'password';
    },
    getAuthCode() {
      if (!this.telephone) {
        Toast({
          message: "请填写手机号",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      var data={
        phone:this.telephone
      }
      getSMS(data).then(res => {
        this.select=!this.select;
      // 验证码倒计时
        var vm=this;
        var data=vm.data;
        if(data.status) return;
        data.status=true;
        var time=setInterval(()=>{
          var second = data.second;
					  second--;
					  data.second = second;
					  if (second == 0) {
              clearInterval(time);
              data.second = 60;
              data.status = false;
					  }
        },1000);
      });
    },
    regist() {
      if (
        !this.username ||
        !this.password1 ||
        !this.telephone ||
        !this.authCode
      ) {
        Toast({
          message: "请填写完整信息",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      if (this.password1.length < 6) {
        Toast({
          message: "密码最少6位",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      if (this.password1 !== this.password2) {
        Toast({
          message: "密码不一致",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      mallRegister({
        username: this.username,
        password: this.password1,
        telephone: this.telephone,
        authCode: this.authCode
      })
        .then(res => {
          Toast("注册成功");
          this.loading = false;
          this.$router.go(-1);
        })
        .catch(() => {
          this.loading = false;
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.main-container {
  width: 100%;

  .top {
    width: 100%;
    height: 420px;
    background-image: url('../../../static/img/login-bg.png');
    background-size: 100% 100%;
    text-align: center;

    .logo {
      img {
        width:270px;
        height:auto;
        margin-top:100px;
      }
    }
  }

  .login {
    width: 100%;
    margin-top: -120px;

    .form {
      width: 75%;
      margin: 0 auto;
      padding: 6% 10% 10% 10%;
      background-color: #fff;
      border-radius: 30px;
      boder: 1px solid #ffffff;
      box-shadow: #6EEEAC 0 0 8px -4px;

      .input-item {
        border-bottom: 1px solid #BFC7DF;
        padding: 10px 0;
        position: relative;
        i{
          font-size:32px;
          width: 0.5rem;
          height: 0.5rem;
          cursor: pointer;
        }
        input {
          width: 100%;
          height: 90px;
        }

        img {
          width: 32px;
          height: 32px;
        }

        .certificate {
          position: absolute;
          top: 0.4rem;
          left: 0.24rem;
          z-index: 999;
        }

        .identify {
          position: absolute;
          top: 0.16rem;
          right: 0.1rem;
          z-index: 999;
          width: 2.5rem;
          text-align: center;
          padding: 0.35rem 0 0.3rem 0;
          background-color: #17c169;
          color: #fff;
          cursor: pointer;
          font-size: 0.35rem;
        }

        >>>.el-input__icon {
          color: #17C169;
          font-size: 40px;
        }

        >>>.el-input__inner {
          padding-left: 65px;
          font-size: 28px;
          color: #999999;
          border: none;
        }
        >>>.el-input{
          width:89%;
        }
      }

      .btn {
        width: 100%;
        height: 76px;
        border-radius: 38px;
        color: #fff;
        font-size: 34px;
        text-align: center;
        line-height: 76px;
        background: -moz-linear-gradient(top, #41E693 0%, #19C26B 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #41E693), color-stop(100%, #19C26B));
        background: -webkit-linear-gradient(top, #41E693 0%, #19C26B 100%);
        background: -o-linear-gradient(top, #41E693 0%, #19C26B 100%);
        background: -ms-linear-gradient(top, #41E693 0%, #19C26B 100%);
        background: linear-gradient(to bottom, #41E693 0%, #19C26B 100%);
        background-size: 100% 100%;
        margin-top: 100px;
      }
      .disable{
        opacity:.5;
      }
    }
  }
}
</style>