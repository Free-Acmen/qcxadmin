import { login, logout, getInfo, GetAllUser } from '@/api/user'
import * as cache from '@/utils/auth'
import { resetRouter } from '@/router'
import md5 from 'js-md5'

const state = {
  token: cache.getCookie('token'),
  name: '',
  nameZh: '',
  avatar: '',
  roles: [],
  auth: '',
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_NAMEZH: (state, nameZh) => {
    state.nameZh = nameZh
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_AUTH: (state, auth) => {
    state.auth = auth
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      var data = {
        LoginType: 1,
        password: md5(password),
        userName: username.trim(),
      }
      // login({ username: username.trim(), password: password }).then(response => {
      login(data).then(response => {
        const { data } = response

        setUserCommit(commit, data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('获取用户信息失败,请重新登陆或联系管理员!')
        }

        setUserCommit(commit, data, true)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        cache.removeCookie('token')
        cache.removeCookie('name')

        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      cache.removeCookie('token')
      cache.removeCookie('name')
      resolve()
    })
  },
  
  GetAllUser ({ commit }){
  	 return new Promise((resolve, reject) => {
      GetAllUser(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('获取用户信息失败,请重新登陆或联系管理员!')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

function setUserCommit(commit, data, flag){
  let token = data.Token
  let isAdmin = data.IsAdmin
  let IsSuperAdmin = data.IsSuperAdmin

  commit('SET_USERINFO', data)
  commit('SET_AUTH', [])

  commit('SET_TOKEN', token)
  commit('SET_NAME', data.UserName)
  commit('SET_NAMEZH', data.RealName)

  if(flag){
    if(IsSuperAdmin){
      commit('SET_ROLES', ['superAdmin', 'admin'])
    }else if(isAdmin){
      commit('SET_ROLES', ['admin', 'auth']) // auth权限为根据后台返回的路由动态添加相关页面的权限
    }else{
      commit('SET_ROLES', ['user', 'auth'])
    }
  }
  
  if(!flag){
    cache.setCookie('token', token)
    cache.setCookie('name', data.UserName)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

