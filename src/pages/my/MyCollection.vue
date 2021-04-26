<template>
  <div style="height:100%;">
    <Collection-Header title="我的收藏"></Collection-Header>
    <div class="box">
      <div class="cartImg" v-if="!collections.length">
        <el-row :gutter="24">
          <el-col :span="6" :offset="3">
            <div class="empty-img">
              <img src="static/img/cart.png"/>
            </div>
          </el-col>
          <el-col :span="12">
            <div>
              <p class="empty-text">收藏夹为空，快去购物吧</p>
              <!-- <el-button class="empty-btn" @click="toHome" style="background-color:#F56C6C;color:#fff;">逛一逛</el-button>              -->
              <router-link class="empty-btn" to="/home">逛一逛</router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-else class="box-item"
           v-for="(item,index) in collections"
           :key="index">
        <div class="box-item-1">
          <p class="img">
            <img :src="item.productPic">
          </p>
          <p class="text">
            <span class="name">{{item.productName}}</span>
            <span class="price">¥{{item.productPrice}}</span>
          </p>

          <p class="right">
            <span class="right-1"
                  @click="cancelCollection(item.productId)">取消收藏</span>
            <span class="right-2"
                  @click="goDetalis(item.productId)">去购买</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CollectionHeader from "@/common/Header";
import { getProductCollection, deleteProductCollection, getProductIdCollection } from '@/api/mallApi'
import { Toast } from "mint-ui";
export default {
  name: "MyCollection",
  data () {
    return {
      collectionIndex: 0,
      collections: [],
      item: [
        {
          name: "商品"
        },
        {
          name: "文章"
        }
      ]
    };
  },
  components: {
    CollectionHeader
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getProductCollection().then(res => {
        this.collections = res.data
      })
    },
    cancelCollection (productId) {
      deleteProductCollection(productId).then(res => {
        Toast('取消收藏成功')
        this.getData()
        getProductIdCollection().then(res => {
          this.$store.dispatch("setGoods", res.data);
        })
      })
    },
    goDetalis (productId) {
      this.$router.push({
        path: "goodDetail",
        query: {
          id: productId
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.box {
  height: calc(100% - 1.45rem);
  overflow: auto;
  margin-top:0.3rem;
}
.cartImg {
  display: block;
  margin: auto;
  padding-top: 1.0rem;
    .empty-btn{
    margin-top: 0.5rem;
  }
  a {
    display: block;
    text-align: center;
    width: 110px;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
    text-align: center;
    background: #e0524b;
    color: white;
    font-weight: 800;
    font-size: 0.25rem;
  }
}
.cartImg .empty-img img{
  width: 1.6rem;
  height: 1.6rem;
}
.cartImg .empty-text{
  font-size:0.35rem;
  color:#888888;
}
.box-item {
  width: 100%;
  border-bottom: 1px solid #eee;

  .box-item-1 {
    width: 100%;
    height: 3rem;
    background: #ffffff;
    padding: 0.4rem;

    .img {
      width: 30%;
      height: 100%;
      float: left;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      img {
        display: block;
        width: 100%;
      }
    }

    .text {
      width: 45%;
      height: 100%;
      float: left;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.35rem;
        margin: 0 0.3rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical
        overflow: hidden;
      }

      .price {
        color: red;
        font-weight: 500;
        font-size: 0.4rem;
        margin: 0.3rem 0.3rem 0.1rem 0.3rem;
      }
    }

    .right {
      width: 25%;
      height: 100%;
      float: left;
      position: relative;

      .right-1 {
        display: block;
        position: absolute;
        top: 0;
        right: 0.35rem;
        font-size: 0.35rem;
        color: #666;
      }

      .right-2 {
        display: block;
        width: 70%;
        height: 0.7rem;
        line-height: 0.7rem;
        background: #ee480c;
        text-align: center;
        color: #ffffff;
        border-radius: 0.3rem;
        position: absolute;
        bottom: 0;
        right:0.35rem;
        font-size: 0.35rem;
      }
    }
  }
}
</style>
