<template>
    <div style="height:100%;">
        <Order-Header title="退货/退款"></Order-Header>
        <div class="exchange-box">
            <div class="exchange-list">
                <div class="exchange-list-item">
                    <el-row class="row-first pad">
                        <img class="store" src="static/img/store.png"/>
                        <span>天猫超市</span>
                        <img class="arrow" src="static/img/rightArrow.png"/>
                    </el-row>
                    <el-row class="row-second pad">
                        <el-col :span="4" :offset="1"><img class="product-img" src="static/img/peijian.jpg"></el-col>
                        <el-col :span="17">
                            <span class="product">阿道夫旗舰店</span>
                            <p class="attr">
                                <span>尺寸：</span><span>中号</span>
                                <span>颜色：</span><span>军绿色</span>
                            </p>
                        </el-col>
                        <el-col :span="2">
                            <span>x1</span>
                        </el-col> 
                    </el-row> 
                    <el-row class="row-third pad">
                        <div class="pad-div">
                            <img class="store" src="static/img/money.png"/>
                            <span>仅退款，退款成功</span>
                        </div> 
                    </el-row>
                     <el-row class="row-forth pad">
                         <el-col :offset="10">
                            <el-button type="warning" plain>售后服务评价</el-button>
                            <el-button type="warning" plain>查看详情</el-button>
                         </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
export default {
    name:"ServiceList",
    components: {
        OrderHeader
    },
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
.exchange-list-item .arrow{
    width: 0.3rem;
    height: 0.3rem;
}
.exchange-list-item .store{
    width: 0.5rem;
    height: 0.5rem;
}
.row-second{
    background-color:#eee;
    opacity: .7;
    padding: 0.2rem 0.1rem;
}
.row-second .product-img{
    width: 1.5rem;
    height: 1.5rem;
}
.row-forth >>> .el-button{
    font-size: 0.4rem;
}
</style>