<template>
  <div>
    <Category-Header title="商品分类"></Category-Header>
    <div v-if="loading"
         style="text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div v-else
         class="main-container">
      <div class="calssify-left"
           ref="wrapper">
        <ul>
          <li v-for="(category,index) in categorys"
              :key="index"
              @click="getChildren(index, category.id)"
              :class="{activeli:index===classifyIndex}">
            {{category.name}}
            <div :class="{active:index===classifyIndex}"></div>
          </li>
        </ul>
      </div>
      <div class="calssify-right"
           ref="wrapper2">
        <!-- <label>热门分类</label> -->
        <div class="item-card">
          <ul>
            <li v-for="(item,index) in children"
                :key="index"
                @click="search(item)">
              <img :src="item.icon">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Home-Footer></Home-Footer>
  </div>
</template>

<script>
import CategoryHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
import { MessageBox } from "mint-ui";
import { Button } from "element-ui";
import { getProductCateList } from "@/api/mallApi"
import HomeFooter from '@/pages/footer'

export default {
  name: "Category",
  data () {
    return {
      categorys: [],
      children: [],
      classifyIndex: -1,
      loading: true,
      categoryId: null
    };
  },
  components: {
    CategoryHeader,
    HomeFooter
  },
  created () {
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    reset () {
      this.categorys = []
      this.children = []
      this.classifyIndex = 0
    },
    getCategory () {
      getProductCateList(0).then(res => {
        this.categorys = res.data
        this.loading = false
        this.$nextTick(() => {
          if (this.categorys) {
            this.getChildren(0, this.categorys[0].id)
          }
        })
      })
    },
    getChildren (index, categoryId) {
      if (this.classifyIndex !== index) {
        this.classifyIndex = index

        getProductCateList(categoryId).then(res => {
          this.children = res.data
          this.loading = false
        })
      }
    },
    search (item) {
      this.$router.push({ path: '/goodList', query: { categoryId: item.id } })
    }
  }
};
</script>

<style lang="stylus" scoped>

.item-card {
  background: white;
  padding: 0.3rem;
  min-height: 2rem;
}

.main-container {
  margin-bottom: 1.5rem;
  display: flex;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  margin-top: 1.45rem;
  .calssify-left::-webkit-scrollbar {
    display: none;    
  }
  .calssify-right::-webkit-scrollbar {
    display: none;    
  }
  .calssify-left {
    width: 190px;
    height: 100%;
    background: #F6F6F6;
    margin-bottom: 1.51rem;
    font-size: 0.35rem;
    color:#606060;
    overflow: auto;

    li {
      height: 1.5rem;
      width: 100%;
      // padding:0.3rem 0;
      line-height: 1.5rem;
      text-align: center;
      border-bottom: 1px solid #EEEEEE;
      position:relative;
    }
    .activeli{
      background: #ffffff;
     color: #17C169;
    }
  }

  // .active {
  //   border-left: 5px solid #3AA5E4;
  //   background: #ffffff;
  //   color: #3AA5E4;
  // }
  .active{
    // display:none;
    width:10px;
    height:64px;
    background-color:#17C169;
    position:absolute;
    top:25px;
    left:0px;
  }
  .calssify-right {
    flex: 1;
    height: 100%;
    background: #ffffff;
    margin-bottom: 1.51rem;
    padding: 0 10px;
    overflow: auto;
    
    .category-pic {
      text-align: center;

      img {
        max-width: 100%;
        margin-top: 0.3rem;
      }
    }

    label {
      font-size: 0.34rem;
      line-height: 1rem;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 33%;
        font-size: 0.34rem;
        float: left;

        img {
          width: 90%;
          display: block;
          margin: auto;
        }

        span {
          color: #999;
          line-height: 0.6rem;
          font-size: 0.34rem;
        }
      }
    }
  }
}
</style>