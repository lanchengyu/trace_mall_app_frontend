/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
// import Axios from 'axios'
import {getWxApi} from '@/api/mallApi'
const wxApi = {
    /**
    * [wxRegister 微信Api初始化]
    * @param  {Function} callback [ready回调函数]
    */
    wxRegister(callback) {
        // 这边的接口请换成你们自己的
        let data={
            url:window.location.href.split('#')[0]
        }
        // alert(data.url);
        getWxApi(data).then(res => {
            let data = res.data; // PS: 这里根据你接口的返回值来使用
            wx.config({
                debug: false, // 开启调试模式
                appId: data.appid, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature:data.signature, // 必填，签名，见附录1
                jsApiList: ['updateTimelineShareData','updateAppMessageShareData'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        }).catch((error) => {
            console.log(error)
        });
        wx.ready(function(){
            if (callback) {
                callback();
            }
        })
        wx.error(function(res){
            // alert("验证失败");
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    },
    /**
    * [ShareTimeline 微信分享到朋友圈]
    * @param {[type]} option [分享信息]
    * @param {[type]} success [成功回调]
    * @param {[type]} error   [失败回调]
    */
    ShareTimeline(option) {
        wx.updateTimelineShareData({
            title: option.title, // 分享标题
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },
    /**
    * [ShareAppMessage 微信分享给朋友]
    * @param {[type]} option [分享信息]
    * @param {[type]} success [成功回调]
    * @param {[type]} error   [失败回调]
    */
    ShareAppMessage(option) {
        wx.updateAppMessageShareData({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success:function() {
                // 用户成功分享后执行的回调函数
                option.success()
            }
        })
    },
    ChooseImage(option){
        wx.chooseImage({
            count: wx.count, // 默认9
            sizeType: option.sizeType, // 可以指定是原图还是压缩图，默认二者都有
            sourceType: option.sourceType, // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              option.success(res)
            }
        });
    }
}
export default wxApi