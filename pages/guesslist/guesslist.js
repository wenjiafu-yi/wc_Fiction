// pages/guesslist/guesslist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    loadmore: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      params
    } = options
    this.params = JSON.parse(params)
    this.moreData = true
    this.getSecondClassify()
  },

  onReachBottom() {
    if (this.moreData) {
      this.params.start = this.params.start + 20
      this.params.limit = this.params.limit + 20
      this.getSecondClassify()
    }
  },

  getSecondClassify() {
    let _this = this
    wx: wx.request({
      url: 'http://api.zhuishushenqi.com/book/by-categories?type=hot&major=' + this.params.major + '&start=' + this.params.start + '&limit=' + this.params.limit + '&minor=&gender=',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let _bookList = res.data.books
        let bookList = _this.data.bookList
        bookList.push(..._bookList)
        _this.setData({
          bookList,
          loadmore: {
            list: bookList,
            item: _bookList
          }
        })
      }
    })
  },

  more() {
    this.moreData = false
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/bookdetail/bookdetail?bookId=${bookId}`,
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