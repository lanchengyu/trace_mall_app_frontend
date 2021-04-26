<template>
  <div style="height:100%;">
    <Search-two></Search-two>
    <div class="home-main" id="home-main">
      <Home-Swipe :advertiseList="advertiseList"></Home-Swipe>
      <Home-List :category="category"></Home-List>
      <div class="title">
        品牌直供
        <span class="right-text" @click="moreBrand()">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <Brand-Container :brandList="brandList"></Brand-Container>
      <div class="title">
        最新上架
        <span class="right-text" @click="moreGood('new')">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <Good-Container :productList="newProductList"></Good-Container>
      <div class="title">
        人气推荐
        <span class="right-text" @click="moreGood('hot')">
          更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <Good-Container :productList="hotProductList"></Good-Container>
    </div>
    <Home-Footer></Home-Footer>
  </div>
</template>

<script>
import HomeSwipe from "./component/HomeSwipe";
import HomeList from "./component/HomeList";
import GoodContainer from "./component/GoodContainer";
import BrandContainer from "./component/BrandContainer";
import HomeFooter from "@/pages/footer";
import SearchTwo from "@/common/Search-two";
import { fetchHomeContent, getProductCateList } from "@/api/mallApi";
export default {
  name: "Home",
  data() {
    return {
      products: [],
      advertiseList: [],
      newProductList: [],
      hotProductList: [],
      brandList: [],
      category: []
    };
  },
  components: {
    HomeSwipe,
    HomeList,
    GoodContainer,
    HomeFooter,
    BrandContainer,
    SearchTwo
  },
  mounted: function() {
    this.getData();
  },
  // //进入该页面时，用之前保存的滚动位置赋值
  // beforeRouteEnter (to, from, next) {
  //   next(vm => {
  //     let recruitScrollY = this.$store.state.recruitScrollY;
  //     document.getElementById("home-main").scrollTop=recruitScrollY;
  //     console.log(document.getElementById("home-main").scrollTop)
  //   })
  // },
  beforeRouteLeave(to, from, next) {
    var position=document.getElementById("home-main").scrollTop; 
    // console.log("position",position)
    if (position === 0) position = 0;
    //离开路由时把位置存起来
    this.$store.dispatch("setScrollY", position);
    next();
  },
  methods: {
    getData() {
      fetchHomeContent().then(response => {
        let data = response.data;
        this.advertiseList = data.advertiseList;
        this.newProductList = data.newProductList;
        this.hotProductList = data.hotProductList;
        this.brandList = data.brandList;
      });
      getProductCateList(0).then(res => {
        this.category = res.data;
      });
    },
    moreGood(type) {
      this.$router.push({ path: "goodMore", query: { type: type } });
    },
    moreBrand() {
      this.$router.push({ path: "brandMore" });
    }
  },
  watch: {
    $route(to, from) {
      if (to.name == "home") {
        //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面
        let recruitScrollY = this.$store.state.recruitScrollY;
        document.getElementById("home-main").scrollTop=recruitScrollY;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.home-main {
  height: calc(100% - 1.5rem);
  overflow: auto;
}

.title {
  font-family: 'SimSun';
  padding: 0rem 0.3rem;
  margin: 0.2rem 0;
  font-size: 30px;
  position: relative;
  color: #333333;
  height: 0.8rem;
  line-height: 0.8rem;
  font-weight: bold;

  .right-text {
    font-size: 30px;
    color: #999;
    position: absolute;
    right: 0.3rem;
  }
}

>>> .el-icon-arrow-right {
  font-size: 30px;
  color: #999;
}
</style>

