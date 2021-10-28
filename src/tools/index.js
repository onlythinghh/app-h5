
import fetchJsonp from 'fetch-jsonp'
import axios from 'axios'
import qs from 'qs'
import config from '../config'

const domain = process.env.DOMAIN
var ua = navigator.userAgent.toLowerCase()

// 数据转换
const AjaxData = (params) => {
  let array = []
  for (let i in params) array.push(i + '=' + params[i])
  return array.join('&')
}

const getSearchString = (name) => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]); return null
}

// 获取数据
var getJSON = function (url, data, obj, isEC) {
  if (!obj) {
    obj = data
    data = {}
  } else {
    url += '?'
  }
  var datas = AjaxData(data)
  fetchJsonp(url + encodeURI(datas), {
    jsonpCallback: data.jsonp || 'jsoncallback',
    timeout: 15000
  })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          obj && obj.success && obj.success(data)
        })
        .catch(function (ex) {
          obj && obj.error && obj.error({
            returnCode: '9990',
            returnMessage: config.error
          })
        })
}

const jsonp = (url, data, obj) => {
  var datas = AjaxData(data)
  fetchJsonp(url + encodeURI(datas), {
    jsonpCallback: data.jsonCallback || 'jsonpCallback',
    timeout: 30000
  })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          obj && obj.success && obj.success(data)
        })
        .catch(function (ex) {
          obj && obj.error && obj.error()
        })
}

// post获取跨域
var getAxiosPostJSON = function (url, data, obj) {
  if (!obj) {
    obj = data
    data = {}
  }
  axios({
    method: 'post',
    url: url,
    data: qs.stringify(data),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    withCredentials: true
  })
        .then(function (response) {
          obj && obj.success && obj.success(response.data)
        })
        .catch(function (ex) {
          obj && obj.error && obj.error({
            returnCode: '9990',
            returnMessage: config.error
          })
        })
}

// 获取cookie
var getClokie = function (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 计算图片高度做自适应
var getImageHeight = (fw, fh, w, h) => {
  var result
  if (w && !h) result = fh * w / fw
  if (h && !w) result = fw * h / fh
  return parseInt(result)
}

// 是否为邮掌柜
var isYZG = ua.indexOf('uzgapp/') > 0

var isAndroid = ua.indexOf('android') > 0

// 关闭邮掌柜WebView
var closeYZG = function () {
  window.location.href = 'ulemobile://ulePopView'
}

/**
 * 获取val年后的日期对象/时间戳
 * @param {Number} val +年份值
 * @param {Boolen} stamp 是否返回时间戳 默认false -> 日期对象，true -> 时间戳
 */
const GetendDate = function(val = 50, stamp = false) {
  let reg = /(^[0-9]\d*$)/
  if(reg.test(val)){
    const dte = new Date()
    let tmp = dte.setFullYear(dte.getFullYear() + val)
    return stamp ? tmp : new Date(tmp)
  } else {
    console.error('GetendDate方法需要一个正整数')
  }
}

export {
    domain,
    isYZG,
    isAndroid,
    getJSON,
    getClokie,
    closeYZG,
    getSearchString,
    getAxiosPostJSON,
    getImageHeight,
    jsonp,
    AjaxData,
    GetendDate
}
