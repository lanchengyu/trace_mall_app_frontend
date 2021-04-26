<template>
    <div style="height:100%;">
        <Order-Header title="申请退款"></Order-Header>
        <div class="exchange-box">
            <div class="exchange-list">
                <div class="exchange-list-1 exchange-list-item">
                    <div class="exchange-list-1-1">
                    <el-row class="row-first">
                        <el-col :span="4" :offset="1"><img :src="orderItemFirst.productPic"></el-col>
                        <el-col :span="19">
                            <p class="product">{{orderItemFirst.productName}}</p>
                            <span class="attr" >
                               <span>{{orderItemFirst.sp1}}:</span>
                               <span>{{orderItemFirst.sp2}}</span>
                            </span>
                        </el-col> 
                    </el-row> 
                    </div>
                </div>
                <div class="exchange-list-2 exchange-list-item">
                    <div class="exchange-list-2-1 pad">
                        <el-row>
                            <p @click="openSheet">
                                <el-col :span="19">
                                    <span class="span-1">退款原因：</span>
                                    <span>{{refundReason}}</span>
                                </el-col>
                                <el-col :span="5">
                                    <span class="span-2">请选择<img class="arrow" src="static/img/rightArrow.png"/></span>
                                </el-col>
                            </p>
                        </el-row>
                    </div>
                </div>
                <div class="exchange-list-3 exchange-list-item">
                    <div class="exchange-list-3-1 pad">
                        <p>
                            <span class="span-1">退款金额：</span>
                            <span class="span-2 money">￥{{order.totalAmount}}</span>
                        </p>
                    </div>
                    <div class="exchange-list-3-2 pad">
                        <p>
                            <span class="span-1">退款说明：</span>    
                            <input type="text" placeholder="选填" v-model="description" style="font-size:0.4rem"/>                   
                        </p>
                    </div>
                </div>
                <div class="exchange-list-4 exchange-list-item">
                   <div class="exchange-list-4-1 pad">
                        <p class="uploadImg">
                            <span class="span-1">上传凭证</span>
                        </p>
                        <upload-img ref="uploadImageChild"
                                    @fileSelect="handleFileSelect"
                                    @fileRemove="handleFileRemove"></upload-img>
                    </div> 
                </div>  
                 <div class="btn">
                    <mt-button :disabled="dis" class="submit-btn" type="danger" size="large" @click="submit">提交</mt-button>
                </div>            
            </div>
        </div>
        <mt-actionsheet
        :actions="returnReasons"
        v-model="sheetVisible">
        </mt-actionsheet>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
import { Cell,Actionsheet,Toast  } from 'mint-ui'; 
import {getProductDetail,getProductAttrList,getOrderDetail,getproductAttr,returnApplyCreate,returnReason,returnApply} from '@/api/mallApi'
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
        return {
            order: {},
            orderItemFirst:{},
            // list:{},
            // product: {},
            loading:false,
            sheetVisible:false,
            refundReason:'',
            description:'',
            returnReasons:[],
            fileList:[],
            dis:false
        };
    },
    created(){
        var orderId = this.$route.query.orderId;
        getOrderDetail(orderId).then(res=>{
            let orderItem=res.data;
            console.log("order",orderItem)
            this.order=orderItem;
            this.orderItemFirst=orderItem.orderItemList[0];
        })
        returnReason().then(res=>{
            for(let i=0;i<res.data.list.length;i++){
                this.returnReasons[i]={
                    name:res.data.list[i].name,
                    method:this.innerText
                }
            }
        });
    },
    methods:{
        reset(){
            this.loading = false
            this.refundReason=''
            this.description=''
            this.$refs.uploadImageChild.finished()
        },
        openSheet(){
            this.sheetVisible=true;
        },
        handleFileSelect (file) {
            this.fileList.push(file)
        },
        handleFileRemove (index) {
            this.fileList.splice(index, 1)
        },
        submit(){
            if(this.order.orderId){
                this.loading = true;
                this.dis=!this.dis;
            }
            if(!this.refundReason){
                Toast({
                    message: '请填写退货原因和凭证',
                    position: 'center',
                    duration: 5000
                });
                return
            }
            // this.loading = true
            const formData = new FormData();
            formData.append("orderSn",this.order.orderSn);
            formData.append("reason",this.refundReason);
            formData.append("description",this.description);
            
            this.fileList.forEach((img, index) => {
                var type = img.type.split('/')[1]
                formData.append('files', img, 'file_' + Date.parse(new Date()) + '.' + type)
            })
            var that=this;
            returnApplyCreate(formData).then(res=>{
                Toast(res.message);
                that.reset();
                this.dis=!this.dis;
                setTimeout(function(){
                   that.$router.push({path:'/my'});
                },1000)
            }).catch(res=>{
                console.log(res)
            })
        },
        innerText(e){
            this.refundReason=e.name;
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
.exchange-list .row-first .attr span{
    padding-left: 0.1rem;
}

.exchange-list-2 .exchange-list-2-1 .span-2,.exchange-list-2 .exchange-list-2-0 .span-2{
    float:right;
    color: #8B8989;
}
.exchange-list-3-1 .money{
    color: #f54545;
}
.exchange-list-4-1 .uploadImg{
    padding-bottom: 0.1rem;
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
.exchange-list-item .arrow{
    width: 0.3rem;
    height: 0.3rem;
}
</style>