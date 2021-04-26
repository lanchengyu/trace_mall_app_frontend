<!--  -->
<template>
  <div class="box">
      <div v-if="loading"
         style="padding-top:70px;text-align:center;">
      <mt-spinner style="display: inline-block;"
                  color="#26a2ff"
                  type="fading-circle"></mt-spinner>
    </div>
    <div class="BatchDetail" v-else>
        <div class="content">
            <div class="detailImg">
                <img v-lazy="homeSwipe[0]"/>               
            </div>
            <div class="detailContent">
                <div class="first">
                    <div class="btn" @click="toBathDetail">深度溯源</div>
                    <div class="text">您扫码<span>{{visitNum}}</span>次，<span v-if="visitNum==1">此产品为正品</span><span v-else>谨防假冒</span></div>
                </div>
                <div class="second">
                    <el-row>
                        <el-col :xs="24" :sm="12">
                            <div class="left">
                                <p><span>【产品名称】：</span><span>{{product.productName}}</span></p>
                                <p><span>【生产企业】：</span><span>{{company.companyName}}</span></p>
                                <p><span>【生产批号】：</span><span>{{batch.batchId}}</span></p>
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="12">
                            <div class="right">
                                <p><span>【生产日期】：</span><span>{{batch.produceDate}}</span></p>
                                <p><span>【保质期】&nbsp;&nbsp;&nbsp;：</span><span>{{product.expiration}}</span></p>
                                <p><span>【政府监管】：</span><span>{{company.government}}</span></p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
        <!-- <Copyright-Footer></Copyright-Footer> -->
    </div>
  </div>
</template>

<script>
import CopyrightFooter from "@/common/CopyrightFooter";
import { mapState, mapActions } from "vuex";
export default {
  name:"BathDetail",
  data () {
    return {
        id:"",
        selected: "tab-container1",
        batch: {},
        product: {},
        products: [],
        productDetail: [],
        homeSwipe: [],
        visitNum: 0,
        company: {
            lng: 0,
            lat: 0
        },
        selectedId: 0,
        videos: [],
        isFirstEnter: false,
        showMapComponent: false,
        isMyPlayerReady: false,
        loading: true,
        popupVisible: false,
        top1: 0
    };
  },

  components: {
    //   CopyrightFooter
  },

  computed: {},
   beforeRouteEnter (to, from, next) {
    // 路由导航钩子，此时还不能获取组件实例 `this`，所以无法在data中定义变量（利用vm除外）
    // 所以，利用路由元信息中的meta字段设置变量，方便在各个位置获取。这就是为什么在meta中定义isBack
    if (from.name == 'position' || from.name == 'record' || from.name == 'report' || from.name == 'company' || from.name == 'quality' || from.name == 'blockchain'||from.name=='BatchIndex') {
      to.meta.isBack = true;
      //判断是从哪个路由过来的，
      //如果是以上页面过来的，表明当前页面不需要刷新获取新数据，直接用之前缓存的数据即可
    }
    next();
  },
  created(){
      this.isFirstEnter = true;
  },
  activated(){   //需要结合keep alive进行使用
      if (!this.$route.meta.isBack || this.isFirstEnter) {
        // 如果isBack是false，表明需要获取新数据，否则就不再请求，直接使用缓存的数据
       // 如果isFirstEnter是true，表明是第一次进入此页面或用户刷新了页面，需获取新数据
            this.loading = true
            this.reset()
            var id = this.$route.query.id;
            this.id=id;
            console.log("id=",this.id)
            this.$get('anon/batch/details',{id:id}).then((r)=>{
                let data = r.data
                console.log("data",data)
                if (data) {
                    this.visitNum = data.visitNum
                    if (data.batch.recordItems) { data.batch.recordItems = JSON.parse(data.batch.recordItems) }
                    if (data.batch.reportItems) { data.batch.reportItems = JSON.parse(data.batch.reportItems) }
                    this.batch = data.batch
                    this.setBatch(data)
                    this.product = data.product
                    if (this.product.swipeImages) { this.homeSwipe = this.product.swipeImages.split(',') }
                    if (this.product.detailImages) { this.productDetail = this.product.detailImages.split(',') }
                    this.company = data.company
                    console.log("company",this.company)
                    this.videos = data.productVideos
                    this.loading = false
                    let companyId = this.company.companyId
                    this.$nextTick(() => {
                        this.$get('anon/product/part/list', { companyId: companyId }).then((r) => {
                        this.products = r.data
                        });
                    })
                }
                this.loading=false
                //将data存到全局
                var storage=window.localStorage;
                storage.setItem("data",data)
            })
             // 恢复成默认的false，避免isBack一直是true，导致下次无法获取数据
            this.$route.meta.isBack = false
            // 恢复成默认的false，避免isBack一直是true，导致每次都获取新数据
            this.isFirstEnter = false;
            
       }
  },
//   mounted: {},

  methods: {
    ...mapActions([
        'setBatch'
    ]),
    reset () {
        this.batch = {}
        this.product = {}
        this.product = []
        this.homeSwipe = []
        this.showMapComponent = false
        this.company = { lng: 0, lat: 0 }
        this.selectedId = 0
        this.videos = []
        this.isMyPlayerReady = false
    },
    toBathDetail(){
        this.$router.push({path:"/batch/batchIndex",query:{id:this.id}})
    }
  }
}

</script>
<style lang='stylus' scoped>
.box{
    .BatchDetail{
        .content{
            .detailImg{
                width:100%;
                height:100%;
                img{
                    width:100%;
                    height:auto;
                    background:rgba(253,246,228,1);
                }
            }

            .detailContent{
                .first{
                    margin-top:60px;
                    padding-bottom:26px;
                    border-bottom:3px dashed rgba(153,153,153,1);
                    .btn{
                        width:280px;
                        height:60px;
                        margin:0 auto;
                        background:rgba(103,185,39,1);
                        box-shadow:0px 3px 7px 0px rgba(80, 80, 80, 0.35);
                        border-radius:30px;
                        text-align:center;
                        line-height:60px;
                        color:#ffffff;
                        font-size:36px;
                        cursor:pointer;
                    }
                    .text{
                        font-size:30px;
                        font-family:Adobe Heiti Std;
                        font-weight:normal;
                        color:rgba(103,185,39,1);
                        text-align:center;
                        margin-top:25px;
                        font-size:30px;
                    }
                }
                .second{
                    padding-top:78px;
                    .left,.right{
                        color:#999999;
                        font-size:24px;
                        line-height:40px;
                    }
                }
            }
        }
    }
}
</style>