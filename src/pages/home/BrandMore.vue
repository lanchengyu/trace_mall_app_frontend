<template>
  <div style="height:100%">
    <Top-Header title="品牌推荐"></Top-Header>
    <div class="list"
         ref="searchWrapper"
         :style="{ height: wrapperHeight + 'px' }">
      <div class="empty"
           v-show="list.length===0">暂无信息</div>
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   :autoFill=false
                   @bottom-status-change="handleBottomChange"
                   ref="loadmore">
        <Brand-Container :brandList="list"></Brand-Container>
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
import { brandList } from '@/api/mallApi'
import { Loadmore } from 'mint-ui';
import TopHeader from "@/common/Header"
import BrandContainer from './component/BrandContainer';
export default {
  name: "BrandMore",
  components: {
    BrandContainer,
    TopHeader
  },
  data () {
    return {
      wrapperHeight: 0,
      list: [],
      allLoaded: false,
      bottomStatus: '',
      limit: 8
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$refs.searchWrapper.getBoundingClientRect().top)
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.searchWrapper.getBoundingClientRect().top
    })
  },
  methods: {
    getData () {
      brandList({ offset: this.list.length, limit: this.limit }).then(res => {
        this.updateSearchData(res.data)
      })
    },
    loadBottom () { // 上拉加载
      brandList({ offset: this.list.length, limit: this.limit }).then(res => {
        this.updateLoadBottomData(res.data)
      })
    },
    updateSearchData (data) {
      this.list = data
      if (data.length < this.limit) {
        this.allLoaded = true;
      }
    },
    updateLoadBottomData (data) {
      this.list = this.list.concat(data)
      if (data.length < this.limit) {
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
.list {
  overflow: auto;

  .empty {
    text-align: center;
    color: darkgray;
  }
}
</style>
