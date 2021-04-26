<template>
    <div class="detail">
            <el-row>
                <el-col :span="20">
                    <p>完成每日登陆</p>
                    <p class="time">2019-09-02 17:17</p>
                </el-col>
                <el-col :span="4">
                    <p class="score">+5</p>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="20">
                    <p>完成每日登陆</p>
                    <p class="time">2019-09-02 17:17</p>
                </el-col>
                <el-col :span="4">
                    <p class="score">+5</p>
                </el-col>
            </el-row>
        </div>
</template>
<script>
export default {
    name:"IntegrationContainer"
}
</script>
<style lang="stylus" scoped>
    .detail{
        background: #ffffff;
        border-bottom:1px solid #eeeeee;
        p{
            padding:0.3rem 0.47rem;
            font-size:0.35rem;
            color:#333333;
        }
        .time{
            color:#888888;
            font-size:0.3rem;
        }
        .score{
            color:#17C169;
            font-weight:bold;
            line-height:1.41rem;
        }
        >>> .el-row{
            border-bottom:1px solid #eeeeee;
        }
    }
</style>