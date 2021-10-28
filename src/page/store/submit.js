/* eslint-disable eqeqeq */
import store from '../../store'
import { updateShopkeeperInfo } from '../../service'
import Validator from '../../tools/validator'

export const submit = (Vue) => {
  let {
    name,
    storeName,
    storeSignName,
    licenseName,
    mainBusiness,
    urbanAndRural,
    region,
    address,
    street,
    detailedAddress,
    postalNumber,
    agencyBusiness,
    contactPhone,
    openCardBank,
    IDCard,
    IDCardBank,
    cashWithdrawalTarget,
    cardNumber,
    cardOwnerName,
    settleAccountNo,
    settleAccount,
    meetingBranch,
    linkNumber,
    reservePhone,
    businessNumber,
    businessScope,
    businessTermValidity,
    cardOwner,
    coverEmpowerIDCard,
    businessLicense,
    facade,
    internalEnvironment,
    cashier,
    goodsShelves,
    frontIDCard,
    versoIDCard,
    holdIDCard,
    legalIdExpire,
    merchantReceipt,
    openingLicenseAccountPhoto,
    frontBank,
    coverEmpower,
    settlement,
    frontIDCardBank,
    versoIDCardBank,
    outdoorScene,
    yzsAgree,
    codeAgree,
    licenseType,
    taxationCode,
    taxExpiredTermValidity,
    taxationPic
  } = store.getters

  cashWithdrawalTarget = cashWithdrawalTarget || 1

  let params = {}
  // 掌柜姓名
  params.name = name.value
  // 店铺名称
  params.storeName = storeName.value
  // 招牌名称
  params.villageDecca = storeSignName.value
  // 执照注册姓名
  params.registerLicenseName = licenseName.value
  const _mainBusiness = mainBusiness.value[0] || {}
  // 主营行业
  params.mainBusiType = _mainBusiness.type
  // 主营行业
  params.mainBusiness1 = _mainBusiness.value
  // 所在区域
  const _urbanAndRural = urbanAndRural.value[0] || {}
  params.placeRegional = _urbanAndRural.value
  // 省code
  let _provinceCode = region.provinceCode
  let _cityCode = region.cityCode
  let _areaCode = region.areaCode
  if (address.province.code) {
    _provinceCode = address.province.code
    _cityCode = address.city.code
    _areaCode = address.area.code
  }
  params.provinceCode = _provinceCode
  // 市code
  params.cityCode = _cityCode
  // 区code
  params.areaCode = _areaCode
  // 街道code
  const _street = street.value[0] || {}
  params.streetCode = _street.value
  // 详细地址
  params.addrDetail = detailedAddress.value
  // 邮编
  params.postalCode = postalNumber.value
  // 代理业务
  const _agencyBusiness = agencyBusiness.value
  const abArray = _agencyBusiness.map(item => {
    return item.value
  })
  params.agentBusiness = abArray.join(',')
  // 身份证
  const _IDCard = (cashWithdrawalTarget == 1) ? IDCard.value : IDCardBank.value
  params.idCard = _IDCard
  // 营业执照照片
  params.busLience = businessLicense.images
  // 门面照片
  params.store = facade.images
  // 店内环境照片
  params.shopInside = internalEnvironment.images
  // 收银台照片
  params.cashierDesk = cashier.images
  // 货架照片
  params.storeInner = goodsShelves.images
  // 身份证正面照片
  const _frontIDCard = (cashWithdrawalTarget == 1) ? frontIDCard.images : frontIDCardBank.images
  params.certPos = _frontIDCard
  // 身份证反面照片
  const _versoIDCard = (cashWithdrawalTarget == 1) ? versoIDCard.images : versoIDCardBank.images
  params.certNeg = _versoIDCard
  // 手持身份证照片
  params.certHold = holdIDCard.images
  // 结算方式 1 邮乐结算 2 银联结算
  params.extractType = cashWithdrawalTarget

  if (params.extractType == '2') {
    // 商户收单协议照片
    params.merchantAgreement = merchantReceipt.images
    // // 银行卡正面照片
    // params.bankFront = frontBank.images
    // // 银行卡号
    // params.bankNo = cardNumber.cipher
    // // 银行卡姓名
    // params.bankName = cardOwnerName.cipher
    // 开卡银行
    params.openCradBank = openCardBank.value
    // 开户支行
    params.accountBranch = meetingBranch.value
    // 开户行联行号
    params.openBankCode = linkNumber.value
    // 身份证有效期
    const _legalIdExpire = legalIdExpire.value[0] || {}
    params.legalIdExpire = _legalIdExpire.label
    // 银行预留手机号
    params.openBankReservePhone = reservePhone.cipher || reservePhone.value
    // licenseType 执照类型 0：三证合一，1:非三证合一
    params.licenseType = licenseType.value
    if(licenseType.value == '1') {
      // 税务登记证号
      params.taxCode = taxationCode.value
      // 税务登记证有效期
      const _taxExpired = taxExpiredTermValidity.value[0] || {}
      params.taxExpired = _taxExpired.label
      // 税务登记证照片
      params.tax = taxationPic.images
    }
    
    // 营业执照号
    params.businessLicenseCode = businessNumber.value
    // 营业范围
    params.busdetail = businessScope.value
    // 手机号码
    params.phoneNo = contactPhone.value
    // 营业执照有效期
    const _businessTermValidity = businessTermValidity.value[0] || {}
    params.businessLicenseExpired = _businessTermValidity.label
    // 门店外景照片
    params.storeLocation = outdoorScene.images

    // 结算账户类型 --- 对公账户即settleAccountType = 1 营业执照注册：即settleAccountType = 2 其他：即settleAccountType = 3
    const _cardOwner = cardOwner.value[0] || {}
    params.settleAccountType = _cardOwner.value
    if (params.settleAccountType == 1) {
      // 结算户号
      params.bankNo = settleAccountNo.cipher
      // 结算户名
      params.bankName = settleAccount.cipher
      // 开户许可证照片
      params.openingLicenseAccountPhoto = openingLicenseAccountPhoto.images
    } else {
      // 银行卡号
      params.bankNo = cardNumber.cipher
      // 银行卡姓名
      params.bankName = cardOwnerName.cipher
      // 银行卡正面照片
      params.bankFront = frontBank.images
    }
    if (_cardOwner.value == 3) {
      // 被授权人证件号码
      params.authPersonCertNo = coverEmpowerIDCard.value
      params.authPersonCertNoCipher = coverEmpowerIDCard.encryption
      // 被授权人证件正面照
      params.authorizedCertFront = coverEmpower.images
      // 结算授权书照片
      params.settleAuth = settlement.images
    }

    params.isAuthorizeYzs = +yzsAgree.value
  }

  const validator = new Validator()

  validator.add(params.name, [
    { strategy: 'isNonEmpty', errorMsg: '姓名不能为空' }
  ])
  validator.add(params.storeName, [
    { strategy: 'isNonEmpty', errorMsg: '店铺名称不能为空' }
  ])
  validator.add(params.villageDecca, [
    { strategy: 'isNonEmpty', errorMsg: '店铺招牌不能为空' }
  ])
  validator.add(params.registerLicenseName, [
    { strategy: 'isNonEmpty', errorMsg: '执照注册姓名不能为空' }
  ])
  validator.add(params.mainBusiness1, [
    { strategy: 'isNonEmpty', errorMsg: '请选择主营行业' }
  ])
  validator.add(params.agentBusiness, [
    { strategy: 'isNonEmpty', errorMsg: '请选择代理业务' }
  ])
  validator.add(params.placeRegional, [
    { strategy: 'isNonEmpty', errorMsg: '请选择所在城乡区域' }
  ])
  validator.add(params.areaCode, [
    { strategy: 'isNonEmpty', errorMsg: '请选择所在地区' }
  ])
  let streeLen = street.gather.length ? true : false;
  if(streeLen) {
    validator.add(params.streetCode, [
      { strategy: 'isNonEmpty', errorMsg: '街道不能为空' }
    ])
  }
  validator.add(params.addrDetail, [
    { strategy: 'isNonEmpty', errorMsg: '详细地址不能为空' }
  ])
  validator.add(params.postalCode, [
    { strategy: 'isNonEmpty', errorMsg: '邮政编号不能为空' },
    { strategy: 'isPostal', errorMsg: '请输入正确的邮政编号' }
  ])
  validator.add(params.busLience, [
    { strategy: 'isNonEmpty', errorMsg: '请选择营业执照照片' }
  ])
  validator.add(params.store, [
    { strategy: 'isNonEmpty', errorMsg: '请选择门面照片' }
  ])

  if (params.extractType == '1') {  // 提现到钱包
    /*
     * 检测选填信息中身份信息7项资料（身份证号、身份证正面照、身份证反面照、手持身份证照片、店铺内环境照片、收银台照片、货架照片）的提交情况
     * 若任意一项不为空，提交资料检测7项是否都填写完毕，都填写完毕才可提交
    */
    if (params.idCard || params.certPos || params.certNeg || params.certHold || params.shopInside || params.cashierDesk || params.storeInner) {
      validator.add(params.idCard, [
        { strategy: 'isNonEmpty', errorMsg: '身份证号不能为空' }
      ])
      validator.add(params.certPos, [
        { strategy: 'isNonEmpty', errorMsg: '请选择身份证正面照片' }
      ])
      validator.add(params.certNeg, [
        { strategy: 'isNonEmpty', errorMsg: '请选择身份证反面照片' }
      ])
      validator.add(params.certHold, [
        { strategy: 'isNonEmpty', errorMsg: '请选择手持身份证照片' }
      ])
      validator.add(params.shopInside, [
        { strategy: 'isNonEmpty', errorMsg: `请选择店铺内环境照片` }
      ])
      validator.add(params.cashierDesk, [
        { strategy: 'isNonEmpty', errorMsg: `请选择收银台照片` }
      ])
      validator.add(params.storeInner, [
        { strategy: 'isNonEmpty', errorMsg: `请选择货架照片` }
      ])
    }
  }

  if (params.extractType == '2') {
    validator.add(params.settleAccountType, [
      { strategy: 'isNonEmpty', errorMsg: '请选择银行卡所属人' }
    ])
    validator.add(params.bankNo, [
      { strategy: 'isNonEmpty', errorMsg: '请选择银行卡' }
    ])
    validator.add(params.accountBranch, [
      { strategy: 'isNonEmpty', errorMsg: '开户支行不能为空' }
    ])
    validator.add(params.openBankCode, [
      { strategy: 'isNonEmpty', errorMsg: '开户行联行号不能为空' }
    ])
    validator.add(params.merchantAgreement, [
      { strategy: 'isNonEmpty', errorMsg: '请选择商户收单协议照片' }
    ])
    if (params.settleAccountType == '1') {
      validator.add(params.bankNo, [
        { strategy: 'isNonEmpty', errorMsg: '结算户号不能为空' }
      ])
      validator.add(params.bankName, [
        { strategy: 'isNonEmpty', errorMsg: '结算户名不能为空' }
      ])
      validator.add(params.openingLicenseAccountPhoto, [
        { strategy: 'isNonEmpty', errorMsg: '请选择开户许可证照片' }
      ])
    } else {
      validator.add(params.bankFront, [
        { strategy: 'isNonEmpty', errorMsg: '请选择银行卡正面照片' }
      ])
    }
    if (params.settleAccountType == '3') {
      validator.add(params.authPersonCertNo, [
        { strategy: 'isNonEmpty', errorMsg: '被授权人身份证号不能为空' }
      ])
      validator.add(params.authorizedCertFront, [
        { strategy: 'isNonEmpty', errorMsg: '请选择被授权人证件正面照' }
      ])
      validator.add(params.settleAuth, [
        { strategy: 'isNonEmpty', errorMsg: '请选择结算授权书照片' }
      ])
    }

    validator.add(params.idCard, [
      { strategy: 'isNonEmpty', errorMsg: '身份证号不能为空' }
    ])
    validator.add(params.legalIdExpire, [
      { strategy: 'isNonEmpty', errorMsg: '请选择身份证有效期' }
    ])
    validator.add(params.phoneNo, [
      { strategy: 'isNonEmpty', errorMsg: '联系手机不能为空' }
    ])
    validator.add(params.certPos, [
      { strategy: 'isNonEmpty', errorMsg: '请选择身份证正面照片' }
    ])
    validator.add(params.certNeg, [
      { strategy: 'isNonEmpty', errorMsg: '请选择身份证反面照片' }
    ])

    // validator.add(params.licenseType, [ // 默认就是有值的
    //   { strategy: 'notEmpty', errorMsg: '执照类型不能为空' }
    // ])
    if(licenseType.value == '1') {
      validator.add(params.taxCode, [
        { strategy: 'isNonEmpty', errorMsg: '税务登记证号不能为空' }
      ])
      validator.add(params.taxExpired, [
        { strategy: 'isNonEmpty', errorMsg: '税务登记证有效期不能为空' }
      ])
      validator.add(params.tax, [
        { strategy: 'isNonEmpty', errorMsg: '税务登记证照片不能为空' }
      ])
    }
    validator.add(params.businessLicenseCode, [
      { strategy: 'isNonEmpty', errorMsg: '营业执照号不能为空' }
    ])
    validator.add(params.busdetail, [
      { strategy: 'isNonEmpty', errorMsg: '经营内容不能为空' }
    ])
    validator.add(params.businessLicenseExpired, [
      { strategy: 'isNonEmpty', errorMsg: '请选择营业执照有效期' }
    ])
    validator.add(params.storeLocation, [
      { strategy: 'isNonEmpty', errorMsg: '请选择门店外景照片' }
    ])
    validator.add(params.shopInside, [
      { strategy: 'isNonEmpty', errorMsg: `请选择店铺内环境照片` }
    ])
    validator.add(params.cashierDesk, [
      { strategy: 'isNonEmpty', errorMsg: `请选择收银台照片` }
    ])
    validator.add(params.storeInner, [
      { strategy: 'isNonEmpty', errorMsg: `请选择货架照片` }
    ])

    validator.add(codeAgree.value, [
      { strategy: 'isNonEmpty', errorMsg: '请选择相关服务协议' }
    ])
  }
  if (params.agentBusiness == '999') {
    params.agentBusiness = ''
  }
  const errorMsg = validator.start()

  if (errorMsg) {
    Vue.$toast(errorMsg)
    return false
  }
  Vue.$loading()
  console.log('提交的参数',params);
  updateShopkeeperInfo(params).then(result => {
    const { returnCode, returnMessage } = result
    Vue.$closeLoading()
    if (returnCode == '0000') {
      store.dispatch('setCheckStatus', true)
      store.dispatch('setExamineStatus', 1)
    }
    Vue.$toast(returnMessage)
  })
}
