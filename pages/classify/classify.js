// pages/classify/classify.js
import {
  imgLazy
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop: 0,
    toView: '',
    classifyInfo: {
      list: [{
          title: '男生',
          value: 'male'
        },
        {
          title: '女生',
          value: 'female'
        },
        {
          title: '漫画',
          value: 'picture'
        },
        {
          title: '出版',
          value: 'press'
        }
      ],
      check: 0
    },
    bookList: []

  },

  // 获取分类列表
  getClassify() {
    let _this = this

    wx.request({
      url: 'http://api.zhuishushenqi.com/cats/lv2/statistics',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let data = res.data
        let list = _this.data.classifyInfo.list
        Object.keys(data).forEach((i, k) => {
          if (i !== 'ok') {
            data[i].forEach((item, index) => {
              let arr = []
              item.bookCover.forEach((value, key) => {
                value = decodeURIComponent(value)
                value = value.replace('/agent/', '')
                arr.push(value)
              })
              item.bookCover = arr
            })
            list[k].bookList = data[i]
          }
        })
        list.map(item => {
          item.flag = false
          item.defaultCover = '/images/loading.png'
        })
        _this.setData({
          "classifyInfo.list": list
        })
        imgLazy(_this, list, 'classifyInfo.list', '.classify-shelf', false)
        _this.getQuery()
      }
    })
  },

  // 分类详情
  classifyDetail(event) {
    let {
      title,
      classify
    } = event.currentTarget.dataset
    let data = {
      title
    }
    //搜索二级分类
    wx.request({
      url: '',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        let childList = res.data[0].mins
        let params = {
          title,
          childList,
          classify
        }
        wx.navigateTo({
          url: `/pages/classifychild/classifychild?params=${JSON.stringify(params)}`,
        })
      }
    })
  },
  // 切换导航
  changeNav(event) {
    let index = event.currentTarget.dataset.index
    if (!(index === this.data.classifyInfo.check)) {
      this.setData({
        'classifyInfo.check': index
      })
      this.setData({
        toView: `key${index}`
      })
    }
  },
  // 获取节点信息
  getQuery() {
    const query = wx.createSelectorQuery()
    query.selectAll('.classify-shelf').boundingClientRect().exec(res => {
      let queryInfo = []
      res[0].forEach(item => {
        queryInfo.push(item.height)
      })
      this.setData({
        queryInfo
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getClassify()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})