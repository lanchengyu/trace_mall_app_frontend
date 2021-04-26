<!-- 微信授权后的页面 -->
<template>
  <div>
      <p>欢迎来到微信授权后的重定向页面</p>
  </div>
</template>

<script>
export default {
  name:'Auth',
  data () {
    return {
        code:""
    };
  },
  beforeEnter(){
      function getQueryString(name){  
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
        var r = window.location.search.substr(1).match(reg);  
        if (r != null) return unescape(r[2]); return null;              
    }   
    var code = getQueryString("code");
    alert("code=",code);
    // let appid="wx5aef4a1ffe47256d";
    // let secret="c78d9e87a921ded77553fefd54881443";
    // var url=" https://api.weixin.qq.com/sns/oauth2/access_token?appid="+appid+"&secret="+SECRET+"&code="+code+"&grant_type=authorization_code";
    // $.ajax({
    //     url:,
    //     dataType:'jsonp',
    //     data:"select * from json where url="
    // })
    // var timestamp = (new Date()).getTime();
    // function onBridgeReady(){
    //     WeixinJSBridge.invoke(
    //         'getBrandWCPayRequest', {
    //             "appId":appid,     //公众号名称，由商户传入     
    //             "timeStamp":timestamp,         //时间戳，自1970年以来的秒数     
    //             "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
    //             "package":"prepay_id=u802345jgfjsdfgsdg888",     
    //             "signType":"MD5",         //微信签名方式：     
    //             "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
    //         },
    //         function(res){
    //             if(res.err_msg == "get_brand_wcpay_request:ok" ){
    //             // 使用以上方式判断前端返回,微信团队郑重提示：
    //                     //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //             } 
    //         }); 
    // }
    // if (typeof WeixinJSBridge == "undefined"){
    // if( document.addEventListener ){
    //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    // }else if (document.attachEvent){
    //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
    //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    // }
    // }else{
    // onBridgeReady();
    // }
  },
  components: {},

  computed: {},

  methods: {}
}

</script>
<style scoped>
</style>
