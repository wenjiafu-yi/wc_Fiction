// pages/bookdetail/bookdetail.js
import {
  setTitle,
  randomArr,
  time
} from '../../utils/util'
const app = getApp()
Page({
  data: {
    list: {},
    bookOpen: true,
    commentOpen: true,
    commentList: [],
    guessList: []
  },

  // 打开简介
  changeState() {
    this.setData({
      bookOpen: !this.data.bookOpen
    })
  },

  // 获取书籍详情
  getBookDetail(id) {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/' + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let list = res.data
        setTitle(list.title)
        list.cover = decodeURIComponent(list.cover)
        list.cover = list.cover.replace('/agent/', '')
        list.wordCount = (list.wordCount / 10000).toFixed(1)
        _this.majorCate = list.majorCate
        if (list.rating) {
          list.rating.score = (list.rating.score).toFixed(1)
          list.star = Math.floor(list.rating.score / 2)
        }
        _this.setData({
          list
        })
        // 获取当前同类下的小说
        _this.getSecondClassify()
      }
    })
  },

  // 获取热门书评
  getHotComment(bookId) {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/post/review/by-book?book=' + bookId + '&sort=helpful&start=0&limit=5',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let commentList = res.data.reviews
        commentList.forEach(item => {
          item.open = true
          item.updated = time(item.updated)
        })
        _this.setData({
          commentList
        })
      }
    })
  },
  // 评论展开或者收起
  openComment(event) {
    let {
      index
    } = event.currentTarget.dataset
    let commentList = this.data.commentList
    commentList[index].open = !commentList[index].open
    this.setData({
      commentList
    })
  },

  // 推荐书籍
  getSecondClassify() {
    this.params = {
      type: 'hot',
      major: this.majorCate,
      start: 0,
      limit: 20,
      minor: '',
      gender: ''
    }
    let _this = this
    wx: wx.request({
      url: 'http://api.zhuishushenqi.com/book/by-categories?type=hot&major=' + this.majorCate + '&start=0&limit=20& minor=&gender=',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let guessList = res.data.books || []
        let _arr = randomArr(guessList, 6)
        _arr.forEach(i => {
          i.cover = decodeURIComponent(i.cover)
          i.cover = i.cover.replace('/agent/', '')
        })
        _this.setData({
          guessList: _arr
        })
      }
    })
  },
  // 猜你喜欢详情
  guessDetail(event) {
    let {
      id
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/bookdetail/bookdetail?bookId=${id}`,
    })

  },
  //查看更多详情
  allDetail() {
    wx.navigateTo({
      url: `/pages/guesslist/guesslist?params=${JSON.stringify(this.params)}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let {
      bookId
    } = options
    this.bookId = bookId
    this.getBookDetail(bookId)
    this.getHotComment(bookId)
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