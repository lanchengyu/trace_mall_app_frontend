<template>
  <div style="height:100%;">
    <Address-Header :title="title"></Address-Header>
    <div class="Address-box">
      <div class="pay-address"
           v-for="(item,index) in addressList"
           :key="index"
           :class="{active:select && item.id === currentAddress.id}">
        <div @click="selectAddress(item)">
          <p class="address-box">
            <span class="name">收货人：{{item.name}}</span>
            <span class="phone">{{item.phoneNumber}}</span>
            <i v-show="select && item.id === currentAddress.id"
               class="iconfont icon-check" />
          </p>
          <p class="address-details">收货地址：{{item.province}}{{item.city}}{{item.region}}{{item.detailAddress}}</p>
        </div>
        <div class="address-operation">
          <p class="address-operation-box">
            <el-radio v-model="defaultAddressIndex"
                      @change="radioChange"
                      :label="index">设为默认</el-radio>
            <i class="iconfont icon-bianji"
               @click="editAddress(item.id)"></i>
            <i class="iconfont icon-lajitong"
               @click="deleteAddress(item.id)"></i>
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <a @click="addAddress">+添加新地址</a>
    </div>
  </div>
</template>


<script>
import AddressHeader from '@/common/Header';
import { Toast } from 'mint-ui'
import { mapState, mapActions } from 'vuex';
import { getReceiveAddress, deleteReceiveAddress, updateReceiveAddress } from '@/api/mallApi'
export default {
  name: 'address',
  components: {
    AddressHeader
  },
  data () {
    return {
      defaultAddressIndex: -1,
      preIndex: -1,
      addressList: [],
      title: '管理收货地址',
      select: false
    }
  },
  created () {
    if (this.$route.query.select) {
      this.title = '选择收货地址'
      this.select = true
    }
    this.getAddress()
  },
  computed: {
    ...mapState({
      currentAddress: state => state.currentAddress
    })
  },
  methods: {
    ...mapActions([
      'setCurrentAddress'
    ]),
    selectAddress (item) {
      if (this.select) {
        this.setCurrentAddress(item)
        this.$router.back();
      }
    },
    addAddress () {
      this.$router.push({
        path: "add_address"
      });
    },
    editAddress (id) {
      this.$router.push({
        path: "add_address",
        query: {
          id: id
        }
      });
    },
    getAddress () {
      getReceiveAddress().then(res => {
        this.addressList = res.data
        // console.log(this.addressList)
        for (let i = 0; i < this.addressList.length; i++) {
          if (this.addressList[i].defaultStatus === 1) {
            this.defaultAddressIndex = i
            this.preIndex = i
          }
        }
      })
    },
    radioChange (index) {
      let address1 = this.addressList[index]
      address1.defaultStatus = 1
      let address2 = this.addressList[this.preIndex]
      address2.defaultStatus = 0
      this.preIndex = index
      updateReceiveAddress(address1.id, address1).then(res => {
        updateReceiveAddress(address2.id, address2).then(res => {
          this.getAddress()
        })
      })
    },
    deleteAddress (id) {
      deleteReceiveAddress(id).then(res => {
        Toast('删除成功')
        this.getAddress()
      })
    }
  }
};
</script>


<style lang="stylus" scoped>
.Address-box {
  height: calc(100% - 2.75rem);
  overflow: auto;
  padding-bottom: 0.2rem;

  .active {
    color: red;
  }

  .pay-address {
    width: 100%;
    height: 3.5rem;
    background: #ffffff;
    background-size: 1.6rem;
    margin-top: 0.3rem;
    display: block;

    .address-box {
      width: 87%;
      margin: auto;
      font-size: 0.4rem;
      padding-top: 0.3rem;
      padding-bottom: 0.3rem;
      .phone {
        margin-left: 0.3rem;
      }

      i {
        float: right;
      }
    }

    .address-details {
      width: 87%;
      height: 1rem;
      margin: auto;
      color: #666;
      font-size: 0.38rem;
    }

    .address-operation {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      margin-top: 0.3rem;

      .address-operation-box {
        width: 100%;
        border-top: 1px solid #eaeaea;
        padding-left: 0.5rem;

        i {
          float: right;
          font-size: 0.5rem;
          margin-right: 1.2rem;
          color: #a3a3a3;
        }
      }
    }
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
    float: none;
    display: block;
    margin: 0.18rem auto;
    text-align: center;
    width: 95%;
    height: 0.9rem;
    line-height: 0.9rem;
    border-radius: 0.45rem;
    font-size: 0.35rem;
    color: #fff;
    background-color: #17C169;
  }
}
</style>
