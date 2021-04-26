<template>
  <div style="height:100%">
    <div class="search">
      <div class="search-left"
           @click="$router.go(-1)">
        <i class="iconfont icon-zuojiantou"></i>
      </div>
      <div class="search-in">
        <el-input placeholder="请输入商品名称"
                  prefix-icon="el-icon-search"
                  v-model="input">
        </el-input>
      </div>
      <div class="search-right"
           @click="simpleSearch">
        搜索
      </div>
    </div>
    <div class="list"
         ref="searchWrapper"
         :style="{ height: wrapperHeight + 'px' }">
      <div class="empty"
           v-show="list.length===0">暂无商品</div>
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :autoFill=false
                   @bottom-status-change="handleBottomChange"
                   ref="loadmore">
        <div class="list-item"
             v-for="(item,index) in list"
             :key="index">
          <router-link :to="{name:'goodDetail', query:{id: item.id}}">
            <span class="img">
              <img :src="item.pic">
            </span>
            <span class="text">
              <!-- <p class="name">{{item.brandName}} {{item.name}}</p> -->
              <p class="name">{{item.subTitle}}</p>
              <p class="price top">¥{{item.price}}</p>
              <p class="btns top">
                <span>自营</span>
                <!-- <span>满39减5</span> -->
                <span>本地仓</span>
              </p>
              <p class="evaluation top">
                <span>{{totalEval[index]}}条评价</span>
                <span>好评99%</span>
              </p>
            </span>
          </router-link>
        </div>
        <div class="space"></div>
        <div slot="bottom"
             class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'"
                :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner type="snake"></mt-spinner>
          </span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { getSimpleSearchList, getSearchList, searchByCategory, searchByBrand,getProductEvaluation} from '@/api/mallApi'
import { Loadmore } from 'mint-ui';
export default {
  name: "GoodList",
  data () {
    return {
      wrapperHeight: 0,
      list: [],
      allLoaded: false,
      bottomStatus: '',
      pageNum: 0,
      input: '',
      categoryId: null,
      brandId: null,
      totalEval:[]
    }
  },
  created () {
    var categoryId = this.$route.query.categoryId;
    var brandId = this.$route.query.brandId;
    if (categoryId) {
      this.categoryId = categoryId
      this.getDataByCategory()
    } else if (brandId) {
      this.brandId = brandId
      this.getDataByBrand()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.searchWrapper.getBoundingClientRect().top
    })
  },
  methods: {
    getDataByBrand () {
      var params = { pageNum: 0, brandId: this.brandId }
      searchByBrand(params).then(res => {
        this.updateSearchData(res.data)
      })
    },
    getDataByCategory () {
      var params = { pageNum: 0, categoryId: this.categoryId }
      searchByCategory(params).then(res => {
        this.updateSearchData(res.data)
      })
    },
    simpleSearch () {
      this.pageNum = 0
      this.categoryId = null
      this.brandId = null
      var params = { pageNum: 0 }
      if (this.input) params.keyword = this.input
      getSimpleSearchList(params).then(res => {
        this.updateSearchData(res.data)
      })
    },
    loadBottom () { // 上拉加载
      var params = {}
      params.pageNum = this.pageNum + 1
      if (this.categoryId) {
        params.categoryId = this.categoryId
        searchByCategory(params).then(res => {
          this.updateLoadBottomData(res.data)
        })
      } else if (this.brandId) {
        params.brandId = this.brandId
        searchByBrand(params).then(res => {
          this.updateLoadBottomData(res.data)
        })
      } else {
        if (this.input) params.keyword = this.input
        getSimpleSearchList(params).then(res => {
          this.updateLoadBottomData(res.data)
        })
      }
    },
    updateSearchData (data) {
      this.list = data.list
      if (data.totalPage === 0 || data.pageNum === data.totalPage - 1) {
        this.allLoaded = true;
      }
      //通过商品id查询评论
      for(var i=0;i<this.list.length;i++){
        let params={id:this.list[i].id};
        getProductEvaluation(params).then(res=>{
          this.totalEval.push(res.data.total)
        })
      }
    },
    updateLoadBottomData (data) {
      this.list = this.list.concat(data.list)
      this.pageNum = data.pageNum
      if (data.totalPage === 0 || data.pageNum === data.totalPage - 1) {
        this.allLoaded = true;
      }
      this.$refs.loadmore.onBottomLoaded()
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    },
  }
}
</script>


<style lang="stylus" scoped>
.search {
  width: 100%;
  height: 1.45rem;
  line-height: 1.45rem;
  background: white;
  border-bottom: 1px solid #eaeaea;
  z-index: 1;

  .search-left {
    width: 10%;
    float: left;

    i {
      font-size: 0.6rem;
      text-align: center;
      display: block;
    }
  }

  .search-in {
    width: 78%;
    float: left;
    >>>.el-input {
      display: block;
    }

    >>>.el-input__inner {
      border-radius: 2rem;
      height:1rem;
    }
  }

  .search-right {
    width: 12%;
    text-align: center;
    font-size: 30px;
    color:#666666;
    float: left;
  }
}

.list {
  overflow: auto;
  padding-top:0.3rem;
  background-color:#F9F9F9;
  .empty {
    text-align: center;
    color: darkgray;
  }

  .list-item {
    height: 3.5rem;
    background: #ffffff;
    border-bottom: 1px solid #E6E6E6;
    padding:16px;
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
      width: 67%;
      height: 100%;
      display:inline-block;
      margin-left:3%
      .name {
        font-size: 0.4rem;
        color:#444;
      }

      .price {
        color: #F95908;
        font-weight: 500;
        font-size: 0.6rem;
      }

      .btns{
        span{
          border:2px solid #F95908;
          border-radius:4px;
          color:#F95908;
          display:inline-block;
          margin-right:22px;
          padding:3px 5px;
        }
        :nth-child(1){
          background: -moz-linear-gradient((left), #F41E10 0%, #FE612E 100%);
          background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#F41E10), color-stop(100%,#FE612E));
          background: -webkit-linear-gradient(left, #F41E10 0%,#FE612E 100%);
          background: -o-linear-gradient(left, #F41E10 0%,#FE612E 100%);
          background: -ms-linear-gradient(left, #F41E10 0%,#FE612E 100%);
          background: linear-gradient(to right,#F41E10 0%,#FE612E 100%);
          color:#fff;
          font-size:26px;
          font-weight:600;
          letter-spacing:3px;
          text-align: center;
          padding:0;
        }
      }
      .evaluation{
        color:#A2A2A2;
        font-size:20px;
      }
      .top{
        margin-top:0.22rem;
      }
    }
  }
  .space{
    width:100%;
    height:84px;
    background-color:#fff;
  }
}
</style>
