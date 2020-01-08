// pages/shelf/shelf.js
const app = getApp()
import {
  getState,
  setState,
  getDirection,
  startTouch,
  endTouch
} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navInfo: {
      list: [
        '我的书架',
        '阅读记录'
      ],
      check: 0
    },
    bookList: [],
    historyList: [],
    flag: false,
    editFlag: false,
    startx: 0,
    starty: 0,
    endx: 0,
    endy: 0
  },

  // 初始化
  onLoad() {
    this.getBookShelf()
    this.readHistory()
  },
  // 上拉刷新
  onPullDownRefresh() {
    this.onLoad()
  },
  // 导航切换
  chnageNav(event) {
    let {
      index
    } = event.currentTarget.dataset
    if (index !== this.data.navInfo.check) {
      this.setData({
        "navInfo.check": index
      })
    }
  },
  // 长按编辑书籍
  longGress(event) {
    let index = event.currentTarget.dataset.index
    let bookList = this.data.bookList
    bookList[index].check = true
    this.setData({
      editFlag: true,
      flag: true,
      bookList
    })
  },
  // 获取当前书架内容
  getBookShelf() {
  },
  // 获取全部阅读记录
  readHistory() {
  },
  // 阅读书籍
  readBook(event) {
  },
  // 取消编辑书籍
  editBook() {
    let bookList = getState('book')
    this.setData({
      editFlag: false,
      flag: false,
      bookList
    })
  },
  // 书籍编辑
  check(event) {
    let index = app.encodeParams(event).index
    let bookList = this.data.bookList
    bookList.forEach((item, key) => {
      if (key === index) {
        item.check = !item.check
      }
    })
    this.setData({
      bookList
    })
  },
  // 删除书籍
  submitEdit() {
  }
})