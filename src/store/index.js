import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import rule from './modules/rule'
import permission from './modules/permission'
import tagsView from './modules/tagsView'



Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    rule,
    permission,
    tagsView
  },
  getters
})

export default store
