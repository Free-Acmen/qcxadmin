import request from '@/utils/request'

  //获取登陆地址
export function loginList(data) {
  return request({
  	url:'System/UserLog/GetPageTab',
  	method: 'post',
  	data
  })
}

//获取账户信息的使用记录
export function accountList(data) {
	return request({
		url:'Log/LogUserPrice/GetPageTab',
		method:'post',
		data
	})
}

  //修改密码
export function changepass(data) {
  return request({
  	url:'Account/UpdatePassWord',
  	method: 'post',
  	data
  })
}
