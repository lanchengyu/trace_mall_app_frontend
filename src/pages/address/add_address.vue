<template>
  <div style="height: 100%;">
    <Address-Header :title="title"></Address-Header>
    <div class="address">
      <div class="address-box">
        <label for="">收货人：</label>
        <input type="text"
               v-model="address.name"
               placeholder="收货人姓名">
      </div>

      <div class="address-box">
        <label for="">手机号码：</label>
        <input type="text"
               v-model="address.phoneNumber"
               placeholder="收货人的手机号码">
      </div>

      <div class="address-box">
        <label for="">选择地址：</label>
      </div>
      <v-distpicker :province="address.province"
                    :city="address.city"
                    :area="address.region"
                    @province="selectProvince"
                    @city="selectCity"
                    @area="selectArea"
                    wrapper="address-wrapper"></v-distpicker>
      <div class="address-box">
        <label for="">邮编：</label>
        <input type="text"
               v-model="address.postCode"
               placeholder="邮编">
      </div>
      <div class="address-box">
        <label for="">详细地址：</label>
        <input type="text"
               v-model="address.detailAddress"
               placeholder="详细街道地址">
      </div>
    </div>

    <div class="footer">
      <a @click="save">保存地址</a>
    </div>
  </div>
</template>

<script>
import AddressHeader from "@/common/Header";
import VDistpicker from 'v-distpicker'
import { Toast } from "mint-ui";
import { addReceiveAddress, getReceiveAddressById, updateReceiveAddress } from '@/api/mallApi'
export default {
  name: "add_address",
  components: {
    AddressHeader,
    VDistpicker
  },
  data () {
    return {
      title: '新增收货地址',
      id: null,
      address: {
        name: '',
        phoneNumber: '',
        postCode: '',
        province: '',
        city: '',
        region: '',
        detailAddress: ''
      },
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true  //显示或者隐藏footer
    };
  },
  mounted(){
    // window.onresize监听页面高度的变化
    window.onresize = ()=>{
        return(()=>{
            this.showHeight = document.body.clientHeight;
        })()
    }
  },
  created () {
    this.id = this.$route.query.id;
    if (this.id) {
      this.title = '修改收获地址'
      getReceiveAddressById(this.id).then(res => {
        this.address = res.data
      })
    }
  },
  methods: {
    selectProvince (value) {
      this.address.province = value.value
    },
    selectCity (value) {
      this.address.city = value.value
    },
    selectArea (value) {
      this.address.region = value.value
      this.address.postCode = value.code
    },
    save () {
      if (
        this.address.name == "" ||
        this.address.phoneNumber == "" ||
        this.address.province == "" ||
        this.address.city == "" ||
        this.address.region == "" ||
        this.address.detailAddress == ""
      ) {
        Toast({
          message: "请填写完整信息",
          duration: 950
        });
      } 
      else {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/;
        if(!phoneReg.test(this.address.phoneNumber)){
          Toast("请输入正确格式的电话号码");
          return;
        }
        if (this.id) {
          updateReceiveAddress(this.id, this.address).then(res => {
            this.$router.back();
          })
        } else {
          addReceiveAddress(this.address).then(res => {
            this.$router.back();
          })
        }
      }
    }
  },
  watch:{
    showHeight:function() {
        if(this.docmHeight > this.showHeight){
            this.hidshow=false
        }else{
            this.hidshow=true
        }
    }
  }
};
</script>

<style lang="stylus" scoped>
.address {
  height: calc(100% - 1.45rem);

  .address-box {
    width: 100%;
    height: 1.5rem;
    line-height: 1.5rem;
    background: #fff;
    border-bottom:1px solid #F6F6F6;
    label {
      display: inline-block;
      padding-left: 0.58rem;
      font-size: 0.4rem;
      width: 30%;
    }

    input {
      display: inline-block;
      font-size: 0.4rem;
    }
  }

  .address-wrapper {
    padding-left: 0.58rem;
    font-size: 0.4rem;
    background: white;
  }

  .address-wrapper >>> select {
    padding: 0.2rem 0;
    margin: 0.1rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
    -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
  }
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.3rem;
  border-top: 1px solid #e0e0e0;
  background: #ffffff;

  a {
    display: block;
    margin: 0.18rem auto;
    text-align: center;
    width: 95%;
    height: 0.9rem;
    line-height: 0.9rem;
    border-radius: 0.45rem;
    font-size: 0.28rem;
    color: #fff;
    background-color: #17C169;
  }
}
</style>
