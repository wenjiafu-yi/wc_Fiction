// pages/searchlist/searchlist.js
import {
  setTitle
} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadmore: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      query
    } = options
    setTitle(query)
    this.searchBook(query)
  },

  more() {},
  // 搜索数据
  searchBook(value) {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/fuzzy-search?query=' + value,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let list = res.data.books
        _this.setData({
          list,
          loadmore: {
            list,
            item: list
          }
        })
      }
    })
  },
  // 监听子组件传值
  bookDetail(event) {
    let bookId = event.detail
    wx.navigateTo({
      url: `/pages/bookdetail/bookdetail?bookId=${bookId}`,
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      'loadmore.item': []
    })
  }
})