const app = getApp()

Component({
  properties: {
    state: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {
        if (newVal.length) {
          // 遍历初始化 添加一个request字段，用来区分 是否有网络请求，用来做数据缓存的标识
          newVal.forEach((item, index) => {
            if (index) {
              item.request = true
            } else {
              item.request = false
            }
          })
          let id = newVal[0]._id
          this.getOneList(0, id)
          this.setData({
            "rankInfo.list": newVal
          })
        }
      }
    }
  },
  data: {
    rankInfo: {
      list: [],
      check: 0
    },
    bookList: []
  },
  methods: {
    // 榜单切换
    changeRank(event) {
      let {
        index,
        id
      } = event.currentTarget.dataset
      if (!(index === this.data.rankInfo.check)) {
        this.setData({
          "rankInfo.check": index
        })
        // 数据缓存
        if (this.data.rankInfo.list[index].request) {
          this.getOneList(index, id)
          let list = this.data.rankInfo.list
          list[index].request = false
          this.setData({
            "rankInfo.list": list
          })
        }
      }
    },
    // 获取单一榜单
    getOneList(index, id) {
      let _this = this
      wx.request({
        url: 'http://api.zhuishushenqi.com/ranking/' + id,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          let data = res.data
          let bookList = data.ranking.books
          let list = _this.data.rankInfo.list
          list[index].bookList = bookList
          _this.setData({
            "rankInfo.list": list
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
    }
  }
})