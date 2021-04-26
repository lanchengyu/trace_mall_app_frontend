<!-- 优惠券 -->
<template>
  <div>
    <div class="list">
        <div class="item">
            <div class="left">
                <div class="block">
                    <el-row>
                        <el-col :span="11">
                            <p class="first"><span>￥</span><span>50元</span></p>
                            <p class="second"><span>满100可用</span></p>
                        </el-col>
                        <el-col :span="13">
                            <p class="third"><span>美食优惠券</span></p>
                            <p class="fourth"><span>有效期：2019.10.2020.10.22</span></p>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="right"><p>立即领取</p></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'Item',
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang="stylus" scoped>
      .list{
            .item{
                overflow: hidden;
                margin:10px 20px;
                .left{
                    float: left;
                }
                .left{
                    position: relative;
                    width: 500px;
                    height: 190px;
                    background-image: 
                    radial-gradient(
                    circle at 1px 8px, 
                    transparent 6px, 
                    #fff 6px, 
                    #fff 0px);
                    background-size: 500px 18px;
                    background-position: 0 0, 500px 0;
                    background-repeat-x: no-repeat;
                    .block{
                        margin:15px;
                        .first,.third{
                            padding:20px 20px;
                            
                        }
                        .second,.fourth{
                            padding:10px 20px;
                            color:#888;
                        }
                        .first{
                            color:#f60d0b;
                            span:nth-child(1){
                                font-size:30px;
                            }
                            span:nth-child(2){
                                font-size:48px;
                            }
                        }
                        .third{
                            color:#000;
                            font-size:36px;
                        }
                    }
                    }
                .right{
                    position: relative;
                    width:200px;
                    height:190px;
                    background-image: 
                    radial-gradient(
                    circle at 199px 8px, 
                    transparent 6px, 
                    #17C169 6px, 
                    #17C169 0px);
                    background-size: 200px 18px;
                    background-repeat-x: no-repeat;
                    margin-left:500px;
                    p{
                        width:100px;
                        height:100%;
                        margin:0 auto;
                        color:#fff;
                        line-height:100px;
                        text-align:center;
                        font-size:44px;
                    }
                    }
                }
            }
</style>