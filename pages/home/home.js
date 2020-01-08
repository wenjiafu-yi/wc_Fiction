// pages/home/home.js
import {
  randomArr
} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [{
        img: "/images/swiper1.jpg",
        link: ""
      },
      {
        img: "/images/swiper2.jpg",
        link: ""
      }
    ],
    navList: [{
        img: `/images/rank.png`,
        title: '榜单',
        path: '/pages/rank/rank'
      },
      {
        img: `/images/book-list.png`,
        title: '书单',
        path: '/pages/booklist/booklist'
      },
      {
        img: `/images/classify.png`,
        title: '分类',
        path: ''
      },
      {
        img: `/images/no.png`,
        title: '暂无',
        path: ''
      }
    ],
    hotRecommend: []
  },

  // 跳转到搜索页
  search() {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 获取轮播推荐
  getNovel() {
    // indexSwiper().then(res => {
    //   this.setData({
    //     imgList: res
    //   })
    // })
  },

  // 获取轮播
  swiperdetail(event) {
    let {
      id
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/bookdetail/bookdetail?bookId=${id}`,
    })
  },

  // 导航
  nav(event) {
    let {
      item
    } = event.currentTarget.dataset
    if (item.path) {
      wx.navigateTo({
        url: item.path,
      })
    } else {
      wx.showToast({
        title: '暂无页面',
        icon: 'none'
      })
    }
  },

  // 获取所有榜单
  getAllRank() {
    let _this = this
    wx: wx.request({
      url: 'http://api.zhuishushenqi.com/ranking/gender',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let _data = [
          res.data.female,
          res.data.male
        ]
        // 随机获取榜单的其中五个
        let index = Math.floor(Math.random() * _data.length)
        let rankList = _data[index]
        let _arr = randomArr(rankList, 5)
        _this.madomRankBook(_arr).then(res => {
          _this.setData({
            hotRecommend: res
          })
        })
      }
    })
  },

  // 随机榜单书籍
  madomRankBook(_arr) {
    let hotRecommend = []
    let promiseAll = _arr.map((item, index) => {
      return new Promise((resolve, reject) => {
        wx: wx.request({
          url: 'http://api.zhuishushenqi.com/ranking/' + item._id,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            let _bookList = res.data.ranking.books
            let bookList = randomArr(_bookList, 4)
            item.title = item.title.replace('榜', '')
            let bookObj = {
              id: item._id,
              title: item.title,
              bookList
            }
            resolve(bookObj)
          }
        })
      })
    })
    return Promise.all(promiseAll).then(res => {
      return res
    })
  },

  // 查看更多
  rankDetail(event) {
    let {
      id
    } = event.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/singlerank/singlerank?rankId=${id}`,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllRank()
    this.getNovel()
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
    this.onLoad()
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