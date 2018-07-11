

// http get工具函数 获取数据
const get = (url, data, check = true) => {
  return request(url, 'GET', data, check)
}
const post = (url, data, check = true) => {
  return request(url, 'POST', data, check)
}

function request(url, method, data, check, header = { 'content-type': 'application/x-www-form-urlencoded' }) {
  if (check) {
    // 校验是否有unionId
    let unionId = wx.getStorageSync("unionId");
    if (unionId == '') {
      hideLoading();
      return;
    }
  }

  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url: url,
      success: res => {
        // console.log(res)
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          showModal('失败', res.data.msg)
          hideLoading()
          reject(res.data)
        }
      }
    })
  })
}

// wx接口Promise化
const wxPromisify = fn => (obj = {}) => new Promise((resolve, reject) => {
  obj.success = res => resolve(res) // 成功
  obj.fail = res => reject(res) // 失败
  fn(obj)
})

//显示模态框
const showModal = (title, content) => {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}

//成功显示
const showSuccess = (text) => {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

//显示提示内容
const showMsg = (text) => {
  wx.showToast({
    title: text,
    icon: 'none'
  })
}

const formatNumber = (n) => {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

const formatDate = (seconds, formate = "YYYY-MM-DD hh:mm:ss") => {
  const t = new Date(seconds)
  const year = t.getFullYear()
  const month = formatNumber(t.getMonth() + 1)
  const date = formatNumber(t.getDate())
  const hour = formatNumber(t.getHours())
  const minute = formatNumber(t.getMinutes())
  const second = formatNumber(t.getSeconds())

  let json = {
    'YYYY': year,
    'MM': month,
    'DD': date,
    'hh': hour,
    'mm': minute,
    'ss': second
  }

  let result = formate;
  for (var key in json) {
    result = result.replace(key, json[key]);
  }
  return result

}

const toMoney = (num) => num.toFixed(2).split('').reverse().join('').replace(/(\d{3})/g, '$1,').replace(/\,$/, '').split('').reverse().join('')

const gotoPage = (url, param) => {
  wx.navigateTo({
    url: parseUrl(url, param)
  })
}

const parseUrl = (url, param) => {
  if (typeof (param) !== "object") return url;
  var str = '';
  for (let i in param) {
    str += ('&' + i + '=' + param[i]);
  }
  if (url.indexOf('?') > -1) {
    return url + str
  } else {
    return url + '?' + str.substr(1)
  }
}

const showLoading = (title = '请稍等一下') => { wx.showLoading({ title: title, mask: true }) }

const hideLoading = () => { wx.hideLoading() }

export default {
  showModal,//显示模态框
  showSuccess,//成功显示
  showMsg,//显示提示内容
  get, //http get工具函数 获取数据
  post, //http post工具函数 获取数据
  formatNumber,//格式化数字
  formatDate,//格式化时间 YYYY-MM-DD hh:mm:ss
  toMoney,
  wxPromisify,
  gotoPage,
  showLoading,
  hideLoading,
  parseUrl
}
