<template>
    <div style="height:100%; background:#f0f0f0;">
        <Top-Header title="换绑手机"></Top-Header>
        <div class="box">
            <p>请输入你需要绑定的新手机号</p>
            <mt-cell title="国家和地区" is-link>
                <span>中国大陆86</span>
            </mt-cell>
            <mt-field label="新手机号" placeholder="请输入当新手机号" type="text"></mt-field>
        </div>
        <div class="btn">
            <mt-button class="submit-btn" type="danger" size="large" @click="next">下一步</mt-button>
        </div>
    </div>
</template>
<script>
import TopHeader from "@/common/Header";
export default {
    name:"ModifyTel",
    components:{
        TopHeader
    },
    methods:{
        next(){
            console.log("发送验证码");
        }
    }
}
</script>
<style scoped>
.box p{
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 0.25rem;
    color: #BEBEBE;
    padding-left: 20px;
}
.box >>>.mint-field{
    height: 0.8rem; 
    line-height: 0.8rem;  
}
.box >>>.mint-field .mint-cell-title{
    width:160px;
    padding-left:20px;
    font-size: 0.25rem;
}
.box >>>.mint-cell{
    border-bottom: 1px solid #BEBEBE;
    height: 0.8rem;
    line-height: 0.8rem;
}
.box >>>.mint-cell .mint-cell-title{
    width:160px;
    padding-left:20px;
    font-size: 0.25rem;
}
.box >>>.mint-cell .mint-cell-value{
    font-size: 0.25rem;
    padding-left:20px;
    color: #000;
}
.btn{
    padding: 0 0.2rem;
    margin-top: 0.2rem;
}
.btn >>>.mint-button--large{
    height: 1.0rem;
}
</style>