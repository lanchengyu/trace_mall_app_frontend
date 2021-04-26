<template>
  <div style="height:100%; background:white;">
    <Top-Header title="登陆"></Top-Header>
    <div class="main-container">
      <div class="page-part">
        <img src="static/img/login-market.png">
        <div class="form">
          <div class="input-item border-bottom">
            <el-input
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user"
                  v-model="username">
            </el-input>
          </div>
          <div class="input-item border-bottom">
            <el-input
                  placeholder="请输入密码"
                  prefix-icon="el-icon-unlock" type="password"
                  v-model="password">
            </el-input>
          </div>
          <div class="btn" :disabled="!username || !password || loading"
                @click="login">登陆</div>
        </div>
      </div>
      <!-- <div class="login_container">
        <mt-button :disabled="!username || !password || loading"
                   @click="login"
                   type="primary">登录</mt-button>
      </div> -->
      <!-- <div class="regist_container">
        <router-link to="regist">快速注册</router-link>
      </div> -->
    </div>
  </div>
</template>
<script >
import TopHeader from "@/common/header-three"
import { mapMutations, mapActions } from "vuex";
import { Field, Toast, Button } from 'mint-ui'
export default {
  name: "Login",
  components: {
    TopHeader
  },
  data () {
    return {
      username: '',
      password: '',
      loading: false
    };
  },
  methods: {
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
      this.$post('login', {
        username: this.username,
        password: this.password,
        flag: 1
      }).then((r) => {
        let data = r.data.data
        this.saveLoginData(data)
        setTimeout(() => {
          this.loading = false
        }, 500)
        this.$router.go(-1)
        // this.$router.push('/')
      }).catch(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
    },
    ...mapActions([
      'setToken',
      'setExpireTime',
      'setPermissions',
      'setRoles',
      'setUser'
    ]),
    saveLoginData (data) {
      this.setToken(data.token)
      this.setExpireTime(data.exipreTime)
      this.setUser(data.user)
      this.setPermissions(data.permissions)
      this.setRoles(data.roles)
    }
  }
}
</script>
<style lang="stylus" scoped>
.main-container {
  padding-top: 60px;
  width: 100%;
}

.page-part {
  margin: 0.8rem;
  text-align: center;
  img {
    width: 90%;
  }
  .form{
    margin-top:220px;
    .input-item{
      margin-top:79px;
    }
    >>>.el-input{
      border-bottom: 2px solid #EFEFEF;
    }
    >>>.el-input__icon{
      color:#158ABE;
      font-size:40px;
    }
    >>>.el-input__inner{
      padding-left: 65px;
      font-size:28px;
      color:#999999;
      border:none;
    }
    .btn{
      width:100%;
      height:110px;
      background: -moz-linear-gradient((top), #4AC6EF 0%, #39A4E3 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#4AC6EF), color-stop(100%,#39A3E3));
      background: -webkit-linear-gradient(top, #4AC6EF 0%,#39A3E3 100%);
      background: -o-linear-gradient(top, #4AC6EF 0%,#39A3E3 100%);
      background: -ms-linear-gradient(top, #4AC6EF 0%,#39A3E3 100%);
      background: linear-gradient(to bottom,#4AC6EF 0%,#39A3E3 100%);
      background-size: 100% 100%;
      color:#fff;
      border-radius:55px;
      line-height:110px;
      margin-top:127px;
      font-size:36px;
    }
  }
}

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