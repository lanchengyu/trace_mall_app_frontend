<template>
  <div style="height:100%;">
    <RecordHeader title="生产流程"></RecordHeader>
    <div v-if="loading"
         style="text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div v-else
         class="main-container">
         <div class="pad">
           <div class="item" v-for="(record, index) in records" :key="index">
             <el-row>
               <el-col :span="3" :offset="1">
                 <div class="top head">
                   <div class="tail-head"><span>{{index+1}}</span></div>
                   <!-- <div class="tail-line"></div> -->
                 </div>
               </el-col>
               <el-col :span="18" class="right">
                 <div class="top">
                    <p><span>时间：</span><span>{{record.operationTime | dateformat()}}</span></p>
                    <p><span>操作员：</span><span>{{record.operator}}</span></p>
                    <p><span>操作：</span><span>{{record.operation}}</span></p>
                  </div>
                  <div class="bottom">
                    <img v-lazy="record.picture"/>
                  </div>
               </el-col>
             </el-row>
           </div>
           
         </div>
         
        <!-- <ul class="ant-timeline">
        <li class="ant-timeline-item"
            v-for="(record, index) in records"
            :key="index">
          <div class="ant-timeline-item-tail"></div>
          <div class="ant-timeline-item-head-blue ant-timeline-item-head"><span class="text">{{index+1}}</span></div>
          <div class="ant-timeline-item-content">
            <p style="color:black;">{{record.operation}}</p>
            <p style="color:gray;">{{record.operator}} {{record.operationTime | dateformat()}}</p>
            <div class="card">
              <p v-show="record.tool"
                 style="color:gray;">工具： {{record.tool}}</p>
              <p v-show="record.item"
                 style="color:gray;">用品： {{record.item}}</p>
              <p v-show="record.dosage"
                 style="color:gray;">用量： {{record.dosage}}</p>
              <div style="text-align:center;">
                <img v-lazy="record.picture"
                     style="max-width:100%;margin-top: 10px;" />
              </div>
            </div>
          </div>
        </li>
      </ul> -->
      <Copyright-Footer></Copyright-Footer>
    </div>
  </div>
</template>
<script>
import RecordHeader from "@/common/Header";
import CopyrightFooter from "@/common/CopyrightFooter";
import { mapState } from "vuex";
export default {
  name: "Record",
  components: {
    RecordHeader,
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
    records: function () {
      if (this.data.batch.recordItems) { 
        return this.data.batch.recordItems }
      return []
    }
  }
  // created () {
  //   this.loading = true
  //   var id = this.$route.query.id
  //   this.$get('anon/record/list', { batchId: id }).then((r) => {
  //     this.records = r.data
  //     this.loading = false
  //   });
  // },
  // methods: {
  // }
};
</script>
<style lang="stylus" scoped>
.pad{
  margin-left:0.7rem;
  margin-right:0.2rem;
  margin-top:43px;
  .item{
    border-left:2px solid #5B81FF;
    width:100%;
    height:98%;
    position: relative;
    .head{
      position:absolute;
      top:-20px;
      left:-41px;
      .tail-head{
        width:42px;
        height:42px;
        background:rgba(91,129,255,1);
        border-radius:50%;
        span{
          display:block;
          font-size:36px;
          font-family:STHeiti;
          color:rgba(255,255,255,1);
          line-height:42px;
          text-align:center;
        }
      }
    }
    .right{
      margin-left:7%
    }
    .top{
      padding:20px;
      p{
        font-size:28px;
        font-family:STHeiti;
        color:rgba(102,102,102,1);
      }
    }
    .bottom{
      width:580px;
      margin-left:20px;
      img{
        width:580px;
        border-radius:15px;
      }
    }
  }
}
.main-container {
  height: calc(100% - 1.45rem);
  overflow: auto;
  background: white;
}

.card {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.ant-timeline {
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  box-sizing: border-box;
  list-style: none;
  margin: 0;
  padding: 20px;
}

.ant-timeline-item {
  position: relative;
  padding: 0 0 20px;
  list-style: none;
  margin: 0;
  font-size: 14px;
}

.ant-timeline-item-tail {
  position: absolute;
  left: 47px;
  top: 44px;
  height: 100%;
  border-left: 2px solid #e8e8e8;
}

.ant-timeline-item-head {
  position: absolute;
  left: -8px;
  width:42px;
  height:42px;
  background:rgba(91,129,255,1);
  border-radius: 50%;
  border: 2px solid transparent;
  .text{
    font-size:36px;
    line-height:36px;
    font-family:STHeiti;
    color:rgba(255,255,255,1);
  }
}

.ant-timeline-item-head-blue {
  border-color: #1890ff;
  color: #1890ff;
}

.ant-timeline-item-content {
  margin: 0 0 0 18px;
  position: relative;
  top: -6px;
}
</style>