//获取应用实例
const fetch = require('../../utils/api.js')
const app = getApp()
Page({
    data: {
        imgUrls: [
            'https://fjs-paris.oss-cn-hangzhou.aliyuncs.com/img/1525327260692.png',
        ],
        newsflash: '../../assets/images/newsflash.png',
        uls: [],
        sliderNum: 502,
        loanQuota: '',
        loanTerm: '',
        monthlyRate: '',
        product: [],
        hidden: true,
        selected: '0',
        checked: false,
        checkImg: ['../../assets/images/checked.png', '../../assets/images/check.png'],
        checkCity: false
    },
    onLoad() {
        let datas = wx.getStorageSync('datas')
        if (datas) {
            this.setData({
                    uls: datas
                })
                //console.log('2222' + JSON.stringify(this.data.uls))
        } else {
            this.initScroll()
        }
        // this.initBanner()
        // this.initMess()
        // this.initProduct()
    },
    //banner
    initBanner() {
        fetch.requestGet('paris', 'queryBannerConfig', { bannerType: "home" }, res => {
            this.setData({
                imgUrls: res.data.data
            })
        })
    },
    //房金云快报
    initScroll() {
        fetch.requestGet('thea', 'queryHomeScrollData', {}, res => {
            let loanItem = res.data.data.loanItem
            let num = Math.ceil(loanItem.length / 3)
            let arr2 = []
                //数据格式处理
            for (var x = 0; x < num; x++) {
                let ulsData = []
                ulsData.data = []
                for (var y = 3 * x; y < 3 * (x + 1); y++) {
                    let arr = []
                    ulsData.push(loanItem[y])
                }
                //console.log(x + "---" + JSON.stringify(ulsData))
                ulsData.data.push(ulsData)

                arr2.push(ulsData)
            }
            let datas = arr2.map((val, index) => {
                let obj = {}
                obj.data = val
                return obj
            })
            this.setData({
                uls: datas
            })
            wx.setStorageSync('datas', datas)
        })
    },
    //
    initMess() {
        fetch.requestGet('prometheus', 'queryLoanApplyCfg', {}, res => {
            let { loanQuota, loanTerm, monthlyRate } = res.data
            this.setData({
                loanQuota,
                loanTerm,
                monthlyRate
            })
        })
    },
    // 热门贷款产品
    initProduct() {
        fetch.requestGet('prometheus', 'getTopicPro', {}, res => {
            let product = res.data.map((val, index) => {
                let obj = {}
                obj.color = index === 0 ? "../../assets/images/bg1.png" : (index === 1 ? "../../assets/images/bg2.png" : "../../assets/images/bg3.png")
                obj.productType = val.productType
                obj.rate = val.rate
                obj.loanNumbers = val.loanNumbers
                return obj
            })
            this.setData({
                product
            })
        })
    },
    sliderChange(e) {
        this.setData({
            sliderNum: e.detail.value
        })
    },
    apply() {
        this.setData({
            hidden: false
        })
    },
    // 标签页切换
    selected: function(e) {
        var that = this;
        if (this.data.selected === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                selected: e.target.dataset.current
            })
        }
    },
    // 取消
    cancel() {
        this.setData({
            hidden: true
        })
    },
    // 提交
    confirm() {
        console.log('提交')
    },
    // 获取验证码
    getCode() {
        console.log('获取验证码')
    },
    // 跳转协议
    link() {
        console.log('跳转')
    },
    // 选择协议
    checkIt() {
        this.setData({
            checked: !this.data.checked
        })
    },
    // 选择城市
    checkCity() {
        if (this.data.checkCity) {
            this.setData({
                checkCity: false
            })
        } else {
            this.setData({
                checkCity: true
            })
        }
    }
})