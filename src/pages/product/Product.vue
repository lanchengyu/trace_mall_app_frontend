<template>
  <div>
    <Product-Header title="产品详情"></Product-Header>
    <div v-if="loading"
         style="padding-top:70px;text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div v-else
         class="main-container">
      <div class="goodDetaiSwipe">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(img, index) in productSwipe"
                         :key="index">
            <img v-lazy="img.imageUrl"
                 alt="图片">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="productMain">
        <div class="productName">{{product.productName}}</div>
        <div style="text-align: justify;font-size: 0.348rem;">
          <span style="margin-left:-.2rem;color:#FF4B3D;">【{{company.companyName}}】</span>
        </div>
      </div>

      <div style="margin:0.5rem 0">
        <!-- <mt-cell title="批次列表"
                 :to="'batchList?id='+product.productId"
                 is-link>
          <i slot="icon"
             class="iconfont icon-eye" />
        </mt-cell> -->
      </div>

      <div>
        <mt-navbar v-model="selected">
          <mt-tab-item id="tab-container1">图文详情</mt-tab-item>
          <mt-tab-item id="tab-container2">产品配方</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="tab-container1">
            <div class="productImg">
              <p v-for="(img, index) in productDetail"
                 :key="index">
                <img v-lazy="img.imageUrl"
                     alt="详情图片">
              </p>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <div class="peizhi">
              <pre>{{product.recipe}}</pre>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <Copyright-Footer></Copyright-Footer>
  </div>
</template>

<script >
import { Toast, MessageBox, Navbar, TabItem, TabContainer, TabContainerItem } from "mint-ui";
import ProductHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
export default {
  name: "Product",
  components: {
    ProductHeader,
    CopyrightFooter
  },
  data () {
    return {
      selected: "tab-container1",
      product: {},
      productSwipe: [],
      productDetail: [],
      company: {},
      isFirstEnter: false,
      loading: false
    };
  },
  computed: {
  },
  beforeRouteEnter (to, from, next) {
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    if (from.name == 'batchList') {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是以上页面过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created () {
    this.isFirstEnter = true
  },
  activated () {
    if (!this.$route.meta.isBack || this.isFirstEnter) {
      // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
      // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
      this.loading = true
      this.reset()
      var id = this.$route.query.id
      this.$get('anon/product/details', { productId: id }).then((r) => {
        let data = r.data
        this.product = data.product
        this.company = data.company
        let productImages = data.productImages
        let productSwipe = []
        let productDetail = []
        let item
        for (var i = 0, len = productImages.length; i < len; i++) {
          item = productImages[i]
          if (item.label === 'productSwipe') {
            productSwipe.push(item)
          } else if (item.label === 'productDetail') {
            productDetail.push(item)
          }
        }
        this.productSwipe = productSwipe
        this.productDetail = productDetail
        this.loading = false
      });
    }
    // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
    this.$route.meta.isBack = false
    // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
    this.isFirstEnter = false;
  },
  mounted () {
  },

  methods: {
    reset () {
      this.product = {}
      this.homeSwipe = []
      this.company = {}
      this.isFirstEnter = false
    }
  }
};
</script>

<style lang="stylus" scoped>
.main-container {
  padding-top: 60px;
}

.icon-eye {
  color: blue;
  margin: 0 10px;
}

.icon-report {
  color: green;
  margin: 0 10px;
}

.mint-cell-title {
  display: flex;
}

.peizhi {
  width: 90%;
  margin: auto;

  div {
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
  }

  h3 {
    height: 2rem;
    line-height: 2.3rem;
    font-size: 0.5rem;
    border-bottom: 1px solid #ccc;
  }

  pre {
    font-size: 0.38rem;
    color: #888;
    margin-top: 0.3rem;
    white-space: pre-wrap;
    display: block;
  }

  p {
    height: 0.55rem;
    color: #888;
  }
}

.goodDetaiSwipe {
  height: 6.5rem;

  img {
    width: 100%;
    height: 6.5rem;
  }
}

.productMain {
  /* height: 1.8rem; */
  background: white;
  border-bottom: 1px solid #cecece;
  // border-top: 1px solid #cecece;
  padding: 0.4rem;
  margin-top: -15px;
}

.productName {
  color: black;
  font-weight: 400;
  font-size: 0.5rem;
  line-height: 1rem;
}

.productImg {
  margin-top: 4px;
  margin-bottom: 6px;
}

.productImg img {
  width: 100%;
  height: auto;
  display: block;
}

table td {
  font-size: 0.31rem;
  text-align: center;
  color: #000;
}
</style>
