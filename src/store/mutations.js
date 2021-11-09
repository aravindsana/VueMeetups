
export default {

    SET_USER (state, payload) {
      state.user = payload
    },
    SET_LOADING (state, payload) {
      state.loading = payload
    },
    SET_ERROR (state, payload) {
      state.error = payload
    },
    CLEAR_ERROR (state) {
      state.error = null
    }
}