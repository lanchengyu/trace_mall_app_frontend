<template>
    <div style="height:100%;">
        <Order-Header title="退款详情"></Order-Header>
        <div class="box">
            <el-row><p>已完成</p></el-row>
            <el-row><p>2019年9月3日 10:57</p></el-row>
        </div>
        
        <div class="content">
            <div class="box-1">
                <el-row>
                    <el-col :span="18" :offset="1">退款总金额</el-col>
                    <el-col :span="5" class="returnMoney">￥1000</el-col>
                </el-row>
            </div>
            <div class="box-2">
                <el-row>
                    <el-col :span="19" :offset="1">退回中国建设银行(尾号0000)</el-col>
                    <el-col :span="4">￥1000</el-col>
                </el-row>
                <el-row class="active">
                    <el-steps :active="active"
                        finish-status="success">
                    <el-step title="卖家退款"></el-step>
                    <el-step title="银行受理"></el-step>
                    <el-step title="退款成功"></el-step>
                    </el-steps>
                </el-row>
            </div>
            <!-- <div class="box-3">
                <el-row>
                    <el-col :span="23" :offset="1">退款信息</el-col>
                </el-row>
            </div> -->
            <div class="box-4">
                <el-row>
                    <el-col :span="23" :offset="1">退款信息</el-col>
                </el-row>
                <el-row class="productInfo">
                        <el-col :span="4" :offset="1"><img src="static/img/5.jpg"></el-col>
                        <el-col :span="19">
                            <span class="product">劲仔鱼仔 100%天然野生鱼仔</span>
                            <!-- <p class="attr" 
                               v-for="(attr,index) in list.productAttr" 
                               :key="index">
                                <span>{{attr.key}}:</span><span>{{attr.value}}</span>
                            </p> -->
                        </el-col> 
                </el-row> 
                <el-row class="detail">
                    <el-col :span="23" :offset="1">
                         <p><span>退款原因：</span><span>七天无理由退货</span></p>
                    </el-col>                  
                </el-row>
                <el-row class="detail">
                    <el-col :span="23" :offset="1">
                        <p><span>退款金额：</span><span>￥1000</span></p>
                    </el-col>
                </el-row>
                <el-row class="detail">
                    <el-col :span="23" :offset="1">
                        <p><span>申请件数：</span><span>x2</span></p>
                    </el-col>
                </el-row>
                <el-row class="detail">
                    <el-col :span="23" :offset="1">
                         <p><span>申请时间：</span><span>2019-9-03 11:53</span></p>
                    </el-col>
                </el-row>
                <el-row class="detail">
                    <el-col :span="23" :offset="1">
                        <p><span>退款编号：</span><span>1213421423423</span></p>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
import { Cell } from 'mint-ui'; 
import {getProductDetail} from '@/api/mallApi'
export default {
    name:'ReturnDetail',
    components: {
        OrderHeader,
        Cell
    },
    data(){
        return{
            data:null,
            list:null,
            status:''
        }
    },
    computed: {
        active () {
        }
  },
    created(){
        var detail=this.$route.query.detail;
        this.data=detail;
        var list=this.$route.query.list;
        this.list=list;
        var status=this.$route.query.status;
        this.status=status;
    }
}
</script>
<style lang="stylus" scoped>
.box{
    width: 100%;
    padding-left:0.7rem;
    background-color: #69c1ff;
}
.box >>> .el-row{
    padding: 0.3rem 0;
}
.box p{
    color: #fff;
    font-size: 0.4rem;
}
.content{
  
    fonr-size:0.35rem;
    >>> .el-row{
        padding: 0.35rem 0;
    }
    .box-1,.box-2,.box-3,.box-4{
        margin-top:0.15rem;
        background-color:#ffffff;
    }
    .box-1{
        .returnMoney{
            color:#f54545;
            font-size:0.4rem;
        }
    }
    .box-2{
        .active{
            margin:0 1.0rem;
        }
    }
    .box-4{
        padding-bottom:2.4rem;
        .productInfo{
            background-color:#fbfbfb;
            .product{
                font-size:0.35rem;
            }
            img{
                width: 1.5rem;
                height: 1.5rem;
            }
            .attr{
                color: #8B8989;
                font-size: 0.25rem;
            }
        }
        .detail{
            padding:0.1rem 0;
            p{
                font-size:0.3rem;
                color:#888888;
            }
        }
    }
}
</style>