import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 與 Vue 物件內的 data 屬性類似
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  // 想要修改 state 的資料時，會在 mutations 裡設定函式
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 將 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser 
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 設定其他的非同步函式，例如發送 API 請求等等
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        // 呼叫 usersAPI.getCurrentUser() 方法，並將 response 顯示出來+
        const { data } = await usersAPI.getCurrentUser()

        const { id, name, email, image, isAdmin } = data
        
        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        // 當 token 是有效的情況下，這個函式會為傳 true，否則會回傳 false
        return true
      } catch (error) {
        console.log('error', error)
        console.error('can not fetch user information')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
