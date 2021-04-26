<template>
  <div style="height:100%; background:white;">
    <Top-Header title="登陆"></Top-Header>
    <div class="main-container">
      <div class="top">
        <div class="logo">
          <img src="static/img/logo5.png"/>
        </div>
      </div>
      <div class="login">
        <div class="form">
          <div class="input-item">
              <el-input
                placeholder="请输入用户名"
                prefix-icon="el-icon-user"
                v-model="username">
              </el-input>
          </div>
          <div class="input-item">
              <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-unlock" 
                :type="pwdType"
                v-model="password">
              </el-input>
              <i class="iconfont" @click="IsShowEye" :class="count1%2==0?'icon-yanjing':'icon-yanjing_bi'"></i>
          </div>
          <div class="register">
            <span><router-link to="/mall/telLogin">手机号登陆</router-link></span> 
            <span><router-link to="/mall/regist">立即注册</router-link></span>  
          </div> 
          <div class="btn" :disabled="!username || !password || loading"
               @click="login">登陆</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import TopHeader from "@/common/headerLogin"
import { Field, Toast, Button } from 'mint-ui'
import { mallLogin, getCurrentUser, getProductIdCollection } from '@/api/mallApi'
export default {
  name: "MallLogin",
  components: {
    TopHeader
  },
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      pwdType:'password',
      count1:0
    };
  },
  methods: {
    IsShowEye(){
      this.count1++;
      this.pwdType=this.pwdType==='password'?'text' : 'password';
    },
    login () {
      if (!this.username || !this.password) {
        Toast({
          message: '请输入用户名和密码',
          position: 'bottom',
          duration: 5000
        });
        return
      }
      this.loading = true
      mallLogin({ username: this.username, password: this.password }).then(response => {
        this.loading = false
        getCurrentUser().then(res => {
          this.$store.dispatch("setMallUser", res.data);
        })
        getProductIdCollection().then(res => {
          this.$store.dispatch("setGoods", res.data);
        })
        this.$router.push({path:"/home"})
      }).catch(error => {
        this.loading = false
        Toast("登陆失败，请检查账号密码是否正确");
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-container {
  width: 100%;
  .top{
    width:100%;
    height:420px;
    background-image:url('../../../static/img/login-bg.png');
    background-size:100% 100%;
    text-align:center;
    .logo{
      img{
        width:270px;
        height:auto;
        margin-top:100px;
      }
    }
  }
  .login{
    width:100%;
    margin-top:-120px;
    .form{
      width:75%;
      margin:0 auto;
      padding:10% 10% 18% 10%;
      background-color:#fff;
      border-radius:30px;
      border:1px solid #ffffff;
      box-shadow:#6EEEAC 0 0 8px -4px;
      .input-item{
        border-bottom:1px solid #BFC7DF;
        padding-top:25px;
        input{
          width:100%;
          height:90px;
        }
        img{
          width:32px;
          height:32px;
        }
        >>>.el-input{
          padding:0.1rem 0;
          width:90%;
          
        }
        >>>.el-input__icon{
          color:#17C169;
          font-size:40px;
        }
        >>>.el-input__inner{
          padding-left: 65px;
          font-size:28px;
          color:#999999;
          border:none;
        }
      }
      .register{
        padding:24px 0;
        span{
          display:inline-block;
          width:calc(50% - 0.1rem);
          a{
            color:#17C169;
            font-size:28px;
          }
        }
        span:nth-child(1){
          text-align:left;
        }
        span:nth-child(2){
          text-align:right;
        }
      }
      .btn{
        width:100%;
        height:76px;
        border-radius:38px;
        color:#fff;
        font-size:34px;
        text-align:center;
        line-height:76px;
        background: -moz-linear-gradient((top), #43E894 0%, #1AC46C 100%);
        background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#43E894), color-stop(100%,#1AC46C));
        background: -webkit-linear-gradient(top, #43E894 0%,#1AC46C100%);
        background: -o-linear-gradient(top, #43E894 0%,#1AC46C 100%);
        background: -ms-linear-gradient(top, #43E894 0%,#1AC46C 100%);
        background: linear-gradient(to bottom,#43E894 0%,#1AC46C 100%);
        background-size: 100% 100%;
        margin-top:100px;
      }
    }
  }
}

// .page-part {
//   margin: 0.5rem;
//   text-align: center;

//   img {
//     width: 80%;
//   }
// }

// .input-item {
//   padding: 0.3rem;
//   display: inline-flex;

//   label {
//     font-size: 0.5rem;
//     line-height: 1rem;
//   }

//   input {
//     font-size: 0.5rem;
//     line-height: 1rem;
//     background-color: inherit;
//     margin: 0 0.5rem;
//   }

//   input::-webkit-input-placeholder {
//     color: #ddd;
//   }
// }

// .border-bottom {
//   border-bottom: 1px solid #ddd;
// }

// .login_container {
//   padding: 0.5rem;

//   button {
//     width: 100%;
//     background-color: #4cd964;
//     border: 1px;
//     border-radius: 0.15rem;
//     text-align: center;
//     font-size: 0.5rem;
//     color: white;
//   }
// }

// .regist_container {
//   padding: 0 0.5rem;
//   font-size: 0.4rem;
//   text-align: right;
// }
</style>