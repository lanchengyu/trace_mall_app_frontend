<template>
  <div style="height:100%;">
    <ReportHeader title="检验报告"></ReportHeader>
    <div v-if="loading"
         style="padding-top:70px;text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div v-else
         class="main-container">
      <ul>
        <li v-for="(report, index) in reports"
            :key="index">
          <!-- <div class="row-title">{{report.name}}</div> -->
          <div class="picture">
            <img v-lazy="report.picture"
                 style="max-width:100%;" />
          </div>
        </li>
      </ul>
    </div>
    <Copyright-Footer></Copyright-Footer>
  </div>
</template>
<script>
import ReportHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
import { mapState } from "vuex";
export default {
  name: "Report",
  components: {
    ReportHeader,
    CopyrightFooter
  },
  data () {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      data: state => state.batch
    }),
    reports: function () {
      if (this.data.batch.reportItems) { return this.data.batch.reportItems }
      return []
    }
  }
  // created () {
  //   this.loading = true
  //   var id = this.$route.query.id
  //   this.$get('anon/report/list', { batchId: id }).then((r) => {
  //     this.reports = r.data
  //     this.loading = false
  //   });
  // },
  // methods: {
  // }
};
</script>
<style lang="stylus" scoped>
.main-container {
  height: calc(100% - 1.45rem);
  overflow: auto;
  background: white;
}

.row-title {
  background-color: darkgreen;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #fff;
  font-size: 0.5rem;
  text-align: center;
}

.picture {
  margin-top:14px;
  text-align: center;
  min-height: 2.5rem;
}
</style>