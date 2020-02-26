//更买规则全局缓存
// import {gettaskRuleList} from '@/api/taskcenter'
import { getsitename } from '@/api/commonCrud'

const state = {
  // ruleList: [],
  site: [],
  area: [],
  siteUrl: {}
}

const mutations = {
  // SET_RULELIST: (state, ruleList) => {
  //   state.ruleList = ruleList
  // },
  SET_SITE: (state, site) => {
    state.site = site
  },
  SET_AREA: (state, area) => {
    state.area = area
  },
  SET_SITEURL: (state, siteUrl) => {
    state.siteUrl = siteUrl
  }
}

const actions = {
  // getRuleList({ commit }) {
  //   return new Promise( (resolve, reject) => {
  //     gettaskRuleList(state.token).then(res => {
  //       commit('SET_RULELIST', res.data)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  getSiteName({ commit }) {
    return new Promise( (resolve, reject) => {
      getsitename().then(res => {
        var obj = {}, area=[], areaObj = {}
        res.data.forEach(item => {
          obj[item.Location] = item.LocationUrl
          if(!areaObj[item.LocationAreaName]){
            areaObj[item.LocationAreaName] = item
          }
        })
        
        Object.keys(areaObj).forEach( key => {
          area.push(areaObj[key])
        })
        
        commit('SET_SITE', res.data)
        commit('SET_AREA', areaObj)
        commit('SET_SITEURL', obj)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}