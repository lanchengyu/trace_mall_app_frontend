<template>
    <div style="height:100%; background:#f0f0f0;">
        <Top-Header title="修改密码"></Top-Header>
        <div class="box">
            <mt-field label="当前登陆密码" placeholder="请输入当前登陆密码" type="password"></mt-field>
            <mt-field label="确认新密码" placeholder="确认新密码" type="password"></mt-field>
            <p class="prompt">必须是6-20个英文字母、数字或符号(除空格)</p>
        </div>
        <div class="btn">
            <mt-button class="submit-btn" type="danger" size="large" @click="modify">提交</mt-button>
        </div>
    </div>
</template>
<script>
import TopHeader from "@/common/Header";
import { Field,Cell } from 'mint-ui';
export default {
    name:"ModifyPwd",
    data(){
        return{
            
        }
    },
    components: {
        TopHeader,
        Field,
        Cell
    },
    methods:{
        modify(){

        }
    }
}
</script>
<style scoped>

.box >>>.mint-field{
    margin-top: 0.5rem;
    height: 0.8rem;
}
.box >>> .mint-field .mint-cell-title{
    width:180px;
    padding-left:20px;
    font-size: 0.25rem;
}

.box .prompt{
    margin-top: 0.1rem;
    font-size: 0.25rem;
    color: #BEBEBE;
}
.btn{
    padding: 0 0.2rem;
    margin-top: 0.2rem;
}
.btn >>> .mint-button--large{
    height: 1.0rem;
}
</style>