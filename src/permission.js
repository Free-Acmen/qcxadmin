import Vue from 'vue'
import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 页面跳转前 先取消当前页未完成的异步
  // Vue.prototype.__cancels__.forEach((cancel) => {
  //   cancel();
  // });
  // Vue.prototype.__cancels__ = [];

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getCookie('token')
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        // store.dispatch('rule/getSiteName') //缓存站点信息 方便全局使用
        store.dispatch('user/getInfo').then(res => { // 拉取user_info
          const roles = store.getters.roles // note: roles must be a array! such as: ['admin','user']
          store.dispatch('permission/generateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          // store.dispatch('FedLogOut').then(() => {
          //   Message.error(err || 'Has Error')
          //   next({ path: '/' })
          // })

          store.dispatch('user/resetToken').then(() => {
            Message.error(err || 'Has Error')
            next(`/login?redirect=${to.path}`)
            // next({ path: '/' })
            NProgress.done()
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
