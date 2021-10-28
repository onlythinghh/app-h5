/* eslint-disable import/first */
const domain = process.env.DOMAIN
import reqwest from 'reqwest'
import axios from 'axios'
import { AjaxData } from '../tools/index'
const timeout = 30000

// 添加请求头
let config = {
  headers: { 'Content-Type': 'multipart/form-data' },
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true
}
axios.defaults.withCredentials = true;

// 获取用户信息
export const getUserInfo = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/getUsrOnlyId.do',
    timeout,
    type: 'jsonp',
    jsonpCallback: 'jsoncallback'
  })
}

// 获取主营行业
export const getListProfessionInfo = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsProtocolService/vpsService/interface/listProfessionInfo!listProfessionInfo.do',
    timeout,
    type: 'jsonp',
    jsonpCallback: 'jsonpCallback'
  })
}

// 获取街道
export const getStreetMsgByH5 = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/getStreetMsgByH5.do',
    timeout,
    data:{...params},
    type: 'jsonp',
    jsonpCallback: 'jsoncallback'
  })
}

// 获取地址
export const getNewRegionInfo = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsRedirectService/getNewRegionInfo',
    timeout,
    type: 'jsonp',
    data: { ...params },
    jsonpCallback: 'jsonpCallback'
  })
}

// 查询信息
export const findShopkeeperInfo = () => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/findShopkeeperInfo.do',
    timeout,
    type: 'jsonp',
    jsonpCallback: 'jsoncallback'
  })
}

// 上传图片
export const uploadVpsImgByH5 = (fromData) => {
  return axios.post('//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/uploadShopkeeperImage.do', fromData, config)
}

// 提交信息
export const updateShopkeeperInfo = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/updateShopkeeperInfo.do',
    // timeout,
    type: 'jsonp',
    data: { ...params },
    jsonpCallback: 'jsoncallback'
  })
}

// 获取银行卡列表
export const getBankList = () => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/bankCardList.do',
    timeout,
    type: 'jsonp',
    jsonpCallback: 'jsoncallback'
  })
}

// 添加银行卡
// 发送验证码
export const sendBindBankMessage = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/bindBankCardSendCodeSms.do',
    timeout,
    type: 'jsonp',
    data: { ...params },
    jsonpCallback: 'jsoncallback'
  })
}

// 添加银行卡
export const addBank = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/bindBankCard.do',
    timeout,
    type: 'jsonp',
    data: { ...params },
    jsonpCallback: 'jsoncallback'
  })
}

// 添加对公帐号银行卡
export const addPubilcBank = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/bindPubilcBankCard.do',
    timeout,
    type: 'jsonp',
    data: { ...params },
    jsonpCallback: 'jsoncallback'
  })
}


// 意见反馈
export const opinion = (params) => {
  return reqwest({
    url: '//vps' + domain + '.ule.com/vpsProtocolService/uleprivate/addFeedback!addFeedback.do',
    timeout,
    type: 'jsonp',
    data: {...params},
    jsonpCallback: 'jsonpCallback'
  })
}
// 获取培训视频
export const getVideo = (param) => {
  let params = AjaxData(param)
  return axios.post('//opc' + domain + '.ule.com/vpsRuralOpcSetting/shopkeeperVideo/selectShopkeeperVideoList.do', params)
}

//记录掌柜视频播放量
export const VideoTimes = (param) => {
  let params = AjaxData(param)
  return axios.post('//opc' + domain + '.ule.com/vpsRuralOpcSetting/shopkeeperVideo/recordClickVideoTimes.do', params)
}