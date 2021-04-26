<template>
    <div style="height:100%;background-color:#fff;">
        <Order-Header title="评价" btnText="发布" @publish="submit"></Order-Header>
        <div class="box">
            <el-row class="row-first">
                <el-col :span="4" :offset="1"><img :src="productDetail.pic"></el-col>
                <el-col :span="19">
                    <p class="product">{{productDetail.name}}</p>
                    <!-- <span class="attr">
                        <span>颜色:</span>
                        <span>粉色</span>
                    </span> -->
                </el-col> 
            </el-row> 
            <el-form class="form" @submit.native.prevent>
                <div class="overal-box">
                    <el-row>
                    <el-col :span="6" :offset="1">
                        <label class="lable overal">整体评价</label>
                    </el-col>
                    <el-col :span="17">
                        <el-rate v-model="value1" show-text void-color="#C1C3D1"></el-rate>
                    </el-col>
                </el-row>
                </div>
                
                <el-row>
                    <el-col :span="21" :offset="1">
                        <el-input type="textarea" v-model="desc"  placeholder="宝贝满足你的期待吗?说出它的优点和美中不足的地方吧"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="23" :offset="1">
                        <label class="lable">添加图片</label>
                    </el-col>
                </el-row>
                <el-row class="uploadImgs">
                    <el-col :span="21" :offset="1">
                        <upload-img ref="uploadImageChild"
                                    limitNum="6"
                                    @fileSelect="handleFileSelect"
                                    @fileRemove="handleFileRemove"></upload-img>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="23" :offset="1">
                        <label class="lable">店铺评价</label>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" :offset="1">
                        <label class="lable">物流评价</label>
                    </el-col>
                    <el-col :span="18">
                        <el-rate v-model="value2" void-color="#C1C3D1"></el-rate>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5" :offset="1">
                        <label class="lable">服务态度</label>
                    </el-col>
                    <el-col :span="18">
                        <el-rate v-model="value3" void-color="#C1C3D1"></el-rate>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>
<script>
import OrderHeader from "@/common/header-five";
import UploadImage from "@/components/upload/UploadImage"
import {Toast} from "mint-ui";
import {SubmitEvaluation,getProductDetail} from "@/api/mallApi";
export default {
    name:"Evaluate",
    components: {
        OrderHeader,
        'upload-img':UploadImage
    },
    data(){
        return{
            value1: null,
            value2: null,
            value3: null,
            texts:['非常差','差','一般','满意','非常满意'],
            fileList:[],
            productId:'',
            orderSn:'',
            dis:false,
            loading:false,
            desc:'',
            productDetail:{}
        }
    },
    created(){
        //商品id
        var productId=this.$route.query.productId;
        this.productId=productId;
        console.log(this.productId)
        var orderSn=this.$route.query.orderSn;
        this.orderSn=orderSn;
        getProductDetail(productId).then(res=>{
            this.productDetail=res.data;
            console.log("productDetail",this.productDetail);
        })
    },
    methods:{
        reset(){
            this.loading = false
            this.orderSn='';
            this.productId='';
            this.value1=null;
            this.desc='';
            this.$refs.uploadImageChild.finished()
        },
         handleFileSelect (file) {
            this.fileList.push(file)
        },
        handleFileRemove (index) {
            this.fileList.splice(index, 1)
        },
        submit(){
            if(this.orderSn&&this.productId){
                this.loading = true;
                this.dis=!this.dis;
            }
            if(this.value1==null||!this.value1){
                Toast("请对商品做出整体评价");
            }
            let evaluation;
            if(this.value1>=4){
                evaluation=2;
            }else if(this.value1>=2&&this.value1<=3){
                evaluation=1;
            }else{
                evaluation=0;
            }
            const formData = new FormData();
            formData.append("orderSn",this.orderSn);
            formData.append("productId",this.productId);
            formData.append("evaluation",evaluation);
            formData.append("evaluationDescription",this.desc);
            this.fileList.forEach((img, index) => {
                var type = img.type.split('/')[1]
                formData.append('files', img, 'file_' + Date.parse(new Date()) + '.' + type)
            })
            let that=this;
            SubmitEvaluation(formData).then(res=>{
                Toast("评价成功");
                that.reset();
                this.dis=!this.dis;
                setTimeout(function(){
                   that.$router.push({path:'/order',query:{status:'-1'}});
                },1000)
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
.box{
    overflow: auto;
    margin-top:25px;
    >>> .el-row{
        margin-top:0.1rem;
    }
    .row-first .product{
        font-size:0.4rem;
        color:#333333;
        padding-top:6px;
        padding-bottom:15px;
    }
    .row-first img{
        width: 100px;
        height: 100px;
    }
    .row-first .attr{
        color: #8B8989;
        font-size: 0.25rem;
    }
    .form{
        margin-top:0.5rem;
        .uploadImgs{
            border-bottom: 0.3rem solid #f4f4f4;
            padding-bottom:0.3rem !important;
        }
        .overal-box{
            border-bottom:1.5px solid #E3E3E3;
        }
        >>> .el-row{
            padding:0.1rem 0;
        }
        >>> .el-textarea__inner{
            height:3rem;
            color:#BABABA;
            font-size:28px;
            font-family:"SimHei";
            border:0;
            padding: 0;
        }
        .lable{
            font-size:32px;
            color:#333333;
            font-family:"SimHei";
        }
        .overal{
            font-family:"Hiragino Sans GB";
            font-size:38px;
            font-weight:700;
            margin-right:23px;
        }
        >>> .el-rate__icon{
            font-size: 0.65rem;
        }
        >>> .el-icon-star-on{
            color:#FE5002 !important;
        }
        .btn{
            padding: 0 0.2rem;
            margin-top: 0.3rem;
        }
        .btn >>> .mint-button--large{
            height: 0.9rem;
        }
        .btn >>> .mint-button-text{
            font-size:32px;
            color:#7C7C7C;
        }
    }
}

</style>