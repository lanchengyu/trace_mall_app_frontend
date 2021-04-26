<!--  -->
<template>
  <div style="height:100%; background:#f0f0f0;">
    <div class="header">
        <div class="header-left"
            @click="$router.go(-1)">
        <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="header-in">昵称</div>
        <div class="header-right" @click="save">
          <span>保存</span>
        </div>
   </div>
   <div style="margin-top: 0.15rem"></div>
   <div class="content">
       <div class="item">
           <input placeholder="请输入您的昵称" v-model="userinfo.nickname"/>
       </div>
   </div>
</div>
</template>

<script>
import { mapState } from "vuex";
import {Toast} from 'mint-ui'
import { updateInfo, getCurrentUser } from "@/api/mallApi"
export default {
  name:"ModifyNickName",
  data () {
    return {
        userinfo: {
            nickname: '',
            phone: '',
      }
    };
  },
  created () {
    this.userinfo = {
      id: this.mallUser.id,
      nickname: this.mallUser.nickname,
      phone: this.mallUser.phone
    }
  },
  components: {},

  computed: {
    ...mapState({
      mallUser: state => state.mallUser,
    }),
  },

  methods: {
    save () {
      updateInfo(this.userinfo).then(res => {
        Toast('修改昵称成功')
        getCurrentUser().then(res => {
          this.$store.dispatch("setMallUser", res.data);
          this.$router.push({ path: "/my/info"});
        })
      })
    }
  }
}

</script>
<style lang="stylus" scoped>
.header {
  width: 100%;
  height: 1.45rem;
  background: white;
  border-bottom: 1px solid #eaeaea;
  z-index: 1;

  .header-left {
    width: 10%;
    height: 100%;
    float: left;

    i {
      font-size: 0.6rem;
      line-height: 1.45rem;
      text-align: center;
      display: block;
    }
  }

  .header-in {
    width: 78%;
    float: left;
    text-align: center;
    font-size: 0.48rem;
    line-height: 1.45rem;
    color:#666666;
  }

  .header-right {
    width: 10%;
    text-align: center;
    font-size: 0.45rem;
    line-height: 1.45rem;
    float: left;
    margin-right:2%;
    color:#17C169;
  }
}
.content{
    .item{
        padding:0.2rem 0;
        background-color:#fff;
        text-align:center;
        input{
            width:95%;
            height:1rem;
        }
    }
}
</style>