// 去空字符串
const toTrim = (str) => {
  if (typeof str === 'string') {
    return str.replace(' ', '') ? true : false
  } else {
    throw '请输入字符串类型'
  }
}

// 节流函数
const TimerFn = (_this, fn, timer = 300) => {
  clearTimeout(_this.$timer)
  _this.$timer = setTimeout(() => {
    fn()
  }, timer)
}

// 储存数据
const setState = (key, data) => {
  try {
    if (typeof data === 'object' && typeof data !== null) {
      data = JSON.stringify(data)
    }
    wx.setStorageSync(key, data)
  } catch (e) {
    console.error('setState', e)
  }
}

// 获取数据
const getState = (key) => {
  try {
    const value = wx.getStorageSync(key)
    if (value) {
      return JSON.parse(value)
    } else {
      return null
    }
  } catch (e) {
    console.error('getState', e)
  }
}

// 删除数据
const removeState = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.error('getState', e)
  }
}


// 开始手势数据记录
const startTouch = (_this, event) => {
  let {
    pageX,
    pageY
  } = event.changedTouches[0]
  _this.setData({
    startx: pageX,
    starty: pageY
  })
}

// 结束手势数据记录
const endTouch = (_this, event) => {
  let {
    pageX,
    pageY
  } = event.changedTouches[0]
  _this.setData({
    endx: pageX,
    endy: pageY
  })
  let {
    startx,
    starty,
    endx,
    endy
  } = _this.data
  let x = endx - startx
  let y = endy - starty
  let direction = ''
  let num = 90
  if (x > 0 && x > num) {
    direction = 'right'
  } else if (x < 0 && x < -num) {
    direction = 'left'
  } else if (y > 0 && y < num) {
    direction = 'top'
  } else if (y < 0 && y > -num) {
    direction = 'bottom'
  }
  return direction
}

// 设置页面标题
const setTitle = (title = '爱小说') => {
  wx.setNavigationBarTitle({
    title
  })
}
// 随机函数(生成数组)
// params 当前数组 循环次数
const randomArr = (arr = [], num) => {
  let _arr = []
  let condition = arr.length > num ? num : arr.length
  for (let i = 0; i < condition; i++) {
    let index = Math.floor(Math.random() * arr.length)
    let item = arr[index]
    if (_arr.includes(item)) {
      condition++
      continue
    } else {
      _arr.push(item)
    }
  }
  return _arr
}

// 图片懒加载
const imgLazy = (_this, list, key, dom, flag = true, timer = 250) => {
  list.map((item, index) => {
    if (!item.flag) {
      const observer = flag ? _this.createIntersectionObserver() : wx.createIntersectionObserver()
      observer.relativeToViewport().observe(`${dom}${index}`, res => {
        if (res.intersectionRatio > 0) {
          item.flag = true
          TimerFn(_this, () => {
            _this.setData({
              [key]: list
            })
          }, timer)
        }
      })
    }
  })
}

// 处理详情页的时间
const time = (val) => {
  let nowDate = new Date().getTime()
  let valStr = Date.parse(val)
  let time = nowDate - valStr
  // 计算年、天、时、分、秒
  let year = Math.floor(time / (1000 * 60 * 60 * 24 * 12 * 30))
  let month = Math.floor(time % (1000 * 60 * 60 * 24 * 12 * 30) / (1000 * 60 * 60 * 24 * 30))
  let day = Math.floor(time % (1000 * 60 * 60 * 24 * 12 * 30) % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24))
  let hour = Math.floor(time % (1000 * 60 * 60 * 24 * 12 * 30) % (1000 * 60 * 60 * 24 * 30) % (1000 * 60 * 60 * 24) / (60 * 1000 * 60))
  let minute = Math.floor(time % (1000 * 60 * 60 * 24 * 12 * 30) % (1000 * 60 * 60 * 24 * 30) % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) / (60 * 1000))
  let second = Math.floor(time % (1000 * 60 * 60 * 24 * 12 * 30) % (1000 * 60 * 60 * 24 * 30) % (1000 * 60 * 60 * 24) % (1000 * 60 * 60) % (60 * 1000) / 1000)
  if (year >= 1) {
    return `${year}年前`
  }
  if (month >= 1) {
    return `${month}月前`
  }
  if (day >= 1) {
    return `${day}天前`
  }
  if (hour >= 1) {
    return `${hour}小时前`
  }
  if (minute >= 1) {
    return `${minute}分钟前`
  }
  if (second >= 1) {
    return `${second}秒前
        `
  }
}

module.exports = {
  toTrim,
  setTitle,
  startTouch,
  endTouch,
  removeState,
  setState,
  getState,
  randomArr,
  TimerFn,
  imgLazy,
  time
}