import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import sysconfig from './routes/sysconfig'
// import extendserv from './routes/extendserv'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','user']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRouterMap
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/user/login/index'),
    hidden: true
  },
  // {
  //   path: '/register',
  //   component: () => import('@/views/user/register/index'),
  //   hidden: true
  // },
  {
    path: '/401',
    component: () => import('@/views/401'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/mycenter',
    component: Layout,
    redirect: '/mycenter/info',
    name: 'Mycenter',
    meta: { title: '个人中心', icon: 'personalcenter' },
    children: [
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/mycenter/info/index'),
        meta: { title: '修改密码', icon: 'personmsg' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/score',
    component: Layout,
    redirect: '/score/check',
    name: 'Score',
    meta: { title: '分数', icon: 'service', roles: ['admin']},
    children: [
      {
        path: 'check',
        name: 'Check',
        component: () => import('@/views/score/check/index'),
        meta: { title: '分数核对', icon: 'taskcenter' , roles: ['admin']},
      },
      {
        path: 'historyinfo',
        name: 'HistoryInfo',
        component: () => import('@/views/score/historyinfo/index'),
        meta: { title: '历史信息', icon: 'taskcenter' , roles: ['admin']},
      },
      {
        path: 'professionalmanagement',
        name: 'ProfessionalManagement',
        // hidden: true,
        component: () => import('@/views/score/professionalmanagement/index'),
        meta: { title: '专业维护', icon: 'taskcenter' , roles: ['admin']},
      },
      {
        path: 'homesettings',
        name: 'HomeSettings',
        component: () => import('@/views/score/homesettings/index'),
        meta: { title: '页面参数设置', icon: 'taskcenter' , roles: ['admin']},
      },
      
    ]
  },
  sysconfig,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
