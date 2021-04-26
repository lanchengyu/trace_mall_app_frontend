<template>
    <div style="height:100%;">
        <Order-Header title="申请换货"></Order-Header>
        <div class="exchange-box">
            <div class="exchange-list">
                <div class="exchange-list-1 exchange-list-item">
                    <div class="exchange-list-1-1">
                    <el-row class="row-first">
                        <el-col :span="4" :offset="1"><img :src="product.pic"></el-col>
                        <el-col :span="19">
                            <span class="product">{{product.name}}</span>
                            <p class="attr">
                                <span>{{list.sp1}}</span>
                                <span>{{list.sp2}}</span>
                            </p>
                        </el-col> 
                    </el-row> 
                    </div>
                </div>
                <div class="exchange-list-2 exchange-list-item">
                    <div class="exchange-list-2-0 pad">
                        <el-row>
                            <p  @click="openSheet">
                                <el-col :span="15">
                                    <span class="span-1">换货原因：</span>
                                </el-col>
                                <el-col :span="9">
                                    <span class="span-2">{{actions[0].name}}<img class="arrow" src="static/img/rightArrow.png"/></span>
                                </el-col>
                            </p>
                        </el-row>
                    </div>
                </div>
                <div class="exchange-list-3 exchange-list-item">
                    <div class="exchange-list-3-1 pad">
                        <el-row class="row-first">
                            <p>
                                <el-col :span="14" class="quantity-txt">
                                    <span class="span-1">换货数量：</span>
                                    <p class="note">最多可换{{list.productQuantity}}个</p>
                                </el-col>
                                <el-col :span="2" class="quantity-img">
                                    <span class="span-1"  @click="subtract"><img src="static/img/subtract.png"/></span>  
                                </el-col>
                                <el-col :span="2" class="quantity-img quantity-num" :offset="1">
                                    <span class="span-2">{{list.productQuantity}}</span>
                                </el-col>
                                <el-col :span="2" class="quantity-img" :offset="1">
                                    <span class="span-3"  @click="add"><img src="static/img/add.png"/></span>
                                </el-col>
                            </p>
                        </el-row>
                        <router-link to="">
                            <el-row class="row-second">
                                <el-col :span="5">
                                    <span>收货地址：</span>
                                </el-col>
                                <el-col :span="12">
                                    <span>{{order.receiverName}}</span>
                                </el-col>
                                <el-col :span="7">
                                    <span>{{order.receiverPhone}}</span>
                                </el-col>
                            </el-row>
                            <el-row class="row-third">               
                                <el-col :span="16" :offset="5">
                                    <span>{{order.receiverProvince}}{{order.receiverCity}}{{order.receiverRegion}}{{order.receiverDetailAddress}}</span>
                                </el-col>
                                <el-col :span="1" :offset="2">
                                    <span><img class="arrow" src="static/img/rightArrow.png"/></span>
                                </el-col>
                            </el-row>
                        </router-link>
                    </div>
                </div>
                <div class="exchange-list-4 exchange-list-item">
                    <div class="exchange-list-4-1 pad">
                        <p>
                            <span class="span-1">退款说明：</span>    
                            <input type="text" placeholder="选填"/>                   
                        </p>
                    </div>
                </div>
                <div class="exchange-list-5 exchange-list-item">
                   <div class="exchange-list-5-1 pad">
                        <p class="uploadImg">
                            <span class="span-1">上传凭证</span>
                        </p>
                        <upload-img></upload-img>
                    </div> 
                </div>  
                <div class="btn">
                    <mt-button class="submit-btn" type="danger" size="large" @click="submit">提交</mt-button>
                </div> 
            </div>
        </div>
        <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
import { Cell,Actionsheet,Toast  } from 'mint-ui'; 
import {getProductDetail,getOrderDetail} from '@/api/mallApi'
import { mapState, mapActions } from "vuex";
import UploadImage from "@/components/upload/UploadImage"
export default {
    name:'ExchangeProduct',
    components: {
        OrderHeader,
        Cell,
        Actionsheet,
        Toast, 
        'upload-img':UploadImage
    },
    data(){
        return{
            list:{},
            order:{},
            num:null,
            product: {},
            loading:false,
            sheetVisible:false,
            actions:[{
                name:"七天无理由换货",
            }],
           
        }
    },
    created(){
        var list = this.$route.query.list;
        this.list=list;
        this.num=list.productQuantity;
        var orderId = this.$route.query.orderId;
        getOrderDetail(orderId).then(res=>{
            this.order=res.data;
        })
        getProductDetail(list.productId).then(res=>{
            this.product=res.data;
        })
    },
    computed: {
        ...mapState({
        currentAddress: state => state.currentAddress
        })
    },
    methods:{
        openSheet(){ 
            this.sheetVisible=true;
        },
        add(){
            if(this.num<this.list.productQuantity){
                this.num+=1;
            }else{
                Toast('已达到上限')
            }          
        },
        subtract(){
            if(this.num>1){
                this.num-=1;
            }
        },
        submit(){
            
        }
    }
}
</script>
<style scoped>
.exchange-list-item{
    background-color: #ffffff;
    padding: 0.1rem 0.1rem;
    margin-top: 0.1rem;
    font-size: 0.4rem;
}

.exchange-list-item .pad{
    padding: 0.2rem 0.1rem;
}
.exchange-list .row-first{
    margin-top: 0.1rem;
}
.exchange-list .row-first img{
    width: 1.5rem;
    height: 1.5rem;
}
.exchange-list .row-first .attr{
    color: #8B8989;
    font-size: 0.25rem;
}
.exchange-list-2 .exchange-list-2-1 .span-2,.exchange-list-2 .exchange-list-2-0 .span-2{
    float:right;
    color: #8B8989;
}
.exchange-list-item .arrow{
    width: 0.3rem;
    height: 0.3rem;
}
.exchange-list-5-1 .uploadImg{
    padding-bottom: 0.1rem;
}

.exchange-list-3 .quantity-txt{
    display: inline-block;
}
.exchange-list-3 .quantity-img{
    display: inline-block;
}
.exchange-list-3 .quantity-img img{
    width: 1.0rem;
    height: 1.0rem;
}
.exchange-list-3 .quantity-img .span-1,.exchange-list-3 .quantity-img .span-3{
    display: inline-block;
    width: 1.0rem;
    height: 1.0rem;
    text-align: center;
    line-height: 1.0rem;
    background-color: #eeeeee;
}
.quantity-num{
    text-align: center;
     line-height: 1.0rem;
}
.quantity-txt .note{
    font-size: 0.3rem;
    color:#cea722;
}
.exchange-list-3-1 .row-third .arrow{
    width: 0.3rem;
    height: 0.3rem; 
}
.exchange-list-3-1>>> .el-row{
    padding: 0.25rem 0;
}
.btn{
    padding: 0 0.2rem;
    margin-top: 0.2rem;
}
.btn >>> .mint-button--large{
    height: 0.9rem;
}
.btn >>> .mint-button-text{
    font-size: 0.4rem;
}
</style>