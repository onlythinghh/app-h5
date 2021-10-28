const domain = process.env.DOMAIN
console.log('domain:',domain)
// 获取usrUsrOnlyId
const getUsrOnlyId = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/getUsrOnlyId.do'
// 店铺
const findVpsImgByH5 = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/findVpsImgByH5.do' // 获取店铺信息
const getStreetMsgByH5 = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/getStreetMsgByH5.do' // 获取街道
const uploadVpsImgByH5 = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/uploadVpsImgByH5.do' // 上传图片
const updateNewVpsYzgStoreMessageByH5 = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/updateNewVpsYzgStoreMessageByH5.do' // 提交信息
const submitVpsImgByH5 = '//vps' + domain + '.ule.com/vpsYzgMobile/chinaPostOrgUnit/submitVpsImgByH5.do'
const listProfessionInfo = '//vps' + domain + '.ule.com/vpsProtocolService/vpsService/interface/listProfessionInfo!listProfessionInfo.do' // 获取主营行业
const getNewRegionInfo = '//vps' + domain + '.ule.com/vpsRedirectService/getNewRegionInfo?' // 获取地址

// 会员
export const getActivityInfoByCode = '//vps' + domain + '.ule.com/vpsZhangDan/uzgLevelActivity/getActivityInfoByCode' // 查询活动场次信息
export const getMultLotteryTimes = '//vps' + domain + '.ule.com/vpsZhangDan/uzgLevelActivity/getMultLotteryTimes' // 查询抽奖次数
export const play = '//vps' + domain + '.ule.com/vpsZhangDan/uzgLevelActivity/play' // 抽奖
export const searchCouponWall = '//vps' + domain + '.ule.com/vpsZhangDan/uzgLevelActivity/searchCouponWall' // 优惠券信息
export const VillageNo = '//opc' + domain + '.ule.com/vpsYzgOpc/VillageNo/ifChange' // 会员保级
export const jifen = '//vps' + domain + '.ule.com/vpsZhangDan/yzgLevel/jifenJsonp' // 会员积分

// 注销
export const checkAutoRegisterVpsLogout = '//vps' + domain + '.ule.com/vpsRedirectService/checkAutoRegisterVpsLogout' // 检查是否可注销
export const vpsLogout = '//vps' + domain + '.ule.com/vpsRedirectService/vpsLogout' // 进行注销
export const checkAutoRegisterVpsbackout = '//vps' + domain + '.ule.com/vpsRedirectService/checkAutoRegisterVpsbackout' // 撤销注销

export {
    getUsrOnlyId,
    findVpsImgByH5,
    getStreetMsgByH5,
    uploadVpsImgByH5,
    updateNewVpsYzgStoreMessageByH5,
    submitVpsImgByH5,
    listProfessionInfo,
    getNewRegionInfo
}
