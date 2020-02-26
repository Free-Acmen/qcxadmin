import request from '@/utils/request'

//站内信任务的弹窗出模板接口
// export function GetOnUserResource() {
//   return request({
//     url: 'System/UserLog/GetOnUserResource',
//     method: 'post'
//   })
// }



export function countUser() {
  return request({
    url: 'HYJY/Users/CountUsers',
    method: 'post'
  })
}