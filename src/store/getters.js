const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nameZh: state => state.user.nameZh,
  roles: state => state.user.roles,
  auth: state => state.user.auth,
  userInfo: state => state.user.userInfo,
  // ruleList: state => state.rule.ruleList,
  siteList: state => state.rule.site,
  area: state => state.rule.area,
  siteUrl: state => state.rule.siteUrl,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
