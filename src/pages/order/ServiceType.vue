<template>
    <div style="height:100%;">
        <Order-Header title="选择服务类型"></Order-Header>
        <div class="box">
            <div class="list">
                <div class="list-1 list-item">
                    <el-row class="row-first">
                        <el-col :span="4" :offset="1"><img :src="list.productPic"></el-col>
                        <el-col :span="19">
                            <span class="product">{{list.productName}}</span>
                        </el-col> 
                    </el-row> 
                </div>
                <div class="list-2 list-item margin" @click="exchangeMoney()">
                    <el-row class="row-first">
                        <el-col :span="3" :offset="1"><img src="static/img/money.png"></el-col>
                        <el-col :span="17">
                            <p class="p-1">我要退款(无需退货)</p>
                            <p class="p-2">没收到货，或与卖家协商同意不用退款只退货</p>
                        </el-col>
                        <el-col :span="3">
                            <img src="static/img/rightArrow.png"/>
                        </el-col> 
                    </el-row> 
                </div>
                 <div class="list-3 list-item margin" @click="exchangeMoney()">
                    <el-row class="row-first">
                        <el-col :span="3" :offset="1"><img src="static/img/tui.png"></el-col>
                        <el-col :span="17">
                            <p class="p-1">我要退货退款</p>
                            <p class="p-2">已收到货，需要退还已收到的货物</p>
                        </el-col>
                        <el-col :span="3">
                            <img src="static/img/rightArrow.png"/>
                        </el-col> 
                    </el-row> 
                </div>
                 <!-- <div class="list-4 list-item margin" @click="exchangeProduct()">
                    <el-row class="row-first">
                        <el-col :span="3" :offset="1"><img src="static/img/exchangeProduct.png"></el-col>
                        <el-col :span="17">
                            <p class="p-1">我要换货</p>
                            <p class="p-2">已收到货，需要更换已收到的货物</p>
                        </el-col>
                        <el-col :span="3">
                            <img src="static/img/rightArrow.png"/>
                        </el-col> 
                    </el-row> 
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
import {getProductDetail} from '@/api/mallApi'
export default {
    name:'ServiceType',
    components: {
        OrderHeader
    },
    data(){
        return{
            list:{},
            // product: {},
            orderId:null,
            loading:false,
            status:null
        }
    },
    created(){
        var list = this.$route.query.list;
        this.list=list;
        var orderId = this.$route.query.orderId;
        this.orderId=orderId;
    },
    methods:{
        // 退款
        exchangeMoney(){
            this.$router.push({name:'ExchangeMoney',query:{ list: this.list,orderId:this.orderId}})
        },
        //换货
        exchangeProduct(){
            this.$router.push({name:'ExchangeProduct',query:{ list: this.list,orderId:this.orderId}})
        }
    }
}
</script>
<style scoped>
.margin{
    margin-top: 0.2rem;
}
.list-item{
    background: #ffffff;
}
.list-1 img{
    width: 1.5rem;
    height: 1.5rem;
}
.list-item .product{
    font-size: 0.4rem;
    padding: 0.1rem 0.1rem;
}
.list .list-1{
    padding: 0.1rem 0.1rem;
}
.list-2{
    padding: 0.5rem 0;
}
.list-2 img{
    width: 0.7rem;
    height: 0.7rem;
}
.list-3{
    padding: 0.5rem 0;
}
.list-3 img{
    width: 0.7rem;
    height: 0.7rem;
}
.list-4{
    padding: 0.5rem 0;
}
.list-4 img{
    width: 0.7rem;
    height: 0.7rem;
}
.row-first .p-1{
    font-size: 0.4rem;
}
.row-first .p-2{
    margin-top: 0.1rem;
    color: #888888;
}
</style>