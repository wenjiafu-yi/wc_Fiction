// pages/search/search.js
import {
  TimerFn,
  toTrim,
  setState,
  getState,
  removeState,
  randomArr
} from '../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    list: [],
    focus: true,
    searchList: [],
    madomWordList: [],
    madomRecommendList: []
  },

  // 获取搜索热词
  getSearchHotword() {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/search-hotwords',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let hotWorldList = res.data.searchHotWords
        let madomWordList = randomArr(hotWorldList, 12)
        _this.setData({
          hotWorldList,
          madomWordList
        })
      }
    })
  },
  // 随机热词
  madomHotWord() {
    let {
      hotWorldList
    } = this.data
    let madomWordList = randomArr(hotWorldList, 12)
    this.setData({
      madomWordList
    })
  },

  // 获取热门推荐
  gethHotRecommend() {
    let _this = this
    wx.request({
      url: 'http://api.zhuishushenqi.com/book/hot-word',
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let hotRecommendList = res.data.newHotWords
        let madomRecommendList = randomArr(hotRecommendList, 6)
        _this.setData({
          hotRecommendList,
          madomRecommendList
        })
      }
    })
  },
  // 随机推荐
  madomHotRecommend() {
    let {
      hotRecommendList
    } = this.data
    let madomRecommendList = randomArr(hotRecommendList, 6)
    this.setData({
      madomRecommendList
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSearchHotword()
    this.gethHotRecommend()
  },

  // 搜索数据
  searchBook(event) {
    TimerFn(this, () => {
      let value = event.detail.value
      wx.request({
        url: 'http://api.zhuishushenqi.com/book/fuzzy-search?query=' + value,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let list = res.data.books
          if (list.length > 10) {
            list.length = 10
          }
          this.setData({
            list,
            value
          })
        }
      })
    })
  },
  // 回车搜索
  enterSearch(event) {
    let value = event.detail.value
    let flag = toTrim(value)
    if (flag) {
      this.publicSearch(value)
    }
  },
  // 模糊查询
  jumpDetail(event) {
    let query = event.currentTarget.dataset.item
    this.publicSearch(query)
  },
  // 公用搜索逻辑
  publicSearch(query) {
    wx.navigateTo({
      url: `/pages/searchlist/searchlist?query=${query}`,
    })
    // 存储搜索记录
    this.searchHistory(query)
    //重置数据
    setTimeout(() => {
      this.setData({
        value: '',
        list: []
      })
    }, 1000)
  },
  // 获取搜索历史
  searchHistory(query) {
    let searchHistory = getState('searchHistory') || []
    if (searchHistory.includes(query)) {
      return false
    }
    if (searchHistory && searchHistory.length > 9) {
      searchHistory.length = 9
    }
    searchHistory.unshift(query)
    setState('searchHistory', searchHistory)
  },
  //搜索之前的记录
  search(event) {
    let {
      value
    } = event.currentTarget.dataset
    this.publicSearch(value)
  },
  //删除历史
  deleteHistory() {
    removeState('searchHistory')
    this.setList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setList()
  },

  // 获取历史缓存
  setList() {
    let searchList = getState('searchHistory')
    this.setData({
      searchList
    })
  }
})