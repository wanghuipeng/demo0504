//获取应用实例
const fetch = require('../../utils/api.js')

const app = getApp()
var interval = null //倒计时函数
Page({
    data: {
        imgUrls: [
            'https://fjs-paris.oss-cn-hangzhou.aliyuncs.com/img/1525327260692.png',
        ],
        newsflash: '../../assets/images/newsflash.png',
        uls: [],
        name: '',
        sliderNum: 502,
        cityName: '',
        tel: '',
        password: '',
        loanQuota: '',
        loanTerm: '',
        monthlyRate: '',
        product: [],
        selected: '0',
        checked: false,
        checkImg: ['../../assets/images/checked.png', '../../assets/images/check.png'],
        shadeVisible: false,
        modalVisible: false,
        date: '请选择日期',
        fun_id: 2,
        time: '获取验证码', //倒计时 
        currentTime: 60,
        disabled: false
    },
    onLoad() {
        // let datas = wx.getStorageSync('datas')
        // if (datas) {
        //     this.setData({
        //             uls: datas
        //         })
        // } else {
        //     this.initScroll()
        // }
        this.initScroll()
        this.initBanner()
        this.initMess()
        this.initProduct()
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
            shadeVisible: true,
            modalVisible: true
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
            shadeVisible: false,
            modalVisible: false
        })
    },
    // 提交
    formSubmit(e) {
        console.log(this.data.cityName)
        let that = e.detail.value
        let { name, sliderNum, cityName, tel, password } = that
        console.log(that.name, that.sliderNum, that.cityName, that.tel, that.password)
        if (that.name === '') {
            wx.showToast({
                title: '请输入姓名',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        } else if (that.sliderNum <= 0) {
            wx.showToast({
                title: '贷款金额不能小于0',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        } else if (that.cityName === '') {
            wx.showToast({
                title: '请选择城市',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        } else if (that.tel === '') {
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        } else if (that.password === '') {
            wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 1000,
                mask: true
            })
        }
    },
    // 获取验证码
    getCode: function(options) {
        var that = this;
        var currentTime = that.data.currentTime
        interval = setInterval(function() {
            currentTime--;
            that.setData({
                time: currentTime + '秒'
            })
            if (currentTime <= 0) {
                clearInterval(interval)
                that.setData({
                    time: '重新获取',
                    currentTime: 60,
                    disabled: false
                })
            }
        }, 1000)
    },
    getVerificationCode() {
        this.getCode();
        var that = this
        that.setData({
            disabled: true
        })
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
        wx.navigateTo({
            url: '../city/city'
        })
    }
})