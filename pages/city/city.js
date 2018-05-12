// pages/demo/demo.js
let City = require('../../utils/allcity.js')
const app = getApp()

Page({
    data: {
        city: City,
    },
    bindClick(e) {
        console.log(e.detail)
        app.globalData.cityName = e.detail.name
        console.log(app.globalData.cityName)
        wx.navigateBack({
            delta: 1
        })
    },
    input(e) {
        this.value = e.detail.value
    },
    searchMt() {
        // 当没有输入的时候，默认inputvalue 为 空字符串，因为组件 只能接受 string类型的 数据 
        if (!this.value) {
            this.value = '';
        }
        this.setData({
            value: this.value
        })
    },
})