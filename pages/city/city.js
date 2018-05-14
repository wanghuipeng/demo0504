// pages/demo/demo.js
let City = require('../../utils/allcity.js')
const app = getApp()

Page({
    data: {
        city: City,
    },
    bindClick(e) {
        console.log(e.detail)
        var pages = getCurrentPages() //获取加载的页面( 页面栈 )
            　　 var currentPage = pages[pages.length - 1] // 获取当前页面
                　　
        var prevPage = pages[pages.length - 2] //获取上一个页面
            　　 // 设置上一个页面的数据（可以修改，也可以新增）
            　　 prevPage.setData({　　　　 cityName: e.detail.name　　 })
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