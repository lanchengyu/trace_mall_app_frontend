<template>
  <div style="height:100%;">
    <Top-Header title="支付订单"></Top-Header>
    <div class="main-container">
      <div class="box-1">
        <span class="left">需支付</span>
        <span class="right">¥{{order.payAmount}}</span>
      </div>
      <div class="box-head">支付方式</div>
      <!-- <div class="box-2">
        <img src="static/img/alipay.png">
        <p>
          <span class="title">支付宝</span>
          <span class="subTitle">数亿用户都在用,安全可托付</span>
        </p>
        <el-radio class="right"
                  v-model="radio"
                  label="1">&nbsp;</el-radio>
      </div> -->
      <div class="box-2">
        <img src="static/img/weixin.jpg">
        <p>
          <span class="title">微信</span>
        </p>
        <el-radio class="right"
                  v-model="radio"
                  label="0">&nbsp;</el-radio>
      </div>
    </div>
    <div class="pay-footer">
      <p class="price">应付金额：<span>¥{{order.payAmount}}</span></p>
      <el-button @click="payOrder()"
                 class="pay"
                 type="danger"
                 :loading="loading"
                 size="small"
                 round>确认支付</el-button>
    </div>

  </div>
</template>
<script>
import TopHeader from "@/common/Header";
import { payOrder,WeixinPay,getJSAPIParam} from '@/api/mallApi'
import { Cell,Toast} from 'mint-ui';
import {getQueryString} from '@/utils/queryString'
export default {
  name: "PayOrder",
  components: {
    TopHeader
  },
  data () {
    return {
      loading: false,
      order: {
        orderId: null,
        payAmount: null
      },
      radio: '0',
      code:"",
      result:{}
    };
  },
  created () {
    this.order.orderId = this.$route.query.orderId
    this.order.payAmount = this.$route.query.payAmount
  },
  methods: {
    payOrder () {
      if(this.radio==1){
          if (this.order.orderId) {
            this.loading = true
            payOrder(this.order.orderId).then((res) => {
              this.loading = false
              if (res.code === 200) {
                const div = document.createElement('div')
                div.innerHTML = res.data //此处form就是后台返回接收到的数据
                document.body.appendChild(div)
                document.forms[0].submit()
              }
            }).catch((e) => {
              this.loading = false
            })
          } else {
            Toast('非法参数')
          }
      }
      if(this.radio==0){
        //调用微信支付接口
        if(this.order.orderId){
          this.loading = true
          if(this.isNeizhi()){
            //是微信内置浏览器
            //授权获取code
            // var url="http://hnst888.com/mp/?code=071SmZPZ0eEBdY1EeiRZ0RGeQZ0SmZPv&state=STATE";
            // var args=getQueryString(url);
            // let code;
            // for(var i=0;i<args.length;i++){
            //   if(args[i].key==="code"){
            //     code=args[i].value;
            //   }
            // }
            // let data={
            //   orderId:this.order.orderId,
            //   code:code
            // }
            // console.log("code=",code);
            this.authorize_weixin();
            // getJSAPIParam({data:data}).then((res)=>{
            //   let result=res.data;
            //   if (typeof WeixinJSBridge == "undefined"){
            //     if( document.addEventListener ){
            //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            //     }else if (document.attachEvent){
            //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            //     }
            //   }else{
            //     this.onBridgeReady(result);
            //   }
            // }).catch((res)=>{
            //   console.log(res);
            // })
          }else{
            //不是微信内置浏览器
            WeixinPay(this.order.orderId).then((res)=>{
              let data=res.data;
              window.location.href=data;
            }).catch((res)=>{
              Toast('支付异常');
            })
          }
        }else{
          Toast('非法参数')
        }
      }
    },
   isNeizhi() {
      var ua =window.navigator.userAgent.toLowerCase();
      // console.log(ua);//mozilla/5.0 (iphone; cpu iphone os 9_1 like mac os x) applewebkit/601.1.46 (khtml, like gecko)version/9.0 mobile/13b143 safari/601.1
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        //是微信内置浏览器
        return true;
      }
      else {
        //不是微信内置浏览器
        return false;
      }
    },
    authorize_weixin(){
      //微信授权获取openidauth.html
      var appid="wx5aef4a1ffe47256d";
      //授权之后跳转的页面
      // let params=this.order.orderId+'&'+this.order.payAmount;
      var redirect_uri="http%3A%2F%2Fhnst888.com%2Fmp%2Fauth.html%3F";
      var local=window.location.href;
      let params=this.order.orderId+"%26"+this.order.payAmount;
      var url ="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state="+params+"#wechat_redirect";
      window.location.href=url;
    },
    onBridgeReady(result){
      WeixinJSBridge.invoke(
          'getBrandWCPayRequest', {
            "appId":result.appId,     //公众号名称，由商户传入     
            "timeStamp":result.timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr":result.nonceStr, //随机串     
            "package":result.package,     
            "signType":result.signType,         //微信签名方式：     
            "paySign":result.paySign //微信签名 
          },
           function(res){      
      	    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                 //支付成功后跳转的页面
            }else if(res.err_msg == "get_brand_wcpay_request:cancel"){
          	   console.log('支付取消');
            }else if(res.err_msg == "get_brand_wcpay_request:fail"){
          	   console.log('支付失败');
                 WeixinJSBridge.call('closeWindow');
            } //使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok,但并不保证它绝对可靠。
      }); 
    }
  }
}
</script>
<style lang="stylus" scope>
.box-1 {
  padding: 0.4rem 0.25rem;
  font-size: 0.5rem;
  background: white;

  .left {
  }

  .right {
    float: right;
    color: red;
  }
}

.box-head {
  padding: 0.25rem;
  margin-top: 0.5rem;
  font-size: 0.5rem;
  background: white;
  color: darkgray;
  border-bottom: 1px solid #e8e8e8;
}

.box-2 {
  height: 2rem;
  background: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0.25rem;

  img {
    width: 1.5rem;
    float: left;
  }

  p {
    float: left;
    display: flex;
    flex-direction: column;
    padding-left: 0.25rem;

    .title {
      font-size: 0.5rem;
      line-height: 0.75rem;
    }

    .subTitle {
      color: darkgray;
      font-size: 0.35rem;
      line-height: 0.75rem;
    }
  }

  .right {
    float: right;
    line-height: 1.5rem;
  }
}

.pay-footer {
  width: 100%;
  height: 1.5rem;
  border-top: 1px solid #eaeaea;
  background: white;
  position: fixed;
  bottom: 0;

  .price {
    float: left;
    line-height: 1.5rem;
    font-size: 0.43rem;
    color: #666;
    padding-left: 0.3rem;

    span {
      color: red;
    }
  }

  .pay {
    width: 3.3rem;
    margin-top: 0.3rem;
    margin-right: 0.3rem;
    color: white;
    float: right;
  }
}
</style>

