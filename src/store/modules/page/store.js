const store = {
  state: {
    userInfo: {},
    pageloca: '',
    speedloca: '',
    // 上传元素
    uploadelement: '',
    isPower: true,
    checkStatus: false, // 查看状态
    examineStatus: 0, // 审核状态
    auditStatus: '11', // 银联审核状态
    // 是否存在数据
    isExisInfos: {
      status: false
    },
    cashWithdrawalTarget: 1, // 1：为钱包 2：银行卡
    // 必填项
    name: { label: '姓名', value: '', hidden: false, disabled: false, placeholder: '请输入姓名', maxlength: 10 },
    storeName: { label: '店铺名称', value: '', hidden: false, disabled: false, placeholder: '请输入店铺名称' },
    storeSignName: { label: '店铺招牌名称', value: '', hidden: false, disabled: false, placeholder: '请输入店铺招牌名称' },
    licenseName: { label: '执照注册姓名', value: '', hidden: false, disabled: false, placeholder: '请输入执照注册姓名' },
    mainBusiness: { label: '主营行业', value: [], hidden: false, disabled: false, placeholder: '请选择主营行业', other: true },
    agencyBusiness: { label: '代理业务', value: [], hidden: false, disabled: false, placeholder: '请选择代理业务', gather: [] },
    urbanAndRural: { label: '所在城乡区域', value: [], hidden: false, disabled: false, placeholder: '请选择所在城乡区域', gather: [], single: true },
    region: { label: '所在地区', value: [], hidden: false, disabled: false, placeholder: '请选择所在地区', tips: '注:所有地区将用于批销进货，如有误请联系客服', other: true },
    street: { label: '街道', value: [], hidden: false, disabled: false, placeholder: '请选择街道', gather: [], single: true },
    detailedAddress: { label: '详细地址', value: '', hidden: false, disabled: false, placeholder: '请输入详细地址', maxlength: 40 },
    postalNumber: { label: '邮政编号', value: '', hidden: false, disabled: false, placeholder: '请输入邮政编号', maxlength: 6 },
    businessLicense: { label: '营业执照照片', images: '', key: 'busLience', example: require('../../../images/store/bus_lience.png'), hidden: false, disabled: false },
    facade: { label: '门面照片', images: '', key: 'store', example: require('../../../images/store/store.png'), hidden: false, disabled: false },
    internalEnvironment: { label: '店铺内环境照片', images: '', key: 'shopInside', example: require('../../../images/store/environment.png'), hidden: false, disabled: false },
    cashier: { label: '收银台照片', images: '', key: 'cashierDesk', example: require('../../../images/store/cashier.png'), hidden: false, disabled: false },
    goodsShelves: { label: '货架照片', images: '', key: 'storeInner', example: require('../../../images/store/store_inner.png'), hidden: false, disabled: false },
    tagRadio: '1', //营业证明照片性质  1:营业执照（银行卡） 2:营业证明（钱包）

    // 选填项
    // 提现到钱包
    IDCard: { label: '身份证号', value: '', hidden: false, disabled: false, placeholder: '请输入身份证号', tips: '注:上传身份照片需要完善身份证号码，否则影响审核通过', maxlength: 18 },
    frontIDCard: { label: '身份证正面照片', images: '', key: 'certPos', example: require('../../../images/store/full_face.png'), hidden: false, disabled: false },
    versoIDCard: { label: '身份证反面照片', images: '', key: 'certNeg', example: require('../../../images/store/other_side.png'), hidden: false, disabled: false },
    holdIDCard: { label: '手持身份证照片', images: '', key: 'certHold', example: require('../../../images/store/hold.png'), hidden: false, disabled: false },

    // 提现到银行卡
    cardOwner: { label: '银行卡所属人', value: [], hidden: false, disabled: false, placeholder: '请选择银行卡所属人', gather: [], single: true },
    cardNumber: { label: '银行卡号', value: '', hidden: true, disabled: true, cipher: '' },
    cardOwnerName: { label: '开卡人姓名', value: '', hidden: true, disabled: true, cipher: '' },
    settleAccountNo: { label: '结算户号', value: '', hidden: true, disabled: true, cipher: '' },
    settleAccount: { label: '结算户名', value: '', hidden: true, disabled: true, cipher: '' },
    openCardBank: { hidden: false, value: '中国邮政储蓄银行' }, // 开卡银行
    meetingBranch: { label: '开户支行', value: '', hidden: false, disabled: false, placeholder: '请输入开户支行' },
    linkNumber: { label: '开户行联行号', value: '', hidden: false, disabled: false, placeholder: '请输入开户行联行号' },
    reservePhone: { label: '银行预留手机号', value: '', hidden: true, disabled: true, cipher: '', placeholder: '请输入银行预留手机号' },
    coverEmpowerIDCard: { label: '被授权人身份证号', value: '',encryption: '', hidden: false, disabled: false, placeholder: '请输入被授权人身份证号' },
    merchantReceipt: { label: '商户收单协议照片', images: '', key: 'merchantAgreement', example: require('../../../images/store/merchant_receipt.png'), hidden: false, disabled: false },
    frontBank: { label: '银行卡正面照片', images: '', key: 'bankFront', example: require('../../../images/store/front_bank.png'), hidden: false, disabled: false },
    openingLicenseAccountPhoto: { label: '开户许可证照片', images: '', key: 'openingLicenseAccountPhoto', example: require('../../../images/store/openingLicenseAccountPhoto.jpg'), hidden: false, disabled: false },
    coverEmpower: { label: '被授权人身份证正面照片', images: '', key: 'authorizedCertFront', example: require('../../../images/store/full_face.png'), hidden: false, disabled: false },
    settlement: { label: '结算授权书照片', images: '', key: 'settleAuth', example: require('../../../images/store/settlement.png'), hidden: false, disabled: false },

    IDCardBank: { label: '身份证号', value: '', hidden: false, disabled: false, placeholder: '请输入身份证号', maxlength: 18 },
    legalIdExpire: { label: '身份证有效期', value: [], hidden: false, disabled: false, placeholder: '请选择身份证有效期', other: true },
    contactPhone: { label: '联系手机', value: '', hidden: false, disabled: false, placeholder: '请输入联系手机', maxlength: 11 },
    frontIDCardBank: { label: '身份证正面照片', images: '', key: 'certPos', example: require('../../../images/store/full_face.png'), hidden: false, disabled: false },
    versoIDCardBank: { label: '身份证反面照片', images: '', key: 'certNeg', example: require('../../../images/store/other_side.png'), hidden: false, disabled: false },

    businessNumber: { label: '营业执照号', value: '', hidden: false, disabled: false, placeholder: '请输入营业执照号' },
    businessScope: {label: '请输入营业范围', value: '', hidden: false, disable: false, placeholder: '请输入主营内容，需要和经营场景保持一致'},
    businessTermValidity: { label: '营业执照有效期', value: [], hidden: false, disabled: false, placeholder: '请选择营业执照有效期', other: true },
    outdoorScene: { label: '门店外景照片', images: '', key: 'storeLocation', example: require('../../../images/store/outdoor_scene.png'), hidden: false, disabled: false },
    yzsAgree: { value: 0 },
    codeAgree: { value: false },

    licenseType: { value: '0', hidden: false, disabled: false}, // 执照类型（是否三证合一）
    taxationCode:{label: '税务登记证号', value: '', hidden: false, disabled: false, placeholder: '请输入税务登记证号'},
    taxExpiredTermValidity: {label: '税务登记证有效期', value: [], hidden: false, disabled: false, placeholder: '请选择税务登记证有效期', other: true},
    taxationPic: { label: '税务登记证照片', images: '', key: 'tax', example: require('../../../images/store/taxation.jpg'), hidden: false, disabled: false },

    bankInfo: {
      currentBank: {},
      lists: []
    },

    address: { province: {}, city: {}, area: {} },

    professionInfo: []
  },
  getters: {
    userInfo: state => state.userInfo,
    pageloca: state => state.pageloca,
    speedloca: state => state.speedloca,
    upload: state => state.uploadelement,

    isPower: state => state.isPower,
    checkStatus: state => state.checkStatus, // 查看状态
    examineStatus: state => state.examineStatus, // 审核状态
    auditStatus: state => state.auditStatus,
    isExisInfos: state => state.isExisInfos,
    cashWithdrawalTarget: state => state.cashWithdrawalTarget,

    name: state => state.name,
    storeName: state => state.storeName,
    storeSignName: state => state.storeSignName,
    licenseName: state => state.licenseName,
    mainBusiness: state => state.mainBusiness,
    agencyBusiness: state => state.agencyBusiness,
    urbanAndRural: state => state.urbanAndRural,
    region: state => state.region,
    street: state => state.street,
    detailedAddress: state => state.detailedAddress,
    postalNumber: state => state.postalNumber,
    businessLicense: state => state.businessLicense,
    facade: state => state.facade,
    internalEnvironment: state => state.internalEnvironment,
    cashier: state => state.cashier,
    goodsShelves: state => state.goodsShelves,
    tagRadio: state => state.tagRadio,
    bankAccountType: state => state.bankAccountType,

    IDCard: state => state.IDCard,
    frontIDCard: state => state.frontIDCard,
    versoIDCard: state => state.versoIDCard,
    holdIDCard: state => state.holdIDCard,

    cardOwner: state => state.cardOwner,
    cardNumber: state => state.cardNumber,
    cardOwnerName: state => state.cardOwnerName,
    settleAccountNo: state => state.settleAccountNo,
    settleAccount: state => state.settleAccount,
    openCardBank: state => state.openCardBank,
    meetingBranch: state => state.meetingBranch,
    linkNumber: state => state.linkNumber,
    reservePhone: state => state.reservePhone,
    coverEmpowerIDCard: state => state.coverEmpowerIDCard,
    merchantReceipt: state => state.merchantReceipt,
    frontBank: state => state.frontBank,
    openingLicenseAccountPhoto: state => state.openingLicenseAccountPhoto,
    coverEmpower: state => state.coverEmpower,
    settlement: state => state.settlement,
    IDCardBank: state => state.IDCardBank,
    legalIdExpire: state => state.legalIdExpire,
    contactPhone: state => state.contactPhone,
    frontIDCardBank: state => state.frontIDCardBank,
    versoIDCardBank: state => state.versoIDCardBank,
    businessNumber: state => state.businessNumber,
    businessScope: state => state.businessScope,
    businessTermValidity: state => state.businessTermValidity,
    outdoorScene: state => state.outdoorScene,

    yzsAgree: state => state.yzsAgree,
    codeAgree: state => state.codeAgree,

    licenseType: state => state.licenseType,
    taxationCode: state =>　state.taxationCode,
    taxExpiredTermValidity: state => state.taxExpiredTermValidity,
    taxationPic: state => state.taxationPic,

    bankInfo: state => state.bankInfo,

    address: state => state.address,

    professionInfo: state => state.professionInfo
  },
  mutations: {
    setUserInfo(state, infos) {
      state.userInfo = infos
    },
    setIsPower(state, status) {
      state.isPower = status
    },
    setCheckStatus(state, status) {
      state.checkStatus = status
    },
    setAuditStatus(state, status) {
      state.auditStatus = status
    },
    setExamineStatus(state, status) {
      state.examineStatus = status
    },
    updatetagRadioStatus(state, status) {
      state.tagRadio = status
    },
    updateBankAccountType(state, status) {
      state.bankAccountType = status
    },
    setPageLoca(state, loca) {
      state.pageloca = loca
    },
    setSpeedLoca(state, loca) {
      state.speedloca = loca
    },
    setUploadElement(state, ele) {
      state.uploadelement = ele
    },

    setProfessionInfo(state, array) {
      state.professionInfo = array
    },
    updateMainBusiness(state, info) {
      state.mainBusiness.value = [info]
    },
    updateAgencyBusiness(state, infos) {
      for (let item in infos) {
        state.agencyBusiness[item] = infos[item]
      }
    },
    updateUrbanAndRural(state, infos) {
      for (let item in infos) {
        state.urbanAndRural[item] = infos[item]
      }
    },
    updateStreet(state, infos) {
      for (let item in infos) {
        state.street[item] = infos[item]
      }
    },

    updateCashWithdrawalTarget(state, value) {
      state.cashWithdrawalTarget = value
    },
    updateAddress(state, infos) {
      state.address = infos
    },

    updates(state, { key, infos }) {
      for (let item in infos) {
        state[key][item] = infos[item]
      }
    }
  },
  actions: {
    setUserInfo({ commit }, info) {
      commit('setUserInfo', info)
    },
    setIsPower({ commit }, status) {
      commit('setIsPower', status)
    },
    setCheckStatus({ commit }, status) {
      commit('setCheckStatus', status)
    },
    setAuditStatus({ commit }, status) {
      commit('setAuditStatus', status)
    },
    setExamineStatus({ commit }, status) {
      commit('setExamineStatus', status)
    },
    setPageLoca({ commit }, loca) {
      commit('setPageLoca', loca)
    },
    setSpeedLoca({ commit }, loca) {
      commit('setSpeedLoca', loca)
    },
    setUploadElement({ commit }, ele) {
      commit('setUploadElement', ele)
    },

    // 设置主营行业集合
    setProfessionInfo({ commit }, array) {
      commit('setProfessionInfo', array)
    },

    // 更新选中主营行业
    updateMainBusiness({ commit }, info) {
      commit('updateMainBusiness', info)
    },

    // 更新代理业务
    updateAgencyBusiness({ commit }, infos) {
      commit('updateAgencyBusiness', infos)
    },
    // 更新所在区域
    updateUrbanAndRural({ commit }, infos) {
      commit('updateUrbanAndRural', infos)
    },
    // 更新街道
    updateStreet({ commit }, infos) {
      commit('updateStreet', infos)
    },
    updateCashWithdrawalTarget({ commit }, value) {
      commit('updateCashWithdrawalTarget', value)
    },
    updatetagRadioStatus({ commit }, status) {
      commit('updatetagRadioStatus', status)
    },
    updateBankAccountType({ commit }, status) {
      commit('updateBankAccountType', status)
    },
    updateAddress({ commit }, infos) {
      commit('updateAddress', infos)
    },

    updates({ commit }, params) {
      commit('updates', params)
    }
  }
}

export default store
