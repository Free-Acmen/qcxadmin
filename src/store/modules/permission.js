import { asyncRouterMap, constantRouterMap } from '@/router'
import _ from 'lodash'

/**
 * 树形结构变为一围数组
 * @param data asyncRouterMap
 * @param roles
 */

function treeToArray(data, children = 'ChildNodes') {
  let tmp = []
  data.forEach((item, index) => {
    // Vue.set(item, '_index', index)
    tmp.push(item)
    if (item[children] && item[children].length > 0) {
      const res = treeToArray(item[children], children)
      tmp = tmp.concat(res)
    }
  })
  return tmp
}


/**
 * 递归异步路由表，重新设置roles
 * @param routes asyncRouterMap
 * @param roles
 */
function setRouterRole(routes, authData) {
  routes.forEach(route => {
    const tmp = { ...route }
    authData.forEach( item => {
      if(tmp.name && item.Description == tmp.name){
        if(tmp.meta.roles){
          tmp.meta.roles.push('auth')
        }else{
          tmp.meta.roles = ['auth']
        }
      }
    })
    if (tmp.children) {
      setRouterRole(tmp.children, authData)
    }
  })
}


/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  namespaced: true,
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit, rootState }, data) {
      return new Promise( resolve => {
        let asyncRouterMapCopy = _.cloneDeep(asyncRouterMap)
        let auth = [] //JSON.parse(rootState.user.auth)
        let authData = treeToArray(auth)
        setRouterRole(asyncRouterMapCopy, authData)
        const { roles } = data
        let accessedRouters
        if (roles.includes('superAdmin')) {
          accessedRouters = asyncRouterMapCopy
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMapCopy, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

