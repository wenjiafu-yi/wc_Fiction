const app = getApp()
import {
  TimerFn,
  imgLazy
} from '../../utils/util'
Component({
  properties: {
    bookList: {
      type: Array,
      value: [],
      observer(newVal, oldVal, changedPath) {
        newVal.forEach((i, k) => {
          i.defaultCover = '/images/loading.png'
          i.flag = false
          i.cover = decodeURIComponent(i.cover)
          i.cover = i.cover.replace('/agent/', '')
          i.latelyFollower = (i.latelyFollower / 10000).toFixed(2)
        })
        this.setData({
          bookList: newVal
        })
        setTimeout(() => {
          this.nodeLzay()
        })
      }
    }
  },
  data: {

  },
  methods: {
    // 图片懒加载记载
    nodeLzay() {
      let bookList = this.data.bookList
      imgLazy(this, bookList, 'bookList', '.book')
    },
    bookDetail(event) {
      let {
        id
      } = event.currentTarget.dataset
      this.triggerEvent('bookDetail', id)
    }
  }
})