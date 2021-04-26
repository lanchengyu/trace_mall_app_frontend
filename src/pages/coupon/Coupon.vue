<template>
    <div style="height:100%; background:#f0f0f0;">
        <Top-Header title="优惠券"></Top-Header>
        <div class="box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未使用" name="first">
                    <Item></Item>
                </el-tab-pane>
                <el-tab-pane label="已使用" name="second">
                    <Item></Item>
                </el-tab-pane>
                <el-tab-pane label="已过期" name="third">
                    <Item></Item>
                </el-tab-pane>      
            </el-tabs>       
        </div>
    </div>
</template>
<script>
import TopHeader from "@/common/Header";
import Item from './component/Item'
export default {
    name:"Coupon",
    components: {
        TopHeader,
        Item
    },
    data(){
        return{
            activeName: 'first'
        }
    },
    methods:{
        handleClick(tab, event) {
            // console.log(tab, event);
      }
    }
}
</script>
<style lang="stylus" scoped>
    .box{
        >>>.el-tabs__header{
            background:#fff;
        }
        >>>.el-tabs__nav{
            width:100%;
        }
        >>>.el-tabs__item{
            width:33%;
            text-align:center;
        }
        >>>.el-tabs__item.is-active {
            color: #17C169;
        }
        >>>.el-tabs__active-bar {
            background-color : #17C169;
        }
  
        }
</style>