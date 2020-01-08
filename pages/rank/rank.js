// pages/rank/rank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryInfo: {
      list: [{
          id: 0,
          title: "男频",
          value: 2
        },
        {
          id: 1,
          title: "女频",
          value: 1
        }
      ],
      check: 0
    },
    rankInfo: []
  },

  // tab切换
  changeTab(event) {
    let index = event.currentTarget.dataset.index
    if (index !== this.data.categoryInfo.check) {
      this.setData({
        'categoryInfo.check': index
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllList()
  },
  //榜单列表
  getAllList() {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/gender',
      success(res) {
        let data = res.data
        let rank = []
        rank[0] = data.male
        rank[1] = data.female
        rank[2] = data.epub
        rank[3] = data.picture
        _this.setData({
          rankInfo: rank
        })
      }
    })
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