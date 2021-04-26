export function getQueryString(url) {
    if(url.indexOf("?")>-1){
        var result=[];
        var paraStr=url.split("?")[1];
        var paraItems=paraStr.split("&");
        for(var i=0;i<paraItems.length;i++){
            var paraKey=paraItems[i].split("=")[0];
            var paraValue=paraItems[i].split("=")[1];
            result.push({
            key:paraKey,
            value:paraValue
            })
        }	
        return result;
        }else{
        console.log("该URL中不含参数")
        }
    }
