const runType = {
  state: {
    currParams: {}
  },
  mutations: {
    setCurrParams (state, obj) {
      state.currParams = obj
    },
    clearCurrParams (state) {
      state.currParams = {}
    }
  },
  actions: {
    setCurrParams ({ commit }, obj) {
      commit('setCurrParams', obj)
    },
    clearCurrParams ({ commit }) {
      commit('clearCurrParams')
    }
  },
  getters: {
    getCurrParams: state => state.currParams
  }
}

export default runType
