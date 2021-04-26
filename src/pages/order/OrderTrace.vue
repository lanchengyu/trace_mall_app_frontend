<template>
  <div style="height:100%;">
    <Top-Header title="订单跟踪"></Top-Header>
    <div class="carrier">
      <div class="box-1">
        <div class="left"><img :src="carrier.pic"></div>
        <div class="right">
          <p>配送企业：{{carrier.name}}</p>
          <p>快递单号：{{deliverySn}}</p>
          <p>联系电话：{{carrier.phone}}</p>
        </div>
      </div>
      <div class="box-2">
        <el-steps :active="active"
                  finish-status="success">
          <el-step title="已发货"></el-step>
          <el-step title="运输中"></el-step>
          <el-step title="派件中"></el-step>
          <el-step title="已签收"></el-step>
        </el-steps>
      </div>
      <div class="box-3"
           v-if="data">
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in data.context"
                            :key="index"
                            :color="index === 0?'#0bbd87':'lightgray'"
                            :timestamp="activity.time|formatLocalTime">
            {{activity.desc}}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import TopHeader from "@/common/Header";
import { getOrderCarrier, getOrderTracking } from '@/api/mallApi'
import moment from 'moment'
export default {
  name: "OrderTrace",
  components: {
    TopHeader
  },
  data () {
    return {
      deliverySn: null,
      carrier: {},
      data: null
    }
  },
  computed: {
    active () {
      if (this.data) {
        let status = this.data.state;
        if (status === '0')
          return 2;
        else if (status === '1')
          return 3;
        else if (status === '3')
          return 4;
        else
          return 1;
      }
      return 1;
    }
  },
  filters: {
    formatLocalTime (nS) {
      return moment.unix(nS).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  created () {
    var carrierName = this.$route.query.deliveryCompany;
    this.deliverySn = this.$route.query.deliverySn;
    if (carrierName) {
      getOrderCarrier(carrierName).then(res => {
        this.carrier = res.data;
        var _this = this;
        // axios.get("trackingApi/v2/trackings/" + this.carrier.code + "/" + this.deliverySn, {
        //   headers: { 'Trackingmore-Api-Key': '1354942d-7c49-4ada-a187-9b3aa8bb7287' }//设置header信息
        // }).then((res) => {
        //   _this.data = res.data.data;
        // })
      })
    }
    if (this.deliverySn) {
      getOrderTracking(this.deliverySn).then(res => {
        if (res.data.status === '0')
          this.data = res.data.data.info;
      })
    }
  },
  methods: {
    moment
  }
}
</script>
<style lang="stylus" scoped>
.carrier {
  height: calc(100% - 1.45rem);
  overflow: auto;

  .box-1 {
    background: #67C23A;
    width: 100%;
    height: 3rem;
    padding: 0.5rem;

    .left {
      float: left;
      width: 30%;
      text-align: center;

      img {
        max-width: 100%;
        max-height: 2rem;
      }
    }

    .right {
      float: left;
      width: 70%;
      padding-left: 0.5rem;

      p {
        line-height: 0.66rem;
        font-size: 0.35rem;
        color: white;
      }
    }
  }

  .box-2 {
    padding: 0.5rem;
    background: white;
  }

  .box-3 {
    margin-top: 0.5rem;
    padding: 0.5rem;
    background: white;
  }
}
</style>