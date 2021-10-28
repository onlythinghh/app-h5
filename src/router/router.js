import App from '../App'

const store = r => require.ensure([], () => r(require('../page/store')), 'store')
const must = r => require.ensure([], () => r(require('../page/store/children/must.vue')), 'must')
const choose = r => require.ensure([], () => r(require('../page/store/children/choose.vue')), 'choose')
const addbank = r => require.ensure([], () => r(require('../page/store/children/addbank')), 'addbank')
const quicktreaty = r => require.ensure([], () => r(require('../page/store/children/addbank/quicktreaty.vue')), 'quicktreaty')
const ulepaytreaty = r => require.ensure([], () => r(require('../page/store/children/addbank/ulepaytreaty.vue')), 'ulepaytreaty')
const scancodetreaty = r => require.ensure([], () => r(require('../page/store/children/scancode/treaty.vue')), 'scancodetreaty')
const wallet = r => require.ensure([], () => r(require('../page/store/children/children/wallet.vue')), 'wallet')
const bankcard = r => require.ensure([], () => r(require('../page/store/children/children/bankcard.vue')), 'bankcard')
const speed1 = r => require.ensure([], () => r(require('../page/store/children/children/children/speed1.vue')), 'speed1')
const speed2 = r => require.ensure([], () => r(require('../page/store/children/children/children/speed2.vue')), 'speed2')
const speed3 = r => require.ensure([], () => r(require('../page/store/children/children/children/speed3.vue')), 'speed3')
const perfectDatum = r => require.ensure([], () => r(require('../page/store/perfectDatum/perfectDatum')), 'perfectDatum')
const runtype = r => require.ensure([], () => r(require('../page/runtype/runtype.vue')), 'runtype')
const assembly = r => require.ensure([], () => r(require('../page/assembly/assembly')), 'assembly')
const vips = r => require.ensure([], () => r(require('../page/vips/vips')), 'vips')
const scratchCard = r => require.ensure([], () => r(require('../page/vips/scratchCard')), 'scratchCard')
const grade = r => require.ensure([], () => r(require('../page/vips/grade')), 'grade')
const logout = r => require.ensure([], () => r(require('../page/logout/logout')), 'logout')
const revokelogout = r => require.ensure([], () => r(require('../page/revokelogout/revokelogout')), 'revokelogout')
const opinion = r =>require.ensure([], ()=> r(require('../page/store/children/children/children/Opinion.vue')), 'opinion')
const trainVideo = r => require.ensure([], ()=> r(require('../page/trainVideo/trainVideo.vue')), 'trainVideo')
const videodetail = r => require.ensure([], ()=> r(require('../page/trainVideo/videodetail.vue')), 'videodetail')

export default [{
  path: '/',
  component: App, // 顶层路由，对应index.html
  children: [
    // 二级路由。对应App.vue
    // 地址为空时跳转home页面
    // {
    //     path: '',
    //     redirect: '/home'
    // },
    // {
    //     path: '/home',
    //     component: home
    // },
    {
      path: 'store',
      redirect: '/store/must',
      component: store,
      children: [
        {
          path: 'must',
          component: must
        },
        {
          path: 'choose',
          redirect: '/store/choose/wallet',
          component: choose,
          children: [
            {
              path: 'wallet',
              component: wallet
            },
            {
              path: 'bankcard',
              redirect: '/store/choose/bankcard/speed1',
              component: bankcard,
              children: [
                {
                  path: 'speed1',
                  component: speed1
                },
                {
                  path: 'speed2',
                  component: speed2
                },
                {
                  path: 'speed3',
                  component: speed3
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: 'addbank',
      component: addbank
    },
    {
      path: 'quicktreaty',
      component: quicktreaty
    },
    {
      path: 'ulepaytreaty',
      component: ulepaytreaty
    },
    {
      path: 'scancodetreaty',
      component: scancodetreaty
    },
    {
      path: '/runtype',
      component: runtype
    },
    {
      path: '/store/perfectDatum',
      component: perfectDatum
    },
    {
      path: '/assembly',
      component: assembly
    },
    {
      path: '/vips/',
      component: vips
    },
    {
      path: '/scratchCard/',
      component: scratchCard
    },
    {
      path: '/grade/',
      component: grade
    },
    {
      path: '/logout/',
      component: logout
    },
    {
      path: '/revokelogout/',
      component: revokelogout
    },
    {
      path: '/opinion',
      component: opinion
    },
    {
      path: '/trainVideo',
      component: trainVideo
    },
    {
      path: '/videodetail',
      component: videodetail
    }
  ]
}]
