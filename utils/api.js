// 后台接口配置
const config = {
    thea: 'https://api.fangjinyun.com.cn/fjs/thea-backend/apiwhthout/v1/',
    paris: 'https://api.fangjinyun.com.cn/fjs/paris-backend/apiwithout/v1/',
    prometheus: 'https://api.fangjinyun.com.cn/fjs/prometheus-backend/apiwithout/v1/'
}

function requestGet(api, url, data, doSuccess, doFail, doComplete) {
    wx.request({
        url: getUrl(api, url),
        method: 'GET',
        data: data,
        header: {
            'content-type': 'application/x-www-form-urlencoded',
            'authorization': 'bearer 6797fec1-dbcd-4efb-82c2-ba43c12ceda8'
        },
        success: function(res) {
            if (typeof doSuccess == "function") {
                doSuccess(res);
                wx.hideNavigationBarLoading(); //隐藏导航条加载动画
            }
        },
        fail: function(res) {
            if (typeof doFail == "function") {
                doFail(res);
            }
        },
        complete: function(res) {
            if (typeof doComplete == "function") {
                doComplete(res);
            }
        }
    })
}

function requestPost(url, data, doSuccess, doFail, doComplete) {
    wx.request({
        url: getUrl(url),
        method: 'POST',
        data: data,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res) {
            if (typeof doSuccess == "function") {
                doSuccess(res);
            }
        },
        fail: function(res) {
            if (typeof doFail == "function") {
                doFail(res);
            }
        },
        complete: function(res) {
            if (typeof doComplete == "function") {
                doComplete(res);
            }
        }
    })
}

function getUrl(api, route) {
    return config[api] + route;
}

module.exports = {
    requestGet: requestGet,
    requestPost: requestPost
}