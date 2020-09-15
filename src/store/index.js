import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    approveNumber: 0
  },
  mutations: {
    setApproveNumber(state, num) {
      state.approveNumber = num;
    },
  },
  actions: {
  },
  modules: {
  }
})
