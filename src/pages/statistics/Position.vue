<style lang=stylus>
.position {
  /* background: url('~@/../static/img/bg.jpg') no-repeat;
  background-size: 100% 100%; */
  height: 100%;
}

.map {
  height: 300px;

  /* opacity: 0.5; */
  .anchorBL {
    display: none;
  }
}

.switch {
  font-size: 0.4rem;
  padding: 0.2rem;
  text-align: right;
}

.main-container {
  height: calc(100% - 1.45rem);
  overflow: auto;
}

.el-table tr, .el-table th, .el-table td {
  text-align: center;
}

/* .el-table {
  border: 1px solid #3f51b58c;
  background: light-blue;
}

.el-table::after, .el-table::before {
  background-color: unset;
}

.el-table td, .building-top .el-table th.is-leaf {
  border-bottom: 1px solid #3f51b58c;
}

.el-table th, .el-table tr, .el-table td {
  background-color: unset;
}

.el-table__header-wrapper thead div, .el-table__footer-wrapper tbody td {
  background-color: unset;
  color: lightblue;
  font-weight: 500;
}

.el-table, .el-table__expanded-cell {
  background-color: unset;
}

.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: unset;
} */
</style>
<template>
  <div class="position">
    <TopHeader title="扫码统计">
    </TopHeader>
    <div class="main-container">
      <baidu-map class="map"
                 :center="{lng: 105.000, lat: 38.000}"
                 :zoom="4.5"
                 :dragging="true"
                 :double-click-zoom="false">
        <bm-point-collection :points="value?aBatchPoints:allBatchPoints"
                             color="#d340c3"
                             shape="BMAP_POINT_SHAPE_WATERDROP"
                             size="BMAP_POINT_SIZE_SMALL"></bm-point-collection>
      </baidu-map>
      <div class="switch">
        <el-switch v-model="value"
                   active-text="当前批次"
                   inactive-text="所有批次">
        </el-switch>
      </div>
      <div class="table">
        <el-table :data="value?aBatchData:allBatchData"
                  show-summary>
          <el-table-column prop="city"
                           label="城市">
          </el-table-column>
          <el-table-column prop="num"
                           label="次数">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Copyright-Footer></Copyright-Footer>
  </div>
</template>

<script>
import { BaiduMap, BmPointCollection } from 'vue-baidu-map'
import CopyrightFooter from "@/common/CopyrightFooter";
import TopHeader from "@/common/Header";
import axios from 'axios'
import { Table, TableColumn, Switch } from 'element-ui'
export default {
  namd: 'Position',
  components: {
    BaiduMap,
    TopHeader,
    CopyrightFooter,
    BmPointCollection
  },
  data () {
    return {
      allBatchData: [],
      allBatchPoints: [],
      aBatchData: [],
      aBatchPoints: [],
      geoCoordMap: {},
      productId: '',
      batchId: '',
      value: false
    }
  },
  created () {
    this.productId = this.$route.query.productId
    this.batchId = this.$route.query.batchId
    this.getCityData()
  },
  methods: {
    getCityData () {
      axios.get('static/data/citys.json').then((res) => {
        this.geoCoordMap = res.data
        this.$nextTick(() => {
          this.getVisitData()
        })
      })
    },
    getVisitData () {
      this.$get('anon/productVisit/list', {
        productId: this.productId
      }).then((res) => {
        let data = res.data
        this.allBatchData = data
        const points = []
        for (var i = 0; i < data.length; i++) {
          let geoCoord = this.geoCoordMap[data[i].city]
          if (geoCoord) {
            points.push({ lng: parseFloat(geoCoord[0]), lat: parseFloat(geoCoord[1]) })
          }
        }
        this.allBatchPoints = points
      });
      this.$get('anon/productVisit/list', {
        productId: this.productId,
        batchId: this.batchId
      }).then((res) => {
        let data = res.data
        this.aBatchData = data
        const points = []
        for (var i = 0; i < data.length; i++) {
          let geoCoord = this.geoCoordMap[data[i].city]
          if (geoCoord) {
            points.push({ lng: parseFloat(geoCoord[0]), lat: parseFloat(geoCoord[1]) })
          }
        }
        this.aBatchPoints = points
      });
    }
  }
}
</script>