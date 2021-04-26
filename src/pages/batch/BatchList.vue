<template>
  <div style="height:100%;">
    <Top-Header title="批次列表"></Top-Header>
    <div class="main-container"
         ref="wrapper"
         :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop"
                   :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   @top-status-change="handleTopChange"
                   @bottom-status-change="handleBottomChange"
                   ref="loadmore">
        <ul>
          <li v-for="(item,index) in batches"
              :key="index">
            <mt-cell :title="item.batchName"
                     :label="item.batchId"
                     :to="'BatchDetail?id='+item.batchId"
                     is-link>
            </mt-cell>
          </li>
        </ul>
        <div slot="top"
             class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'"
                :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
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
<script >
import TopHeader from "@/common/Header";
import { Loadmore } from 'mint-ui';
export default {
  name: "BatchList",
  components: {
    TopHeader
  },
  data () {
    return {
      wrapperHeight: 0,
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      batches: [],
      searchCondition: {
        pageNum: "1",
        pageSize: "10"
      },
      currentNum: "1"
    };
  },
  computed: {
  },
  created () {
    var id = this.$route.query.id
    this.searchCondition.productId = id
    this.getData('')
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight// - this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    getData (action) {
      this.$get('anon/batch', this.searchCondition).then((r) => {
        let data = r.data
        if (action === 'loadBottom') { // 上拉加载
          this.batches = this.batches.concat(data.rows)
          this.$refs.loadmore.onBottomLoaded();
          this.currentNum = this.currentNum + 1
        } else if (action === 'loadTop') { // 下拉加载
          this.batches = data.rows
          this.$refs.loadmore.onTopLoaded();
        } else {
          this.batches = data.rows
        }
        if (data.total < this.searchCondition.pageSize) {
          this.allLoaded = true // if all data are loaded
        }
      })
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    },
    loadTop () { // 下拉加载
      this.currentNum = 1
      this.searchCondition.pageNum = 1
      this.getData('loadTop')
    },
    loadBottom () { // 上拉加载
      this.searchCondition.pageNum = this.currentNum + 1
      this.getData('loadBottom')
    }
  }
};
</script>
<style lang="stylus" scoped>
body {
  overflow: hidden;
}

.main-container {
  padding-top: 60px;
  overflow: auto;
  background: white;
}

.mint-spinner {
  display: inline-block;
  vertical-align: middle;
}

.loading-background {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  transition: 0.2s linear;
}

.mint-loadmore-top {
  span {
    font-size: 0.5rem;
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;

    @when rotate {
      transform: rotate(180deg);
    }
  }
}

.mint-loadmore-bottom {
  font-size: 0.5rem;

  span {
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;

    @when rotate {
      transform: rotate(180deg);
    }
  }
}
</style>