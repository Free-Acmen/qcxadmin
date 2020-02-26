import Layout from '@/layout'

const sysconfig = {
  path: '/sysconfig',
  component: Layout,
  redirect: '/sysconfig/userset',
  name: 'Sysconfig',
  meta: { title: '系统配置', icon: 'setting', roles: ['admin']},
  children: [
    {
      path: 'userset',
      name: 'Userset',
      component: () => import('@/views/sysconfig/userset/index'),
      meta: { title: '用户管理', icon: 'account', roles: ['admin']},
    },
    // {
    //   path: 'menuset',
    //   name: 'Menuset',
    //   component: () => import('@/views/sysconfig/menuset/index'),
    //   meta: { title: '菜单管理', icon: 'menu', roles: ['admin']},
    // },
    // {
    //   path: 'powerset',
    //   name: 'Powerset',
    //   component: () => import('@/views/sysconfig/powerset/index'),
    //   meta: { title: '权限管理', icon: 'right', roles: ['admin']},
    // },
    // {
    //   path: 'dictionary',
    //   name: 'Dictionary',
    //   component: () => import('@/views/sysconfig/dictionary/index'),
    //   meta: { title: '数据字典管理', icon: 'dictionary', roles: ['admin']},
    // }
  ]
}

export default sysconfig