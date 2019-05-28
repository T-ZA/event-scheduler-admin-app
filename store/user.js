export const state = () => ({
  currentUser: null
})

export const mutations = {
  setUser(payload) {
    state.user = payload
  },
  clearUser() {
    state.user = null
  }
}
