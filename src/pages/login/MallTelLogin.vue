<template>
  <div style="height:100%; background:white;">
    <Top-Header title="登陆"></Top-Header>
    <div class="main-container">
      <div class="top">
        <div class="logo">
          <img src="static/img/logo5.png" />
        </div>
      </div>
      <div class="login">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <div class="form">
          <el-form-item prop="phone">
            <div class="input-item">
                <el-input placeholder="请输入手机号" prefix-icon="el-icon-mobile" v-model="ruleForm.phone"></el-input>
            </div>
          </el-form-item>
          <div class="input-item">
            <img class="certificate" src="static/img/certificate.png" />
            <el-input placeholder="验证码" v-model="authCode"></el-input>
            <el-button id="authCodeBtn" class="identify" @click="getAuthCode" :class="{'disable':select}"  :disabled="data.status">{{data.status?(data.second+'s'):'获取验证码'}}</el-button>
          </div>
          <div class="btn" :disabled="!phone || !authCode || loading" @click="telLogin">登陆</div>
        </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script >
import TopHeader from "@/common/Header";
import { mapMutations, mapActions } from "vuex";
import { Field, Toast, Button } from "mint-ui";
import SIdentify from "@/components/verify/SIdentify";
import { getSMS, mallTelLogin,getCurrentUser,getProductIdCollection } from "@/api/mallApi";
export default {
  name: "MallTelLogin",
  components: {
    TopHeader,
    SIdentify
  },
  created() {
  },
  data() {
    return {
      ruleForm:{
        phone:''
      },
      rules:{
        phone:[
          { validator: this.checkPhone, trigger: 'blur' }
        ]
      },
      select:false,
      phone: "",
      authCode: "",
      loading: false,
      data: {
        second: 60,
        status: false
      }
    };
  },
  methods: {
    checkPhone(rule, value, callback)  {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号码不能为空'))
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
        // 所以我就在前面加了一个+实现隐式转换
        if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    },
    getAuthCode() {
      if (!this.ruleForm.phone) {
        Toast({
          message: "请填写手机号",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      var data={
        phone:this.ruleForm.phone
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
    telLogin() {
      if (
        !this.ruleForm.phone ||
        !this.authCode
      ) {
        Toast({
          message: "请填写手机号和验证码",
          position: "bottom",
          duration: 5000
        });
        return;
      }
      mallTelLogin({
        phone: this.ruleForm.phone,
        code: this.authCode
      })
        .then(res => {
          Toast("登陆成功");
          this.loading = false;
          getCurrentUser().then(res => {
            this.$store.dispatch("setMallUser", res.data);
          })
          getProductIdCollection().then(res => {
            this.$store.dispatch("setGoods", res.data);
          })
            this.$router.push({path:"/home"});
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
        .disable{
          opacity:.5;
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
    }
  }
}
>>>.el-form-item {
    margin-bottom: 25px; 
}
// >>>.el-form-item__content{
//   line-height:40px;
// }
</style>