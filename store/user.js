export const state = () => ({
  currentUser: null
})

export const mutations = {
  setUser(state, payload) {
    state.currentUser = payload
  },
  clearUser(state) {
    state.currentUser = null
  }
}

export const actions = {
  setCurrentUser({ commit }, payload) {
    commit('setUser', payload)
  },
  async signOutUser({ commit }) {
    if (window.localStorage !== 'undefined') {
      localStorage.removeItem('apollo-token')
    }
    commit('clearUser')
    await this.$apolloHelpers.onLogout()
  }
}

export const getters = {
  currentUser: state => state.currentUser
}
