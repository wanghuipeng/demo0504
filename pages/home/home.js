//获取应用实例
const fetch = require('../../utils/api.js')
const app = getApp()

Page({
    data: {
        imgUrls: [
            'https://fjs-paris.oss-cn-hangzhou.aliyuncs.com/img/1525327260692.png',
        ],
        newsflash: '../../assets/images/newsflash.png',
        uls: [{
                data: [
                    { textContent: "a先生 05月07日 17:37 申请", amount: "10" },
                    { textContent: "b先生 05月07日 17:37 申请", amount: "40" },
                    { textContent: "c先生 05月07日 17:37 申请", amount: "480" }
                ]
            },
            {
                data: [
                    { textContent: "d先生 05月07日 17:37 申请", amount: "400" },
                    { textContent: "e先生 05月07日 17:37 申请", amount: "70" },
                    { textContent: "f先生 05月07日 17:37 申请", amount: "80" }
                ]
            }
        ]
    },
    onLoad() {
        this.initData()
    },
    initData() {
        res.data.data.loanItem.map(function(val, index) {

        })
        fetch.requestGet('thea', 'queryHomeScrollData', {}, res => {
            this.setData({
                uls: res.data.data.loanItem
            })
        })
    }
})