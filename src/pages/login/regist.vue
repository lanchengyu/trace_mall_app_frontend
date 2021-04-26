<template>
  <div style="height:100%; background:white;">
    <Top-Header style="background:#3190e8;color:white"
                title="道业注册"></Top-Header>
    <div class="main-container">
      <div class="page-part">
        <div class="input-item border-bottom">
          <label>账号</label>
          <input placeholder="请输入账号"
                 v-model="username" />
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
      </div>
      <div class="regist_container">
        <mt-button :disabled="!username || !password1 || loading"
                   @click="regist"
                   type="primary">注册</mt-button>
      </div>
    </div>
  </div>
</template>
<script >
import TopHeader from "@/common/Header"
import { mapMutations, mapActions } from "vuex";
import { Field, Toast, Button } from 'mint-ui'
export default {
  name: "regist",
  components: {
    TopHeader
  },
  data () {
    return {
      username: '',
      password1: '',
      password2: '',
      loading: false
    };
  },
  methods: {
    regist () {
      if (!this.username || !this.password1) {
        Toast({
          message: '请输入用户名和密码',
          position: 'bottom',
          duration: 5000
        });
        return
      }
      if (this.password1.length < 6) {
        Toast({
          message: '密码最少6位',
          position: 'bottom',
          duration: 5000
        });
        return
      }
      if (this.password1 !== this.password2) {
        Toast({
          message: '密码不一致',
          position: 'bottom',
          duration: 5000
        });
        return
      }
      this.$post('regist', {
        username: this.username,
        password: this.password1
      }).then((r) => {
        Toast({
          message: '注册成功',
          iconClass: 'icon icon-success'
        });
        this.loading = false
        this.$router.go(-1)
        // this.$router.push('/')
      }).catch(() => {
        setTimeout(() => {
          this.loading = false
        }, 500)
      })
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
  margin: 0.5rem 0.8rem;
}

.input-item {
  padding: 0.3rem;
  display: inline-flex;
  width: 100%;

  label {
    width: 2rem;
    font-size: 0.4rem;
    line-height: 0.8rem;
  }

  input {
    font-size: 0.4rem;
    line-height: 0.8rem;
    background-color: inherit;
  }

  input::-webkit-input-placeholder {
    color: #ddd;
  }
}

.border-bottom {
  border-bottom: 1px solid #ddd;
}

.regist_container {
  padding: 0.5rem;

  button {
    width: 100%;
    background-color: #4cd964;
    border: 1px;
    border-radius: 0.15rem;
    text-align: center;
    font-size: 0.5rem;
    color: white;
  }
}

.regist_container {
  padding: 0 0.8rem;
  font-size: 0.4rem;
  text-align: right;
}
</style>