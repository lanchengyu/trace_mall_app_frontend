<template>
    <div style="height:100%;">
        <Order-Header title="积分记录"></Order-Header>
        <div class="box">
            <el-row>
                <el-col :span="13" :offset="1">
                    <img src="static/img/calendar.png"/>
                    <span>2019年05月</span>
                </el-col>
                <el-col :span="10">
                    <span>获得：500</span>
                    <span>使用：300</span>
                </el-col>
            </el-row>
        </div>
        <IntegrationContainer></IntegrationContainer>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
import IntegrationContainer from "./component/integrationContainer"
export default {
    name:'Integrationlist',
    components: {
       OrderHeader,
       IntegrationContainer
    },
}
</script>
<style lang="stylus" scoped>
.box{
    img{
        width:0.5rem;
        height:0.5rem;
    }
    >>> .el-row{
        padding:0.3rem 0;
        background-color:#fff;
        border-bottom:1px solid #eeeeee;
        span{
            font-size:0.35rem;
            color:#888888;
        }
    }
}
</style>