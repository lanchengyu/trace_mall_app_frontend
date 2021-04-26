<template>
  <div style="height:100%; background:#f0f0f0;">
    <Top-Header></Top-Header>
    <div class="main-container">
      <!-- <div class="container-bj">
        <img v-if="mallUser.icon"
             :src="mallUser.icon">
        <img v-else
             src="static/img/tou.jpg">
      </div> -->
      <el-row class="row">
        <el-col :span="5" :offset="1">
          <p>头像</p>
        </el-col>
        <el-col :span="17" :pull="1" class="headImg right">
          <img v-if="mallUser.icon"
             :src="mallUser.icon">
          <img v-else
             src="static/img/tou.jpg">
        </el-col>
      </el-row>
      <el-row class="row">
        <el-col :span="5" :offset="1">
          <p>手机号码</p>
        </el-col>
        <el-col :span="17" :pull="1" class="right">
          <span>{{userinfo.phone}}</span>
        </el-col>
      </el-row>
      <el-row class="row">
        <router-link to="/my/ModifyNickName">
          <el-col :span="5" :offset="1">
            <p>昵称</p>
          </el-col>
          <el-col :span="17" :pull="1" class="right">
            <span>{{userinfo.nickname}}</span>
          </el-col>
        </router-link> 
      </el-row>
      <mt-actionsheet
        :actions="data"
        v-model="sheetVisible">
      </mt-actionsheet>
    </div>
    <div class="logout">
      <div class="btn" @click="logout">退出登陆</div>
        <p>当前版本：1.1.0</p>
      </div>
  </div>
</template>

<script>
import TopHeader from "@/common/Header"
import { DatetimePicker, Toast,Actionsheet} from 'mint-ui';
import { mapState } from "vuex";
import { updateInfo, getCurrentUser,mallLogout} from "@/api/mallApi"
import moment from 'moment'
export default {
  name: "MyInfo",
  components: {
    TopHeader
  },
  data () {
    return {
      // startDate: new Date('1970-01-01'),
      userinfo: {
        nickname: '',
        phone: '',
        // city: '',
        // job: '',
        // personalizedSignature: '',
        // birthday: null
      },
      sheetVisible:false,
      data:[{
        name:"拍照",
        method:this.getCamera
      },{
        name:"从相册中选择",
        method:this.getLibary
      }],
    }
  },
  computed: {
    ...mapState({
      mallUser: state => state.mallUser,
    }),
  },
  created () {
    this.userinfo = {
      id: this.mallUser.id,
      nickname: this.mallUser.nickname,
      phone: this.mallUser.phone,
      // personalizedSignature: this.mallUser.personalizedSignature,
      // city: this.mallUser.city,
      // job: this.mallUser.job,
      // birthday: this.mallUser.birthday
    }
  },
  methods: {
    moment,
    openPicker () {
      this.$refs.picker.open()
    },
    openActions(){
      this.sheetVisible=true;
    },
    getCamera(){
      console.log("拍照");
    },
    getLibary(){
      console.log("从相册中选择");
    },
    logout () {
      mallLogout().then(res => {
        this.$store.dispatch("setMallUser", {});
        this.$store.dispatch("setGoods", []);
        this.$store.dispatch("setCurrentAddress",{});
        this.$router.push({ path: "/mall/login"});
        Toast({
          message: '退出成功',
          position: 'bottom',
          duration: 2000
        })
      })
      // console.log('logout:', this.user.id)
      // this.$get(`logout/${this.user.id}`).then(() => {
      //   return new Promise((resolve, reject) => {
      //     this.$db.clear()
      //     location.reload()
      //   })
      // }).catch((e) => {
      //   console.error(e)
      //   Toast({
      //     message: '退出系统失败',
      //     position: 'bottom',
      //     duration: 5000
      //   });
      // })
    },
  }
}
</script>

<style lang="stylus" scoped>
.main-container {
  height: calc(85% - 1.45rem);
  overflow: auto;
  .row{
    width:100%;
    height:1.45rem;
    line-height:1.45rem;
    background-color:#fff;
    font-size:0.4rem;
    border-bottom:1px solid #F6F6F6;
    p{
      color:#474747;
    }
    .right{
      text-align:right;
    }
    .headImg{
      img{
        width:80px;
        height:80px;
        border-radius:50%;
      }
    }
  }
}

// .MyInfoMain {
//   margin-top: 0.5rem;
//   font-size: 0.4rem;
//   text-align: center;
// }

// .container-bj {
//   width: 100%;
//   height: 4rem;
//   background: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;

//   img {
//     width: 2.3rem;
//     height: 2.3rem;
//     border-radius: 50%;
//   }
// }

// .my-cell {
//   label {
//     width: 2.5rem;
//   }

//   input {
//     font-size: 0.4rem;
//     line-height: 0.8rem;
//     background-color: inherit;
//   }

//   input::-webkit-input-placeholder {
//     color: #ddd;
//   }
// }
.logout{
  width:100%;
  .btn{
    width:490px;
    height:96px;
    background-color:#fff;
    border-radius:48px;
    margin:0 auto;
    text-align:center;
    line-height:96px;
    font-size:0.45rem;
    color:#999999;
  }
  p{
    text-align:center;
    font-size:26px;
    color:#6F6F6F;
    padding-top:21px;
  }
}
// .footer {
//   margin-top: 0.5rem;
//   width: 100%;
//   height: 1.3rem;

//   a {
//     float: none;
//     display: block;
//     margin: 0.18rem auto;
//     text-align: center;
//     width: 95%;
//     height: 0.9rem;
//     line-height: 0.9rem;
//     border-radius: 20px;
//     font-size: 0.4rem;
//     color: #fff;
//     background-color: #00acff;
//   }
// }
</style>
