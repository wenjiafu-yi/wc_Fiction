Component({
  properties: {
    loadMore: {
      type: Object,
      value: {},
      observer({
        list,
        item
      }) {
        let text = ''
        if (list && item) {
          text = '加载中'
          if (!list.length && !item.length) {
            text = '暂无数据'
            this.triggerEvent('more', true)
          } else if (list.length && !item.length) {
            text = '已经到底了'
            this.triggerEvent('more', true)
          } else {
            text = ''
          }
          this.setData({
            text
          })
        }
      }
    }
  },
  data: {
    text: '加载中'
  }
})
