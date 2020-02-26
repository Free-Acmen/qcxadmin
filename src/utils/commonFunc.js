import { Message } from 'element-ui'
import store from '@/store'


import {parseTime} from './index'
/**
 * @param {string} text 
 * @param {string} type success error warning 
 */
export function showMsg(text, type){
  Message({
    showClose: true,
    message: text,
    type: type || 'success',
    duration: 3 * 1000
  });
}

/**
 * 根据站点代码,获取站点中文名称 
 * @param {string} site 
 * @return {string} 站点对应的中文名称
 */
export function getSiteZh(site){
  let siteList = store.getters.siteList
  let siteZh = ''
  siteList.forEach(item => {
    if(item.Location == site){
      siteZh = item.LocationName
    }
  })
  return siteZh
}

/**
 * 根据规则id获取,规则中文名称
 * @param {string} ruleId 
 * @return {string} 对应规则对应的中文名称
 */
// export function getRuleName(ruleId){
//   let ruleName = []
//   let ruleList = store.getters.ruleList
//   ruleId && ruleId.split(",").forEach(id => {
//     ruleList.forEach( item => {
//       if(item.Id == id){
//         ruleName.push(item.RName)
//       }
//     })
//   })

//   return ruleName.join(",")
// }

/**
 * @return {string} 对应站点
 */
// export function getSiteName(){
// 	return new Promise((resolve, reject) => {
//     resolve(store.getters.siteList)
//   })
// }

/**
 * 格式化2位数, 不够2位前边补0,主要用于日期时间
 * @param {number} 1,55 
 * @return {string} 
 */
export function twoDigit(numb){
  return (numb + 100).toString().slice(-2)
}

/**
 * 判断日期是否是今天
 * @param {string}  2019-07-11 
 * @return {boolean} 
 */
export function isToday(str){
  var d = new Date(str.replace(/-/g,"/"));
  var todaysDate = new Date();
  if(d.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)){
      return true;
  } else {
      return false;
  }
}

/**
 * 对yyyy-mm-dd HH：mm：ss进行去掉年和秒
 */
export function getdatefillter(fulltime){
	if(fulltime){
		var fulltimeone = fulltime.split(' ')[0]
		var fulltimetwo = fulltime.split(' ')[1]
		var yeartime = fulltimeone.split('-')
		var daytime = fulltimetwo.split(':')
		var lasttime = yeartime[1] +'-' + yeartime[2] + ' ' + daytime[0] + ':' + daytime[1]
		return lasttime
	}
}

/**
 * 判断是否有权限访问摸个模块
 * @param {Array}  ['admin'] 
 * @return {boolean} 
 */
export function permission(value){
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
	    return hasPermission
    } else {
      // throw new Error(`need roles! Like ['admin','user']"`)
      return false
    }
}

/**
 * 过滤单级对象值的前后空格
 * @param {Object} obj  {'a': ' 1414 '}
 * @param {Array}  noneed ['a', 'b']  不需处理去空格的字段
 * @return {Object}   {'a': '1414'}
 */
export function filterSpaces(obj, noneed=[]){
  if(typeof obj != 'object'){
    console.log('输入的参数类型不符合要求')
    return {}
  }
  let newObj = {}
  Object.keys(obj).forEach( key => {
    if(typeof obj[key] == 'string' && noneed.indexOf(key) == -1){
      newObj[key] = obj[key].replace(/^\s+|\s+$/g, '')
    }else{
      newObj[key] = obj[key]
    }
  })
  return newObj
}

export function copyData(data){
  let textarea = $(`<textarea>${data}</textarea>`).appendTo("body").select()
  if(document.execCommand("copy")) {
    showMsg('复制成功')
  } else {
    showMsg('该浏览器不支持该功能，复制失败!', 'error')
  }
  textarea.remove()
}

/**
 * 格式化版本X轴方法
 * 
*/ 
export const formatXData = function(x){
  // let hours = x.split(" ")[1].split(":")[0]
  // if(hours - 18 >= 0){
  //   let time = new Date(x)
  //   time.setTime(time.getTime() + 3600 * 1000 * 24 * 1);
  //   return Pfun.formatDate(time, "yyyy-MM-dd")
  // }else{
  //   return x.split(" ")[0]
  // }
  if(typeof x == 'string'){
    return x.split(" ")[0]
  }else{
    return ''
  }
}


export default {
  parseTime: parseTime,
  showMsg: showMsg,
  getSiteZh: getSiteZh,
  // getRuleName: getRuleName,
  // getSiteName: getSiteName,
  twoDigit: twoDigit,
  isToday: isToday,
  getdatefillter: getdatefillter,
  permission: permission,
  filterSpaces: filterSpaces,
  copyData: copyData,
  formatXData: formatXData
}



