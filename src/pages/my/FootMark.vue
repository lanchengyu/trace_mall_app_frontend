<template>
    <div style="height:100%">
         <Order-Header title="我的足迹"></Order-Header>
         <div class="box">
             <!-- <el-row class="date">
                 <el-col :span="23" :offset="1">
                     <p>9月9日</p>
                 </el-col>
             </el-row>
             <el-row>
                <el-col :span="7" :offset="1">
                    <router-link to="/">
                        <div class="item">
                            <img src="static/img/product.jpg">
                            <p>
                                <span>￥</span><span>120</span>
                                <span></span>
                            </p>

                        </div>
                    </router-link>
                </el-col>
                <el-col :span="7" :offset="1">
                    <router-link to="/">
                        <div class="item">
                            <img src="static/img/product.jpg">
                            <p><span>￥</span><span>120</span></p>
                        </div>
                    </router-link>
                </el-col>
                <el-col :span="7" :offset="1">
                    <router-link to="/">
                        <div class="item">
                            <img src="static/img/product.jpg">
                            <p><span>￥</span><span>120</span></p>
                        </div>
                    </router-link>
                </el-col>
            </el-row> -->
            <p class="date">9月9日</p>
            <ul class="lists">
                <!-- <li @click="open(product.id)">
                    <div class="list">
                    <div class="image">
                        <img src="static/img/product.jpg"
                            alt="图片">
                    </div>
                    <p class="name">麻辣王子</p>
                    <div class="price">¥<span>100</span></div>
                    </div>
                </li>
                <li @click="open(product.id)">
                    <div class="list">
                    <div class="image">
                        <img src="static/img/product.jpg"
                            alt="图片">
                    </div>
                    <p class="name">麻辣王子</p>
                    <div class="price">¥<span>100</span></div>
                    </div>
                </li>
                <li @click="open(product.id)">
                    <div class="list">
                    <div class="image">
                        <img src="static/img/product.jpg"
                            alt="图片">
                    </div>
                    <p class="name">麻辣王子</p>
                    <div class="price">¥<span>100</span></div>
                    </div>
                </li> -->
                <li v-for="(product, index) in productList"
                        :key="index"
                        @click="open(product.id)">
                        <div class="list">
                        <div class="image">
                            <img :src="product.pic"
                                alt="图片">
                        </div>
                        <p class="name">{{product.name}}</p>
                        <div class="price">¥<span>{{product.price}}</span></div>
                        </div>
                    </li>
                </ul>
         </div>
    </div>
</template>
<script>
import OrderHeader from "@/common/Header";
export default {
    name:"FootMark",
    components:{
        OrderHeader
    },
    props: {
        productList: Array
    },
    created(){
        //调用获取足迹的接口，赋值给productList
    },
    methods: {
        open: function (id) {
            this.$router.push({ path: "goodDetail", query: { id: id } });
        }
  }
}
</script>
<style lang="stylus" scoped>
// .box{
//     margin-top:0.1rem;
//     .date{
//         margin:0.1rem 0;
//         p{
//             font-size:0.35rem;
//             color:#888888;
//         }
//     }
//     .item{
//         text-align:center;
//         background-color:#fff;
//         padding:0.3rem 0;
//         img{
//             width:2.0rem;
//             height:2.0rem;
//         }
//         p{
//             span:first-child{
//                 color:red;
//                 font-size:0.4rem;
//             }
//             span:last-child{
//                 font-size:0.35rem;
//             }
//         }
//     }
// }
.date{
    margin-left:0.2rem;
    font-size:0.35rem;
    color:#888;
    margin-bottom:0.1rem;
}
.main h2 {
  display: block;
  height: 1.3rem;
  background: white;
  font-size: 0.35rem;
  line-height: 1.3rem;
  padding-left: 0.3rem;
}

.list {
  background: white;
  float: left;
  width: 50%;
  border-right: 1px solid #f4f4f4;
  border-top: 1px solid #f4f4f4;
}

ul {
  overflow: hidden;

  li {
    list-style: none;
  }
}

.price {
  font-size: 0.25rem;
  color: red;
  margin: auto;
  text-align: center;

  span {
    font-size: 0.35rem;
    padding-left: 0.1rem;
  }
}

.name {
  width: 80%;
  height: 0.5rem;
  line-height: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: auto;
  font-size: 0.29rem;
  font-weight: 800;
  text-align: center;
}

.image {
  overflow: hidden;
  margin: 0.3rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
  }
}
</style>